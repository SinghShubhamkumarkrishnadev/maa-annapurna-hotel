import { isRequestAuthenticated, ADMIN_PASSWORD } from "@/lib/auth";
import { getReviews, saveReviews, ReviewItem } from "@/lib/data";

export async function GET() {
  try {
    const reviews = await getReviews();

    const totalCount = reviews.length;
    const averageRating = totalCount > 0
      ? (reviews.reduce((acc, r) => acc + Number(r.rating || 5), 0) / totalCount).toFixed(1)
      : "5.0";

    const breakdown = {
      5: reviews.filter((r) => Number(r.rating) === 5).length,
      4: reviews.filter((r) => Number(r.rating) === 4).length,
      3: reviews.filter((r) => Number(r.rating) === 3).length,
      2: reviews.filter((r) => Number(r.rating) === 2).length,
      1: reviews.filter((r) => Number(r.rating) === 1).length,
    };

    return Response.json({
      success: true,
      reviews,
      stats: {
        totalCount,
        averageRating: Number(averageRating),
        breakdown,
        recommendedPercentage: totalCount > 0
          ? Math.round(((breakdown[5] + breakdown[4]) / totalCount) * 100)
          : 100,
      },
    });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return Response.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, rating, comment, avatar, stayType } = data || {};

    if (!name || typeof name !== "string" || !name.trim()) {
      return Response.json({ error: "Your name is required to submit a review." }, { status: 400 });
    }

    const numRating = Math.max(1, Math.min(5, Math.round(Number(rating) || 5)));

    const now = new Date();
    const monthYear = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(now);

    const newReview: ReviewItem = {
      id: `rev-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      name: name.trim().slice(0, 70),
      rating: numRating,
      comment: typeof comment === "string" ? comment.trim().slice(0, 1500) : "",
      avatar: typeof avatar === "string" && avatar ? avatar : "star",
      date: monthYear,
      stayType: typeof stayType === "string" && stayType.trim() ? stayType.trim().slice(0, 50) : "Verified Guest",
      verified: true,
      createdAt: now.toISOString(),
    };

    const reviews = await getReviews();
    // Add to top of list
    const updated = [newReview, ...reviews];
    await saveReviews(updated);

    return Response.json({
      success: true,
      message: "Thank you for your valuable feedback! Your review is now live.",
      review: newReview,
    }, { status: 201 });
  } catch (error) {
    console.error("Error creating review:", error);
    return Response.json({ error: "Failed to submit review. Please try again." }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const idFromQuery = url.searchParams.get("id");

    let bodyId = "";
    let providedKey = request.headers.get("x-admin-key") || "";

    if (!idFromQuery) {
      try {
        const body = await request.json();
        bodyId = body?.id || "";
        if (!providedKey && body?.adminKey) {
          providedKey = body.adminKey;
        }
      } catch {
        // Body reading optional if id provided in query
      }
    }

    const reviewId = idFromQuery || bodyId;
    if (!reviewId) {
      return Response.json({ error: "Review ID is required for deletion" }, { status: 400 });
    }

    // Check authentication: either session cookie/token OR direct admin key verification
    const isSessionAuth = await isRequestAuthenticated(request);
    const isKeyAuth = providedKey && providedKey === ADMIN_PASSWORD;

    if (!isSessionAuth && !isKeyAuth) {
      return Response.json({ error: "Unauthorized access: Admin authentication required to delete reviews." }, { status: 401 });
    }

    const reviews = await getReviews();
    const initialLen = reviews.length;
    const filtered = reviews.filter((r) => r.id !== reviewId);

    if (filtered.length === initialLen) {
      return Response.json({ error: "Review not found" }, { status: 404 });
    }

    await saveReviews(filtered);

    return Response.json({
      success: true,
      message: "Review successfully deleted by host admin.",
      deletedId: reviewId,
    });
  } catch (error) {
    console.error("Error deleting review:", error);
    return Response.json({ error: "Failed to delete review" }, { status: 500 });
  }
}

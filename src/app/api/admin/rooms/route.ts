import { isRequestAuthenticated } from "@/lib/auth";
import { getRooms, saveRooms, deleteRoomFromDb, RoomItem } from "@/lib/data";

export async function GET() {
  const rooms = await getRooms();
  return Response.json({ success: true, rooms });
}

export async function POST(request: Request) {
  const authenticated = await isRequestAuthenticated(request);
  if (!authenticated) {
    return Response.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const data = await request.json();
    if (!data.name) {
      return Response.json({ error: "Room name is required" }, { status: 400 });
    }

    const rooms = await getRooms();
    const id = data.id || data.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || `room-${Date.now()}`;

    // Check if ID already exists
    if (rooms.some((r) => r.id === id)) {
      return Response.json({ error: "A room with this identifier already exists" }, { status: 400 });
    }

    const price = Number(data.price) || 1299;
    const originalPrice = Number(data.originalPrice) || Math.round(price * 1.4);
    const discount = data.discount || `${Math.round(((originalPrice - price) / originalPrice) * 100)}% OFF`;

    const newRoom: RoomItem = {
      id,
      name: data.name,
      badge: data.badge || "New",
      image: data.image || "/images/deluxe-room-dressing-table.jpg",
      beds: data.beds || "1 Queen / Double Bed",
      guests: data.guests || "2 Guests",
      price,
      originalPrice,
      discount,
      priceNote: data.priceNote || "Direct Host Deal",
      status: data.status || "Available Today",
      statusType: data.statusType || "available",
      availableUnits: Number(data.availableUnits) >= 0 ? Number(data.availableUnits) : 2,
      totalUnits: Number(data.totalUnits) >= 1 ? Number(data.totalUnits) : 2,
      bookedToday: Number(data.bookedToday) >= 0 ? Number(data.bookedToday) : 0,
      availabilityText: data.availabilityText || `${data.availableUnits || 2} Rooms Available Today`,
      isAvailable: data.isAvailable !== false,
      isActive: data.isActive !== false,
      features: Array.isArray(data.features) ? data.features : [
        "Split Air Conditioner",
        "Attached Modern Bath",
        "24/7 Hot Water Geyser",
        "High-Speed Wi-Fi"
      ],
      description: data.description || "Comfortable AC room at Maa Annapurna Home Stay Bodhgaya.",
      alt: data.alt || `${data.name} at Maa Annapurna Hotel Bodhgaya`,
    };

    rooms.push(newRoom);
    await saveRooms(rooms);

    return Response.json({ success: true, message: "Room added successfully", room: newRoom }, { status: 201 });
  } catch (error) {
    console.error("Error creating room:", error);
    return Response.json({ error: "Failed to create room" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const authenticated = await isRequestAuthenticated(request);
  if (!authenticated) {
    return Response.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const data = await request.json();
    if (!data.id) {
      return Response.json({ error: "Room ID is required for update" }, { status: 400 });
    }

    const rooms = await getRooms();
    const index = rooms.findIndex((r) => r.id === data.id);
    if (index === -1) {
      return Response.json({ error: "Room not found" }, { status: 404 });
    }

    const current = rooms[index];
    const price = data.price !== undefined ? Number(data.price) : current.price;
    const originalPrice = data.originalPrice !== undefined ? Number(data.originalPrice) : current.originalPrice;
    const discount = data.discount !== undefined
      ? data.discount
      : `${Math.max(0, Math.round(((originalPrice - price) / originalPrice) * 100))}% OFF`;

    const updatedRoom: RoomItem = {
      ...current,
      ...data,
      price,
      originalPrice,
      discount,
      availableUnits: data.availableUnits !== undefined ? Number(data.availableUnits) : current.availableUnits,
      totalUnits: data.totalUnits !== undefined ? Number(data.totalUnits) : current.totalUnits,
      bookedToday: data.bookedToday !== undefined ? Number(data.bookedToday) : current.bookedToday,
    };

    rooms[index] = updatedRoom;
    await saveRooms(rooms);

    return Response.json({ success: true, message: "Room updated successfully", room: updatedRoom });
  } catch (error) {
    console.error("Error updating room:", error);
    return Response.json({ error: "Failed to update room" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const authenticated = await isRequestAuthenticated(request);
  if (!authenticated) {
    return Response.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return Response.json({ error: "Room ID is required" }, { status: 400 });
    }

    const rooms = await getRooms();
    const filtered = rooms.filter((r) => r.id !== id);

    if (filtered.length === rooms.length) {
      return Response.json({ error: "Room not found" }, { status: 404 });
    }

    await saveRooms(filtered);
    await deleteRoomFromDb(id);
    return Response.json({ success: true, message: "Room deleted successfully" });
  } catch (error) {
    console.error("Error deleting room:", error);
    return Response.json({ error: "Failed to delete room" }, { status: 500 });
  }
}

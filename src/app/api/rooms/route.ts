import { getRooms } from "@/lib/data";

export async function GET() {
  try {
    const rooms = await getRooms();
    // Return all rooms that are marked active (or all if none filtered)
    const activeRooms = rooms.filter((r) => r.isActive !== false);
    return Response.json({ success: true, rooms: activeRooms.length > 0 ? activeRooms : rooms });
  } catch (error) {
    console.error("Error fetching rooms:", error);
    return Response.json({ error: "Failed to load rooms" }, { status: 500 });
  }
}

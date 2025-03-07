"use server";

export async function getBookedTicket(bookedTicketId: string) {
  if (!bookedTicketId) {
    return { error: "BookedTicketId is required." };
  }

  try {
    const response = await fetch(`http://localhost:5021/api/v1/get-booked-ticket/${bookedTicketId}`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
      },
      cache: "no-store", // Ensures fresh data on every request (important for SSR)
    });

    const text = await response.text();
    const jsonResponse = text ? JSON.parse(text) : null;

    if (!response.ok) {
      return { error: jsonResponse?.message || "Failed to fetch booked ticket." };
    }

    // ✅ Fix: Check the correct response structure
    if (!jsonResponse?.categories || jsonResponse.categories.length === 0) {
      return { error: "No tickets found for this BookedTicketId." };
    }

    return { success: true, data: jsonResponse }; // ✅ Return full response correctly
  } catch (error) {
    return { error: error instanceof Error ? error.message : "An unknown error occurred." };
  }
}

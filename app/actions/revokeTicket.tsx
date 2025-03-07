"use server";

export async function revokeTicket(bookedTicketId: string, ticketCode: string, bookedTicketDetailsQuantity: number) {
  if (!bookedTicketId || !ticketCode || bookedTicketDetailsQuantity <= 0) {
    return { error: "BookedTicketId, TicketCode, and Quantity are required. Quantity must be above 0." };
  }

  try {
    const response = await fetch(
      `http://localhost:5021/api/v1/revoke-ticket/${bookedTicketId}/${ticketCode}/${bookedTicketDetailsQuantity}`,
      {
        method: "DELETE",
        headers: { "Accept": "application/json" },
        cache: "no-store",
      }
    );

    const text = await response.text();
    console.log("Raw API Response:", text);
    console.log("Status Code:", response.status);

    let jsonResponse = null;
    try {
      jsonResponse = text ? JSON.parse(text) : null;
    } catch (error) {
      console.error("JSON Parse Error:", error);
    }

    if (!response.ok) {
      return { error: jsonResponse?.message || `Failed to revoke ticket. Server responded with status ${response.status}` };
    }

    if (jsonResponse?.data) {
      return { success: "Ticket revoked successfully!", data: jsonResponse.data };
    }

    return { success: true, data: jsonResponse };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "An unknown error occurred." };
  }
}

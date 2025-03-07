"use server";

export async function editBookedTicket(bookedTicketId: string, ticketCode: string, bookedTicketDetailsQuantity: number) {
  if (bookedTicketDetailsQuantity <= 0) {
    return { error: "The quantity to edit must be above 0." };
  }

  try {
    const response = await fetch(`http://localhost:5021/api/v1/edit-booked-ticket/${bookedTicketId}`, {
      method: "PUT", // Ensure it matches your cURL request
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ticketCode,
        bookedTicketDetailsQuantity,
      }),
    });

    const text = await response.text();
    console.log("Raw API Response:", text);
    console.log("Status Code:", response.status);
    const jsonResponse = text ? JSON.parse(text) : null;

    if (!response.ok) {
      return { error: jsonResponse?.value?.message || "Failed to edit booked ticket." };
    }

    if (jsonResponse?.data) {
      return { success: "Ticket updated successfully!", data: jsonResponse.data };
    }
    

    return { success: "Ticket updated successfully!", data: jsonResponse };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "An unknown error occurred." };
  }
}

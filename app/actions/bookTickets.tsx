"use server";

export async function bookTicket(formData: FormData) {
  const ticketCode = formData.get("ticketCode") as string;
  const ticketQuantity = parseInt(formData.get("ticketQuantityToBook") as string, 10);

  if (!ticketCode || ticketQuantity < 1) {
    return { error: "Invalid ticket code or quantity." };
  }

  try {
    const response = await fetch("http://localhost:5021/api/v1/ticket-booking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        {
          ticketCode,
          ticketQuantityToBook: ticketQuantity,
        },
      ]),
    });

    const textResponse = await response.text(); // Read as text first
console.log("Raw API Response:", textResponse);
console.log("Status Code:", response.status);


    try {
      const jsonResponse = JSON.parse(textResponse); // Parse JSON response

      if (!response.ok) {
        return {
          error: jsonResponse.detail || "An error occurred.",
          details: jsonResponse.errors || jsonResponse.exceptionMessage || null,
        };
      }

      return { success: "Ticket booked successfully!", data: jsonResponse.data };
    } catch (jsonError) {
      console.error("JSON Parsing Error:", jsonError);
      return { error: `Invalid server response format: ${textResponse}` };
    }
  } catch (error) {
    console.error("Fetch Error:", error);
    return { error: "A network error occurred. Please check your connection." };
  }
}

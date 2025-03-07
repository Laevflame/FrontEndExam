import { getBookedTicket } from "@/app/actions/getBookedTickets";

export default async function GetBookedTicketPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[]>;
}) {
  const bookedTicketId = Array.isArray(searchParams?.bookedTicketId)
    ? searchParams?.bookedTicketId[0]
    : searchParams?.bookedTicketId ?? "";

  let ticketData = null;
  let error = "";

  if (bookedTicketId) {
    const result = await getBookedTicket(bookedTicketId);
    if (result.error) {
      error = result.error;
    } else {
      ticketData = result.data;
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-600 to-purple-600">
      <div className="max-w-lg w-full mx-4 p-8 bg-white shadow-xl rounded-2xl border border-gray-100">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          Fetch Booked Ticket
        </h2>

        <form method="GET" className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Booked Ticket ID:
            </label>
            <input
              type="text"
              name="bookedTicketId"
              defaultValue={bookedTicketId}
              placeholder="Enter booked ticket ID"
              className="text-blackw-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 active:bg-blue-800 transition-colors shadow-md"
          >
            Fetch Ticket
          </button>
        </form>

        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-center">
            {error}
          </div>
        )}

        {ticketData && (
          <div className="mt-6 p-6 bg-gray-50 border border-gray-200 rounded-lg space-y-4">
            <h3 className="text-xl font-bold text-gray-800">
              Ticket Categories
            </h3>
            {ticketData.categories.map((category: any, index: number) => (
              <div
                key={index}
                className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
              >
                <h4 className="text-lg font-semibold text-gray-700">
                  {category.categoryName}
                </h4>
                <p className="text-gray-600">
                  Quantity: {category.quantityPerCategory}
                </p>
                <ul className="mt-2 space-y-2 pl-4">
                  {category.tickets.map((ticket: any, idx: number) => (
                    <li key={idx} className="text-gray-600">
                      <strong>{ticket.ticketName}</strong> ({ticket.ticketCode}) -{" "}
                      {new Date(ticket.eventDate).toLocaleDateString()}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
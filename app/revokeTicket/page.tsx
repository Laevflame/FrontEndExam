import { revokeTicket } from "@/app/actions/revokeTicket";

export default async function RevokeTicketPage({
  searchParams,
}: {
  searchParams?: {
    bookedTicketId?: string;
    ticketCode?: string;
    bookedTicketDetailsQuantity?: string;
  };
}) {
  const bookedTicketId = searchParams?.bookedTicketId || "";
  const ticketCode = searchParams?.ticketCode || "";
  const bookedTicketDetailsQuantity = searchParams?.bookedTicketDetailsQuantity
    ? parseInt(searchParams.bookedTicketDetailsQuantity)
    : 0;

  let result = null;
  let error = "";

  if (bookedTicketId && ticketCode && bookedTicketDetailsQuantity > 0) {
    const response = await revokeTicket(
      bookedTicketId,
      ticketCode,
      bookedTicketDetailsQuantity,
    );
    if (response.error) {
      error = response.error;
    } else {
      result = response.data;
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-600 to-purple-600">
      <div className="content-center max-w-lg mx-auto p-8 bg-white shadow-lg rounded-xl border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Revoke Ticket
        </h2>

        <form method="GET" className="space-y-5">
          <div className="space-y-4 text-black">
            <input
              type="text"
              name="bookedTicketId"
              defaultValue={bookedTicketId}
              placeholder="Enter Booked Ticket ID"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              required
            />
            <input
              type="text"
              name="ticketCode"
              defaultValue={ticketCode}
              placeholder="Enter Ticket Code"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              required
            />
            <input
              type="number"
              name="bookedTicketDetailsQuantity"
              defaultValue={bookedTicketDetailsQuantity}
              placeholder="Enter Quantity"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 active:bg-red-700 transition-colors shadow-md"
          >
            Revoke Ticket
          </button>
        </form>

        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
            <p>{error}</p>
          </div>
        )}

        {result && (
          <div className="mt-6 p-6 bg-green-50 border border-green-200 rounded-lg space-y-3">
            <h3 className="text-xl font-bold text-green-800">
              Ticket Revoked Successfully
            </h3>
            <div className="space-y-2 text-gray-700">
              <p>
                <strong>Ticket Code:</strong> {result.ticketCode}
              </p>
              <p>
                <strong>Ticket Name:</strong> {result.ticketName}
              </p>
              <p>
                <strong>Category:</strong> {result.categoryName}
              </p>
              <p>
                <strong>Remaining Quantity:</strong> {result.remainingQuantity}
              </p>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
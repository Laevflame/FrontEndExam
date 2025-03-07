import Link from "next/link";
import ItemsPerPageSelect from "./itemsperpage"; // Import client component

const fetchTickets = async (page: number, itemsPerPage: number) => {
  const res = await fetch(
    `http://localhost:5021/api/v1/get-available-ticket?PageNumber=${page}&PageSize=${itemsPerPage}`,
    { cache: "no-store" },
  );

  if (!res.ok) throw new Error("Failed to fetch tickets");
  return res.json();
};

const TicketsPage = async ({
  searchParams,
}: {
  searchParams?: Record<string, string | string[]>;
}) => {
  const itemsPerPage = Number(searchParams?.itemsPerPage ?? 5);
  const currentPage = Number(searchParams?.page ?? 1);

  const { tickets, totalTickets } = await fetchTickets(currentPage, itemsPerPage);
  const totalPages = Math.ceil(totalTickets / itemsPerPage);

  return (
    <div className="p-6 bg-gradient-to-br from-blue-600 to-purple-600 text-black text-bold">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Tickets</h1>

        <div className="mb-6">
          <ItemsPerPageSelect />
        </div>

        <ul className="space-y-4">
          {tickets.map((ticket: any) => (
            <li
              key={ticket.ticketCode}
              className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {ticket.ticketName}
              </h2>
              <div className="space-y-1 text-gray-600">
                <p>
                  <span className="font-medium">Category:</span>{" "}
                  {ticket.categoryName}
                </p>
                <p>
                  <span className="font-medium">Remaining:</span>{" "}
                  {ticket.ticketRemainingQuota}
                </p>
                <p>
                  <span className="font-medium">Price:</span>{" "}
                  {ticket.ticketPrice.toLocaleString()} IDR
                </p>
                <p>
                  <span className="font-medium">Event Date:</span>{" "}
                  {new Date(ticket.eventDate).toLocaleDateString()}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <div className="flex justify-between items-center mt-8">
          <Link
            href={`/getTickets?itemsPerPage=${itemsPerPage}&page=${currentPage - 1}`}
            className={`px-5 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors ${
              currentPage === 1 ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            Previous
          </Link>
          <span className="text-gray-700 font-medium">
            Page {currentPage} of {totalPages}
          </span>
          <Link
            href={`/getTickets?itemsPerPage=${itemsPerPage}&page=${currentPage + 1}`}
            className={`px-5 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors ${
              currentPage === totalPages ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            Next
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TicketsPage;
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 to-purple-600 text-center px-4">
      <div className="max-w-2xl w-full">
        <h1 className="text-5xl font-bold text-white mb-6">Ticket API</h1>
        <p className="text-xl text-white mb-12">
          An API to GET, PUT, POST, and DELETE tickets with ease.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            href="/getTickets"
            className="bg-white shadow-lg px-8 py-4 rounded-xl hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 text-lg font-semibold text-gray-800 text-center"
          >
            View Tickets
          </Link>
          <Link
            href="/bookedTickets"
            className="bg-white shadow-lg px-8 py-4 rounded-xl hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 text-lg font-semibold text-gray-800 text-center"
          >
            Booked Tickets
          </Link>
          <Link
            href="/editTickets"
            className="bg-white shadow-lg px-8 py-4 rounded-xl hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 text-lg font-semibold text-gray-800 text-center"
          >
            Edit Ticket
          </Link>
          <Link
            href="/getBookedTickets"
            className="bg-white shadow-lg px-8 py-4 rounded-xl hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 text-lg font-semibold text-gray-800 text-center"
          >
            Get Booked Tickets
          </Link>
          <Link
            href="/revokeTicket"
            className="bg-white shadow-lg px-8 py-4 rounded-xl hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 text-lg font-semibold text-gray-800 text-center"
          >
            Revoke Ticket
          </Link>
        </div>
      </div>
    </div>
  );
}
import React, { useState, useEffect } from "react";
import {
  getBookings,
  createBooking,
  assignProvider,
  updateStatus,
} from "./api";
import { RefreshCw, LayoutDashboard } from "lucide-react";
import { BookingForm } from "./components/BookingForm";
import { BookingTable } from "./components/BookingTable";

function App() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: "Kirtan",
    role: "CUSTOMER",
  });

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const data = await getBookings();
      setBookings(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleSubmitBooking = async (data: {
    customerName: string;
    serviceType: string;
  }) => {
    await createBooking(data);
    fetchBookings();
  };

  const handleAssign = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const providerName = prompt("Enter Provider Name to Assign:", "Bhavesh");
    if (!providerName) return;
    await assignProvider(id, providerName);
    fetchBookings();
  };

  const handleStatusUpdate = async (
    id: string,
    newStatus: string,
    e?: React.MouseEvent,
  ) => {
    e?.stopPropagation();
    await updateStatus(id, newStatus);
    fetchBookings();
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      {/* HEADER */}
      <header className="border-b border-gray-200 py-4 px-6 sticky top-0 z-10 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="text-black" size={24} />
            <h1 className="text-xl font-bold tracking-tight">ServiceMarket</h1>
          </div>

          <div className="flex items-center gap-2 border border-gray-200 p-1 rounded">
            {["CUSTOMER", "PROVIDER", "ADMIN"].map((role) => (
              <button
                key={role}
                onClick={() =>
                  setCurrentUser({
                    name:
                      role === "CUSTOMER"
                        ? "Kirtan"
                        : role === "PROVIDER"
                          ? "Bhavesh"
                          : "Admin",
                    role,
                  })
                }
                className={`px-4 py-1.5 text-xs font-semibold rounded-sm transition-all
                    ${
                      currentUser.role === role
                        ? "bg-black text-white"
                        : "text-gray-500 hover:text-black"
                    }
                  `}
              >
                {role}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        {/* ACTION AREA */}
        <div className="flex justify-between items-end border-b border-black pb-4">
          <div>
            <h2 className="text-2xl font-bold">Welcome, {currentUser.name}</h2>
            <p className="text-sm text-gray-500 mt-1 font-mono uppercase">
              Role: {currentUser.role}
            </p>
          </div>

          <button
            onClick={fetchBookings}
            className="flex items-center gap-2 text-sm font-medium hover:underline"
            title="Refresh Data"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            REFRESH
          </button>
        </div>

        {currentUser.role === "CUSTOMER" && (
          <BookingForm onSubmit={handleSubmitBooking} />
        )}

        <BookingTable
          bookings={bookings}
          loading={loading}
          currentUser={currentUser}
          onAssign={handleAssign}
          onUpdateStatus={handleStatusUpdate}
        />
      </main>
    </div>
  );
}

export default App;

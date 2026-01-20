import React from "react";
import { User, ArrowRight, X } from "lucide-react";

interface BookingTableProps {
  bookings: any[];
  loading: boolean;
  currentUser: { name: string; role: string };
  onAssign: (id: string, e: React.MouseEvent) => void;
  onUpdateStatus: (id: string, status: string, e?: React.MouseEvent) => void;
}

export function BookingTable({
  bookings,
  loading,
  currentUser,
  onAssign,
  onUpdateStatus,
}: BookingTableProps) {
  if (loading)
    return (
      <div className="text-center py-12 font-mono text-sm">
        UPDATING RECORDS...
      </div>
    );
  if (bookings.length === 0)
    return (
      <div className="text-center py-12 border border-dashed border-gray-300">
        NO ACTIVE BOOKINGS
      </div>
    );

  return (
    <div className="border border-black">
      <table className="w-full text-left text-sm">
        <thead className="bg-black text-white uppercase text-xs tracking-wider">
          <tr>
            <th className="px-6 py-4 font-bold">Customer</th>
            <th className="px-6 py-4 font-bold">Service</th>
            <th className="px-6 py-4 font-bold">Status</th>
            <th className="px-6 py-4 font-bold">Provider</th>
            <th className="px-6 py-4 font-bold text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {bookings.map((booking) => (
            <tr
              key={booking._id}
              className="hover:bg-gray-50 transition-colors group"
            >
              <td className="px-6 py-4 font-medium">{booking.customerName}</td>
              <td className="px-6 py-4">{booking.serviceType}</td>
              <td className="px-6 py-4">
                <span
                  className={`font-mono text-xs uppercase
                   ${booking.status === "PENDING" ? "text-gray-500" : ""}
                   ${booking.status === "ASSIGNED" ? "font-bold" : ""}
                   ${booking.status === "IN_PROGRESS" ? "underline decoration-2 underline-offset-4" : ""}
                   ${booking.status === "COMPLETED" ? "line-through decoration-black decoration-1 text-gray-400" : ""}
                   ${booking.status === "CANCELLED" ? "text-gray-300" : ""}
                 `}
                >
                  [{booking.status}]
                </span>
              </td>
              <td className="px-6 py-4 text-xs font-mono">
                {booking.providerName ? (
                  <span className="flex items-center gap-2">
                    <User size={12} /> {booking.providerName}
                  </span>
                ) : (
                  <span className="text-gray-400">---</span>
                )}
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex justify-end gap-3 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                  {/* ACTIONS */}
                  {currentUser.role === "PROVIDER" &&
                    booking.status === "PENDING" && (
                      <button
                        onClick={(e) => onAssign(booking._id, e)}
                        className="border border-black px-3 py-1 text-xs font-bold hover:bg-black hover:text-white transition-colors uppercase"
                      >
                        Accept
                      </button>
                    )}
                  {currentUser.role === "PROVIDER" &&
                    booking.providerName === currentUser.name && (
                      <>
                        {booking.status === "ASSIGNED" && (
                          <button
                            onClick={(e) =>
                              onUpdateStatus(booking._id, "IN_PROGRESS", e)
                            }
                            className="border border-black px-3 py-1 text-xs font-bold hover:bg-black hover:text-white transition-colors uppercase flex items-center gap-1"
                          >
                            Start <ArrowRight size={12} />
                          </button>
                        )}
                        {booking.status === "IN_PROGRESS" && (
                          <button
                            onClick={(e) =>
                              onUpdateStatus(booking._id, "COMPLETED", e)
                            }
                            className="bg-black text-white px-3 py-1 text-xs font-bold hover:bg-gray-800 transition-colors uppercase border border-black"
                          >
                            Complete
                          </button>
                        )}
                      </>
                    )}
                  {(currentUser.role === "ADMIN" ||
                    (currentUser.role === "CUSTOMER" &&
                      booking.status === "PENDING")) && (
                    <button
                      onClick={(e) =>
                        onUpdateStatus(booking._id, "CANCELLED", e)
                      }
                      className="cursor-pointer text-red-600 hover:underline px-2 py-1 text-xs uppercase"
                      title="Cancel"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

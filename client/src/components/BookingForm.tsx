import React, { useState } from "react";
import { Plus } from "lucide-react";

interface BookingFormProps {
  onSubmit: (data: {
    customerName: string;
    serviceType: string;
  }) => Promise<void>;
}

export function BookingForm({ onSubmit }: BookingFormProps) {
  const [customerName, setCustomerName] = useState("");
  const [serviceType, setServiceType] = useState("Plumbing");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !serviceType) return;
    await onSubmit({ customerName, serviceType });
    setCustomerName("");
  };

  return (
    <div className="border border-black p-6">
      <h3 className="text-lg font-bold mb-6 border-l-4 border-black pl-3 uppercase tracking-wider">
        New Request
      </h3>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-6 items-end"
      >
        <div className="flex-1 w-full">
          <label className="block text-xs font-bold uppercase mb-2">
            Customer Name
          </label>
          <input
            className="w-full px-3 py-2 border-b-2 border-gray-300 focus:border-black outline-none bg-transparent transition-colors rounded-none placeholder-gray-400"
            placeholder="ENTER NAME"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
        </div>

        <div className="flex-1 w-full">
          <label className="block text-xs font-bold uppercase mb-2">
            Service
          </label>
          <select
            className="w-full px-3 py-2 border-b-2 border-gray-300 focus:border-black outline-none bg-transparent transition-colors rounded-none cursor-pointer"
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
          >
            {["Plumbing", "Cleaning", "Electrical", "Moving"].map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={!customerName}
          className="bg-black text-white px-6 py-2 font-bold text-sm flex items-center gap-2 hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed h-[42px] uppercase tracking-wide"
        >
          <Plus size={16} /> Book Now
        </button>
      </form>
    </div>
  );
}

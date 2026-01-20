import { LayoutDashboard, Clock, CheckCircle } from "lucide-react";

interface StatsProps {
  bookings: any[];
}

export function StatsCards({ bookings }: StatsProps) {
  const stats = [
    {
      label: "Total Bookings",
      value: bookings.length,
      color: "text-blue-600",
      bg: "bg-blue-50",
      icon: LayoutDashboard,
    },
    {
      label: "Active Requests",
      value: bookings.filter(
        (b) => b.status === "PENDING" || b.status === "ASSIGNED",
      ).length,
      color: "text-amber-600",
      bg: "bg-amber-50",
      icon: Clock,
    },
    {
      label: "Completed",
      value: bookings.filter((b) => b.status === "COMPLETED").length,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      icon: CheckCircle,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between group hover:shadow-md transition-all"
        >
          <div>
            <p className="text-sm font-medium text-gray-400 mb-1">
              {stat.label}
            </p>
            <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
          <div
            className={`p-4 rounded-xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}
          >
            <stat.icon size={24} />
          </div>
        </div>
      ))}
    </div>
  );
}

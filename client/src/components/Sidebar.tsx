import {
  Shield,
  LayoutDashboard,
  PlusCircle,
  User,
  Wrench,
} from "lucide-react";

interface SidebarProps {
  activeTab: "create" | "dashboard";
  setActiveTab: (tab: "create" | "dashboard") => void;
  currentUser: { name: string; role: string };
  setCurrentUser: (user: { name: string; role: string }) => void;
}

export function Sidebar({
  activeTab,
  setActiveTab,
  currentUser,
  setCurrentUser,
}: SidebarProps) {
  return (
    <aside className="w-72 bg-white border-r border-gray-100 flex flex-col fixed h-full z-20 transition-all duration-300 shadow-[2px_0_20px_rgba(0,0,0,0.02)]">
      <div className="p-8 pb-4">
        <div className="flex items-center gap-3 mb-1">
          <div className="bg-blue-600 p-2 rounded-xl text-white shadow-lg shadow-blue-200">
            <Shield size={24} strokeWidth={2.5} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            ServiceHub
          </h1>
        </div>
        <p className="text-xs text-gray-400 pl-14">Admin & Marketplace</p>
      </div>

      <div className="p-4 flex-1 overflow-y-auto space-y-8">
        <div>
          <h3 className="px-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">
            Dashboard
          </h3>
          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group
                  ${activeTab === "dashboard" ? "bg-blue-50 text-blue-700" : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"}
                `}
            >
              <LayoutDashboard
                size={20}
                strokeWidth={2}
                className={
                  activeTab === "dashboard"
                    ? "text-blue-600"
                    : "text-gray-400 group-hover:text-gray-600"
                }
              />
              Overview
            </button>
            {currentUser.role === "CUSTOMER" && (
              <button
                onClick={() => setActiveTab("create")}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group
                    ${activeTab === "create" ? "bg-blue-50 text-blue-700" : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"}
                  `}
              >
                <PlusCircle
                  size={20}
                  strokeWidth={2}
                  className={
                    activeTab === "create"
                      ? "text-blue-600"
                      : "text-gray-400 group-hover:text-gray-600"
                  }
                />
                New Request
              </button>
            )}
          </nav>
        </div>

        <div>
          <h3 className="px-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">
            Switch Role
          </h3>
          <div className="space-y-2">
            {[
              { id: "CUSTOMER", label: "Customer", icon: User, name: "Alice" },
              { id: "PROVIDER", label: "Provider", icon: Wrench, name: "John" },
              {
                id: "ADMIN",
                label: "Administrator",
                icon: Shield,
                name: "Admin",
              },
            ].map((role) => (
              <button
                key={role.id}
                onClick={() =>
                  setCurrentUser({ name: role.name, role: role.id })
                }
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 border
                   ${
                     currentUser.role === role.id
                       ? "bg-slate-800 text-white border-slate-800 shadow-md transform scale-[1.02]"
                       : "bg-white border-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                   }
                 `}
              >
                <role.icon size={18} />
                {role.label}
                {currentUser.role === role.id && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.5)]"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-6 border-t border-gray-100 bg-gray-50/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-100 to-indigo-100 flex items-center justify-center text-blue-700 font-bold border-2 border-white shadow-sm">
            {currentUser.name[0]}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-gray-900 truncate">
              {currentUser.name}
            </p>
            <p className="text-xs text-gray-500 capitalize">
              {currentUser.role.toLowerCase()}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}

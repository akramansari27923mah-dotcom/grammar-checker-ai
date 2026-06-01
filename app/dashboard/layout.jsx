import Navbar from "@/dashboardComponents/Navbar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <div>
        <Navbar />
      </div>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100">{children}</main>
    </div>
  );
}

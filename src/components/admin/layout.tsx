import { FC, ReactNode } from "react";
import AdmindashboardHeader from "./header";
import AdminDashboardSidebar from "./sidebar";

const AdminDashboardLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="flex">
      <AdminDashboardSidebar />
      <main className="flex-1 ml-[300px]">
        <AdmindashboardHeader />
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
};

export default AdminDashboardLayout;

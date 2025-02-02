import { FC, ReactNode } from "react";
import AdmindashboardHeader from "./header";
import AdminDashboardSidebar from "./sidebar";

const AdminDashboardLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="flex w-full">
      <AdminDashboardSidebar />
      <div className="overflow-y-scroll w-10/12">
        <AdmindashboardHeader />
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;

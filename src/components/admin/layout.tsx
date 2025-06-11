import { FC, ReactNode } from "react";
import AdmindashboardHeader from "./header";
import AdminDashboardSidebar from "./sidebar";

const AdminDashboardLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="flex">
      <div className="w-[300px] shrink-0" />
      <AdminDashboardSidebar />
      <main className="flex-1 box-border overflow-x-hidden">
        <div className="max-w-[1800px] mx-auto">
          <AdmindashboardHeader />
          <div className="py-6 px-6">{children}</div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboardLayout;

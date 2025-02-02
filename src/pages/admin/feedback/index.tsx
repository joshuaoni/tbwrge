import classNames from "classnames";
import { useState } from "react";

import AdminDashboardLayout from "@/components/admin/layout";
import AdminDashboardSearchBox from "@/components/admin/search";
import BriefcaseIcon from "@/components/icons/briefcase";

const AdminSupportPage = () => {
  const [tab, setTab] = useState("Open Feedbacks");

  return (
    <AdminDashboardLayout>
      <section className="w-full flex items-start justify-between">
        <AdminDashboardSearchBox placeholder="Search for any feedback" />
        <div className="flex items-center gap-10">
          {[
            { title: "Open Feedbacks", value: 12 },
            { title: "Closed Feedbacks", value: 89 },
          ].map((item, i) => (
            <div
              key={i}
              className="py-6 px-5 border border- w-full min-w-72 space-y-4 rounded-xl"
              style={{
                boxShadow:
                  "0px 4px 6px 0px #2121210A, 0px 4px 50px 0px #21212114",
              }}
            >
              <div className="flex items-end gap-3">
                <BriefcaseIcon color="#2563EB" />
                <span className="text-sm">{item.title}</span>
              </div>

              <p className="text-2xl font-bold">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10 space-y-10">
        <div className="flex items-center gap-6">
          {["Open Feedbacks", "Closed Feedbacks"].map((item, i) => (
            <button
              key={i}
              onClick={() => setTab(item)}
              className={classNames("font-medium", {
                "text-[#2563EB]": tab === item,
              })}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="overflow-hidden rounded-xl">
          <table className="w-full bg-white border-separate border-spacing-0">
            <thead>
              <tr className="bg-[#D6D6D6] text-[#898989] text-sm font-bold">
                <th className="py-3 px-6 text-left rounded-tl-xl">User</th>
                <th className="py-3 px-6 text-center">Status</th>
                <th className="py-3 px-6 text-center">Name & Email</th>
                <th className="py-3 px-6 text-left rounded-tr-xl">Actions</th>
              </tr>
            </thead>
            <tbody>
              {new Array(5)
                .fill(null)
                .map((_, index) => ({
                  id: index + 1,
                  name: "John James",
                  email: "john@gmail.com",
                  status: Math.random() > 0.5 ? "Accepted" : "Pending",
                  lastLogin: `${Math.floor(Math.random() * 60)} mins ago`,
                }))
                .map((user) => (
                  <tr key={user.id} className="hover:bg-gray-100">
                    <td className="py-3 px-6 text-left flex items-center space-x-2">
                      <div>
                        <p className="font-medium text-sm text-[#333]">
                          Can you please add this function to the platform
                        </p>
                        <p className="text-xs text-gray-500">
                          Last Login: {user.lastLogin}
                        </p>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-center">
                      <span className="p-1.5 text-xs text-[#377DFF] bg-[#377DFF]/20 rounded-md">
                        {user.status}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-center flex items-center justify-center space-x-2">
                      <div>
                        <p className="font-medium text-sm text-[#333]">
                          {user.name}
                        </p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </td>
                    <td className="py-3 px-6 space-x-6">
                      <button className="bg-[#2563EB] text-white px-10 py-2 rounded-3xl text-sm font-semibold">
                        View
                      </button>
                      <button className="bg-[#2563EB] text-white px-6 py-2 rounded-3xl text-sm font-semibold">
                        Mark as Closed
                      </button>
                      <button className="bg-[#2563EB] text-white px-6 py-2 rounded-3xl text-sm font-semibold">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>
    </AdminDashboardLayout>
  );
};

export default AdminSupportPage;

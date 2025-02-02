import AdminDashboardLayout from "@/components/admin/layout";
import AdminDashboardSearchBox from "@/components/admin/search";
import BriefcaseIcon from "@/components/icons/briefcase";
import Image from "next/image";

const AdminDashboardPage = () => {
  return (
    <AdminDashboardLayout>
      <section className="grid grid-cols-3 gap-8 w-fit">
        {[
          { title: "Active Users", icon: BriefcaseIcon, value: "12" },
          { title: "Active Users", icon: BriefcaseIcon, value: "12" },
          { title: "Active Users", icon: BriefcaseIcon, value: "12" },
          { title: "Active Users", icon: BriefcaseIcon, value: "12" },
          { title: "Active Users", icon: BriefcaseIcon, value: "12" },
          { title: "Active Users", icon: BriefcaseIcon, value: "12" },
        ].map(() => (
          <div
            className="py-6 px-5 w-full min-w-72 space-y-4 rounded-xl"
            style={{
              boxShadow:
                "0px 4px 6px 0px #2121210A, 0px 4px 50px 0px #21212114",
            }}
          >
            <div className="flex items-end gap-3">
              <BriefcaseIcon />
              <span className="text-sm">Active Users</span>
            </div>

            <p className="text-2xl font-bold">12</p>
          </div>
        ))}
      </section>

      <section className="mt-10">
        <div className="flex justify-between items-center my-6">
          <h3 className="text-xl font-semibold">User Management</h3>
          <AdminDashboardSearchBox placeholder="Search for any user" />
        </div>
        <div className="overflow-hidden rounded-xl">
          <table className="w-full bg-white border-separate border-spacing-0">
            <thead>
              <tr className="bg-[#D6D6D6] text-[#898989] text-sm font-bold">
                <th className="py-3 px-6 text-left rounded-tl-xl">User</th>
                <th className="py-3 px-6 text-center">Status</th>
                <th className="py-3 px-6 text-center">Email</th>
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
                  status: true ? "Accepted" : "Pending",
                  lastLogin: ` mins ago`,
                }))
                .map((user) => (
                  <tr key={user.id} className="hover:bg-gray-100">
                    <td className="py-3 px-6 text-left flex items-center space-x-2">
                      <Image
                        src="https://ui-avatars.com/api/?background=random&rounded=true"
                        alt="user"
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div>
                        <p className="font-medium text-sm text-[#333]">
                          {user.name}
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
                    <td className="py-3 px-6 text-center">{user.email}</td>
                    <td className="py-3 px-6 space-x-6">
                      <button className="bg-[#2563EB] text-white px-10 py-2 rounded-3xl text-sm font-semibold">
                        Edit
                      </button>
                      <button className="bg-[#2563EB] text-white px-6 py-2 rounded-3xl text-sm font-semibold">
                        Suspend
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

export default AdminDashboardPage;

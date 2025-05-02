import AdminDashboardLayout from "@/components/admin/layout";
import AdminDashboardSearchBox from "@/components/admin/search";
import BriefcaseIcon from "@/components/icons/briefcase";
import { outfit } from "@/constants/app";
import Image from "next/image";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAdminStats,
  getAdminUsers,
  deleteAdminUser,
  updateAdminUser,
  type AdminUser,
  type UpdateAdminUserRequest,
} from "@/actions/admin";
import { useUserStore } from "@/hooks/use-user-store";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

const initialEditState = {
  name: "",
  last_name: "",
  phone: "",
  user_class: "",
  country_code: "",
  calendly_link: "",
  google_calender_link: "",
  username: "",
  location: "",
};

const AdminDashboardPage = () => {
  const { userData } = useUserStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [userToDelete, setUserToDelete] = useState<AdminUser | null>(null);
  const [userToEdit, setUserToEdit] = useState<AdminUser | null>(null);
  const [editForm, setEditForm] = useState(initialEditState);
  const queryClient = useQueryClient();
  const [userToSuspend, setUserToSuspend] = useState<AdminUser | null>(null);

  const { data: stats, isLoading: isLoadingStats } = useQuery({
    queryKey: ["adminStats"],
    queryFn: () => {
      if (!userData?.token) throw new Error("No token available");
      return getAdminStats(userData.token);
    },
    enabled: !!userData?.token,
  });

  const { data: users, isLoading: isLoadingUsers } = useQuery({
    queryKey: ["adminUsers", searchTerm],
    queryFn: () => {
      if (!userData?.token) throw new Error("No token available");
      return getAdminUsers(userData.token, searchTerm);
    },
    enabled: !!userData?.token,
  });

  useEffect(() => {
    if (userToEdit) {
      setEditForm({
        name: userToEdit.name || "",
        last_name: userToEdit.last_name || "",
        phone: userToEdit.phone || "",
        user_class: userToEdit.role || "",
        country_code: userToEdit.country_code || "",
        calendly_link: userToEdit.calendly_link || "",
        google_calender_link: userToEdit.google_calender_link || "",
        username: userToEdit.username || "",
        location: userToEdit.location || "",
      });
    } else {
      setEditForm(initialEditState);
    }
  }, [userToEdit]);

  const deleteMutation = useMutation({
    mutationFn: (userId: string) => {
      if (!userData?.token) throw new Error("No token available");
      return deleteAdminUser(userData.token, userId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminUsers"] });
      setUserToDelete(null);
      toast.success("User deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete user");
    },
  });

  const editMutation = useMutation({
    mutationFn: ({
      userId,
      data,
    }: {
      userId: string;
      data: UpdateAdminUserRequest;
    }) => {
      if (!userData?.token) throw new Error("No token available");
      return updateAdminUser(userData.token, userId, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminUsers"] });
      setUserToEdit(null);
      toast.success("User updated successfully");
    },
    onError: () => {
      toast.error("Failed to update user");
    },
  });

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userToEdit) {
      const filteredData = Object.fromEntries(
        Object.entries(editForm).filter(([_, v]) => v !== "")
      );
      editMutation.mutate({ userId: userToEdit.id, data: filteredData });
    }
  };

  const handleSuspend = (user: AdminUser) => {
    setUserToSuspend(user);
  };

  const statBoxes = [
    { title: "Total Users", value: stats?.users ?? 0 },
    { title: "Total Documents", value: stats?.docs ?? 0 },
    { title: "Open Support", value: stats?.open_support ?? 0 },
    { title: "Open Feedback", value: stats?.open_feedback ?? 0 },
    { title: "Churn Rate", value: `${stats?.churn ?? 0}%` },
    { title: "Revenue", value: `$${stats?.revenue ?? 0}` },
  ];

  const formatLastLogin = (date: string | null) => {
    if (!date) return "Never";
    const loginDate = new Date(date);
    const now = new Date();
    const diffMinutes = Math.floor(
      (now.getTime() - loginDate.getTime()) / 60000
    );
    return `${diffMinutes} mins ago`;
  };

  return (
    <AdminDashboardLayout>
      {/* Delete Confirmation Dialog */}
      <Dialog open={!!userToDelete} onOpenChange={() => setUserToDelete(null)}>
        <DialogContent className="bg-white text-[#333] shadow-xl border border-gray-200">
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {userToDelete?.name}? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              className="bg-white text-[#2563EB] border border-[#2563EB] hover:bg-[#2563EB] hover:text-white"
              onClick={() => setUserToDelete(null)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() =>
                userToDelete && deleteMutation.mutate(userToDelete.id)
              }
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={!!userToEdit} onOpenChange={() => setUserToEdit(null)}>
        <DialogContent className="bg-white text-[#333] shadow-xl border border-gray-200 max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>Update user details below.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditSubmit} className="space-y-4 mt-2">
            <div className="grid grid-cols-2 gap-4">
              <input
                name="name"
                value={editForm.name}
                onChange={handleEditChange}
                placeholder="First Name"
                className="border rounded px-3 py-2"
              />
              <input
                name="last_name"
                value={editForm.last_name}
                onChange={handleEditChange}
                placeholder="Last Name"
                className="border rounded px-3 py-2"
              />
              <input
                name="phone"
                value={editForm.phone}
                onChange={handleEditChange}
                placeholder="Phone"
                className="border rounded px-3 py-2"
              />
              <input
                name="user_class"
                value={editForm.user_class}
                onChange={handleEditChange}
                placeholder="User Class (recruiter/job_seeker)"
                className="border rounded px-3 py-2"
              />
              <input
                name="country_code"
                value={editForm.country_code}
                onChange={handleEditChange}
                placeholder="Country Code"
                className="border rounded px-3 py-2"
              />
              <input
                name="calendly_link"
                value={editForm.calendly_link}
                onChange={handleEditChange}
                placeholder="Calendly Link"
                className="border rounded px-3 py-2"
              />
              <input
                name="google_calender_link"
                value={editForm.google_calender_link}
                onChange={handleEditChange}
                placeholder="Google Calendar Link"
                className="border rounded px-3 py-2"
              />
              <input
                name="username"
                value={editForm.username}
                onChange={handleEditChange}
                placeholder="Username"
                className="border rounded px-3 py-2"
              />
              <input
                name="location"
                value={editForm.location}
                onChange={handleEditChange}
                placeholder="Location"
                className="border rounded px-3 py-2"
              />
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                className="bg-white text-[#2563EB] border border-[#2563EB] hover:bg-[#2563EB] hover:text-white"
                onClick={() => setUserToEdit(null)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={editMutation.isPending}>
                {editMutation.isPending ? "Saving..." : "Save"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Suspend Confirmation Dialog */}
      <Dialog
        open={!!userToSuspend}
        onOpenChange={() => setUserToSuspend(null)}
      >
        <DialogContent className="bg-white text-[#333] shadow-xl border border-gray-200">
          <DialogHeader>
            <DialogTitle>Suspend User</DialogTitle>
            <DialogDescription>
              Are you sure you want to suspend {userToSuspend?.name}? This
              action can be undone by editing the user.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              className="bg-white text-[#2563EB] border border-[#2563EB] hover:bg-[#2563EB] hover:text-white"
              onClick={() => setUserToSuspend(null)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (userToSuspend) {
                  editMutation.mutate({
                    userId: userToSuspend.id,
                    data: { suspend: true },
                  });
                  setUserToSuspend(null);
                }
              }}
              disabled={editMutation.isPending}
            >
              {editMutation.isPending ? "Suspending..." : "Suspend"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <section className={`${outfit.className} grid grid-cols-3 gap-8 w-fit`}>
        {statBoxes.map((stat, index) => (
          <div
            key={index}
            className="py-6 px-5 w-full min-w-72 space-y-4 rounded-xl"
            style={{
              boxShadow:
                "0px 4px 6px 0px #2121210A, 0px 4px 50px 0px #21212114",
            }}
          >
            <div className="flex items-end gap-3">
              <BriefcaseIcon />
              <span className="text-sm">{stat.title}</span>
            </div>

            <p className="text-2xl font-bold">
              {isLoadingStats ? "Loading..." : stat.value}
            </p>
          </div>
        ))}
      </section>

      <section className={`${outfit.className} mt-10`}>
        <div className="flex justify-between items-center my-6">
          <h3 className="text-xl font-semibold">User Management</h3>
          <AdminDashboardSearchBox
            placeholder="Search for any user"
            onSearch={(term) => setSearchTerm(term)}
          />
        </div>
        <div className="overflow-hidden rounded-xl">
          <table className="w-full bg-white border-separate border-spacing-0">
            <thead>
              <tr className="bg-[#D6D6D6] text-[#898989] text-sm font-bold">
                <th className="py-3 px-6 text-left rounded-tl-xl">User</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left rounded-tr-xl">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoadingUsers ? (
                <tr>
                  <td colSpan={4} className="py-4 text-center">
                    Loading users...
                  </td>
                </tr>
              ) : (
                users?.map((user) => (
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
                          Last Login: {formatLastLogin(user.last_login)}
                        </p>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-left">
                      <span
                        className={`p-1.5 text-xs rounded-md ${
                          user.is_verified
                            ? "text-[#377DFF] bg-[#377DFF]/20"
                            : "text-[#FF3737] bg-[#FF3737]/20"
                        }`}
                      >
                        {user.is_verified ? "Verified" : "Unverified"}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-left">{user.email}</td>
                    <td className="py-3 px-6 space-x-6">
                      <button
                        className="bg-[#2563EB] text-white px-10 py-2 rounded-3xl text-sm font-semibold"
                        onClick={() => setUserToEdit(user)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-[#2563EB] text-white px-6 py-2 rounded-3xl text-sm font-semibold"
                        onClick={() => handleSuspend(user)}
                        disabled={editMutation.isPending}
                      >
                        Suspend
                      </button>
                      <button
                        className="bg-[#FF3737] text-white px-6 py-2 rounded-3xl text-sm font-semibold"
                        onClick={() => setUserToDelete(user)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </AdminDashboardLayout>
  );
};

export default AdminDashboardPage;

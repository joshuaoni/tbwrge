import classNames from "classnames";
import { useState } from "react";
import { useRouter } from "next/router";

import AdminDashboardLayout from "@/components/admin/layout";
import AdminDashboardSearchBox from "@/components/admin/search";
import BriefcaseIcon from "@/components/icons/briefcase";
import { useUserStore } from "@/hooks/use-user-store";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import {
  getEnterpriseRequests,
  type EnterpriseRequest,
  updateEnterpriseRequestStatus,
  deleteEnterpriseRequest,
} from "@/actions/enterprise";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { outfit } from "@/constants/app";

const AdminEnterprisePage = () => {
  const [tab, setTab] = useState("Pending Requests");
  const [searchTerm, setSearchTerm] = useState("");
  const { userData } = useUserStore();
  const [requestToContact, setRequestToContact] =
    useState<EnterpriseRequest | null>(null);
  const [requestToClose, setRequestToClose] =
    useState<EnterpriseRequest | null>(null);
  const [requestToDelete, setRequestToDelete] =
    useState<EnterpriseRequest | null>(null);
  const [requestToView, setRequestToView] = useState<EnterpriseRequest | null>(
    null
  );
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data: requests, isLoading } = useQuery({
    queryKey: ["enterpriseRequests", searchTerm],
    queryFn: () => getEnterpriseRequests(userData?.token || "", searchTerm),
    enabled: !!userData?.token,
  });

  const filteredRequests =
    requests?.filter((request) => {
      if (tab === "Pending Requests") return request.status === "pending";
      if (tab === "Contacted") return request.status === "contacted";
      if (tab === "Closed") return request.status === "closed";
      return true;
    }) || [];

  const contactMutation = useMutation({
    mutationFn: (requestId: string) => {
      if (!userData?.token) throw new Error("No token available");
      return updateEnterpriseRequestStatus(
        userData.token,
        requestId,
        "contacted"
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["enterpriseRequests"] });
      setRequestToContact(null);
      toast.success("Request marked as contacted");
    },
    onError: () => {
      toast.error("Failed to update request");
    },
  });

  const closeMutation = useMutation({
    mutationFn: (requestId: string) => {
      if (!userData?.token) throw new Error("No token available");
      return updateEnterpriseRequestStatus(userData.token, requestId, "closed");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["enterpriseRequests"] });
      setRequestToClose(null);
      toast.success("Request closed successfully");
    },
    onError: () => {
      toast.error("Failed to close request");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (requestId: string) => {
      if (!userData?.token) throw new Error("No token available");
      return deleteEnterpriseRequest(userData.token, requestId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["enterpriseRequests"] });
      setRequestToDelete(null);
      toast.success("Request deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete request");
    },
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "text-[#FF9500] bg-[#FF9500]/20";
      case "contacted":
        return "text-[#377DFF] bg-[#377DFF]/20";
      case "closed":
        return "text-[#22C55E] bg-[#22C55E]/20";
      default:
        return "text-gray-500 bg-gray-100";
    }
  };

  return (
    <AdminDashboardLayout>
      <section
        className={`${outfit.className} w-full flex items-start justify-between`}
      >
        <AdminDashboardSearchBox
          placeholder="Search enterprise requests"
          onSearch={setSearchTerm}
        />
        <div className="flex items-center gap-10">
          {[
            {
              title: "Pending Requests",
              value:
                requests?.filter((r) => r.status === "pending").length ?? 0,
            },
            {
              title: "Contacted",
              value:
                requests?.filter((r) => r.status === "contacted").length ?? 0,
            },
            {
              title: "Closed",
              value: requests?.filter((r) => r.status === "closed").length ?? 0,
            },
          ].map((item, i) => (
            <div
              key={i}
              className="py-6 px-5 border w-full min-w-72 space-y-4 rounded-xl"
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

      <section className={`${outfit.className} mt-10 space-y-4`}>
        <div className="flex items-center gap-6">
          {["Pending Requests", "Contacted", "Closed"].map((item, i) => (
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
                <th
                  className="py-3 px-6 text-left rounded-tl-xl rounded-bl-xl"
                  style={{ width: "20%" }}
                >
                  Company & Contact
                </th>
                <th className="py-3 px-6 text-left" style={{ width: "15%" }}>
                  Status
                </th>
                <th className="py-3 px-6 text-left" style={{ width: "25%" }}>
                  Contact Info
                </th>
                <th className="py-3 px-6 text-left" style={{ width: "15%" }}>
                  Submitted
                </th>
                <th
                  className="py-3 px-6 text-left rounded-tr-xl rounded-br-xl"
                  style={{ width: "25%" }}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="py-4 text-center">
                    Loading requests...
                  </td>
                </tr>
              ) : filteredRequests.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-4 text-center">
                    No requests found.
                  </td>
                </tr>
              ) : (
                filteredRequests.map((request) => (
                  <tr key={request.id} className="hover:bg-gray-100 w-full">
                    <td
                      className="py-3 px-6 text-left"
                      style={{ width: "20%" }}
                    >
                      <div>
                        <p className="font-medium text-sm text-[#333]">
                          {request.companyName}
                        </p>
                        <p className="text-xs text-gray-500">
                          {request.fullName}
                        </p>
                      </div>
                    </td>
                    <td
                      className="py-3 px-6 text-left"
                      style={{ width: "15%" }}
                    >
                      <span
                        className={`p-1.5 text-xs rounded-md capitalize ${getStatusColor(
                          request.status
                        )}`}
                      >
                        {request.status}
                      </span>
                    </td>
                    <td
                      className="py-3 px-6 text-left"
                      style={{ width: "25%" }}
                    >
                      <div>
                        <p className="font-medium text-sm text-[#333]">
                          {request.workEmail}
                        </p>
                        <p className="text-xs text-gray-500">
                          {request.phoneNumber}
                        </p>
                      </div>
                    </td>
                    <td
                      className="py-3 px-6 text-left"
                      style={{ width: "15%" }}
                    >
                      <div>
                        <p className="text-sm text-[#333]">
                          {new Date(request.created_at).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(request.created_at).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </td>
                    <td className="py-3 px-6" style={{ width: "25%" }}>
                      <div className="flex flex-wrap gap-2">
                        <button
                          className="bg-[#2563EB] text-white px-3 py-1.5 rounded-lg text-xs font-medium min-w-[60px]"
                          onClick={() => setRequestToView(request)}
                        >
                          View
                        </button>
                        {request.status === "pending" && (
                          <button
                            className="bg-[#2563EB] text-white px-3 py-1.5 rounded-lg text-xs font-medium"
                            onClick={() => setRequestToContact(request)}
                          >
                            Contact
                          </button>
                        )}
                        {request.status !== "closed" && (
                          <button
                            className="bg-[#2563EB] text-white px-3 py-1.5 rounded-lg text-xs font-medium min-w-[50px]"
                            onClick={() => setRequestToClose(request)}
                          >
                            Close
                          </button>
                        )}
                        <button
                          className="bg-[#2563EB] text-white px-3 py-1.5 rounded-lg text-xs font-medium min-w-[55px]"
                          onClick={() => setRequestToDelete(request)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Contact Request Confirmation Dialog */}
      <Dialog
        open={!!requestToContact}
        onOpenChange={() => setRequestToContact(null)}
      >
        <DialogContent className="bg-white text-[#333] shadow-xl border border-gray-200">
          <DialogHeader>
            <DialogTitle>Mark as Contacted</DialogTitle>
            <DialogDescription>
              Are you sure you want to mark this request as contacted?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              className="bg-white text-[#2563EB] border border-[#2563EB] hover:bg-[#2563EB] hover:text-white"
              onClick={() => setRequestToContact(null)}
            >
              Cancel
            </Button>
            <Button
              className="bg-[#FF9500] hover:bg-[#FF9500]/90 text-white"
              onClick={() =>
                requestToContact && contactMutation.mutate(requestToContact.id)
              }
              disabled={contactMutation.isPending}
            >
              {contactMutation.isPending ? "Updating..." : "Mark Contacted"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Close Request Confirmation Dialog */}
      <Dialog
        open={!!requestToClose}
        onOpenChange={() => setRequestToClose(null)}
      >
        <DialogContent className="bg-white text-[#333] shadow-xl border border-gray-200">
          <DialogHeader>
            <DialogTitle>Close Request</DialogTitle>
            <DialogDescription>
              Are you sure you want to mark this request as closed?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              className="bg-white text-[#2563EB] border border-[#2563EB] hover:bg-[#2563EB] hover:text-white"
              onClick={() => setRequestToClose(null)}
            >
              Cancel
            </Button>
            <Button
              className="bg-[#22C55E] hover:bg-[#22C55E]/90 text-white"
              onClick={() =>
                requestToClose && closeMutation.mutate(requestToClose.id)
              }
              disabled={closeMutation.isPending}
            >
              {closeMutation.isPending ? "Closing..." : "Close"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Request Confirmation Dialog */}
      <Dialog
        open={!!requestToDelete}
        onOpenChange={() => setRequestToDelete(null)}
      >
        <DialogContent className="bg-white text-[#333] shadow-xl border border-gray-200">
          <DialogHeader>
            <DialogTitle>Delete Request</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this enterprise request? This
              action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              className="bg-white text-[#2563EB] border border-[#2563EB] hover:bg-[#2563EB] hover:text-white"
              onClick={() => setRequestToDelete(null)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() =>
                requestToDelete && deleteMutation.mutate(requestToDelete.id)
              }
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Request Dialog */}
      <Dialog
        open={!!requestToView}
        onOpenChange={() => setRequestToView(null)}
      >
        <DialogContent
          className="bg-white text-[#222] rounded-2xl max-w-lg w-full px-8 py-4 flex flex-col items-center max-h-[95vh] overflow-y-auto shadow-xl"
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            margin: 0,
          }}
        >
          <div className="w-full flex justify-between items-center mb-8">
            <h2 className="font-bold text-xl">Enterprise Request Details</h2>
            <button
              className="text-[#16A34A] font-medium text-sm"
              onClick={() => setRequestToView(null)}
            >
              Back
            </button>
          </div>
          {requestToView && (
            <div className="w-full flex flex-col gap-6 p-4">
              <div>
                <div className="text-xs text-[#64748B] font-semibold mb-1">
                  Contact Person
                </div>
                <div className="font-bold text-base">
                  {requestToView.fullName}
                </div>
              </div>
              <div>
                <div className="text-xs text-[#64748B] font-semibold mb-1">
                  Company
                </div>
                <div className="font-bold text-base">
                  {requestToView.companyName}
                </div>
              </div>
              <div>
                <div className="text-xs text-[#64748B] font-semibold mb-1">
                  Work Email
                </div>
                <div className="font-bold text-base">
                  {requestToView.workEmail}
                </div>
              </div>
              <div>
                <div className="text-xs text-[#64748B] font-semibold mb-1">
                  Phone Number
                </div>
                <div className="font-bold text-base">
                  {requestToView.phoneNumber}
                </div>
              </div>
              <div>
                <div className="text-xs text-[#64748B] font-semibold mb-1">
                  Status
                </div>
                <div
                  className={`inline-block px-2 py-1 text-sm rounded-md capitalize ${getStatusColor(
                    requestToView.status
                  )}`}
                >
                  {requestToView.status}
                </div>
              </div>
              <div>
                <div className="text-xs text-[#64748B] font-semibold mb-1">
                  Submitted
                </div>
                <div className="font-bold text-base">
                  {new Date(requestToView.created_at).toLocaleString([], {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
              <div>
                <div className="text-xs text-[#64748B] font-semibold mb-1">
                  Hiring Needs
                </div>
                <div className="text-sm text-[#222] whitespace-pre-line">
                  {requestToView.hiringNeeds}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminDashboardLayout>
  );
};

export default AdminEnterprisePage;

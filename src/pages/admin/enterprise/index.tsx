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
  type EnterpriseRequestResponse as EnterpriseRequest,
  updateEnterpriseRequest,
  type UpdateEnterpriseRequestPayload,
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
  const [tab, setTab] = useState("All Requests");
  const [searchTerm, setSearchTerm] = useState("");
  const { userData } = useUserStore();
  const [requestToContact, setRequestToContact] =
    useState<EnterpriseRequest | null>(null);
  const [requestToClose, setRequestToClose] =
    useState<EnterpriseRequest | null>(null);

  const [requestToView, setRequestToView] = useState<EnterpriseRequest | null>(
    null
  );
  const queryClient = useQueryClient();
  const router = useRouter();

  // Build query parameters based on current tab
  const getQueryParams = () => {
    const baseQuery: any = { text: searchTerm };

    switch (tab) {
      case "All Requests":
        return baseQuery;
      case "Open Requests":
        return { ...baseQuery, is_open: true };
      case "Closed Requests":
        return { ...baseQuery, is_open: false };
      case "Contacted":
        return { ...baseQuery, contacted: true };
      case "Not Contacted":
        return { ...baseQuery, contacted: false };
      default:
        return baseQuery;
    }
  };

  const { data: requests, isLoading } = useQuery({
    queryKey: ["enterpriseRequests", tab, searchTerm],
    queryFn: () =>
      getEnterpriseRequests(userData?.token || "", getQueryParams()),
    enabled: !!userData?.token,
  });

  console.log("Enterprise requests data:", requests); // Debug log

  const contactMutation = useMutation({
    mutationFn: (request: EnterpriseRequest) => {
      if (!userData?.token) throw new Error("No token available");

      const payload: UpdateEnterpriseRequestPayload = {
        name: request.name,
        company: request.company,
        email: request.email,
        phone: request.phone,
        details: request.details,
        is_open: true,
        contacted: true,
      };

      return updateEnterpriseRequest(userData.token, request.id, payload);
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
    mutationFn: (request: EnterpriseRequest) => {
      if (!userData?.token) throw new Error("No token available");

      const payload: UpdateEnterpriseRequestPayload = {
        name: request.name,
        company: request.company,
        email: request.email,
        phone: request.phone,
        details: request.details,
        is_open: false,
        contacted: true,
      };

      return updateEnterpriseRequest(userData.token, request.id, payload);
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

  const getStatusColor = (isOpen: boolean) => {
    return isOpen
      ? "text-[#22C55E] bg-[#22C55E]/20"
      : "text-[#EF4444] bg-[#EF4444]/20";
  };

  const getStatusText = (isOpen: boolean) => {
    return isOpen ? "Open" : "Closed";
  };

  return (
    <AdminDashboardLayout>
      <section
        className={`${outfit.className} w-full flex items-start justify-between`}
      >
        <div className="flex items-center gap-8">
          {[
            {
              title: "All Requests",
              value: requests?.length ?? 0,
            },
            {
              title: "Open Requests",
              value: requests?.filter((r) => r.is_open).length ?? 0,
            },
            {
              title: "Closed Requests",
              value: requests?.filter((r) => !r.is_open).length ?? 0,
            },
            {
              title: "Contacted",
              value: requests?.filter((r) => r.contacted).length ?? 0,
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
          {[
            "All Requests",
            "Open Requests",
            "Closed Requests",
            "Contacted",
            "Not Contacted",
          ].map((item, i) => (
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
              ) : requests?.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-4 text-center">
                    No requests found.
                  </td>
                </tr>
              ) : (
                requests?.map((request) => (
                  <tr key={request.id} className="hover:bg-gray-100 w-full">
                    <td
                      className="py-3 px-6 text-left"
                      style={{ width: "20%" }}
                    >
                      <div>
                        <p className="font-medium text-sm text-[#333]">
                          {request.company}
                        </p>
                        <p className="text-xs text-gray-500">{request.name}</p>
                      </div>
                    </td>
                    <td
                      className="py-3 px-6 text-left"
                      style={{ width: "15%" }}
                    >
                      <span
                        className={`p-1.5 text-xs rounded-md capitalize ${getStatusColor(
                          request.is_open
                        )}`}
                      >
                        {getStatusText(request.is_open)}
                      </span>
                    </td>
                    <td
                      className="py-3 px-6 text-left"
                      style={{ width: "25%" }}
                    >
                      <div>
                        <p className="font-medium text-sm text-[#333]">
                          {request.email}
                        </p>
                        <p className="text-xs text-gray-500">{request.phone}</p>
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

                        {request.is_open && (
                          <button
                            className="bg-[#2563EB] text-white px-3 py-1.5 rounded-lg text-xs font-medium min-w-[50px]"
                            onClick={() => setRequestToClose(request)}
                          >
                            Close
                          </button>
                        )}
                        {!request.contacted && (
                          <button
                            className="bg-[#2563EB] text-white px-3 py-1.5 rounded-lg text-xs font-medium min-w-[55px]"
                            onClick={() => setRequestToContact(request)}
                          >
                            Mark as Contacted
                          </button>
                        )}
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
                requestToContact && contactMutation.mutate(requestToContact)
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
                requestToClose && closeMutation.mutate(requestToClose)
              }
              disabled={closeMutation.isPending}
            >
              {closeMutation.isPending ? "Closing..." : "Close"}
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
                <div className="font-bold text-base">{requestToView.name}</div>
              </div>
              <div>
                <div className="text-xs text-[#64748B] font-semibold mb-1">
                  Company
                </div>
                <div className="font-bold text-base">
                  {requestToView.company}
                </div>
              </div>
              <div>
                <div className="text-xs text-[#64748B] font-semibold mb-1">
                  Work Email
                </div>
                <div className="font-bold text-base">{requestToView.email}</div>
              </div>
              <div>
                <div className="text-xs text-[#64748B] font-semibold mb-1">
                  Phone Number
                </div>
                <div className="font-bold text-base">{requestToView.phone}</div>
              </div>
              <div>
                <div className="text-xs text-[#64748B] font-semibold mb-1">
                  Status
                </div>
                <div
                  className={`inline-block px-2 py-1 text-sm rounded-md capitalize ${getStatusColor(
                    requestToView.is_open
                  )}`}
                >
                  {getStatusText(requestToView.is_open)}
                </div>
              </div>
              <div>
                <div className="text-xs text-[#64748B] font-semibold mb-1">
                  Contacted
                </div>
                <div className="font-bold text-base">
                  {requestToView.contacted ? "Yes" : "No"}
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
                  {requestToView.details}
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

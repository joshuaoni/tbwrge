import classNames from "classnames";
import { useState } from "react";
import { useRouter } from "next/router";

import AdminDashboardLayout from "@/components/admin/layout";
import AdminDashboardSearchBox from "@/components/admin/search";
import BriefcaseIcon from "@/components/icons/briefcase";
import { useUserStore } from "@/hooks/use-user-store";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import {
  getTickets,
  type Ticket,
  closeTicket,
  deleteTicket,
} from "@/actions/ticket";
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
import { manageChat } from "@/actions/chat";
import { outfit } from "@/constants/app";

const AdminFeedbackPage = () => {
  const [tab, setTab] = useState("Open Feedbacks");
  const [searchTerm, setSearchTerm] = useState("");
  const { userData } = useUserStore();
  const [ticketToClose, setTicketToClose] = useState<Ticket | null>(null);
  const [ticketToDelete, setTicketToDelete] = useState<Ticket | null>(null);
  const [ticketToView, setTicketToView] = useState<Ticket | null>(null);
  const queryClient = useQueryClient();
  const router = useRouter();
  const [isStartingChat, setIsStartingChat] = useState(false);

  const { data: tickets, isLoading } = useQuery({
    queryKey: ["feedbackTickets", searchTerm],
    queryFn: () => getTickets(userData?.token || "", searchTerm, "feedback"),
    enabled: !!userData?.token,
  });

  const filteredTickets =
    tickets?.filter((ticket) =>
      tab === "Open Feedbacks" ? ticket.open : !ticket.open
    ) || [];

  const closeMutation = useMutation({
    mutationFn: (ticketId: string) => {
      if (!userData?.token) throw new Error("No token available");
      return closeTicket(userData.token, ticketId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feedbackTickets"] });
      setTicketToClose(null);
      toast.success("Feedback closed successfully");
    },
    onError: () => {
      toast.error("Failed to close feedback");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (ticketId: string) => {
      if (!userData?.token) throw new Error("No token available");
      return deleteTicket(userData.token, ticketId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feedbackTickets"] });
      setTicketToDelete(null);
      toast.success("Feedback deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete feedback");
    },
  });

  return (
    <AdminDashboardLayout>
      <section
        className={`${outfit.className} w-full flex items-start justify-between`}
      >
        <AdminDashboardSearchBox
          placeholder="Search for any feedback"
          onSearch={setSearchTerm}
        />
        <div className="flex items-center gap-10">
          {[
            {
              title: "Open Feedbacks",
              value: tickets?.filter((t) => t.open).length ?? 0,
            },
            {
              title: "Closed Feedbacks",
              value: tickets?.filter((t) => !t.open).length ?? 0,
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
                <th
                  className="py-3 px-6 text-left rounded-tl-xl rounded-bl-xl"
                  style={{ width: "17.22%" }}
                >
                  Subject
                </th>
                <th className="py-3 px-6 text-left" style={{ width: "11.11%" }}>
                  Status
                </th>
                <th className="py-3 px-6 text-left" style={{ width: "11.11%" }}>
                  Name & Email
                </th>
                <th
                  className="py-3 px-6 text-left rounded-tr-xl rounded-br-xl"
                  style={{ width: "38.33%" }}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="py-4 text-center">
                    Loading feedbacks...
                  </td>
                </tr>
              ) : filteredTickets.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-4 text-center">
                    No feedbacks found.
                  </td>
                </tr>
              ) : (
                filteredTickets.map((ticket) => (
                  <tr key={ticket.id} className="hover:bg-gray-100 w-full">
                    <td
                      className="py-3 px-6 text-left"
                      style={{ width: "17.22%" }}
                    >
                      <div>
                        <p className="font-medium text-sm text-[#333]">
                          {ticket.subject}
                        </p>
                        <p className="text-xs text-gray-500">
                          {ticket.category}
                        </p>
                      </div>
                    </td>
                    <td
                      className="py-3 px-6 text-left"
                      style={{ width: "11.11%" }}
                    >
                      <span
                        className={`p-1.5 text-xs rounded-md ${
                          ticket.open
                            ? "text-[#377DFF] bg-[#377DFF]/20"
                            : "text-[#FF3737] bg-[#FF3737]/20"
                        }`}
                      >
                        {ticket.open ? "Open" : "Closed"}
                      </span>
                    </td>
                    <td
                      className="py-3 px-6 text-left"
                      style={{ width: "11.11%" }}
                    >
                      <div>
                        <p className="font-medium text-sm text-[#333]">
                          {ticket.user?.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {ticket.user?.email}
                        </p>
                      </div>
                    </td>
                    <td
                      className="py-3 px-6 space-x-6"
                      style={{ width: "38.33%" }}
                    >
                      <button
                        className="bg-[#2563EB] text-white px-10 py-2 rounded-3xl text-sm font-semibold"
                        onClick={() => setTicketToView(ticket)}
                      >
                        View
                      </button>
                      <button
                        className="bg-[#2563EB] text-white px-6 py-2 rounded-3xl text-sm font-semibold"
                        onClick={() => setTicketToClose(ticket)}
                      >
                        Mark as Closed
                      </button>
                      <button
                        className="bg-[#2563EB] text-white px-6 py-2 rounded-3xl text-sm font-semibold"
                        onClick={() => setTicketToDelete(ticket)}
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

      {/* Close Feedback Confirmation Dialog */}
      <Dialog
        open={!!ticketToClose}
        onOpenChange={() => setTicketToClose(null)}
      >
        <DialogContent className="bg-white text-[#333] shadow-xl border border-gray-200">
          <DialogHeader>
            <DialogTitle>Close Feedback</DialogTitle>
            <DialogDescription>
              Are you sure you want to mark this feedback as closed?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              className="bg-white text-[#2563EB] border border-[#2563EB] hover:bg-[#2563EB] hover:text-white"
              onClick={() => setTicketToClose(null)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() =>
                ticketToClose && closeMutation.mutate(ticketToClose.id)
              }
              disabled={closeMutation.isPending}
            >
              {closeMutation.isPending ? "Closing..." : "Close"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Feedback Confirmation Dialog */}
      <Dialog
        open={!!ticketToDelete}
        onOpenChange={() => setTicketToDelete(null)}
      >
        <DialogContent className="bg-white text-[#333] shadow-xl border border-gray-200">
          <DialogHeader>
            <DialogTitle>Delete Feedback</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this feedback? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              className="bg-white text-[#2563EB] border border-[#2563EB] hover:bg-[#2563EB] hover:text-white"
              onClick={() => setTicketToDelete(null)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() =>
                ticketToDelete && deleteMutation.mutate(ticketToDelete.id)
              }
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Feedback Dialog */}
      <Dialog open={!!ticketToView} onOpenChange={() => setTicketToView(null)}>
        <DialogContent
          className="bg-white text-[#222] rounded-2xl max-w-sm w-full px-8 py-4 flex flex-col items-center max-h-[95vh] overflow-y-auto shadow-xl"
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            margin: 0,
          }}
        >
          <div className="w-full flex justify-between items-center mb-8">
            <h2 className="font-bold text-xl">Feedback Details</h2>
            <button
              className="text-[#16A34A] font-medium text-sm"
              onClick={() => setTicketToView(null)}
            >
              Back
            </button>
          </div>
          {ticketToView && (
            <div className="w-full flex flex-col gap-6 p-4">
              <div>
                <div className="text-xs text-[#64748B] font-semibold mb-1">
                  User
                </div>
                <div className="font-bold text-base">
                  {ticketToView.user?.name}
                </div>
              </div>
              <div>
                <div className="text-xs text-[#64748B] font-semibold mb-1">
                  Submitted
                </div>
                <div className="font-bold text-base">
                  {new Date(ticketToView.created_at).toLocaleString([], {
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
                  Subject
                </div>
                <div className="font-bold text-base">
                  {ticketToView.subject}
                </div>
              </div>
              <div>
                <div className="text-xs text-[#64748B] font-semibold mb-1">
                  Ticket Issue
                </div>
                <div className="text-sm text-[#222] whitespace-pre-line">
                  {ticketToView.details}
                </div>
              </div>
              <div className="flex justify-start mt-2">
                {ticketToView.image ? (
                  <img
                    src={ticketToView.image}
                    alt="Feedback"
                    className="w-20 h-20 rounded-lg object-cover bg-gray-100"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-lg bg-gray-100 flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          )}
          <div className="w-full flex justify-start pl-4">
            <button
              className="mt-10 px-8 py-2 bg-primary text-white rounded-md font-semibold text-base"
              style={{ minWidth: "140px" }}
              disabled={isStartingChat}
              onClick={async () => {
                if (!ticketToView || !userData?.token) return;
                setIsStartingChat(true);
                try {
                  await manageChat(userData.token, ticketToView.id, "open");
                  router.push("/admin/chat");
                } catch (e) {
                  toast.error("Failed to start chat");
                } finally {
                  setIsStartingChat(false);
                }
              }}
            >
              {isStartingChat ? "Starting..." : "Start Chat"}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </AdminDashboardLayout>
  );
};

export default AdminFeedbackPage;

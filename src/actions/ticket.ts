import { API_CONFIG } from "@/constants/api_config";
import axios from "axios";

export interface TicketUser {
  id: string;
  reference: string | null;
  created_at: string;
  updated_at: string;
  name: string;
  last_name: string | null;
  profile_picture: string | null;
  email: string;
  role: string | null;
  is_verified: boolean;
  channel: string | null;
  country_code: string | null;
  phone: string | null;
  calendly_link: string | null;
  google_calender_link: string | null;
  username: string | null;
  location: string | null;
  last_login: string | null;
  joined_talent_pool: boolean;
}

export interface Ticket {
  id: string;
  reference: string | null;
  created_at: string;
  updated_at: string;
  user: TicketUser;
  type: string;
  category: string;
  subject: string;
  details: string;
  image: string;
  preferred_contact: string;
  open: boolean;
}

export const getTickets = async (
  token: string,
  search_term: string = "",
  type: string = "support"
): Promise<Ticket[]> => {
  const response = await axios({
    method: "POST",
    url: API_CONFIG.GET_TICKETS,
    headers: { Authorization: `Bearer ${token}` },
    data: { search_term, type },
  });
  return response.data;
};

export const closeTicket = async (
  token: string,
  ticketId: string
): Promise<void> => {
  await axios({
    method: "PUT",
    url: API_CONFIG.CLOSE_TICKET(ticketId),
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteTicket = async (
  token: string,
  ticketId: string
): Promise<void> => {
  await axios({
    method: "DELETE",
    url: API_CONFIG.DELETE_TICKET(ticketId),
    headers: { Authorization: `Bearer ${token}` },
  });
};

export interface EnterpriseRequest {
  id: string;
  fullName: string;
  companyName: string;
  workEmail: string;
  phoneNumber: string;
  hiringNeeds: string;
  status: "pending" | "contacted" | "closed";
  created_at: string;
  updated_at?: string;
}

// Mock data for now - in real implementation this would call your API
const mockEnterpriseRequests: EnterpriseRequest[] = [
  {
    id: "1",
    fullName: "John Smith",
    companyName: "TechCorp Inc.",
    workEmail: "john.smith@techcorp.com",
    phoneNumber: "+1-555-0123",
    hiringNeeds:
      "We need to hire 50+ software engineers across multiple teams. Looking for a scalable solution for high-volume recruiting with advanced screening capabilities.",
    status: "pending",
    created_at: "2024-01-15T09:30:00Z",
  },
  {
    id: "2",
    fullName: "Sarah Johnson",
    companyName: "Global Solutions Ltd",
    workEmail: "s.johnson@globalsolutions.com",
    phoneNumber: "+1-555-0456",
    hiringNeeds:
      "Expanding our sales team globally. Need automated candidate screening and interview scheduling for 100+ positions annually.",
    status: "contacted",
    created_at: "2024-01-12T14:15:00Z",
    updated_at: "2024-01-13T10:00:00Z",
  },
  {
    id: "3",
    fullName: "Michael Chen",
    companyName: "StartupXYZ",
    workEmail: "mike@startupxyz.io",
    phoneNumber: "+1-555-0789",
    hiringNeeds:
      "Fast-growing startup needing to scale our engineering and product teams quickly. Want custom integrations with our existing HR tools.",
    status: "closed",
    created_at: "2024-01-10T16:45:00Z",
    updated_at: "2024-01-14T11:30:00Z",
  },
];

export const getEnterpriseRequests = async (
  token: string,
  searchTerm: string = ""
): Promise<EnterpriseRequest[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  let filtered = [...mockEnterpriseRequests];

  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    filtered = filtered.filter(
      (request) =>
        request.fullName.toLowerCase().includes(term) ||
        request.companyName.toLowerCase().includes(term) ||
        request.workEmail.toLowerCase().includes(term) ||
        request.hiringNeeds.toLowerCase().includes(term)
    );
  }

  return filtered.sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
};

export const updateEnterpriseRequestStatus = async (
  token: string,
  requestId: string,
  status: "pending" | "contacted" | "closed"
): Promise<void> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  const request = mockEnterpriseRequests.find((r) => r.id === requestId);
  if (request) {
    request.status = status;
    request.updated_at = new Date().toISOString();
  }
};

export const deleteEnterpriseRequest = async (
  token: string,
  requestId: string
): Promise<void> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  const index = mockEnterpriseRequests.findIndex((r) => r.id === requestId);
  if (index !== -1) {
    mockEnterpriseRequests.splice(index, 1);
  }
};

export const submitEnterpriseRequest = async (
  data: Omit<EnterpriseRequest, "id" | "status" | "created_at">
): Promise<void> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const newRequest: EnterpriseRequest = {
    ...data,
    id: (mockEnterpriseRequests.length + 1).toString(),
    status: "pending",
    created_at: new Date().toISOString(),
  };

  mockEnterpriseRequests.unshift(newRequest);
};

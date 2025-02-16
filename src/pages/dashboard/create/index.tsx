import DashboardWrapper from "@/components/dashboard-wrapper";
import { CreateJobProvider } from "@/providers/job-posting.context";
import { useSearchParams } from "next/navigation";

const JobPostingPage = () => {
  const query = useSearchParams();

  return (
    <DashboardWrapper>
      <div className="mx-auto px-10">
        <CreateJobProvider query={query} />
      </div>
    </DashboardWrapper>
  );
};

export default JobPostingPage;

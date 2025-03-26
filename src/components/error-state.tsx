import Link from "next/link";

export const ErrorState = () => (
  <div className="flex items-center justify-center py-20">
    <div className="text-center px-4 md:px-0">
      <h1 className="text-xl md:text-2xl font-bold mb-4">Job Not Found</h1>
      <Link
        href="/dashboard/job-board"
        className="text-blue-600 hover:underline"
      >
        Back to Jobs
      </Link>
    </div>
  </div>
);

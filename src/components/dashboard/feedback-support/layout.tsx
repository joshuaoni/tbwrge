import DashboardWrapper from "@/components/dashboard-wrapper";
import { outfit } from "@/constants/app";
import classNames from "classnames";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";

const DashboardFeedbackSupportLayout = ({
  children,
}: {
  children: ReactNode;
}) => {
  const router = useRouter();
  const path = usePathname();

  const route = (path: string) => "/dashboard" + path;

  return (
    <DashboardWrapper>
      <header className={`${outfit.className} flex items-center gap-6 mb-4`}>
        {[
          { name: "Feedback", route: "/feedback" },
          { name: "Support", route: "/support" },
        ].map((tab, i) => (
          <button
            key={i}
            onClick={() => router.push(route(tab.route))}
            className={classNames("font-semibold cursor-pointer", {
              "text-[#009379]": path === route(tab.route),
            })}
          >
            {tab.name}
          </button>
        ))}
      </header>

      <div className="">{children}</div>
    </DashboardWrapper>
  );
};

export default DashboardFeedbackSupportLayout;

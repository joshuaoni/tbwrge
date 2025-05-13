import DashboardWrapper from "@/components/dashboard-wrapper";
import { outfit } from "@/constants/app";
import classNames from "classnames";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";

const DashboardSettingsLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const path = usePathname();

  const route = (path: string) => "/dashboard/settings" + path;

  return (
    <DashboardWrapper>
      <header
        className={`${outfit.className} flex pl-6 items-center gap-6 mb-10`}
      >
        {[
          { name: "Profile Settings", route: "/profile" },
          { name: "Notifications Settings", route: "/notifications" },
          { name: "Teams and collaboration", route: "/teams" },
          { name: "Privacy & Security", route: "/privacy" },
          { name: "Integrations", route: "/integration" },
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

      <div className={`${outfit.className} px-6`}>{children}</div>
    </DashboardWrapper>
  );
};

export default DashboardSettingsLayout;

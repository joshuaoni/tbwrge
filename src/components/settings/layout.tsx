import DashboardWrapper from "@/components/dashboard-wrapper";
import { outfit } from "@/constants/app";
import classNames from "classnames";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";

const DashboardSettingsLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const path = usePathname();
  const { t } = useTranslation();

  const route = (path: string) => "/dashboard/settings" + path;

  return (
    <DashboardWrapper>
      <header className={`${outfit.className} flex items-center gap-6 mb-4`}>
        {[
          { name: t("settings.header.profileSettings"), route: "/profile" },
          {
            name: t("settings.header.notificationsSettings"),
            route: "/notifications",
          },
          { name: t("settings.header.teamsCollaboration"), route: "/teams" },
          { name: t("settings.header.privacySecurity"), route: "/privacy" },
          { name: t("settings.header.integrations"), route: "/integration" },
        ].map((tab, i) => (
          <button
            key={i}
            onClick={() => router.push(route(tab.route))}
            className={classNames("text-sm font-semibold cursor-pointer", {
              "text-[#009379]": path === route(tab.route),
            })}
          >
            {tab.name}
          </button>
        ))}
      </header>

      <div className={`${outfit.className}`}>{children}</div>
    </DashboardWrapper>
  );
};

export default DashboardSettingsLayout;

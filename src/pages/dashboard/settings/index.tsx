import { useRouter } from "next/navigation";
import { useEffect } from "react";

const SettingsHomePage = () => {
  const router = useRouter();

  useEffect(() => router.push("/dashboard/settings/profile"), []);

  return (
    <button onClick={() => router.push("/dashboard/settings/profile")}>
      go to profile
    </button>
  );
};

export default SettingsHomePage;

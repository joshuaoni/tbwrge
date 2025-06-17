import { Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";

function ProfileSettingsButton({
  action,
  loading,
  disabled = false,
}: {
  action: () => void;
  loading: boolean;
  disabled?: boolean;
}) {
  const { t } = useTranslation();

  return (
    <button
      onClick={() => action()}
      className={`w-fit text-white text-xs my-2 bg-primary py-3 px-4 rounded-lg ${
        disabled || loading ? "opacity-50" : ""
      }`}
      disabled={disabled || loading}
    >
      {loading ? (
        <Loader2 className="animate-spin" />
      ) : (
        t("settings.profile.saveChanges", "Save Changes")
      )}
    </button>
  );
}

export default ProfileSettingsButton;

import { Loader2 } from "lucide-react";

function ProfileSettingsButton({
  action,
  loading,
  disabled = false,
}: {
  action: () => void;
  loading: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={() => action()}
      className={`w-fit text-white text-xs my-8 bg-lightgreen py-3 px-4 rounded-lg ${
        disabled || loading ? "opacity-50" : ""
      }`}
      disabled={disabled || loading}
    >
      {loading ? <Loader2 className="animate-spin" /> : "Save Changes "}
    </button>
  );
}

export default ProfileSettingsButton;

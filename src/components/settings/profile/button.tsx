import { Loader2 } from "lucide-react";

function ProfileSettingsButton({
  action,
  loading,
}: {
  action: () => void;
  loading: boolean;
}) {
  return (
    <button
      onClick={() => action()}
      className="w-fit text-white text-xs my-8 bg-lightgreen py-3 px-4 rounded-lg"
    >
      {loading ? <Loader2 className="animate-spin" /> : "Save Changes "}
    </button>
  );
}

export default ProfileSettingsButton;

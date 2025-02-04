import { Loader2 } from "lucide-react";

interface FeedbackSupportButtonProps {
  isLoading?: boolean;
  onClick?: () => void;
}

function FeedbackSupportButton(props: FeedbackSupportButtonProps) {
  return (
    <button
      type="submit"
      disabled={props.isLoading}
      className="bg-lightgreen text-white py-3 px-6 text-xs font-medium rounded-lg w-fit flex items-center gap-2 disabled:bg-opacity-70 disabled:cursor-not-allowed"
      onClick={props.onClick}
    >
      {props.isLoading && <Loader2 className="animate-spin" />}
      Submit{props.isLoading ? "ting" : ""}
    </button>
  );
}

export default FeedbackSupportButton;

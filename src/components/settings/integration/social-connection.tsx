import classNames from "classnames";
import Image from "next/image";

interface SocialConnectionProps {
  logo: string;
  name: string;
  isConnected: boolean;
}

function SocialConnection(props: SocialConnectionProps) {
  return (
    <div>
      <Image
        src={props.logo}
        alt={props.name + " logo"}
        width={40}
        height={40}
        className="w-10 h-10 rounded-full shadow-[0px_4px_6px_0px_rgba(33,33,33,0.04)] inline-block"
      />
      <span className="pr-10 pl-2 text-[#4A5568] font-medium">
        {props.name}
      </span>
      <span className="text-[#4A5568] font-medium">
        Status:&nbsp;&nbsp;&nbsp;
      </span>
      <span
        className={classNames(
          "font-medium",
          !props.isConnected ? "text-red" : "text-[#72B04E]"
        )}
      >
        {props.isConnected ? "Connected" : "Disconnected"}
      </span>
      <button
        className={classNames(
          "ml-5 px-4 py-1 text-sm rounded-lg border-2",
          props.isConnected
            ? "text-red border-red"
            : "text-[#72B04E] border-[#72B04E]"
        )}
      >
        {props.isConnected ? "Disconnect" : "Connect"}
      </button>
    </div>
  );
}

export default SocialConnection;

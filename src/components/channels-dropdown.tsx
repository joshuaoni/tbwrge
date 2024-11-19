import React from "react";
import { CaretDownIcon } from "@radix-ui/react-icons";

const ChannelsDropDown = ({
  channel,
  setChannel,
}: {
  channel: string;
  setChannel: (channel: string) => void;
}) => {
  const [showDropDown, setShowDropDown] = React.useState(false);

  return (
    <div>
      <div
        onClick={() => {
          setShowDropDown(!showDropDown);
        }}
        className="px-3 w-full py-3 cursor-pointer rounded-lg bg-[#EDF2F7] text-sm text-[#898989] flex items-center"
      >
        {channel}
        <CaretDownIcon className="ml-auto" />
      </div>
      <div
        className={`overflow-hidden mt-4 rounded-md border duration-300 ease-in-out transform ${
          showDropDown
            ? "max-h-96 opacity-100 scale-100"
            : "max-h-0 opacity-0 scale-95"
        }`}
      >
        <div
          onClick={() => {
            setChannel("Google");
            setShowDropDown(false);
          }}
          className={`p-2 ${
            channel === "Google" ? "text-white bg-primary" : ""
          } cursor-pointer text-sm `}
        >
          Google
        </div>
        <div
          onClick={() => {
            setChannel("Instagram");
            setShowDropDown(false);
          }}
          className={`p-2 ${
            channel === "Instagram" ? "text-white bg-primary" : ""
          } cursor-pointer text-sm `}
        >
          Instagram
        </div>
        <div
          onClick={() => {
            setChannel("Twitter");
            setShowDropDown(false);
          }}
          className={`p-2 ${
            channel === "Twitter" ? "text-white bg-primary" : ""
          } cursor-pointer text-sm `}
        >
          Instagram
        </div>
        <div
          onClick={() => {
            setChannel("LinkedIn");
            setShowDropDown(false);
          }}
          className={`p-2 ${
            channel === "LinkedIn" ? "text-white bg-primary" : ""
          } cursor-pointer text-sm `}
        >
          Instagram
        </div>
      </div>
    </div>
  );
};

export default ChannelsDropDown;

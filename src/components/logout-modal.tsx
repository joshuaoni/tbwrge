import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LogOut } from "lucide-react";
import { Button } from "./ui/button";

const LogoutModal = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <div
          className={`flex relative  items-center w-full transition-all py-3  pl-6 space-x-2 p-2  mb-3  cursor-pointer ${
            false
              ? "bg-primary text-white hover:bg-primary/80 transition-colors transform duration-300 border-l-2 border-l-primary font-bold"
              : " font-normal"
          }`}
        >
          <div
            className={`h-7 w-[5px] ${
              false ? "bg-white" : "bg-transparent"
            } absolute -left-[2px] rounded-r`}
          />
          <LogOut className="text-primary" />
          <span className="text-[16px]">Logout</span>
        </div>
      </DialogTrigger>
      <DialogContent className="bg-white max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="border-b pb-6">LogOut</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Are you sure you want to logout from your account?
        </DialogDescription>

        <Button
          // onClick={() => setStage("cover")}
          className="bg-primary text-white"
        >
          Yes, Logout
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default LogoutModal;

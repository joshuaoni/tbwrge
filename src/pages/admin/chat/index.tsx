import React from "react";
import AdminDashboardLayout from "@/components/admin/layout";
import AdminDashboardSearchBox from "@/components/admin/search";
import Image from "next/image";
import MoreIcon from "@/components/icons/more";
import { LinkIcon } from "lucide-react";
import { FaceIcon } from "@radix-ui/react-icons";

function AdminChatPage() {
  const props = [
    {
      user: "John Deee",
      recents_msg: "Hey whatsup",
      status: "2",
      recieved: "2m ago",
    },
    {
      user: "Deee",
      recents_msg: "Hey whatsup",
      status: "",
    },
    {
      user: "John Deee",
      recents_msg: "Hey whatsup",
      status: "1",
      recieved: "2m ago",
    },
    {
      user: "John Deee",
      recents_msg: "Hey whatsup",
      status: "1",
      recieved: "2m ago",
    },
    {
      user: "John Deee",
      recents_msg: "Hey whatsup",
      status: "1",
      recieved: "2m ago",
    },
    {
      user: "John Deee",
      recents_msg: "Hey whatsup",
      status: "1",
      recieved: "2m ago",
    },
  ];

  return (
    <>
      <AdminDashboardLayout>
        <section className="py-4 border-b">
          <AdminDashboardSearchBox placeholder="Search user here" />
        </section>
        <div className="flex gap-6 py-6">
          <section className="w-1/4">
            {props.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-white rounded-lg shadow mb-4"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-full w-10 h-10 overflow-hidden">
                    <Image
                      src="https://ui-avatars.com/api/?background=random&rounded=true"
                      alt="user"
                      width={40}
                      height={40}
                    />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{item.user}</p>
                    <p className="text-gray-500 text-xs">{item.recents_msg}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <p className="text-gray-500 text-xs">{item.recieved}</p>
                  {item.status === "2" && (
                    <div className="bg-red text-white px-2 py-1 rounded-full text-[10px]">
                      2
                    </div>
                  )}
                  {item.status === "1" && (
                    <div className="bg-red-500 text-white px-2 py-1 rounded-full text-[10px]">
                      1
                    </div>
                  )}
                  {item.status === "" && (
                    <div className="bg-gray-500 text-white px-2 py-1 rounded-full text-[10px]"></div>
                  )}
                </div>
              </div>
            ))}
          </section>
          <section className="flex-1 flex flex-col gap-4">
            <div className="bg-white rounded-lg p-4 gap-4">
              <div className="flex justify-between">
                <div className="gap-2 flex">
                  <Image
                    src="https://ui-avatars.com/api/?background=random&rounded=true"
                    alt="user"
                    width={40}
                    height={40}
                  />
                  <div className="grid">
                    <p>John dee</p>
                    <p className="text-xs">Online</p>
                  </div>
                </div>
                <MoreIcon />
              </div>
            </div>
            <div className="chat-area p-2 bg-blue-50 rounded-md">
              <div className="flex items-center my-4">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="mx-4 text-gray-500">Today</span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>

              <section className="flex flex-col h-ful py-8">
                {/* Chat Messages */}
                <div className="flex-1 p-4 overflow-y-auto space-y-4">
                  {/* Received Message */}
                  <div className="flex items-start space-x-3 mb-4">
                    <img
                      src="https://ui-avatars.com/api/?background=random&rounded=true"
                      alt="User Avatar"
                      className="w-8 h-8 rounded-full"
                    />
                                      <div className="flex gap-2">
                                      <div className="max-w-xs bg-white text-black px-4 py-2 rounded-2xl rounded-tl-none">
                      <p>Hello bro </p>
                    </div>
                      <span className="text-xs text-gray-500 self-end">9:10 AM</span>
                   </div>
                  </div>

                  {/* Sent Message */}
                  <div className="flex items-end justify-end space-x-3 mb-4">
                                      <div className="flex gap-2">
                                      <span className="self-end text-xs text-gray-500">9:10 AM</span>
                  <div className="max-w-xs bg-green-950 text-white px-4 py-2 rounded-2xl rounded-tr-none">
                      <p> Hello Michu, I'm fine. How about you?</p>
                    </div>
                     </div>
                    <img
                      src="https://ui-avatars.com/api/?background=random&rounded=true"
                      alt="User Avatar"
                      className="w-8 h-8 rounded-full"
                    />
                  </div>
                  {/* Received Message */}
                  <div className="flex items-start space-x-3 mb-4">
                    <img
                      src="https://ui-avatars.com/api/?background=random&rounded=true"
                      alt="User Avatar"
                      className="w-8 h-8 rounded-full"
                    />
                                      <div className="flex gap-2">
                                      <div className="max-w-xs bg-white text-black px-4 py-2 rounded-2xl rounded-tl-none">
                      <p>Hello bro </p>
                    </div>
                      <span className="text-xs text-gray-500 self-end">9:10 AM</span>
                   </div>
                  </div>

                  {/* Sent Message */}
                  <div className="flex items-end justify-end space-x-3">
                                      <div className="flex gap-2">
                                      <span className="self-end text-xs text-gray-500">9:10 AM</span>
                  <div className="max-w-xs bg-green-950 text-white px-4 py-2 rounded-2xl rounded-tr-none">
                      <p> Hello Michu, I'm fine. How about you?</p>
                    </div>
                     </div>
                    <img
                      src="https://ui-avatars.com/api/?background=random&rounded=true"
                      alt="User Avatar"
                      className="w-8 h-8 rounded-full"
                    />
                  </div>
                </div>

                {/* Chat Input */}
                <div className="relative flex items-center mt-12">
  <input
    type="text"
    placeholder="Write your message..."
    className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-green-300 pr-10"
  />
<span className="text-gray-500 hover:text-green-500">
                    <FaceIcon/>
      
    </span>
  <label className="absolute right-2 cursor-pointer">
    <input
      type="file"
      className="hidden"
      onChange={(e) => console.log(e.target.files)} // Handle file input here
    />
    {/* Replace this span with a clip icon */}
<div className="flex gap-4 items-center">
                    <span className="text-gray-500 hover:text-green-500">
      <LinkIcon/>
    </span>
</div>
  </label>
</div>

              </section>
            </div>
          </section>
        </div>
      </AdminDashboardLayout>
    </>
  );
}

export default AdminChatPage;

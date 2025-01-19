import React, { useState } from "react";
import DashboardWrapper from "@/components/dashboard-wrapper";
import { CheckSquare, PlusCircle, Square, UserCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const index = () => {
  const [activeTab, setActiveTab] = React.useState(0);
  const [accountPrivacy, setAccountPrivacy] = useState([
    { "Profile Visiblity": true },
  ]);
  const [tabs, setTabs] = useState([
    "Profile Settings",
    "Notifications Settings",
    "Teams and collaboration",
    "Privacy & Security",
    "Billing & Subscription",
    "Integration",
  ]);
  const [emailNotifications, setEmailNotifications] = useState([
    {
      "Job Updates": true,
      "Job and Community Updates": false,
      "Platform Announcements": true,
    },
  ]);
  const [dataSharing, setDataSharing] = useState([
    {
      "Share Data With LinkedIn": true,
      "Share Data With indeed": false,
    },
  ]);
  const [dataExport, setDataExport] = useState([
    {
      "Activity History": true,
      CVs: false,
      "Candidate Reports": true,
    },
  ]);
  const [whatsappNotifications, setWhatsappNotifications] = useState([
    {
      "Job Updates": true,
      "Job and Community Updates": false,
      "Platform Announcements": true,
    },
  ]);
  const [telegramNotifications, setTelegramNotifications] = useState([
    {
      "Job Updates": true,
      "Job and Community Updates": false,
      "Platform Announcements": true,
    },
  ]);
  const [inAppNotifications, setInAppNotifications] = useState([
    {
      "Response to Candidate Response": true,
      "Status updates for candidates and jobs": true,
    },
  ]);
  return (
    <DashboardWrapper>
      <div className="flex items-center gap-6">
        {tabs.map((tab, index) => (
          <span
            onClick={() => setActiveTab(index)}
            className={`${
              activeTab == index ? "text-[#009379]" : ""
            } font-semibold cursor-pointer`}
          >
            {tab}
          </span>
        ))}
      </div>

      {activeTab === 0 && (
        <>
          {" "}
          <div className="flex items-center my-6">
            <UserCircle size={60} />{" "}
            <div className="flex flex-col ml-6">
              <button className="border-1 border p-2 border-[#009379] font-semibold text-base rounded-2xl text-[#009379] bg-white">
                CHOOSE FILE
              </button>
              <span className="text-gray-500 text-sm text-[#999999]">
                no file selected
              </span>
              <span className="text-gray-500 text-sm text-[#999999]">
                max image size is 1mb
              </span>
            </div>
          </div>
          <div className="mt-4 ">
            <>
              <div
                className="flex justify-between
           items-center"
              >
                <div className="w-full ">
                  <label htmlFor="" className="text-[#4A5568] text-sm mb-8">
                    First Name
                  </label>
                  <Input
                    style={{
                      width: "90%",
                      backgroundColor: "#EDF2F7",
                    }}
                  />
                </div>
                <div className="w-full ">
                  <label htmlFor="" className="text-[#4A5568] text-sm mb-8">
                    Last Name
                  </label>
                  <Input
                    style={{
                      width: "90%",
                      backgroundColor: "#EDF2F7",
                    }}
                  />
                </div>
              </div>
            </>
            <section className="mt-4">
              <div
                className="flex justify-between
           items-center"
              >
                <div className="w-full ">
                  <label htmlFor="" className="text-[#4A5568] text-sm mb-8">
                    Email Address
                  </label>
                  <Input
                    style={{
                      width: "90%",
                      backgroundColor: "#EDF2F7",
                    }}
                  />
                </div>
                <div className="w-full ">
                  <label htmlFor="" className="text-[#4A5568] text-sm mb-8">
                    Location
                  </label>
                  <Input
                    style={{
                      width: "90%",
                      backgroundColor: "#EDF2F7",
                    }}
                  />
                </div>
              </div>
            </section>
            <section className="mt-4">
              <div
                className="flex justify-between
           items-center"
              >
                <div className="w-full flex items-center gap-6">
                  <div className="flex flex-col">
                    <label htmlFor="" className="text-[#4A5568] text-sm ">
                      Select Country Code
                    </label>
                    <Input
                      style={{
                        width: "100%",
                        backgroundColor: "#EDF2F7",
                      }}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="" className="text-[#4A5568] text-sm ">
                      Phone Number
                    </label>
                    <Input
                      style={{
                        width: "100%",
                        backgroundColor: "#EDF2F7",
                      }}
                    />
                  </div>
                </div>
                <div className="w-full ">
                  <label htmlFor="" className="text-[#4A5568] text-sm mb-8">
                    User ID
                  </label>
                  <Input
                    style={{
                      width: "90%",
                      backgroundColor: "#EDF2F7",
                    }}
                  />
                </div>
              </div>
            </section>
            <div className="flex w-full items-center justify-center">
              <Button className="flex items-center self-center text-white my-8 bg-[#009379] p-5 rounded-3xl">
                Save Changes
              </Button>
            </div>
          </div>
          <div>
            <div className="w-full ">
              <label htmlFor="" className="text-[#4A5568] text-sm mb-8">
                Current Password
              </label>
              <Input
                placeholder="Enter current password"
                style={{
                  width: "50%",
                  backgroundColor: "#EDF2F7",
                }}
              />
            </div>
            <section className="mt-4">
              <div
                className="flex justify-between
           items-center"
              >
                <div className="w-full ">
                  <label htmlFor="" className="text-[#4A5568] text-sm mb-8">
                    New Password
                  </label>
                  <Input
                    style={{
                      width: "90%",
                      backgroundColor: "#EDF2F7",
                    }}
                  />
                </div>
                <div className="w-full ">
                  <label htmlFor="" className="text-[#4A5568] text-sm mb-8">
                    Current Password
                  </label>
                  <Input
                    style={{
                      width: "90%",
                      backgroundColor: "#EDF2F7",
                    }}
                  />
                </div>
              </div>
            </section>
            <div className="flex w-full items-center justify-center">
              <Button className="flex items-center self-center text-white my-8 bg-[#009379] p-5 rounded-3xl">
                Save Changes
              </Button>
            </div>
          </div>
        </>
      )}
      {activeTab === 1 && (
        <section className="flex flex-col mt-8">
          <span className="text-lg font-bold ">Notification Preferences</span>

          <div className="flex flex-col">
            <span className="text-[#4A5568] text-sm my-4 ">
              Email Notification
            </span>
            {emailNotifications.map((email) => {
              return Object.keys(email).map((key) => (
                <div className="items-center flex mb-4">
                  <CheckSquare color="#87909E" />{" "}
                  <span className="ml-2 text-[#87909E]">{key}</span>
                </div>
              ));
            })}
          </div>
          <div className="flex flex-col">
            <span className="text-[#4A5568] text-sm my-4 ">
              Whatsapp Notification
            </span>
            {whatsappNotifications.map((email: any) => {
              return Object.keys(email).map((key: any) => (
                <div className="items-center flex mb-4">
                  {email[key] ? (
                    <CheckSquare color="#87909E" />
                  ) : (
                    <Square color="#87909E" />
                  )}
                  <span className="ml-2 text-[#87909E]">{key}</span>
                </div>
              ));
            })}
          </div>
          <div className="flex flex-col">
            <span className="text-[#4A5568] text-sm my-4 ">
              Telegram Notification
            </span>
            {telegramNotifications.map((email) => {
              return Object.keys(email).map((key) => (
                <div className="items-center flex mb-4">
                  <CheckSquare color="#87909E" />{" "}
                  <span className="ml-2 text-[#87909E]">{key}</span>
                </div>
              ));
            })}
          </div>
          <div className="flex flex-col">
            <span className="text-[#4A5568] text-sm my-4 ">
              InApp Notification
            </span>
            {inAppNotifications.map((email) => {
              return Object.keys(email).map((key) => (
                <div className="items-center flex mb-4">
                  <CheckSquare color="#87909E" />{" "}
                  <span className="ml-2 text-[#87909E]">{key}</span>
                </div>
              ));
            })}
          </div>
        </section>
      )}
      {activeTab === 3 && (
        <section className="flex flex-col mt-8">
          <span className="text-lg font-bold ">Privacy & Security</span>

          <div className="flex flex-col">
            <span className="text-[#4A5568] text-sm my-4 ">
              Account Privacy
            </span>
            {accountPrivacy.map((email) => {
              return Object.keys(email).map((key) => (
                <div className="items-center flex mb-4">
                  <CheckSquare color="#87909E" />{" "}
                  <span className="ml-2 text-[#87909E]">{key}</span>
                </div>
              ));
            })}
          </div>
          <div className="flex flex-col">
            <span className="text-[#4A5568] text-sm my-4 ">
              Data Sharing & Preferences
            </span>
            {dataSharing.map((email: any) => {
              return Object.keys(email).map((key: any) => (
                <div className="items-center flex mb-4">
                  {email[key] ? (
                    <CheckSquare color="#87909E" />
                  ) : (
                    <Square color="#87909E" />
                  )}
                  <span className="ml-2 text-[#87909E]">{key}</span>
                </div>
              ));
            })}
          </div>
          <div className="flex flex-col">
            <span className="text-[#4A5568] text-sm my-4 ">Data Exports</span>
            {dataExport.map((email) => {
              return Object.keys(email).map((key) => (
                <div className="items-center flex mb-4">
                  <CheckSquare color="#87909E" />{" "}
                  <span className="ml-2 text-[#87909E]">{key}</span>
                </div>
              ));
            })}
          </div>
          <div className="flex flex-col">
            <span className=" text-sm my-4 text-red cursor-pointer ">
              Delete Account
            </span>
            <div className="items-center flex mb-4">
              <CheckSquare color="#87909E" />{" "}
              <span className="ml-2 text-[#87909E]">
                {"I understand this account would delete all my data"}
              </span>
            </div>
          </div>
        </section>
      )}
      {activeTab == 4 && (
        <div className="flex flex-col ">
          <div className="flex items-center my-6 gap-6">
            <div className="border border-[#009379] p-4 rounded-2xl w-[400px]">
              <div className="flex items-center justify-between">
                <span className="font-semibold">Free Plan</span>
                <span className="font-bold">$0/month</span>
              </div>
              <div className="flex flex-col">
                <span className="my-6 text-sm text-[#898989]">
                  Free for individual use
                </span>
                <Button className="bg-primary text-white w-[30%] px-6">
                  Upgrade
                </Button>
              </div>
            </div>
            <div className="border border-[#009379] p-4 rounded-2xl w-[400px]">
              <div className="flex items-center justify-between">
                <span className="font-semibold">Payment Plans</span>
                <span className="font-bold">
                  <PlusCircle />
                </span>
              </div>
              <div className="flex flex-col">
                <span className="my-6 text-[#898989] text-sm">
                  Change how you make plans
                </span>
                <Button className="bg-primary text-white w-[30%] px-6">
                  Upgrade
                </Button>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg">Invoices</span>
            <span>Manage invoice and new receipts</span>
          </div>
        </div>
      )}
    </DashboardWrapper>
  );
};

export default index;

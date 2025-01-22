import DashboardSettingsLayout from "@/components/settings/layout";
import ProfileSettingsButton from "@/components/settings/profile/button";
import { ProfileInputGroup } from "@/components/settings/profile/input-group";
import { UserCircle } from "lucide-react";

const ProfileSettingsPage = () => {
  return (
    <DashboardSettingsLayout>
      <div className="flex items-center gap-6">
        <UserCircle size={60} />
        <div className="flex flex-col gap-1">
          <div>
            <input type="file" name="profile" id="profile" className="hidden" />
            <label
              htmlFor="profile"
              className="border-1 border text-xs p-2 border-lightgreen font-semibold rounded-2xl text-lightgreen bg-white cursor-pointer"
            >
              CHOOSE FILE
            </label>
          </div>
          <span className="text-sm text-[#999999]">no file selected</span>
          <span className="text-sm text-[#999999]">max image size is 1mb</span>
        </div>
      </div>

      <section className="grid grid-cols-2 gap-x-7 gap-y-4 mt-4">
        <ProfileInputGroup label="First Name" />
        <ProfileInputGroup label="Last Name" />
        <ProfileInputGroup label="Email Address" />
        <ProfileInputGroup label="Location" />
        <div className="w-full flex items-center gap-x-2">
          <ProfileInputGroup label="Country Code" className="w-3/12" />
          <ProfileInputGroup label="Phone Number" />
        </div>
        <ProfileInputGroup label="User ID" />

        <div className="w-full flex justify-center col-span-2">
          <ProfileSettingsButton />
        </div>
      </section>

      <section className="grid grid-cols-2 gap-x-7 gap-y-4">
        <ProfileInputGroup
          label="Current Password"
          className="w-1/2 col-span-2"
        />
        <ProfileInputGroup label="New Password" />
        <ProfileInputGroup label="Confirm Password" />

        <div className="w-full flex justify-center col-span-2">
          <ProfileSettingsButton />
        </div>
      </section>
    </DashboardSettingsLayout>
  );
};

export default ProfileSettingsPage;

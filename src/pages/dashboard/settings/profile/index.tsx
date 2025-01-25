import { updateProfile } from "@/actions/update-profile";
import DashboardSettingsLayout from "@/components/settings/layout";
import ProfileSettingsButton from "@/components/settings/profile/button";
import { ProfileInputGroup } from "@/components/settings/profile/input-group";
import { useUserStore } from "@/hooks/use-user-store";
import { useMutation } from "@tanstack/react-query";
import { UserCircle } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

const ProfileSettingsPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [userId, setUserId] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { userData } = useUserStore();
  interface MutationData {
    profile_pic?: string;
    name?: string;
    last_name?: string;
    country_code?: string;
    old_password?: string;
    new_password?: string;
    active_team_id?: string;
    location?: string;
    email?: string;
    token?: string | null | undefined;
    phone?: string | undefined;
  }

  const UpdateProfile = useMutation({
    mutationKey: ["update-profile"],
    onMutate: async (data: MutationData) => {
      // Utility function to validate fields
      const isValidValue = (value: unknown): value is string | Blob => {
        return typeof value === "string" && value.trim() !== "";
      };

      const response = await updateProfile({
        profile_pic: isValidValue(data.profile_pic)
          ? data.profile_pic
          : undefined,
        name: isValidValue(data.name) ? data.name : undefined,
        last_name: isValidValue(data.last_name) ? data.last_name : undefined,
        country_code: isValidValue(data.country_code)
          ? data.country_code
          : undefined,
        old_password: isValidValue(data.old_password)
          ? data.old_password
          : undefined,
        new_password: isValidValue(data.new_password)
          ? data.new_password
          : undefined,
        active_team_id: isValidValue(data.active_team_id)
          ? data.active_team_id
          : undefined,
        location: isValidValue(data.location) ? data.location : undefined,
        email: isValidValue(data.email) ? data.email : undefined,
        token: isValidValue(data.token) ? data.token : undefined,
        phone: isValidValue(data.phone) ? data.phone : undefined,
      });
      return response;
    },
    onSuccess: () => {
      toast.success("Profile updated successfully");
    },
  });

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
        <ProfileInputGroup
          label="First Name"
          value={firstName}
          onChange={setFirstName}
        />
        <ProfileInputGroup
          label="Last Name"
          value={lastName}
          onChange={setLastName}
        />
        <ProfileInputGroup
          label="Email Address"
          value={email}
          onChange={setEmail}
        />
        <ProfileInputGroup
          label="Location"
          value={location}
          onChange={setLocation}
        />
        <div className="w-full flex items-center gap-x-2">
          <ProfileInputGroup
            label="Country Code"
            className="w-3/12"
            value={countryCode}
            onChange={setCountryCode}
          />
          <ProfileInputGroup
            label="Phone Number"
            value={phoneNumber}
            onChange={setPhoneNumber}
          />
        </div>
        <ProfileInputGroup
          label="User ID"
          value={userId}
          onChange={setUserId}
        />

        <div className="w-full flex justify-center col-span-2">
          <ProfileSettingsButton
            loading={UpdateProfile.isPending}
            action={() =>
              UpdateProfile.mutate({
                profile_pic: "",
                name: firstName,
                last_name: lastName,
                country_code: countryCode,
                active_team_id: "",
                location: location,
                email: email,
                token: userData?.token,
                phone: phoneNumber,
              })
            }
          />
        </div>
      </section>

      <section className="grid grid-cols-2 gap-x-7 gap-y-4">
        <ProfileInputGroup
          value={currentPassword}
          onChange={setCurrentPassword}
          label="Current Password"
          className="w-1/2 col-span-2"
        />
        <ProfileInputGroup
          label="New Password"
          value={newPassword}
          onChange={setNewPassword}
          className="w-1/2 col-span-2"
        />
        <ProfileInputGroup
          label="Confirm Password"
          value={confirmPassword}
          onChange={setConfirmPassword}
          className="w-1/2 col-span-2"
        />

        <div className="w-full flex justify-center col-span-2">
          <ProfileSettingsButton
            loading={UpdateProfile.isPending}
            action={() =>
              UpdateProfile.mutate({
                new_password: newPassword,
                old_password: currentPassword,
                token: userData?.token,
              })
            }
          />
        </div>
      </section>
    </DashboardSettingsLayout>
  );
};

export default ProfileSettingsPage;

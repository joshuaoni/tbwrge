import { updateProfile } from "@/actions/update-profile";
import { getProfile, ProfileResponse } from "@/actions/get-profile";
import DashboardSettingsLayout from "@/components/settings/layout";
import ProfileSettingsButton from "@/components/settings/profile/button";
import { ProfileInputGroup } from "@/components/settings/profile/input-group";
import { useUserStore } from "@/hooks/use-user-store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { UserCircle, Edit2 } from "lucide-react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import { outfit } from "@/constants/app";
import { useTranslation } from "react-i18next";

const ProfileSettingsPage = () => {
  const { t } = useTranslation();
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
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [profilePicturePreview, setProfilePicturePreview] = useState<
    string | null
  >(null);
  const { userData } = useUserStore();
  const queryClient = useQueryClient();

  // Fetch profile data
  const { data: profileData, isLoading: isLoadingProfile } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getProfile(userData?.token),
    enabled: !!userData?.token,
  });

  // Update form fields when profile data is loaded
  useEffect(() => {
    if (profileData) {
      // Populate basic profile information
      setFirstName(profileData.name || "");
      setLastName(profileData.last_name || "");
      setEmail(profileData.email || "");
      setLocation(profileData.location || "");
      setPhoneNumber(profileData.phone || "");
      setCountryCode(profileData.country_code || "");
      setUserId(profileData.id || "");

      // Handle profile picture from API
      if (profileData.profile_picture) {
        setProfilePicturePreview(profileData.profile_picture);
      }

      // Ensure password fields remain empty
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  }, [profileData]);

  const handleProfilePictureChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (1MB limit)
      if (file.size > 1024 * 1024) {
        toast.error(
          t(
            "settings.profile.fileSizeError",
            "File size should be less than 1MB"
          )
        );
        return;
      }

      setProfilePicture(file);
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setProfilePicturePreview(previewUrl);
    }
  };

  // Cleanup preview URL when component unmounts
  useEffect(() => {
    return () => {
      if (profilePicturePreview) {
        URL.revokeObjectURL(profilePicturePreview);
      }
    };
  }, [profilePicturePreview]);

  interface MutationData {
    profile_pic?: string | File;
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

  // Profile info update mutation
  const UpdateProfile = useMutation({
    mutationKey: ["update-profile"],
    mutationFn: async (data: MutationData) => {
      // Utility function to validate fields
      const isValidValue = (value: unknown): value is string | Blob => {
        return typeof value === "string" && value.trim() !== "";
      };

      const formData = new FormData();

      // Handle profile picture separately since it's a File
      if (profilePicture) {
        formData.append("profile_pic", profilePicture);
      }

      // Add other fields if they are valid
      if (isValidValue(data.name)) formData.append("name", data.name);
      if (isValidValue(data.last_name))
        formData.append("last_name", data.last_name);
      if (isValidValue(data.country_code))
        formData.append("country_code", data.country_code);
      if (isValidValue(data.old_password))
        formData.append("old_password", data.old_password);
      if (isValidValue(data.new_password))
        formData.append("new_password", data.new_password);
      if (isValidValue(data.active_team_id))
        formData.append("active_team_id", data.active_team_id);
      if (isValidValue(data.location))
        formData.append("location", data.location);
      if (isValidValue(data.email)) formData.append("email", data.email);
      if (isValidValue(data.phone)) formData.append("phone", data.phone);

      const response = await updateProfile({
        profile_pic: profilePicture || undefined,
        name: data.name,
        last_name: data.last_name,
        country_code: data.country_code,
        old_password: data.old_password,
        new_password: data.new_password,
        active_team_id: data.active_team_id,
        location: data.location,
        email: data.email,
        token: data.token,
        phone: data.phone,
      });
      return response;
    },
    onSuccess: () => {
      // Clear all form fields
      setFirstName("");
      setLastName("");
      setEmail("");
      setLocation("");
      setPhoneNumber("");
      setCountryCode("");
      setUserId("");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setProfilePicture(null);
      if (profilePicturePreview) {
        URL.revokeObjectURL(profilePicturePreview);
        setProfilePicturePreview(null);
      }

      // Invalidate profile query to refetch updated data
      queryClient.invalidateQueries({ queryKey: ["profile"] });

      toast.success(
        t("settings.profile.profileUpdated", "Profile updated successfully")
      );
    },
    onError: (error: any) => {
      toast.error(
        error.message ||
          t("settings.profile.profileUpdateError", "Failed to update profile")
      );
    },
  });

  // Password update mutation
  const UpdatePassword = useMutation({
    mutationKey: ["update-password"],
    mutationFn: async (data: MutationData) => {
      const response = await updateProfile({
        old_password: data.old_password,
        new_password: data.new_password,
        token: data.token,
        phone: undefined,
      });
      return response;
    },
    onSuccess: () => {
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      toast.success(
        t("settings.profile.passwordUpdated", "Password updated successfully")
      );
    },
    onError: (error: any) => {
      toast.error(
        error.message ||
          t("settings.profile.passwordUpdateError", "Failed to update password")
      );
    },
  });

  return (
    <DashboardSettingsLayout>
      <div className={`${outfit.className} flex items-center gap-6`}>
        <div className="relative">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100">
            {profilePicturePreview ? (
              <Image
                src={profilePicturePreview}
                alt="Profile preview"
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200 text-2xl font-semibold text-gray-600">
                {profileData?.name?.charAt(0)?.toUpperCase() ||
                  firstName?.charAt(0)?.toUpperCase() ||
                  "U"}
              </div>
            )}
          </div>
          <label className="absolute bottom-0 right-0 p-1 bg-white rounded-full shadow-md cursor-pointer hover:bg-gray-50">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleProfilePictureChange}
            />
            <Edit2 className="w-3.5 h-3.5 text-gray-600" />
          </label>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm text-[#999999]">
            {profilePicture
              ? profilePicture.name
              : t("settings.profile.noFileSelected", "no file selected")}
          </span>
          <span className="text-sm text-[#999999]">
            {t("settings.profile.maxImageSize", "max image size is 1mb")}
          </span>
        </div>
      </div>

      <section
        className={`${outfit.className} grid grid-cols-2 gap-x-7 gap-y-4 mt-4`}
      >
        <ProfileInputGroup
          label={t("settings.profile.firstName", "First Name")}
          value={firstName}
          onChange={setFirstName}
        />
        <ProfileInputGroup
          label={t("settings.profile.lastName", "Last Name")}
          value={lastName}
          onChange={setLastName}
        />
        <ProfileInputGroup
          label={t("settings.profile.emailAddress", "Email Address")}
          value={email}
          onChange={setEmail}
        />
        <ProfileInputGroup
          label={t("settings.profile.location", "Location")}
          value={location}
          onChange={setLocation}
        />
        <div className="w-full flex items-center gap-x-2">
          <ProfileInputGroup
            label={t("settings.profile.countryCode", "Country Code")}
            className="w-3/12"
            value={countryCode}
            onChange={setCountryCode}
          />
          <ProfileInputGroup
            label={t("settings.profile.phoneNumber", "Phone Number")}
            value={phoneNumber}
            onChange={setPhoneNumber}
          />
        </div>
        <ProfileInputGroup
          label={t("settings.profile.userId", "User ID")}
          value={userId}
          onChange={setUserId}
        />

        <div className="w-full flex justify-center col-span-2">
          <ProfileSettingsButton
            loading={UpdateProfile.isPending}
            action={() =>
              UpdateProfile.mutate({
                profile_pic: profilePicture || "",
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

      <section
        className={`${outfit.className} grid grid-cols-2 gap-x-7 gap-y-4 mt-4`}
      >
        <ProfileInputGroup
          value={currentPassword}
          onChange={setCurrentPassword}
          label={t("settings.profile.currentPassword", "Current Password")}
          className="w-1/2 col-span-2"
          type="password"
        />
        <ProfileInputGroup
          label={t("settings.profile.newPassword", "New Password")}
          value={newPassword}
          onChange={setNewPassword}
          className="w-1/2 col-span-2"
          type="password"
        />
        <ProfileInputGroup
          label={t("settings.profile.confirmPassword", "Confirm Password")}
          value={confirmPassword}
          onChange={setConfirmPassword}
          className="w-1/2 col-span-2"
          type="password"
        />

        <div className="w-full flex justify-center col-span-2">
          <ProfileSettingsButton
            loading={UpdatePassword.isPending}
            action={() =>
              UpdatePassword.mutate({
                new_password: newPassword,
                old_password: currentPassword,
                token: userData?.token,
                phone: undefined,
              })
            }
            disabled={
              !currentPassword ||
              !newPassword ||
              !confirmPassword ||
              newPassword !== confirmPassword
            }
          />
        </div>
      </section>
    </DashboardSettingsLayout>
  );
};

export default ProfileSettingsPage;

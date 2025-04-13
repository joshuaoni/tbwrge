import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import DashboardWrapper from "@/components/dashboard-wrapper";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { countries } from "@/constants/countries";
import { outfit } from "@/constants/app";
import { joinTalentPool } from "@/actions/join-talent-pool";
import { useUserStore } from "@/hooks/use-user-store";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function JoinTalentPool() {
  const router = useRouter();
  const { userData, addUser } = useUserStore();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date_of_birth: "",
    linkedin: "",
    current_company: "",
    current_position: "",
    nationality: "",
    country_of_residence: "",
    experience_summary: "",
    skills_summary: "",
    salary_range_min: 0,
    salary_range_max: 0,
    salary_currency: "USD",
  });
  const [files, setFiles] = useState({
    profile_photo: null as File | null,
    cv: null as File | null,
    cover_letter: null as File | null,
    voicenote: null as File | null,
  });
  const [profilePictureUrl, setProfilePictureUrl] = useState<string | null>(
    null
  );

  const joinMutation = useMutation({
    mutationFn: async () => {
      if (!userData?.token) throw new Error("No token available");
      if (!files.cv) throw new Error("CV is required");

      return await joinTalentPool(userData.token, {
        ...formData,
        cv: files.cv,
        profile_photo: files.profile_photo || undefined,
        cover_letter: files.cover_letter || undefined,
        voicenote: files.voicenote || undefined,
      });
    },
    onSuccess: () => {
      if (userData?.user) {
        addUser({
          authenticatedUser: {
            ...userData.user,
            joined_talent_pool: true,
          },
          token: userData.token,
        });
      }

      toast.success("Successfully joined talent pool!");
      router.push("/dashboard/talent-pool");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to join talent pool");
    },
  });

  const handleFileChange = (
    field: keyof typeof files,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setFiles((prev) => ({ ...prev, [field]: file }));
      if (field === "profile_photo") {
        const url = URL.createObjectURL(file);
        setProfilePictureUrl(url);
      }
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    joinMutation.mutate();
  };

  const isFormValid = () => {
    const requiredFields = [
      "name",
      "email",
      "experience_summary",
      "skills_summary",
    ];

    const allRequiredFieldsFilled = requiredFields.every(
      (field) =>
        formData[field as keyof typeof formData]?.toString().trim() !== ""
    );

    const hasRequiredFiles = files.cv !== null;

    return allRequiredFieldsFilled && hasRequiredFiles;
  };

  return (
    <DashboardWrapper>
      <div className={`${outfit.className} max-w-[1200px] mx-auto py-8`}>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <button
              onClick={() => router.back()}
              className="hover:bg-gray-100 p-1 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h1 className="text-xl font-semibold">Join Talent Pool</h1>
          </div>
          <div className="flex items-center gap-4">
            <label className="cursor-pointer">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileChange("profile_photo", e)}
              />
              <div className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800">
                <span className="border border-gray-300 rounded-md px-3 py-1.5">
                  Upload Profile Picture
                </span>
                {profilePictureUrl && (
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <Image
                      src={profilePictureUrl}
                      alt="Profile"
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </label>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your name"
                required
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-[#6B7280]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                required
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-[#6B7280]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter your phone number"
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-[#6B7280]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date of Birth
              </label>
              <input
                type="date"
                name="date_of_birth"
                value={formData.date_of_birth}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-[#6B7280] text-[#6B7280] [color-scheme:light]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                LinkedIn Profile Link
              </label>
              <input
                type="url"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleInputChange}
                placeholder="Enter link"
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-[#6B7280]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Company
              </label>
              <input
                type="text"
                name="current_company"
                value={formData.current_company}
                onChange={handleInputChange}
                placeholder="Enter N/A if none"
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-[#6B7280]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Position
              </label>
              <input
                type="text"
                name="current_position"
                value={formData.current_position}
                onChange={handleInputChange}
                placeholder="Manager, etc..."
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-[#6B7280]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nationality
              </label>
              <select
                name="nationality"
                value={formData.nationality}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#6B7280]"
              >
                <option value="">Select Nationality</option>
                {countries.map((country) => (
                  <option key={country.code} value={country.nationality}>
                    {country.nationality}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Country of Residence
              </label>
              <select
                name="country_of_residence"
                value={formData.country_of_residence}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#6B7280]"
              >
                <option value="">Select Country</option>
                {countries.map((country) => (
                  <option key={country.code} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Relevant Experience (Max 200 words){" "}
                <span className="text-red-500">*</span>
              </label>
              <textarea
                name="experience_summary"
                value={formData.experience_summary}
                onChange={handleInputChange}
                placeholder="Describe your past roles"
                required
                rows={4}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-[#6B7280]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Skills Summary (Max 100 words){" "}
                <span className="text-red-500">*</span>
              </label>
              <textarea
                name="skills_summary"
                value={formData.skills_summary}
                onChange={handleInputChange}
                placeholder="Highlight your key Skills"
                required
                rows={4}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-[#6B7280]"
              />
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Salary Range Min
                </label>
                <input
                  type="number"
                  name="salary_range_min"
                  value={formData.salary_range_min || ""}
                  onChange={handleInputChange}
                  placeholder="Enter minimum salary"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-[#6B7280]"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Salary Range Max
                </label>
                <input
                  type="number"
                  name="salary_range_max"
                  value={formData.salary_range_max || ""}
                  onChange={handleInputChange}
                  placeholder="Enter maximum salary"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-[#6B7280]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Upload CV <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => handleFileChange("cv", e)}
                required
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#6B7280] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-gray-100 file:text-[#6B7280] hover:file:bg-gray-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Upload Cover Letter (Optional)
              </label>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => handleFileChange("cover_letter", e)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#6B7280] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-gray-100 file:text-[#6B7280] hover:file:bg-gray-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Upload Introduction Voicenote (Max 1min)
              </label>
              <input
                type="file"
                accept="audio/*"
                onChange={(e) => handleFileChange("voicenote", e)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#6B7280] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-gray-100 file:text-[#6B7280] hover:file:bg-gray-200"
              />
            </div>

            <div className="pt-4 flex justify-center">
              <button
                type="submit"
                disabled={joinMutation.isPending || !isFormValid()}
                className={`bg-[#009379] text-white py-[10px] px-8 rounded-lg transition-colors ${
                  joinMutation.isPending || !isFormValid()
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-[#000000]/90"
                }`}
              >
                {joinMutation.isPending ? "Joining..." : "Join"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </DashboardWrapper>
  );
}

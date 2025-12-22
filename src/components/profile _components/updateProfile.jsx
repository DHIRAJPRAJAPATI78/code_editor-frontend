import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Loader2, Upload, UserCircle2, CheckCircle2, AlertCircle } from "lucide-react";

const UpdateProfile = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    bio: "",
    profilePic: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profilePic") {
      const file = files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () =>
          setFormData((prev) => ({ ...prev, profilePic: reader.result }));
        reader.readAsDataURL(file);
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.firstName && (formData.firstName.length < 3 || formData.firstName.length > 50)) {
      toast.error("First name must be 3–50 characters");
      return;
    }

    if (formData.lastName && (formData.lastName.length < 3 || formData.lastName.length > 50)) {
      toast.error("Last name must be 3–50 characters");
      return;
    }

    if (formData.bio.length > 250) {
      toast.error("Bio cannot exceed 250 characters");
      return;
    }

    setIsLoading(true);
    try {
      const res = await axios.put("https://algoken.onrender.com/user/profile/update", formData, {
        withCredentials: true,
      });
      toast.success(res.data.message || "Profile updated!");
    } catch (err) {
      console.log(err);
      const message =
        err.response?.data?.message ||
        "An unexpected error occurred. Please try again.";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f0f0f] px-4 py-16">
      <div className="w-full max-w-lg bg-[#1c1c1c] rounded-2xl shadow-xl p-8 border border-[#2a2a2a]">
        <h1 className="text-2xl md:text-3xl font-semibold text-white mb-6 text-center">
          Update Your <span className="text-[#f89f1b]">Profile</span>
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Profile Pic */}
          <div className="flex flex-col items-center space-y-3">
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-[#f89f1b] flex items-center justify-center bg-[#2a2a2a]">
              {formData.profilePic ? (
                <img
                  src={formData.profilePic}
                  alt="Profile"
                  className="object-cover w-full h-full"
                />
              ) : (
                <UserCircle2 className="text-gray-500 w-12 h-12" />
              )}
            </div>
            <label className="cursor-pointer text-[#f89f1b] flex items-center gap-2">
              <Upload className="w-4 h-4" />
              <span>Upload Photo</span>
              <input
                type="file"
                accept="image/*"
                name="profilePic"
                className="hidden"
                onChange={handleChange}
              />
            </label>
          </div>

          {/* First Name */}
          <div>
            <label className="text-sm text-gray-300">First Name</label>
            <div className="relative">
              <input
                type="text"
                name="firstName"
                placeholder="Enter first name"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full mt-1 p-3 rounded-lg bg-[#2a2a2a] text-white border border-transparent focus:border-[#f89f1b] outline-none"
              />
              {formData.firstName &&
                (formData.firstName.length >= 3 &&
                formData.firstName.length <= 50 ? (
                  <CheckCircle2 className="absolute right-3 top-4 text-green-500 w-5 h-5" />
                ) : (
                  <AlertCircle className="absolute right-3 top-4 text-red-500 w-5 h-5" />
                ))}
            </div>
          </div>

          {/* Last Name */}
          <div>
            <label className="text-sm text-gray-300">Last Name</label>
            <div className="relative">
              <input
                type="text"
                name="lastName"
                placeholder="Enter last name"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full mt-1 p-3 rounded-lg bg-[#2a2a2a] text-white border border-transparent focus:border-[#f89f1b] outline-none"
              />
              {formData.lastName &&
                (formData.lastName.length >= 3 &&
                formData.lastName.length <= 50 ? (
                  <CheckCircle2 className="absolute right-3 top-4 text-green-500 w-5 h-5" />
                ) : (
                  <AlertCircle className="absolute right-3 top-4 text-red-500 w-5 h-5" />
                ))}
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="text-sm text-gray-300">Bio</label>
            <textarea
              name="bio"
              rows="3"
              placeholder="Tell something about yourself"
              value={formData.bio}
              onChange={handleChange}
              maxLength="250"
              className="w-full mt-1 p-3 rounded-lg bg-[#2a2a2a] text-white border border-transparent focus:border-[#f89f1b] outline-none resize-none"
            />
            <p
              className={`text-xs mt-1 text-right ${
                formData.bio.length > 240 ? "text-red-400" : "text-gray-400"
              }`}
            >
              {formData.bio.length}/250
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-4 py-3 bg-[#f89f1b] text-black font-semibold rounded-lg hover:bg-[#ffaa33] transition flex justify-center items-center"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              "Save Changes"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;

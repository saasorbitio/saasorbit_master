// Example price models, replace with your actual models as needed
const priceModels = ["Free", "Subscription", "One-time", "Freemium", "Custom"];
// Example integrations, replace with your actual integrations as needed
const integrations = [
  "Slack",
  "Salesforce",
  "Google Drive",
  "Zapier",
  "QuickBooks",
  "Jira",
];
// Example recommended tags, replace with your actual tags as needed
const recommendedTagsList = [
  "Cloud",
  "AI",
  "Automation",
  "Analytics",
  "Collaboration",
  "Security",
  "Mobile",
];
// Example categories, replace with your actual categories as needed
const categories = [
  "HR",
  "Finance",
  "Productivity",
  "Marketing",
  "Sales",
  "IT",
  "Other",
];
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const initialState = {
  productName: "",
  category: "",
  tags: [],
  keyFeatures: "",
  keyFeaturesFile: null,
  integration: [],
  priceModel: "",
  documentationUrl: "",
  releaseNotes: "",
  releaseNotesFile: null,
  displayIcon: null,
  screenshots: null,
};

export default function ProductListing() {
  // Set the selected price model
  const handlePriceModelChange = (model) => {
    setForm((prev) => ({
      ...prev,
      priceModel: model,
    }));
  };
  // Toggle an integration in the integration array
  const handleIntegrationChange = (integration) => {
    setForm((prev) => {
      if (prev.integration.includes(integration)) {
        return {
          ...prev,
          integration: prev.integration.filter((i) => i !== integration),
        };
      } else {
        return {
          ...prev,
          integration: [...prev.integration, integration],
        };
      }
    });
  };
  // Add a recommended tag to the tags array if not already present
  const handleAddRecommendedTag = (tag) => {
    setForm((prev) => {
      if (prev.tags.includes(tag)) return prev;
      return { ...prev, tags: [...prev.tags, tag] };
    });
  };
  // Handle input changes for text and file inputs
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setForm((prev) => ({
        ...prev,
        [name]: files && files.length > 0 ? files[0] : null,
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  const navigate = useNavigate();
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("productName", form.productName);
    formData.append("category", form.category);
    formData.append("documentationUrl", form.documentationUrl);
    formData.append("priceModel", form.priceModel);
    formData.append("tags", JSON.stringify(form.tags));
    formData.append("integration", JSON.stringify(form.integration));
    if (form.displayIcon) formData.append("displayIcon", form.displayIcon);
    if (form.screenshots) formData.append("screenshots", form.screenshots);
    if (form.keyFeaturesFile)
      formData.append("keyFeaturesFile", form.keyFeaturesFile);
    if (form.releaseNotesFile)
      formData.append("releaseNotesFile", form.releaseNotesFile);

    try {
      const res = await fetch("http://localhost:5001/api/ProductListing", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        alert("Product listed successfully!");
        setForm(initialState);
        navigate("/home");
      } else {
        alert("Error: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      alert("Network error: " + err.message);
    }
  };

  // ...existing code...

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-6xl mx-auto py-8 px-4 grid grid-cols-1 md:grid-cols-3 gap-8"
    >
      {/* Left: Form fields */}
      <div className="bg-white rounded-2xl shadow p-8 col-span-2 flex flex-col gap-6">
        <h2 className="text-xl font-semibold mb-2 text-center text-[#2E2E2E]">
          Product Listing
        </h2>
        {/* Product Name */}
        <div>
          <label className="block text-sm text-[#5A5A5A] font-medium mb-1">
            Product Name*
          </label>
          <input
            type="text"
            name="productName"
            value={form.productName}
            onChange={handleChange}
            className={`w-full px-4 py-4 bg-[#EEEEEE]  border-0 rounded-4xl ${
              errors.productName ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Product Name"
          />
          {errors.productName && (
            <p className="text-red-500 text-xs mt-1">{errors.productName}</p>
          )}
        </div>
        {/* Category */}
        <div>
          <label className="block text-sm  text-[#5A5A5A] font-medium mb-1">
            Category*
          </label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className={`w-full px-4 py-4 bg-[#EEEEEE]   border-0 rounded-4xl ${
              errors.category ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-red-500 text-xs mt-1">{errors.category}</p>
          )}
        </div>
        {/* Use Case Tags */}
        <div>
          <label className="block text-sm  font-medium mb-1">
            Use Case Tags
          </label>
          <input
            type="text"
            name="tags"
            value={Array.isArray(form.tags) ? form.tags.join(", ") : ""}
            onChange={(e) =>
              handleTagChange(e.target.value.split(",").map((t) => t.trim()))
            }
            className="w-full px-4 py-4 bg-[#EEEEEE] border-none  rounded-4xl"
            placeholder="HRMS, HR, X"
          />
        </div>
        {/* Recommended Tags */}
        <div>
          <label className="block text-sm  text-[#5A5A5A] font-medium mb-1">
            Recommended Tags
          </label>
          <div className="flex flex-wrap gap-3 mt-2">
            {recommendedTagsList.map((tag) => (
              <button
                type="button"
                key={tag}
                className="bg-[#ECECEC] text-gray-600 rounded-4xl px-6 py-2 text-base font-medium flex items-center gap-2  transition"
                onClick={() => handleAddRecommendedTag(tag)}
                disabled={form.tags.includes(tag)}
              >
                {tag} <span className="text-md font-semibold">+</span>
              </button>
            ))}
          </div>
        </div>
        {/* Key Features */}
        <div>
          <label className="block text-sm  text-[#5A5A5A] font-medium mb-1">
            Key Features*
          </label>
          <div className="border rounded-xl w-full h-24 flex items-center justify-center text-gray-400 relative bg-[#EEEEEE]">
            <input
              type="file"
              name="keyFeaturesFile"
              accept=".pdf,.doc,.docx,.txt"
              onChange={handleChange}
              className="hidden"
              id="keyFeaturesFileUpload"
            />
            <label
              htmlFor="keyFeaturesFileUpload"
              className="cursor-pointer w-full h-full flex items-center justify-center"
            >
              Upload Document or Copy Paste here
            </label>
            {form.keyFeaturesFile && (
              <div className="text-xs text-gray-500 mt-1 absolute top-2 left-2">
                {form.keyFeaturesFile.name}
              </div>
            )}
          </div>
        </div>
        {/* Integration */}
        <div>
          <label className="block text-sm  text-[#5A5A5A] font-medium mb-5">
            Integration*
          </label>
          <div className="flex gap-2 flex-wrap">
            {integrations.map((integration) => (
              <button
                type="button"
                key={integration}
                className={`px-5 py-3 text-[#ECECEC] rounded-full text-sm font-medium border-none ${
                  form.integration.includes(integration)
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
                onClick={() => handleIntegrationChange(integration)}
              >
                {integration}
              </button>
            ))}
          </div>
        </div>
        {/* Price Model */}
        <div>
          <label className="block text-sm  text-[#5A5A5A] font-medium mb-5">
            Price Model (Optional)
          </label>
          <div className="flex gap-4">
            {priceModels.map((model) => (
              <label key={model} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="priceModel"
                  checked={form.priceModel === model}
                  onChange={() => handlePriceModelChange(model)}
                  className="w-5 h-5 "
                />
                {model}
              </label>
            ))}
          </div>
        </div>
        {/* Documentation URL */}
        <div>
          <label className="block  text-[#5A5A5A] text-sm font-medium mb-1">
            Documentation URL*
          </label>
          <input
            type="url"
            name="documentationUrl"
            value={form.documentationUrl}
            onChange={handleChange}
            className={`w-full px-4 py-4 bg-[#EEEEEE] border-none  rounded-4xl ${
              errors.documentationUrl ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="URL"
          />
          {errors.documentationUrl && (
            <p className="text-red-500 text-xs mt-1">
              {errors.documentationUrl}
            </p>
          )}
        </div>
        {/* Release Notes */}
        <div>
          <label className="block   text-[#5A5A5A] text-sm font-medium mb-1">
            Release Notes*
          </label>
          <div className="border rounded-xl w-full h-24 flex items-center justify-center text-gray-400 relative bg-[#EEEEEE]">
            <input
              type="file"
              name="releaseNotesFile"
              accept=".pdf,.doc,.docx,.txt"
              onChange={handleChange}
              className="hidden"
              id="releaseNotesFileUpload"
            />
            <label
              htmlFor="releaseNotesFileUpload"
              className="cursor-pointer w-full h-full flex items-center justify-center"
            >
              Upload Document or Copy Paste here
            </label>
            {form.releaseNotesFile && (
              <div className="text-xs text-gray-500 mt-1 absolute top-2 left-2">
                {form.releaseNotesFile.name}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Right: Preview & Uploads */}
      <div className="bg-white rounded-2xl shadow p-8 flex flex-col gap-6 items-center">
        <div className="w-full">
          <label className="block text-sm font-medium mb-1">
            Product Display Icon*
          </label>
          <div className="border-none rounded-xl w-full h-24 flex items-center justify-center text-gray-400 bg-[#EEEEEE] ">
            <input
              type="file"
              name="displayIcon"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
              id="displayIconUpload"
            />
            <label
              htmlFor="displayIconUpload"
              className="cursor-pointer w-full h-full flex items-center justify-center"
            >
              Upload
            </label>
            {form.displayIcon && (
              <div className="text-xs text-gray-500 mt-1 absolute top-2 left-2">
                {form.displayIcon.name}
              </div>
            )}
          </div>
        </div>
        <div className="w-full">
          <label className="block text-sm font-medium mb-1">
            Product Screenshots*
          </label>
          <div className="border-none rounded-xl w-full h-24 flex items-center justify-center text-gray-400 bg-[#EEEEEE] ">
            <input
              type="file"
              name="screenshots"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
              id="screenshotsUpload"
            />
            <label
              htmlFor="screenshotsUpload"
              className="cursor-pointer w-full h-full flex items-center justify-center"
            >
              Upload
            </label>
            {form.screenshots && (
              <div className="text-xs text-gray-500 mt-1 absolute top-2 left-2">
                {form.screenshots.name}
              </div>
            )}
          </div>
        </div>
        <div className="w-full">
          <label className="block text-sm font-medium mb-1">
            Your Application Preview
          </label>
          <div className="bg-[#F5F7FB] rounded-xl p-4 flex items-center gap-4">
            <div className="w-16 h-16 bg-[#FFFFFF] rounded-xl flex items-center justify-center overflow-hidden">
              {/* Show uploaded Product Display Icon if available, else fallback */}
              {form.displayIcon ? (
                <img
                  src={URL.createObjectURL(form.displayIcon)}
                  alt="Product Icon Preview"
                  className="w-10 h-10 object-cover"
                />
              ) : (
                <span className="text-gray-400">No Icon</span>
              )}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">
                {form.productName ? (
                  form.productName
                ) : (
                  <span className="text-gray-400">Product Name</span>
                )}
              </h3>
              <p className="text-xs text-gray-500">Preview</p>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-[#00ABFB] text-white rounded-full font-semibold text-md mt-3"
        >
          Add Product
        </button>
        <button
          type="button"
          className="w-full py-3 bg-transparent hover:bg-gray-100 text-gray-400 rounded-full font-semibold text-md mt-2"
          onClick={() => setForm(initialState)}
        >
          Discard
        </button>
      </div>
    </form>
  );
}

import { createContext, useContext, useState } from "react";

const VendorFormContext = createContext();

export const useVendorForm = () => {
  const context = useContext(VendorFormContext);
  if (!context) {
    throw new Error("useVendorForm must be used within VendorFormProvider");
  }
  return context;
};

export const VendorFormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    role: "Vendor",
    companyName: "",
    email: "",
    landline: "",
    fax: "",
    gst: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    country: "India",
    website: "",
    linkedin: "",
    x: "",
    accepted: false,
  });

  const updateField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateMultipleFields = (fields) => {
    setFormData((prev) => ({
      ...prev,
      ...fields,
    }));
  };

  const resetForm = () => {
    setFormData({
      role: "Vendor",
      companyName: "",
      email: "",
      landline: "",
      fax: "",
      gst: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      zip: "",
      country: "India",
      website: "",
      linkedin: "",
      x: "",
      accepted: false,
    });
  };

  return (
    <VendorFormContext.Provider
      value={{ formData, updateField, updateMultipleFields, resetForm }}
    >
      {children}
    </VendorFormContext.Provider>
  );
};

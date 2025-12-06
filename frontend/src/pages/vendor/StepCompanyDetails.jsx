import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useVendorForm } from "../../context/VendorFormContext";

export default function StepCompanyDetails({ next, back }) {
  const { formData, updateMultipleFields } = useVendorForm();

  const schema = Yup.object({
    adminName: Yup.string().required("Admin name is required"),
    adminJobTitle: Yup.string().required("Job title is required"),
    adminContactNumber: Yup.string().required("Contact number is required"),
    companyLegalName: Yup.string().required("Company legal name is required"),
    brandName: Yup.string().required("Brand name is required"),
    website: Yup.string().url("Must be a valid URL"),
    companyLogo: Yup.string(),
    foundedYear: Yup.string().required("Founded year is required"),
    companySize: Yup.string().required("Company size is required"),
    businessType: Yup.string().required("Business type is required"),
    saasCategory: Yup.string().required("SaaS category is required"),
    saasType: Yup.string().required("SaaS type is required"),
    shortDescription: Yup.string().required("Short description is required"),
    detailedDescription: Yup.string().required(
      "Detailed description is required"
    ),
    registrationNumber: Yup.string().required(
      "Registration number is required"
    ),
    supportEmail: Yup.string()
      .email("Must be a valid email")
      .required("Support email is required"),
  });

  const companySizes = [
    "1-10",
    "11-50",
    "51-200",
    "201-500",
    "501-1000",
    "1000+",
  ];

  const businessTypes = ["Product", "Service", "Product & Service"];

  const saasCategories = [
    "CRM",
    "Accounting",
    "E-commerce",
    "Project Management",
    "HR & Payroll",
    "Marketing",
    "Analytics",
    "Other",
  ];

  const saasTypes = ["Product", "Service", "Product & Service"];

  return (
    <div className="w-full">
      {/* Vendor Badge */}
      <div className="flex justify-center mb-6">
        <span className="px-6 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
          {formData.role || "Vendor"}
        </span>
      </div>

      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Update Profile</h2>

      <Formik
        initialValues={formData}
        enableReinitialize={true}
        validationSchema={schema}
        onSubmit={(values) => {
          updateMultipleFields(values);
          next();
        }}
      >
        {({ errors, touched, setFieldValue }) => (
          <Form className="flex flex-col gap-5">
            {/* Admin Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Admin Name*
              </label>
              <Field
                name="adminName"
                placeholder="Name"
                className="w-full px-6 py-4 bg-gray-50 border-0 rounded-full text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.adminName && touched.adminName && (
                <ErrorMessage
                  name="adminName"
                  component="p"
                  className="text-red-500 text-sm mt-2 ml-4"
                />
              )}
            </div>

            {/* Admin Job Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Admin Job Title*
              </label>
              <Field
                name="adminJobTitle"
                placeholder="Job title"
                className="w-full px-6 py-4 bg-gray-50 border-0 rounded-full text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.adminJobTitle && touched.adminJobTitle && (
                <ErrorMessage
                  name="adminJobTitle"
                  component="p"
                  className="text-red-500 text-sm mt-2 ml-4"
                />
              )}
            </div>

            {/* Admin Contact Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Admin Contact Number*
              </label>
              <Field
                name="adminContactNumber"
                placeholder="Number"
                className="w-full px-6 py-4 bg-gray-50 border-0 rounded-full text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.adminContactNumber && touched.adminContactNumber && (
                <ErrorMessage
                  name="adminContactNumber"
                  component="p"
                  className="text-red-500 text-sm mt-2 ml-4"
                />
              )}
            </div>

            {/* Company Legal Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Legal Name*
              </label>
              <Field
                name="companyLegalName"
                placeholder="Company Name"
                className="w-full px-6 py-4 bg-gray-50 border-0 rounded-full text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.companyLegalName && touched.companyLegalName && (
                <ErrorMessage
                  name="companyLegalName"
                  component="p"
                  className="text-red-500 text-sm mt-2 ml-4"
                />
              )}
            </div>

            {/* Brand Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Brand Name*
              </label>
              <Field
                name="brandName"
                placeholder="Brand Name"
                className="w-full px-6 py-4 bg-gray-50 border-0 rounded-full text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.brandName && touched.brandName && (
                <ErrorMessage
                  name="brandName"
                  component="p"
                  className="text-red-500 text-sm mt-2 ml-4"
                />
              )}
            </div>

            {/* Website */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Website*
              </label>
              <Field
                name="website"
                placeholder="Website url"
                className="w-full px-6 py-4 bg-gray-50 border-0 rounded-full text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.website && touched.website && (
                <ErrorMessage
                  name="website"
                  component="p"
                  className="text-red-500 text-sm mt-2 ml-4"
                />
              )}
            </div>

            {/* Company Logo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Logo*
              </label>
              <input
                name="companyLogo"
                type="file"
                accept="image/*"
                className="w-full px-6 py-4 bg-gray-50 border-0 rounded-full text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(event) => {
                  setFieldValue("companyLogo", event.currentTarget.files[0]);
                }}
              />
              {errors.companyLogo && touched.companyLogo && (
                <ErrorMessage
                  name="companyLogo"
                  component="p"
                  className="text-red-500 text-sm mt-2 ml-4"
                />
              )}
            </div>

            {/* Founded Year */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Founded Year*
              </label>
              <Field
                name="foundedYear"
                type="number"
                placeholder="year"
                className="w-full px-6 py-4 bg-gray-50 border-0 rounded-full text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.foundedYear && touched.foundedYear && (
                <ErrorMessage
                  name="foundedYear"
                  component="p"
                  className="text-red-500 text-sm mt-2 ml-4"
                />
              )}
            </div>

            {/* Company Size */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Size*
              </label>
              <Field
                as="select"
                name="companySize"
                className="w-full px-6 py-4 bg-gray-50 border-0 rounded-full text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">No of Employees</option>
                {companySizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </Field>
              {errors.companySize && touched.companySize && (
                <ErrorMessage
                  name="companySize"
                  component="p"
                  className="text-red-500 text-sm mt-2 ml-4"
                />
              )}
            </div>

            {/* Business Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Type*
              </label>
              <Field
                as="select"
                name="businessType"
                className="w-full px-6 py-4 bg-gray-50 border-0 rounded-full text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Type of you business</option>
                {businessTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </Field>
              {errors.businessType && touched.businessType && (
                <ErrorMessage
                  name="businessType"
                  component="p"
                  className="text-red-500 text-sm mt-2 ml-4"
                />
              )}
            </div>

            {/* SaaS Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                SaaS Category*
              </label>
              <Field
                as="select"
                name="saasCategory"
                className="w-full px-6 py-4 bg-gray-50 border-0 rounded-full text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">SaaS Category</option>
                {saasCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </Field>
              {errors.saasCategory && touched.saasCategory && (
                <ErrorMessage
                  name="saasCategory"
                  component="p"
                  className="text-red-500 text-sm mt-2 ml-4"
                />
              )}
            </div>

            {/* SaaS Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                SaaS Type*
              </label>
              <Field
                as="select"
                name="saasType"
                className="w-full px-6 py-4 bg-gray-50 border-0 rounded-full text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">SaaS Type</option>
                {saasTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </Field>
              {errors.saasType && touched.saasType && (
                <ErrorMessage
                  name="saasType"
                  component="p"
                  className="text-red-500 text-sm mt-2 ml-4"
                />
              )}
            </div>

            {/* Short Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Short Description*
              </label>
              <Field
                as="textarea"
                name="shortDescription"
                placeholder="Write about organization"
                rows="3"
                className="w-full px-6 py-4 bg-gray-50 border-0 rounded-2xl text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
              {errors.shortDescription && touched.shortDescription && (
                <ErrorMessage
                  name="shortDescription"
                  component="p"
                  className="text-red-500 text-sm mt-2 ml-4"
                />
              )}
            </div>

            {/* Detailed Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Detailed Description*
              </label>
              <Field
                as="textarea"
                name="detailedDescription"
                placeholder="Write about organization"
                rows="4"
                className="w-full px-6 py-4 bg-gray-50 border-0 rounded-2xl text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
              {errors.detailedDescription && touched.detailedDescription && (
                <ErrorMessage
                  name="detailedDescription"
                  component="p"
                  className="text-red-500 text-sm mt-2 ml-4"
                />
              )}
            </div>

            {/* Country */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Country*
              </label>
              <Field
                name="country"
                placeholder="Country"
                className="w-full px-6 py-4 bg-gray-50 border-0 rounded-full text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City*
              </label>
              <Field
                name="city"
                placeholder="City name"
                className="w-full px-6 py-4 bg-gray-50 border-0 rounded-full text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Registration Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Registration Number*
              </label>
              <Field
                name="registrationNumber"
                placeholder="Reg No"
                className="w-full px-6 py-4 bg-gray-50 border-0 rounded-full text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.registrationNumber && touched.registrationNumber && (
                <ErrorMessage
                  name="registrationNumber"
                  component="p"
                  className="text-red-500 text-sm mt-2 ml-4"
                />
              )}
            </div>

            {/* Support Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Support Email*
              </label>
              <Field
                name="supportEmail"
                type="email"
                placeholder="Support Mail"
                className="w-full px-6 py-4 bg-gray-50 border-0 rounded-full text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.supportEmail && touched.supportEmail && (
                <ErrorMessage
                  name="supportEmail"
                  component="p"
                  className="text-red-500 text-sm mt-2 ml-4"
                />
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-4 mt-6">
              <button
                type="button"
                onClick={back}
                className="flex items-center justify-center gap-2 px-8 py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-full transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Back
              </button>

              <button
                type="submit"
                className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg rounded-full transition-colors"
              >
                Continue
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

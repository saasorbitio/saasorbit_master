import { Formik, Form, Field } from "formik";
import { useVendorForm } from "../../context/VendorFormContext";

export default function StepSocial({ next, back }) {
  const { formData, updateMultipleFields } = useVendorForm();

  return (
    <div className="w-full">
      {/* Vendor Badge */}
      <div className="flex justify-center mb-6">
        <span className="px-6 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
          {formData.role || "Vendor"}
        </span>
      </div>

      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-900 mb-8">
        Social Media Links
      </h2>

      <Formik
        initialValues={formData}
        enableReinitialize={true}
        onSubmit={(values) => {
          updateMultipleFields(values);
          next();
        }}
      >
        <Form className="flex flex-col gap-6">
          {/* Website */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Website
            </label>
            <Field
              name="website"
              placeholder="www.company.com"
              className="w-full px-6 py-4 bg-gray-50 border-0 rounded-full text-base placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* LinkedIn */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              LinkedIn
            </label>
            <Field
              name="linkedin"
              placeholder="@companyname"
              className="w-full px-6 py-4 bg-gray-50 border-0 rounded-full text-base placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* X.com */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              X.com
            </label>
            <Field
              name="x"
              placeholder="company@x.com"
              className="w-full px-6 py-4 bg-gray-50 border-0 rounded-full text-base placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-4 mt-6">
            <button
              type="button"
              onClick={() => {
                // Skip - just go to next step without saving
                next();
              }}
              className="flex-1 px-8 py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-full transition-colors"
            >
              Skip
            </button>

            <button
              type="submit"
              className="flex-1 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg rounded-full transition-colors"
            >
              Proceed
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

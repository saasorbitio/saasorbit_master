import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useVendorForm } from "../../context/VendorFormContext";

export default function StepCompany({ next, back }) {
  const { formData, updateMultipleFields } = useVendorForm();

  const schema = Yup.object({
    companyName: Yup.string().required("Required"),
    address1: Yup.string().required("Required"),
    address2: Yup.string(),
    city: Yup.string().required("Required"),
    state: Yup.string().required("Required"),
    zip: Yup.string().required("Required"),
    country: Yup.string().required("Required"),
  });

  return (
    <div className="w-full">
      {/* Vendor Badge */}
      <div className="flex justify-center mb-6">
        <span className="px-6 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
          Vendor
        </span>
      </div>

      <Formik
        initialValues={formData}
        enableReinitialize={true}
        validationSchema={schema}
        onSubmit={(values) => {
          updateMultipleFields(values);
          next();
        }}
      >
        {({ errors, touched }) => (
          <Form className="flex flex-col gap-5">
            {/* Company Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Name*
              </label>
              <Field
                name="companyName"
                placeholder="Name"
                className="w-full px-6 py-4 bg-gray-50 border-0 rounded-full text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.companyName && touched.companyName && (
                <ErrorMessage
                  name="companyName"
                  component="p"
                  className="text-red-500 text-sm mt-2 ml-4"
                />
              )}
            </div>

            {/* Address Section */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Address</h3>

              {/* Address Line 1 */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address Line 1
                </label>
                <Field
                  name="address1"
                  placeholder="Address"
                  className="w-full px-6 py-4 bg-gray-50 border-0 rounded-full text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.address1 && touched.address1 && (
                  <ErrorMessage
                    name="address1"
                    component="p"
                    className="text-red-500 text-sm mt-2 ml-4"
                  />
                )}
              </div>

              {/* Address Line 2 */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address Line 2
                </label>
                <Field
                  name="address2"
                  placeholder="Address"
                  className="w-full px-6 py-4 bg-gray-50 border-0 rounded-full text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* City */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City
                </label>
                <Field
                  name="city"
                  placeholder="City"
                  className="w-full px-6 py-4 bg-gray-50 border-0 rounded-full text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.city && touched.city && (
                  <ErrorMessage
                    name="city"
                    component="p"
                    className="text-red-500 text-sm mt-2 ml-4"
                  />
                )}
              </div>

              {/* State/Province */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State/Province
                </label>
                <Field
                  name="state"
                  placeholder="State"
                  className="w-full px-6 py-4 bg-gray-50 border-0 rounded-full text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.state && touched.state && (
                  <ErrorMessage
                    name="state"
                    component="p"
                    className="text-red-500 text-sm mt-2 ml-4"
                  />
                )}
              </div>

              {/* Zip/Postal Code */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Zip/Postal Code
                </label>
                <Field
                  name="zip"
                  placeholder="Code"
                  className="w-full px-6 py-4 bg-gray-50 border-0 rounded-full text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.zip && touched.zip && (
                  <ErrorMessage
                    name="zip"
                    component="p"
                    className="text-red-500 text-sm mt-2 ml-4"
                  />
                )}
              </div>

              {/* Country */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country
                </label>
                <Field
                  name="country"
                  placeholder="Country"
                  className="w-full px-6 py-4 bg-gray-50 border-0 rounded-full text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.country && touched.country && (
                  <ErrorMessage
                    name="country"
                    component="p"
                    className="text-red-500 text-sm mt-2 ml-4"
                  />
                )}
              </div>
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
                Next
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

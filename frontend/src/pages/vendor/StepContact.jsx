import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useVendorForm } from "../../context/VendorFormContext";

export default function StepContact({ next, back }) {
  const { formData, updateMultipleFields } = useVendorForm();

  const schema = Yup.object({
    email: Yup.string().email("Invalid email").required("Required"),
    landline: Yup.string(),
    fax: Yup.string(),
    gst: Yup.string().required("Required"),
  });

  return (
    <div className="w-full">
      {/* Vendor Badge */}
      <div className="flex justify-center mb-8">
        <span className="px-6 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
          Vendor
        </span>
      </div>

      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Contact Details</h2>

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
          <Form className="flex flex-col gap-6">
            {/* Company Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Email
              </label>
              <Field
                name="email"
                type="email"
                placeholder="Email"
                className="w-full px-6 py-4 bg-gray-50 border-0 rounded-full text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && touched.email && (
                <ErrorMessage
                  name="email"
                  component="p"
                  className="text-red-500 text-sm mt-2 ml-4"
                />
              )}
            </div>

            {/* Landline */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Landline
              </label>
              <Field
                name="landline"
                placeholder="Landline"
                className="w-full px-6 py-4 bg-gray-50 border-0 rounded-full text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Fax */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fax
              </label>
              <Field
                name="fax"
                placeholder="Fax"
                className="w-full px-6 py-4 bg-gray-50 border-0 rounded-full text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* VAT/GST Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                VAT/GST Number*
              </label>
              <Field
                name="gst"
                placeholder="Number"
                className="w-full px-6 py-4 bg-gray-50 border-0 rounded-full text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.gst && touched.gst && (
                <ErrorMessage
                  name="gst"
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

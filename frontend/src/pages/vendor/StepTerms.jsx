import { useState, useEffect } from "react";
import { useVendorForm } from "../../context/VendorFormContext";

export default function StepTerms({ back, onSubmit, isSubmitting }) {
  const { formData, updateField } = useVendorForm();
  const [accepted, setAccepted] = useState(formData.accepted);

  // Sync local state with context
  useEffect(() => {
    updateField("accepted", accepted);
  }, [accepted]);

  const handleContinue = async () => {
    if (accepted) {
      await onSubmit();
    }
  };

  return (
    <div className="w-full">
      {/* Vendor Badge */}
      <div className="flex justify-center mb-6">
        <span className="px-6 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
          Vendor
        </span>
      </div>

      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Terms & Conditions
      </h2>

      {/* Terms Content */}
      <div className="bg-gray-50 rounded-2xl p-6 mb-6 max-h-[400px] overflow-y-auto text-sm text-gray-700 leading-relaxed">
        <p className="mb-4">
          Got it — you need a dummy (template) software company agreement that
          can be displayed on your website, likely as a placeholder for a Terms
          & Conditions or Service Agreement page.
        </p>
        <p className="mb-4">
          Here's a clean, professional template for a Software Company Agreement
          you can adapt later:
        </p>

        <h3 className="font-bold text-gray-900 mb-2">
          Software Development & Service Agreement
        </h3>
        <p className="mb-4 text-xs italic">
          (Dummy Document for Website Display Only)
        </p>

        <p className="mb-4">
          This Software Development & Service Agreement ("Agreement") is entered
          into between [Your Company Name], a company incorporated under the
          laws of [Country/State], with its registered office at [Company
          Address] ("Service Provider"), and the client ("Client"), referred to
          together as "the Parties."
        </p>

        <h4 className="font-semibold text-gray-900 mt-4 mb-2">
          1. Scope of Services
        </h4>
        <p className="mb-3">
          The Service Provider agrees to design, develop, and deliver software
          solutions, as detailed in the project proposal and statement of work.
        </p>

        <h4 className="font-semibold text-gray-900 mt-4 mb-2">
          2. Payment Terms
        </h4>
        <ul className="list-disc ml-6 mb-3">
          <li>
            Payment shall be made as per the milestones outlined in the project
            agreement.
          </li>
          <li>Late payments may attract applicable taxes.</li>
        </ul>

        <h4 className="font-semibold text-gray-900 mt-4 mb-2">
          3. Intellectual Property Rights
        </h4>
        <ul className="list-disc ml-6 mb-3">
          <li>
            Upon full payment, all intellectual property rights in the final
            deliverables will be transferred to the Client, unless otherwise
            agreed in writing.
          </li>
          <li>
            The Service Provider retains the right to use its portfolio unless
            agreed otherwise.
          </li>
        </ul>

        <h4 className="font-semibold text-gray-900 mt-4 mb-2">
          4. Confidentiality
        </h4>
        <p className="mb-3">
          Both Parties agree to maintain the confidentiality of proprietary
          information disclosed during the term of this Agreement.
        </p>

        <h4 className="font-semibold text-gray-900 mt-4 mb-2">
          5. Warranties & Limitations
        </h4>
        <ul className="list-disc ml-6 mb-3">
          <li>
            The Service Provider warrants that the software will function
            substantially in accordance with agreed specifications.
          </li>
          <li>No other warranties, expressed or implied, are provided.</li>
        </ul>

        <h4 className="font-semibold text-gray-900 mt-4 mb-2">6. Liability</h4>
        <p className="mb-3">
          The Service Provider shall not be liable for any indirect, incidental,
          or consequential damages arising out of the use or inability to use
          the software.
        </p>

        <h4 className="font-semibold text-gray-900 mt-4 mb-2">
          7. Termination
        </h4>
        <p className="mb-3">
          Either Party may terminate this Agreement with written notice if the
          other Party breaches any material term and fails to cure such breach
          within [X] days.
        </p>

        <h4 className="font-semibold text-gray-900 mt-4 mb-2">
          8. Governing Law
        </h4>
        <p className="mb-4">
          This Agreement shall be governed by and construed in accordance with
          the laws of [Country/State].
        </p>

        <p className="text-xs italic text-gray-600 mt-6">
          <strong>Disclaimer:</strong> This is a dummy agreement provided for
          website display purposes only. It does not create any legal
          obligations and should not be considered a substitute for professional
          legal advice.
        </p>

        <div className="mt-6 text-xs text-gray-600">
          <p>[Your _______________ Company _____________ Name]</p>
          <p>[Your _______________ Website _____________ URL]</p>
          <p>[Your Contact Email]</p>
        </div>

        <p className="mt-4 text-sm">
          If you want, I can also prepare a more detailed version with clickable
          sections so it feels real but is still clearly marked as dummy
          content. Would you like me to do that?
        </p>
      </div>

      {/* Checkbox */}
      <label className="flex items-start gap-3 mb-8 cursor-pointer">
        <input
          type="checkbox"
          checked={accepted}
          onChange={(e) => setAccepted(e.target.checked)}
          className="mt-1 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <span className="text-sm text-gray-700">
          I Accept Terms & Conditions as shown here.
        </span>
      </label>

      {/* Buttons */}
      <div className="flex gap-4">
        <button
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
          onClick={handleContinue}
          disabled={!accepted || isSubmitting}
          className="flex-1 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Submitting..." : "Continue"}
        </button>
      </div>
    </div>
  );
}

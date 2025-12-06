import React, { useEffect, useState } from "react"; 
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const formTypeMap: Record<string, string> = {
  form1: "buyer",
  form2: "vendor",
  form3: "freelancer",
  form4: "media",
};

// ✅ Convert UTC/timestamp → IST readable format
const formatIST = (dateString: string | number) => {
  if (!dateString) return "-";
  try {
    return new Date(dateString).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  } catch {
    return "-";
  }
};

// ✅ Columns definition
const columnSets: Record<string, { key: string; label: string; style?: any }[]> = {
  buyer: [
    { key: "form_type", label: "Type" },
    { key: "name", label: "Name", style: { minWidth: "300px" } },
    { key: "email", label: "Email", style: { minWidth: "300px" } },
    { key: "submittedAtIST", label: "Submitted On", style: { minWidth: "220px" } },
    { key: "company", label: "Company" },
    { key: "industry", label: "Industry" },
    { key: "linkedin", label: "LinkedIn" },
    { key: "useCase", label: "Use Case" },
  ],
  vendor: [
    { key: "form_type", label: "Type" },
    { key: "name", label: "Name", style: { minWidth: "300px" } },
    { key: "email", label: "Email", style: { minWidth: "300px" } },
    { key: "submittedAtIST", label: "Submitted On", style: { minWidth: "220px" } },
    { key: "company", label: "Company" },
    { key: "role", label: "Role/Title" },
    { key: "linkedin", label: "LinkedIn" },
    { key: "productUrl", label: "Product/Service URL" },
    { key: "companySize", label: "Company Size" },
  ],
  freelancer: [
    { key: "form_type", label: "Type" },
    { key: "name", label: "Name", style: { minWidth: "300px" } },
    { key: "email", label: "Email", style: { minWidth: "300px" } },
    { key: "submittedAtIST", label: "Submitted On", style: { minWidth: "220px" } },
    { key: "services", label: "Services Offered" },
    { key: "portfolio", label: "Portfolio/Website" },
    { key: "linkedin", label: "LinkedIn" },
  ],
  media: [
    { key: "form_type", label: "Type" },
    { key: "name", label: "Name", style: { minWidth: "300px" } },
    { key: "email", label: "Email", style: { minWidth: "300px" } },
    { key: "submittedAtIST", label: "Submitted On", style: { minWidth: "220px" } },
    { key: "publication", label: "Publication/Platform" },
    { key: "audienceSize", label: "Audience Size" },
    { key: "contentFocus", label: "Content Focus" },
    { key: "linkedin", label: "LinkedIn" },
  ],
};

const UserDetails: React.FC = () => {
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://getallforms-l2jvyugjwa-uc.a.run.app")
      .then((res) => res.json())
      .then((json) => {
        const formsData = json.data || {};
        const allEntries: any[] = [];

        Object.keys(formsData).forEach((formType) => {
          const entries = formsData[formType] || {};
          Object.entries(entries).forEach(([id, entry]: [string, any]) => {
            allEntries.push({
              id, // ✅ capture entryId for delete
              form_type: formType,
              submittedAtIST:
                entry.submittedAtIST ||
                (entry.submittedAt ? formatIST(entry.submittedAt) : entry.timestamp ? formatIST(entry.timestamp) : "-"),
              rawDate: entry.submittedAt || entry.timestamp || null,
              ...entry,
            });
          });
        });

        allEntries.sort((a, b) => {
          const dateA = new Date(a.rawDate || 0).getTime();
          const dateB = new Date(b.rawDate || 0).getTime();
          return dateB - dateA;
        });

        setSubmissions(allEntries);
      })
      .finally(() => setLoading(false));
  }, []);

  // ✅ Delete handler

const handleDelete = async (formName: string, entryId: string) => {
  if (!window.confirm("Are you sure you want to delete this entry?")) return;

  try {
    const res = await fetch(
      "https://deleteformentry-l2jvyugjwa-uc.a.run.app",
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formName, entryId }),
      }
    );

    const result = await res.json();

    if (res.ok && result.success) {
      alert(`${result.formName} entry deleted successfully`);
      setSubmissions((prev) => prev.filter((item) => item.id !== entryId));
    } else {
      alert(result.message || "Failed to delete entry");
    }
  } catch (err) {
    alert("Error deleting entry");
    console.error(err);
  }
};


  const allColumns = Array.from(
    new Map(Object.values(columnSets).flat().map((col) => [col.key, col])).values()
  );

  const handleDownloadExcel = () => {
    const exportData = submissions.map((entry) => {
      const type = formTypeMap[entry.form_type] || "unknown";
      let row: any = {};
      allColumns.forEach((col) => {
        if (col.key === "form_type") {
          row[col.label] = type;
        } else {
          row[col.label] = entry[col.key] || "-";
        }
      });
      return row;
    });

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Submissions");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "submissions.xlsx");
  };

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-bold">
          Total Submissions ({submissions.length})
        </h2>
        <button
          onClick={handleDownloadExcel}
          className="mt-2 sm:mt-0 px-4 py-2 text-sm text-white rounded-lg bg-gradient-to-r from-[#00bdff] to-[#0046ff]"
        >
          Download to Excel
        </button>
      </div>

      {loading ? (
        <div className="text-gray-500">Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden border border-gray-200 rounded-lg shadow-sm">
              <table className="min-w-full divide-y divide-gray-200 text-sm sm:text-base">
                <thead className="bg-gray-100 sticky top-0 z-10">
                  <tr>
                    {allColumns.map((col) => (
                      <th
                        key={col.key}
                        className="px-3 sm:px-6 py-3 text-gray-700 font-semibold text-center whitespace-nowrap"
                        style={col.style}
                      >
                        {col.label}
                      </th>
                    ))}
                    <th className="px-3 sm:px-6 py-3 text-gray-700 font-semibold text-center">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {submissions.length === 0 ? (
                    <tr>
                      <td
                        colSpan={allColumns.length + 1}
                        className="text-center py-6 text-gray-500"
                      >
                        No submissions found.
                      </td>
                    </tr>
                  ) : (
                    submissions.map((entry, idx) => {
                      const type = formTypeMap[entry.form_type] || "unknown";
                      return (
                        <tr
                          key={idx}
                          className="hover:bg-blue-50 transition-colors duration-150"
                        >
                          {allColumns.map((col) => (
                            <td
                              key={col.key}
                              className="border-2 px-3 sm:px-6 py-3 text-gray-800 text-center align-middle whitespace-nowrap truncate max-w-[200px]"
                              style={col.style}
                            >
                              {col.key === "form_type"
                                ? type
                                : col.key === "linkedin" && entry.linkedin ? (
                                    <a
                                      href={entry.linkedin}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-blue-600 underline hover:text-blue-800"
                                    >
                                      {entry.linkedin}
                                    </a>
                                  ) : col.key === "email" && entry.email ? (
                                    <a
                                      href={`mailto:${entry.email}`}
                                      className="text-blue-600 underline hover:text-blue-800"
                                    >
                                      {entry.email}
                                    </a>
                                  ) : entry[col.key] || "-"}
                            </td>
                          ))}
                          <td className="px-3 sm:px-6 py-3 text-center">
                            <button
                              onClick={() => handleDelete(entry.form_type, entry.id)}
                              className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetails;

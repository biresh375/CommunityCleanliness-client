import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import Loading from "../Components/Loading/Loading";
import { FaDownload } from "react-icons/fa";
import Swal from "sweetalert2";
import Container from "../Components/Container/Container";
import { Helmet } from "react-helmet";

import jsPDF from "jspdf";
import "jspdf-autotable";

const MyContributions = () => {
  const { user, loading, setLoading } = useContext(AuthContext);
  const [contributions, setContributions] = useState([]);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/contribution?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setContributions(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching contributions:", err);
          setLoading(false);
        });
    }
  }, [user?.email, setLoading]);

  if (loading) return <Loading></Loading>;

  // Handle PDF report download
  const handleDownload = (c) => {
    const doc = new jsPDF();

    // Header
    doc.text("My Contribution Report", 14, 15);
    doc.text(`User: ${user.email}`, 14, 25);

    // Table column titles
    const tableColumn = ["Issue Title", "Category", "Amount (৳)", "Date"];

    // Table data rows
    const tableRows = [[c.title, c.category, c.amount, c.date]];

    // ✅ এখানে সঠিকভাবে autoTable() ব্যবহার করো
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 35,
    });

    // ✅ Save PDF
    doc.save(`contribution_report_${user.email}.pdf`);

    // ✅ SweetAlert message
    Swal.fire({
      title: "Report Downloaded!",
      text: `Your contribution report has been generated successfully.`,
      icon: "success",
      confirmButtonColor: "#16a34a",
    });
  };

  return (
    <section className="  min-h-96 py-10 px-2.5 lg:px-2.5">
      <Helmet>
        <meta charSet="utf-8" />
        <title>My Contribution | communitycleanliness</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <Container>
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-5 text-green-600">
            My <span className="text-primary">Contributions</span>
          </h2>

          {contributions.length === 0 ? (
            <p className="text-center text-gray-500">
              You haven’t made any contributions yet.
            </p>
          ) : (
            <div className="overflow-x-auto rounded-2xl shadow-lg bg-white">
              <table className="table w-full">
                <thead className="bg-linear-to-r from-green-600 to-[#00549F] text-white">
                  <tr>
                    <th>#</th>
                    <th>Issue Title</th>
                    <th className="hidden md:block">Category</th>
                    <th>Paid Amount</th>
                    <th className="hidden md:block">Date</th>
                    <th>Report</th>
                  </tr>
                </thead>
                <tbody>
                  {contributions.map((c, index) => (
                    <tr key={c._id} className="hover:bg-gray-50">
                      <td className="font-medium text-gray-700">{index + 1}</td>
                      <td className="font-semibold text-gray-800">
                        {c?.title}
                      </td>
                      <td className="hidden md:block">{c?.category || "—"}</td>
                      <td className="text-primary font-semibold">
                        ৳ {c?.amount}
                      </td>
                      <td className="hidden md:block">{c?.date}</td>
                      <td>
                        <button
                          onClick={() => handleDownload(c)}
                          className="flex items-center gap-2 text-green-600 hover:text-green-800 transition-colors"
                        >
                          <FaDownload /> Download
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
};

export default MyContributions;

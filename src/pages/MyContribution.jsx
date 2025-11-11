import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import Loading from "../Components/Loading/Loading";
import { FaDownload } from "react-icons/fa";
import Swal from "sweetalert2";
import Container from "../Components/Container/Container";

const MyContributions = () => {
  const { user, loading } = useContext(AuthContext);
  const [contributions, setContributions] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);

  // Fetch contributions for logged-in user
  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/contribution?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setContributions(data);
          setDataLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching contributions:", err);
          setDataLoading(false);
        });
    }
  }, [user?.email]);

  if (loading || dataLoading) return <Loading />;

  // Handle PDF report download (fake example for now)
  const handleDownload = (contribution) => {
    Swal.fire({
      title: "Report Downloaded!",
      text: `Report for "${contribution.title}" successfully generated.`,
      icon: "success",
      confirmButtonColor: "#16a34a",
    });

    // You can later replace this with an actual backend PDF route, e.g.:
    // window.open(`http://localhost:3000/contribution/report/${contribution._id}`);
  };

  return (
    <section className=" bg-gray-50 min-h-screen pt-10 px-2.5 lg:px-2.5">
      <Container>
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-5 text-gray-800">
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

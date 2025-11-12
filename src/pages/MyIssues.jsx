import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import Swal from "sweetalert2";
import Loading from "../Components/Loading/Loading";
import Container from "../Components/Container/Container";
import { Helmet } from "react-helmet";

const MyIssues = () => {
  const { user, loading } = useContext(AuthContext);
  const [myIssues, setMyIssues] = useState([]);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch issues
  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/allIssues?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => setMyIssues(data))
        .catch((err) =>
          Swal.fire({
            position: "top-center",
            icon: "error",
            title: `${err.message}`,
            showConfirmButton: false,
            timer: 1500,
          })
        );
    }
  }, [user, myIssues]);

  if (loading) return <Loading />;

  // Delete an issue
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this issue permanently?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e74c3c",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/allIssues/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              setMyIssues((prevIssues) =>
                prevIssues.filter((issue) => issue._id !== id)
              );
              Swal.fire({
                position: "top-center",
                icon: "success",
                title: "Your issue has been deleted 💔",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
      }
    });
  };

  // Update issue
  const handleUpdate = (e) => {
    e.preventDefault();
    setUpdating(true);

    const form = e.target;
    const updatedIssue = {
      title: form.title.value,
      category: form.category.value,
      amount: form.amount.value,
      description: form.description.value,
      status: form.status.value,
    };

    fetch(`http://localhost:3000/allIssues/${selectedIssue._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedIssue),
    })
      .then((res) => res.json())
      .then((data) => {
        setUpdating(false);

        if (data.modifiedCount > 0) {
          Swal.fire("Updated!", "Issue updated successfully!", "success");
          setSelectedIssue(null);
          setIsModalOpen(false);

          // Update local state
          setMyIssues((prevIssues) =>
            prevIssues.map((issue) =>
              issue._id === selectedIssue._id
                ? { ...issue, ...updatedIssue }
                : issue
            )
          );
        }
      })
      .catch(() => setUpdating(false));
  };

  return (
    <section className=" min-h-96 py-10 mx-auto">
      <Helmet>
        <meta charSet="utf-8" />
        <title>My issues |communitycleanliness</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>

      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-green-600">
        My <span className="text-primary">Reported Issues</span>
      </h2>
      <Container>
        <div className="bg-white rounded-2xl shadow">
          <table className="table w-full">
            <thead className="bg-linear-to-r from-green-600 to-[#00549F] text-white text-center">
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Amount (৳)</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {myIssues.map((issue) => (
                <tr
                  key={issue._id}
                  className="hover:bg-gray-50 text-center transition"
                >
                  <td className="font-medium">{issue.title}</td>
                  <td>{issue.category}</td>
                  <td className="text-primary font-semibold">{issue.amount}</td>
                  <td>
                    <span
                      className={`badge ${
                        issue.status === "ongoing"
                          ? "badge-warning"
                          : "badge-success"
                      }`}
                    >
                      {issue.status}
                    </span>
                  </td>
                  <td>{new Date(issue.date).toLocaleDateString()}</td>
                  <td className="flex justify-center gap-2">
                    <button
                      onClick={() => {
                        setSelectedIssue(issue);
                        setIsModalOpen(true);
                      }}
                      className="btn btn-sm btn-outline btn-primary"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(issue._id)}
                      className="btn btn-sm btn-outline btn-error"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {myIssues.length === 0 && (
            <p className="text-center py-10 text-gray-500">
              You haven’t reported any issues yet.
            </p>
          )}
        </div>

        {/* ✅ Update Modal */}
        {isModalOpen && selectedIssue && (
          <dialog open className="modal">
            <div className="modal-box max-w-lg">
              <h3 className="font-bold text-xl text-primary mb-4">
                Update Issue Details
              </h3>

              <form onSubmit={handleUpdate} className="space-y-4">
                <div>
                  <label className="label-text font-medium">Title</label>
                  <input
                    type="text"
                    name="title"
                    defaultValue={selectedIssue.title}
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                <div>
                  <label className="label-text font-medium">Category</label>
                  <select
                    name="category"
                    defaultValue={selectedIssue.category}
                    className="select select-bordered w-full"
                    required
                  >
                    <option value="Garbage">Garbage</option>
                    <option value="Illegal Construction">
                      Illegal Construction
                    </option>
                    <option value="Broken Public Property">
                      Broken Public Property
                    </option>
                    <option value="Road Damage">Road Damage</option>
                  </select>
                </div>

                <div>
                  <label className="label-text font-medium">Amount (৳)</label>
                  <input
                    type="number"
                    name="amount"
                    defaultValue={selectedIssue.amount}
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                <div>
                  <label className="label-text font-medium">Description</label>
                  <textarea
                    name="description"
                    defaultValue={selectedIssue.description}
                    className="textarea textarea-bordered w-full h-24"
                  ></textarea>
                </div>

                <div>
                  <label className="label-text font-medium">Status</label>
                  <div className="flex gap-4 mt-1">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="status"
                        value="ongoing"
                        defaultChecked={selectedIssue.status === "ongoing"}
                        className="radio radio-success"
                      />
                      Ongoing
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="status"
                        value="ended"
                        defaultChecked={selectedIssue.status === "ended"}
                        className="radio radio-success"
                      />
                      Ended
                    </label>
                  </div>
                </div>

                <div className="modal-action flex flex-col gap-2">
                  <button
                    type="submit"
                    disabled={updating}
                    className="btn bg-linear-to-r from-green-600 to-[#00549F] text-white w-full hover:bg-green-700"
                  >
                    {updating ? "Updating..." : "Update Issue"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="btn btn-outline btn-primary w-full"
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </dialog>
        )}
      </Container>
    </section>
  );
};

export default MyIssues;

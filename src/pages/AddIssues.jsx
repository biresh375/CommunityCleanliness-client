import React, { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import Swal from "sweetalert2";
import Loading from "../Components/Loading/Loading";
import { Helmet } from "react-helmet";

const AddIssues = () => {
  const { user, loading } = useContext(AuthContext);
  const [submitting, setSubmitting] = useState(false);

  if (loading) return <Loading></Loading>;

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    const form = e.target;
    const title = form.title.value;
    const category = form.category.value;
    const location = form.location.value;
    const description = form.description.value;
    const image = form.image.value;
    const amount = form.amount.value;
    const date = new Date().toISOString();
    const email = user?.email;
    const status = "ongoing"; // default

    const newIssue = {
      title,
      category,
      location,
      description,
      image,
      amount,
      date,
      email,
      status,
    };

    // Save to MongoDB (Backend API)
    fetch("https://community-cleanliness-server-three.vercel.app/issues", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newIssue),
    })
      .then((res) => res.json())
      .then((data) => {
        setSubmitting(false);
        if (data.insertedId) {
          Swal.fire({
            title: "Issue Reported!",
            text: "Your report has been submitted successfully 💚",
            icon: "success",
            confirmButtonColor: "#16a34a",
          });
          form.reset();
        } else {
          Swal.fire({
            title: "Error!",
            text: "Something went wrong. Please try again.",
            icon: "error",
          });
        }
      })
      .catch(() => {
        setSubmitting(false);
        Swal.fire({
          title: "Network Error!",
          text: "Unable to submit the issue right now.",
          icon: "error",
        });
      });
  };

  return (
    <section className="py-10 bg-linear-to-b ">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Report New Issue |communitycleanliness</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="container mx-auto px-5 max-w-3xl bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-5 text-green-600">
          Report a <span className="text-primary">New Issue</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Issue Title
            </label>
            <input
              type="text"
              name="title"
              required
              placeholder="Enter issue title"
              className="input input-bordered w-full"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Category
            </label>
            <select
              name="category"
              required
              className="select select-bordered w-full"
            >
              <option value="">Select Category</option>
              <option value="Garbage">Garbage</option>
              <option value="Illegal Construction">Illegal Construction</option>
              <option value="Broken Public Property">
                Broken Public Property
              </option>
              <option value="Road Damage">Road Damage</option>
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Location
            </label>
            <input
              type="text"
              name="location"
              required
              placeholder="Enter exact location"
              className="input input-bordered w-full"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Description
            </label>
            <textarea
              name="description"
              required
              placeholder="Describe the issue..."
              className="textarea textarea-bordered w-full h-28"
            ></textarea>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Image URL
            </label>
            <input
              type="url"
              name="image"
              required
              placeholder="Paste image link"
              className="input input-bordered w-full"
            />
          </div>

          {/* Amount */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Estimated Fix Budget (৳)
            </label>
            <input
              type="number"
              name="amount"
              required
              placeholder="Enter suggested budget"
              className="input input-bordered w-full"
            />
          </div>

          {/* Email (Read Only) */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Your Email
            </label>
            <input
              type="email"
              name="email"
              readOnly
              defaultValue={user?.email}
              className="input input-bordered w-full "
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full btn-outline btn-primary bg-linear-to-r from-green-600 to-[#00549F] text-white py-3 rounded-full transition-all font-semibold"
          >
            {submitting ? "Submitting..." : "Submit Issue"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddIssues;

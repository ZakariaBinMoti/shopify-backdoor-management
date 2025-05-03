import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ProjectForm() {
  const email = localStorage.getItem("userEmail");
  console.log(email);
  if (!email) {
    // Redirect to login page if email is not found in localStorage
    window.location.href = "/login";
  }
  
  const [isLoading, setisLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    projectName: "",
    clientName: "",
    developerName: "",
    status: "active", // You can keep this for local state management
    userEmail: email, // Set the userEmail from localStorage
  });

  const generateShopifyID = () => {
    return Math.floor(1000000000 + Math.random() * 9000000000).toString();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    setisLoading(true);
    e.preventDefault();

    // Determine theme based on status
    const theme = formData.status === "active" ? "D8ywzaQPf2" : "0DCisNIscD";

    const dataToSubmit = {
      ...formData,
      shopify: generateShopifyID(), // Change to shopify
      theme: theme, // Set theme based on status
    };
    // console.log(dataToSubmit);
    

    try {
      const response = await fetch("http://localhost:5000/websites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSubmit),
      });

      if (response.ok) {
        const result = await response.json();
        // console.log("Form submitted successfully:", result);

        // Show success notification and reset form fields
        toast.success("Form submitted successfully!");
        setFormData({
          projectName: "",
          clientName: "",
          developerName: "",
          status: "active", // Reset status to default
          userEmail: "",
        });

        // Redirect to home page
        navigate("/");
      } else {
        console.error("Failed to submit form");
        toast.error("Failed to submit form. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred while submitting the form.");
    }
    setisLoading(false);
  };

  if(isLoading) return <div className="h-svh flex justify-center items-center"><span className="loading p-10 loading-bars loading-lg"></span></div>;

  return (
    <div className="mt-32">
      <div className="max-w-lg mx-auto mb-5">
        <Link to="/">
          <button className="px-4 py-2 text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out">
            <img src="https://img.icons8.com/?size=16&id=39800&format=png&color=000000" alt="" />
          </button>
        </Link>
      </div>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg space-y-4">
        <div>
          <label htmlFor="projectName" className="block text-sm font-medium text-gray-700">Project Name</label>
          <input
            type="text"
            id="projectName"
            name="projectName"
            value={formData.projectName}
            onChange={handleChange}
            placeholder="Enter project name"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>

        <div>
          <label htmlFor="clientName" className="block text-sm font-medium text-gray-700">Client Name<span className="text-red-600 font-bold"> *</span></label>
          <input
            type="text"
            id="clientName"
            name="clientName"
            value={formData.clientName}
            onChange={handleChange}
            placeholder="Enter client name"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>

        <div>
          <label htmlFor="developerName" className="block text-sm font-medium text-gray-700">Developer Name <span className="text-red-600 font-bold">*</span> </label>    
          <input
            type="text"
            id="developerName"
            name="developerName"
            value={formData.developerName}
            onChange={handleChange}
            placeholder="Enter developer name"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-gray-500 text-white font-medium rounded-md shadow hover:bg-gray-600 focus:outline-none focus:ring-2 focus:bg-gray-600 focus:ring-opacity-50"
          >
            Submit
          </button>
        </div>
      </form>

      {/* Toast Container */}
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}

export default ProjectForm;

import { useQuery } from "@tanstack/react-query";
import WebsiteTableRow from "../component/WebsiteTableRow";
import { Link, useNavigate } from "react-router-dom";
import GreatNews from "../component/GreatNews";

const Home = () => {
  const navigate = useNavigate();
  const email = localStorage.getItem("userEmail");
  if (!email) {
    // Redirect to login page if email is not found in localStorage
    window.location.href = "/login";
  }
  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch(`http://localhost:5000/websites?email=${email}`).then((res) => res.json()),
  });

  // console.log(data);
  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    navigate('/login');
  };

  if (isPending)
    return (
      <div className="h-svh flex justify-center items-center">
        <span className="loading p-10 loading-bars loading-lg"></span>
      </div>
    );

  if (error) return "An error has occurred: " + error.message;
  return (
    
    <div>
      <GreatNews></GreatNews>
      <div>
        <div className="flex justify-center items-center max-w-[1200px] mx-auto relative">
        <h1 className="text-center text-2xl pt-8 pb-4">
          Shopify Backdoor Management{" "}
          <span className="text-sm font-semibold text-[#0000005a]">
            v1.1.0
          </span>
        </h1>
        {
  !email ? (
    <Link to="/login">
      <button className="px-4 py-1 text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out mr-auto bg-blue-600 absolute right-0 top-6">
        Login
      </button>
    </Link>
  ) : (
    <button
      onClick={handleLogout}
      className="px-4 py-1 text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out mr-auto bg-blue-600 absolute right-0 top-6"
    >
      Logout
    </button>
  )
}

 
        </div>
<div className="flex justify-end items-end max-w-[1200px] mx-auto">
<button
          className="text-blue-500 pb-4"
          onClick={() => document.getElementById("my_modal_2").showModal()}
        >
          (Instruction Guideline)
        </button>
</div>
      </div>
      <div className="h-[83svh] overflow-scroll max-w-[1200px] mx-auto mt-4">
        <div className="overflow-x-auto">
          <table className="table table-xs">
            <thead>
              <tr>
                <th className="pb-2"></th>
                <th className="pb-2">Project Name</th>
                <th className="pb-2">Client Name</th>
                <th className="pb-2">Developer Name</th>
                <th className="pb-2">Code</th>
                <th className="pb-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((website, index) => (
                <WebsiteTableRow
                  website={website}
                  key={website._id}
                  index={index}
                  refetch={refetch}
                ></WebsiteTableRow>
              ))}
            </tbody>
          </table>
          <div className="flex justify-end pr-[85px] pt-5">
            <Link to="/form">
              <button className="px-3 py-1 bg-gray-500 text-white text-sm font-medium rounded-md shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition duration-300 ease-in-out">
                Add New Project
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="">
        <p className="text-center">
          &copy; 2024.{" "}
          <a
            className="text-blue-600"
            href="https://linkedin.com/in/zakariabinmoti"
            target="_blank"
          >
            Zakaria Bin Moti
          </a>
          . All rights reserved.
        </p>
      </div>

      <dialog id="my_modal_2" className="modal">
        <div className="modal-box max-w-[800px]">
        <div className="max-w-[1200px]mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
  <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">How to Use</h2>
  
  <div className="space-y-4 text-gray-700">
    <div>
      <h3 className="text-lg font-semibold">1. Add a New Project</h3>
      <p>Click on the <span className="font-semibold text-blue-600">"Add New Project"</span> button. Fill in the following details:</p>
      <ul className="list-disc list-inside ml-4 mt-2">
        <li><span className="font-semibold">Project Name</span> (optional)</li>
        <li><span className="font-semibold">Client Name</span></li>
        <li><span className="font-semibold">Developer Name</span></li>
        <li><span className="font-semibold">Status</span></li>
      </ul>
    </div>
    
    <div>
      <h3 className="text-lg font-semibold">2. Submit Your Project</h3>
      <p>After entering the details, click the <span className="font-semibold text-blue-600">Submit</span> button to save your project.</p>
    </div>
    
    <div>
      <h3 className="text-lg font-semibold">3. Copy the Code</h3>
      <p>Locate your new project, copy the generated <span className="font-semibold">CODE</span>.</p>
    </div>
    
    <div>
      <h3 className="text-lg font-semibold">4. Embed in Shopify</h3>
      <p>Paste the copied <span className="font-semibold">CODE</span> just above the closing <span className="font-mono">&lt;/body&gt;</span> tag in your <span className="font-mono">theme.liquid</span> file.</p>
    </div>
    
    <div>
      <h3 className="text-lg font-semibold">5. Manage Your Website</h3>
      <p>Control your site easily by toggling the <span className="font-semibold text-green-600">Active</span> and <span className="font-semibold text-red-600">Inactive</span> buttons to update your project’s status in real-time.</p>
    </div>
  </div>
</div>

        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default Home;

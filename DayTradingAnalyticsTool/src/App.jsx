import { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [news, setNews] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get("http://localhost:3000/");
        setNews(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchNews();
  }, []);

  const impactColor = (impact) => {
    if (!impact) return "text-gray-500";
    if (impact.includes("High")) return "text-red-500";
    if (impact.includes("Medium")) return "text-yellow-500";
    return "text-gray-500";
  };

  return (
    <div className="relative min-h-screen bg-gray-900 text-white p-6 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-semibold mb-6">High Impact Forex News</h1>
        <div className="overflow-x-auto rounded-lg shadow-lg bg-gray-800">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-700 text-left text-sm uppercase text-gray-300">
              <tr>
                <th className="px-6 py-3">Time</th>
                <th className="px-6 py-3">Currency</th>
                <th className="px-6 py-3">Event</th>
                <th className="px-6 py-3">Impact</th>
                <th className="px-6 py-3">Information</th>
                <th className="px-6 py-3">Actual</th>
                <th className="px-6 py-3">Forecast</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700 text-sm">
              {news.map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-700">
                  <td className="px-6 py-3">{item.time}</td>
                  <td className="px-6 py-3 font-semibold text-blue-400">
                    {item.currency}
                  </td>
                  <td className="px-6 py-3">{item.event}</td>
                  <td
                    className={`px-6 py-3 font-medium ${impactColor(
                      item.impact
                    )}`}
                  >
                    {item.impact}
                  </td>
                  <td className="px-6 py-3 text-center">
                    <button onClick={() => setSelectedItem(item)}>
                      <FontAwesomeIcon icon={faAngleRight} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {news.length === 0 && (
            <div className="text-center py-6 text-gray-400">
              Loading news or no events found...
            </div>
          )}
        </div>
      </div>

      {/* Slide-in card */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-300 ${
          selectedItem ? "backdrop-blur-sm bg-black/30" : "pointer-events-none"
        }`}
        onClick={() => setSelectedItem(null)}
      >
        <div
          className={`absolute left-0 top-0 h-full w-1/3 bg-gray-800 shadow-lg transform transition-transform duration-300 ${
            selectedItem ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            <h2 className="text-xl font-bold mb-2">{selectedItem?.event}</h2>
            <p className="mb-2">
              <strong>Time:</strong> {selectedItem?.time}
            </p>
            <p className="mb-2">
              <strong>Currency:</strong> {selectedItem?.currency}
            </p>
            <p className={`mb-4 ${impactColor(selectedItem?.impact)}`}>
              <strong>Impact:</strong> {selectedItem?.impact}
            </p>
            <p className={`mb-4 ${impactColor(selectedItem?.actual)}`}>
              <strong>Actual:</strong> {selectedItem?.actual}
            </p>

            <p className={`mb-4 ${impactColor(selectedItem?.forecast)}`}>
              <strong>Forecast:</strong> {selectedItem?.forecast}
            </p>


            <button
              type="button"
              class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              onClick={() => setSelectedItem(null)}
            >
              Close
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

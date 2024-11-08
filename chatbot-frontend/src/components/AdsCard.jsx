
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
    Title,
  } from "chart.js";
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
    Title
  );
  import { Pie } from "react-chartjs-2";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import {
    faFacebook,
    faInstagram,
    faYoutube,
  } from "@fortawesome/free-brands-svg-icons";
const AdsCard = () => {
    const pieData = [
      {
        platform: "Facebook",
        icon: faFacebook,
        chartData: {
          labels: ["Engagement", "Reach", "Clicks"],
          datasets: [
            {
              data: [30, 40, 30],
              backgroundColor: ["#3b5998", "#8b9dc3", "#dfe3ee"],
              hoverOffset: 4,
            },
          ],
        },
      },
      {
        platform: "Instagram",
        icon: faInstagram,
        chartData: {
          labels: ["Engagement", "Reach", "Clicks"],
          datasets: [
            {
              data: [25, 50, 25],
              backgroundColor: ["#e1306c", "#f56040", "#fd1d1d"],
              hoverOffset: 4,
            },
          ],
        },
      },
      {
        platform: "YouTube",
        icon: faYoutube,
        chartData: {
          labels: ["Views", "Likes", "Subscribers"],
          datasets: [
            {
              data: [40, 30, 30],
              backgroundColor: ["#ff0000", "#ff6347", "#ffa07a"],
              hoverOffset: 4,
            },
          ],
        },
      },
    ];
  
    return (
      <div className="bg-white rounded-lg shadow-[0px_2px_6px_rgba(0,0,0,0.1),0px_8px_24px_rgba(0,0,0,0.15)] p-6 mt-8">
        <h4 className="text-lg font-semibold text-gray-700 mb-6 text-start">
          ADS
        </h4>
        <div className="space-y-6">
          {pieData.map(({ platform, icon, chartData }) => (
            <div
              key={platform}
              className="flex items-center gap-12 justify-between"
            >
              <div className="flex items-center">
                <FontAwesomeIcon
                  icon={icon}
                  className="text-3xl text-gray-600 mr-4"
                />
                <h5 className="text-md font-semibold text-gray-600">
                  {platform}
                </h5>
              </div>
              <div style={{ width: "50px", height: "50px" }}>
                <Pie
                  data={chartData}
                  options={{
                    cutout: "70%",
                    plugins: { legend: { display: false } },
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  export default AdsCard;
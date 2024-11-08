import { faDesktop, faMobileAlt } from "@fortawesome/free-solid-svg-icons";
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
import { Bar } from "react-chartjs-2";

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


const DashboardPourcentage = ({ courseDetails }) => {
    const barChartData = {
      labels: ["Master", "Licence", "Certificat"],
      datasets: [
        {
          // label: "Pourcentage",
          data: courseDetails,
          backgroundColor: "#6366F1",
        },
      ],
    };
    return (
        <div className="">
          <div className="flex">
            <div style={{ height: "250px", width: "100%" }}>
              {" "}
              <Bar
                data={barChartData}
                options={{
                  responsive: true,
                  indexAxis: "y",
                  maintainAspectRatio: false,
                  scales: {
                    x: {
                      beginAtZero: true,
                      max: 100,
                    },
                  },
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  elements: {
                    bar: {
                      barThickness: 10,
                      maxBarThickness: 10,
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      );
}
export default DashboardPourcentage;
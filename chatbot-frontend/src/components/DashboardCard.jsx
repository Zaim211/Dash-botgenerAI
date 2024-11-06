import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { Pie, Bar } from "react-chartjs-2";
import { faFacebook, faInstagram, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faDesktop, faMobileAlt } from "@fortawesome/free-solid-svg-icons"; 
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const DashboardCard = ({ title, stat, icon, bgColor }) => (
  <div
    className={`p-6 bg-white rounded-lg shadow-md text-center border-t-4 ${bgColor}`}
  >
    <div className="flex items-center justify-center mb-4">
      <FontAwesomeIcon icon={icon} className="text-4xl text-gray-700" />
    </div>
    <h4 className="text-lg font-semibold mb-2 text-gray-700">{title}</h4>
    <p className="text-3xl font-bold text-gray-900">{stat}</p>
  </div>
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
};

const DashboardCharts = ({ totalLeads, categoryCounts }) => {
  const pieChartDataLeft = {
    labels: [
      "Étudiant",
      "Sans emploi",
      "Salarié en activité",
      "Parent",
      "Entreprise",
    ],
    datasets: [
      {
        data: categoryCounts,
        backgroundColor: [
          "#3B82F6",
          "#FBBF24",
          "#F87171",
          "#34D399",
          "#A78BFA",
        ],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between">
        <div className="bg-white rounded-lg shadow-[0px_2px_6px_rgba(0,0,0,0.1),0px_8px_24px_rgba(0,0,0,0.15)] w-full">
          <h4 className="text-lg text-center mt-2 font-semibold text-gray-700 mb-2">
            Répartition des leads
          </h4>
          <Pie data={pieChartDataLeft} options={{ cutout: "90%" }} />
          <p className="text-center mt-4 text-2xl font-semibold">
            Total {totalLeads}
          </p>{" "}
        </div>
      </div>
    </div>
  );
};

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
    <h4 className="text-lg font-semibold text-gray-700 mb-6 text-start">ADS</h4>
    <div className="space-y-6">
      {pieData.map(({ platform, icon, chartData }) => (
        <div key={platform} className="flex items-center gap-12 justify-between">
          <div className="flex items-center">
            <FontAwesomeIcon icon={icon} className="text-3xl text-gray-600 mr-4" />
            <h5 className="text-md font-semibold text-gray-600">{platform}</h5>
          </div>
          <div style={{ width: "50px", height: "50px" }}>
            <Pie data={chartData} options={{ cutout: "70%", plugins: { legend: { display: false } } }} />
          </div>
        </div>
      ))}
    </div>
  </div>
  
  );
};
const DeviceCard = ({ mobileVisits, desktopVisits }) => {
  const deviceData = {
    labels: ["Mobile", "Desktop"],
    datasets: [
      {
        data: [mobileVisits, desktopVisits],
        backgroundColor: ["#34D399", "#3B82F6"],
        hoverOffset: 4,
      },
    ],
  };

  return (
    // <div className="bg-white rounded-lg shadow-md p-6 mt-8">
    //   <h4 className="text-lg font-semibold text-gray-700 mb-6 text-center">Visites par Appareil</h4>
    //   <div className="flex items-center justify-center">
    //     <div style={{ width: "200px", height: "200px" }}>
    //       <Pie data={deviceData} options={{ cutout: "70%", plugins: { legend: { display: false } } }} />
    //     </div>
    //   </div>
    //   <div className="text-center mt-4">
    //     <p className="text-md font-semibold text-gray-600">Visites Mobiles: {mobileVisits}%</p>
    //     <p className="text-md font-semibold text-gray-600">Visites sur Desktop: {desktopVisits}%</p>
    //   </div>
    // </div>
    <div className="bg-white rounded-lg shadow-[0px_2px_6px_rgba(0,0,0,0.1),0px_8px_24px_rgba(0,0,0,0.15)] p-6 mt-8">
      <h4 className="text-lg font-semibold text-gray-700 mb-6 text-center">Visites par Appareil</h4>
      <div className="flex items-center justify-center flex-col">
      <div className="mt-4 flex  items-center justify-center gap-8 space-x-4">
          <div className="text-center">
            <FontAwesomeIcon icon={faDesktop} className="text-3xl text-gray-600 mb-2" />
            <p className="text-md font-semibold text-gray-600">Desktop</p>
          </div>
          <div className="text-center">
            <FontAwesomeIcon icon={faMobileAlt} className="text-3xl text-gray-600 mb-2" />
            <p className="text-md font-semibold text-gray-600">Mobile</p>
          </div>
        </div>
        {/* <div style={{ width: "200px", height: "200px" }}>
          <Pie data={deviceData} options={{ cutout: "70%", plugins: { legend: { display: false } } }} />
        </div> */}

        
      </div>
      <div className="text-center mt-16">
        <p className="text-md font-semibold text-gray-600">Visites Mobiles : {mobileVisits}%</p>
        <p className="text-md font-semibold text-gray-600">Visites sur Desktop : {desktopVisits}%</p>
      </div>
    </div>
  );
};

const DashboardCards = () => {
  const [totalLeads, setTotalLeads] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryCounts, setCategoryCounts] = useState([0, 0, 0, 0, 0]);
  const [courseDetails, setCourseDetails] = useState([0, 0, 0]);
  const [leads, setLeads] = useState([]);
  const [mobileVisits, setMobileVisits] = useState(0);
  const [desktopVisits, setDesktopVisits] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/data");
        const leadsData = response.data.chatData;
        setLeads(leadsData);
        setTotalLeads(leadsData.length);
        const mobileVisitCount = leadsData.filter(lead => lead.device === "mobile").length;
        const desktopVisitCount = leadsData.filter(lead => lead.device === "desktop").length;

        setMobileVisits((mobileVisitCount / leadsData.length) * 100);
        setDesktopVisits((desktopVisitCount / leadsData.length) * 100);

        const categories = [
          "Étudiant",
          "Demandeur d'emploi",
          "Salarié en activité",
          "Un parent",
          "Une entreprise",
        ];
        const counts = categories.map(
          (category) =>
            leadsData.filter(
              (lead) =>
                (lead.not_talk && lead.not_talk.includes(category)) ||
                (lead.remmberme && lead.remmberme.includes(category)) ||
                (lead.job_seeker && lead.job_seeker.includes(category)) ||
                (lead.company && lead.company.includes(category)) ||
                (lead.remmberme && lead.remmberme.includes(category))
            ).length
        );

        setCategoryCounts(counts);
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCategorySelect = (category) => {
    const filteredLeads = leads.filter(
      (lead) =>
        (lead.not_talk && lead.not_talk.includes(category)) ||
        (lead.remmberme && lead.remmberme.includes(category))
    );

    const courseCounts = { Master: 0, Licence: 0, Certificat: 0 };

    filteredLeads.forEach((lead) => {
      const course = lead.course_details;
      if (courseCounts[course] !== undefined) {
        courseCounts[course] += 1;
      }
    });

    const totalCourses = filteredLeads.length;
    const newCourseDetails = [
      (courseCounts.Master / totalCourses) * 100 || 0,
      (courseCounts.Licence / totalCourses) * 100 || 0,
      (courseCounts.Certificat / totalCourses) * 100 || 0,
    ];

    setCourseDetails(newCourseDetails);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-4 rounded-md gap-6 mt-6">
        <DashboardCard
          title="Total des Leads"
          stat={totalLeads}
          icon={faUserPlus}
          bgColor="border-blue-500"
        />
      </div>

      <div className="flex gap-4 items-center">
        <DashboardCharts
          totalLeads={totalLeads}
          categoryCounts={categoryCounts}
        />

        <div className="w-full flex flex-col pb-14 mt-8 space-y-2 bg-white rounded-lg shadow-[0px_2px_6px_rgba(0,0,0,0.1),0px_8px_24px_rgba(0,0,0,0.15)]">
          <div className="flex space-x-2 p-4  mb-2">
            {[
              "Étudiant",
              "Sans emploi",
              "Salarié en activité",
              "Un parent",
              "Entreprise",
            ].map((category, index) => (
              <button
                key={index}
                className={`py-2 text-sm rounded w-full ${
                  [
                    "bg-blue-500",
                    "bg-yellow-500",
                    "bg-pink-500",
                    "bg-green-500",
                    "bg-purple-500",
                  ][index]
                } text-white`}
                onClick={() => handleCategorySelect(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <DashboardPourcentage courseDetails={courseDetails} />
        </div>
        
      </div>
      {/* <div className="grid grid-cols-2 md:flex-cols-1 rounded-md gap-6 mt-6">
      <AdsCard />
      </div> */}
       <div className="w-full flex flex-row  gap-8">
            <DeviceCard mobileVisits={mobileVisits} desktopVisits={desktopVisits} />
            <AdsCard />
          </div>
    </div>
  );
};

export default DashboardCards;

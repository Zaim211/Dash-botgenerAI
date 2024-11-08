import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faCalendarAlt,
  faArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { Pie, Line } from "react-chartjs-2";

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
import DashboardPourcentage from "./DashboardPourcentage";
import DashboardCharts from "./DashboardCharts";
import AdsCard from "./AdsCard";
import DeviceCard from "./DeviceCard";
import Statistics from "./Statistics";

const TauxCapture = ({
  qualifiePercent,
  desqualifiePercent,
  qualifieCount,
  desqualifieCount,
}) => {
  const totalPercent = qualifiePercent + desqualifiePercent;

  const data = {
    labels: ["Total"],
    datasets: [
      {
        data: [totalPercent],
        backgroundColor: ["#4CAF50"],
        hoverBackgroundColor: ["#66BB6A"],
      },
    ],
  };
  const options = {
    maintainAspectRatio: false,
    plugins: {
      datalabels: {
        display: true,
        color: "#ffffff",
        font: {
          weight: "bold",
          size: 30,
        },
        formatter: () => `${totalPercentage}%`,
      },
      tooltip: {
        enabled: false,
      },
      legend: {
        display: false,
      },
    },
    cutout: "80%", // Makes the pie chart into a donut shape
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-[0px_2px_6px_rgba(0,0,0,0.1),0px_8px_24px_rgba(0,0,0,0.15)] flex flex-col items-center">
      <h1 className="text-lg font-semibold text-gray-700 mb-6">
        Taux de captation
      </h1>
      <div className="relative w-40 h-40 mb-8">
        <Pie data={data} options={options} />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-gray-700">
            {totalPercent}%
          </span>
        </div>
      </div>
      <div className="flex justify-between w-full mt-8">
        <div className="">
          <h1 className="text-sm font-semibold text-gray-300">
            Contact disqualifié
          </h1>
          <p className="text-center text-md font-semibold text-gray-600">
            {desqualifieCount}
          </p>
        </div>
        <p className="text-md text-center font-semibold text-gray-300">
          <h1 className="text-sm font-semibold text-gray-300">
            Contact qualifié
          </h1>
          <p className="text-center text-md font-semibold text-gray-600">
            {qualifieCount}
          </p>
        </p>
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
  const [averageDailyLeads, setAverageDailyLeads] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/data");
        const leadsData = response.data.chatData;
        setLeads(leadsData);
        setTotalLeads(leadsData.length);

        // Calculate average daily leads
        const uniqueDates = [
          ...new Set(
            leadsData.map((lead) =>
              new Date(lead.createdAt).toLocaleDateString()
            )
          ),
        ];
        const average = leadsData.length / uniqueDates.length;
        setAverageDailyLeads(average);

        const mobileVisitCount = leadsData.filter(
          (lead) => lead.device === "mobile"
        ).length;
        const desktopVisitCount = leadsData.filter(
          (lead) => lead.device === "desktop"
        ).length;

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
                (lead.company && lead.company.includes(category))
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

  const categories = [
    { label: "Étudiant", color: "bg-blue-500" },
    { label: "Sans emploi", color: "bg-yellow-500" },
    { label: "Salarié en activité", color: "bg-pink-500" },
    { label: "Un parent", color: "bg-green-500" },
    { label: "Entreprise", color: "bg-purple-500" },
  ]

  const prepareChartData = () => {
    const groupedLeads = leads.reduce((acc, lead) => {
      const date = new Date(lead.createdAt).toLocaleDateString();
      if (!acc[date]) acc[date] = 0;
      acc[date]++;
      return acc;
    }, {});

    const dates = Object.keys(groupedLeads);
    const counts = Object.values(groupedLeads);

    return {
      labels: dates,
      datasets: [
        {
          label: "Leads",
          data: counts,
          fill: false,
          borderColor: "#3498db",
          tension: 0.6,
        },
      ],
    };
  };
  const chartData = prepareChartData();
  const getOneDecimalPlace = (number) => {
    return number.toFixed(1);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-3 md:grid-cols-3 w-full gap-6 rounded-md mt-2">
        <div className="md:col-span-1">
          <DeviceCard
            mobileVisits={mobileVisits}
            desktopVisits={desktopVisits}
          />
          <div className="mt-4">
            <TauxCapture
              qualifiePercent={56}
              desqualifiePercent={44}
              qualifieCount={560}
              desqualifieCount={440}
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="bg-white  rounded-lg  shadow-[0px_2px_6px_rgba(0,0,0,0.1),0px_8px_24px_rgba(0,0,0,0.15)] mt-4 w-full">
            <h2 className="text-lg font-semibold px-6 py-4 text-gray-700 ">
              Contacts
            </h2>
            <div className="flex items-center  w-full">
              {/* Titles Section */}
              <div className="flex flex-col space-y-12 justify-between w-1/6">
                {/* Prévisions annuelles */}
                <div className="text-center">
                  <div className="mt-4">
                    <FontAwesomeIcon
                      icon={faCalendarAlt}
                      className="text-blue-200 text-xl mx-auto"
                    />
                  </div>
                  <h3 className="text-xs text-gray-400 font-semibold">
                    Prévisions annuelles
                  </h3>
                  <p className="text-xl font-bold">{totalLeads}</p>
                </div>

                {/* Moyenne quotidienne */}
                <div className="text-center">
                  <div className="mb-2">
                    <FontAwesomeIcon
                      icon={faArrowUp}
                      className="text-green-400 text-xl mx-auto"
                    />
                  </div>
                  <h3 className="text-xs text-gray-400 font-semibold">
                    Moyenne quotidienne
                  </h3>
                  <p className="text-xl font-bold">
                    {getOneDecimalPlace(averageDailyLeads)}
                  </p>
                </div>
              </div>

              <div className="w-5/6 h-[300px]">
                <Line
                  data={chartData}
                  options={{
                    responsive: true,
                    scales: {
                      x: {
                        title: {
                          display: false,
                        },
                        ticks: {
                          display: false,
                          beginAtZero: true,
                          stepSize: 1,
                        },
                      },
                      y: {
                        title: {
                          display: false,
                        },
                        min: 0,
                        max: 50,
                        ticks: {
                          stepSize: 10,
                        },
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <Statistics
              mobileVisits={mobileVisits}
              avgPagesVisited={5}
              medianSessionTime={10}
              creditScore={700}
            />
          </div>
        </div>
      </div>

      <div className="flex gap-4 items-center">
        <DashboardCharts
          totalLeads={totalLeads}
          categoryCounts={categoryCounts}
        />

        <div className="w-full flex flex-col pb-14 mt-8 space-y-2 bg-white rounded-lg shadow-[0px_2px_6px_rgba(0,0,0,0.1),0px_8px_24px_rgba(0,0,0,0.15)]">
          {/* <div className="flex space-x-2 p-4  mb-2">
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
          </div> */}
           <div className="flex space-x-2 p-4 mb-2">
        {categories.map((category, index) => (
          <button
            key={index}
            className={`py-2 text-sm rounded w-full ${
              selectedCategory === category.label
                ? "bg-pink-600 text-white"
                : "bg-gray-100 text-black"
            }`}
            onClick={() => handleCategorySelect(category.label)}
          >
            {category.label}
          </button>
        ))}
      </div>

          <DashboardPourcentage courseDetails={courseDetails} />
        </div>
      </div>
      <div className="w-full flex flex-row  gap-8">
        <AdsCard />
      </div>
    </div>
  );
};

export default DashboardCards;

// import React from 'react'; 
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUserPlus, faCalendarCheck, faPhone, faChartLine } from '@fortawesome/free-solid-svg-icons';
// import { Bar, Line, Pie } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);


// const DashboardCard = ({ title, stat, icon, bgColor }) => {
//   return (
//     <div className={`p-6 bg-white rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300 border-t-4 ${bgColor}`}>
//       <div className="flex items-center justify-center mb-4">
//         <FontAwesomeIcon icon={icon} className="text-4xl text-gray-700" />
//       </div>
//       <h4 className="text-lg font-semibold mb-2 text-gray-700">{title}</h4>
//       <p className="text-3xl font-bold text-gray-900">{stat}</p>
//     </div>
//   );
// };

// // Sample data for the charts
// const barChartData = {
//   labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin'],
//   datasets: [
//     {
//       label: 'Leads Générés',
//       backgroundColor: '#3B82F6',
//       borderColor: '#3B82F6',
//       borderWidth: 1,
//       hoverBackgroundColor: '#2563EB',
//       data: [30, 45, 60, 75, 90, 110]
//     }
//   ]
// };

// const lineChartData = {
//   labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin'],
//   datasets: [
//     {
//       label: 'Réservations au Fil du Temps',
//       fill: false,
//       lineTension: 0.1,
//       backgroundColor: '#34D399',
//       borderColor: '#34D399',
//       borderCapStyle: 'butt',
//       borderDash: [],
//       borderWidth: 2,
//       data: [5, 15, 25, 35, 45, 60]
//     }
//   ]
// };

// // New pie chart data for user engagement
// const pieChartData = {
//   labels: ['Utilisateurs Actifs', 'Utilisateurs Inactifs', 'Nouveaux Utilisateurs'],
//   datasets: [
//     {
//       label: 'Engagement des Utilisateurs',
//       data: [200, 100, 50],
//       backgroundColor: ['#3B82F6', '#FBBF24', '#34D399'],
//       borderWidth: 1,
//     }
//   ]
// };

// const DashboardCharts = () => {
//   return (
//     <div className="mt-8">
//       <h3 className="text-xl font-semibold text-gray-700 mb-4">Performance du Site Web</h3>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         {/* Bar Chart */}
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h4 className="text-lg font-semibold text-gray-700 mb-2">Leads Générés au Fil du Temps</h4>
//           <Bar data={barChartData} />
//         </div>
//         {/* Line Chart */}
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h4 className="text-lg font-semibold text-gray-700 mb-2">Croissance des Réservations</h4>
//           <Line data={lineChartData} />
//         </div>
//       </div>

//   <div className="mt-4 flex flex-cols-1 md:grid-cols-2 gap-8">
//   <div className="flex-1 w-full">
//   <h3 className="text-lg font-semibold text-gray-700 mb-2">Métriques d'Engagement</h3>
//   <div className="bg-white p-2 rounded-lg shadow-md"
//   style={{ width: '400px', height: '400px' }}>
//     <h4 className="text-md font-semibold text-gray-700 mb-1">Aperçu de l'Engagement</h4>
//     <Pie data={pieChartData}/>
//   </div>
//   </div>
//   <div className=" p-4 rounded-lg shadow-md">
//         <h4 className="text-lg font-semibold text-gray-700 mb-2">Aperçus Professionnels</h4>
//         <p className="text-gray-700 mb-2">
//           L'engagement des utilisateurs est essentiel pour le succès de notre plateforme. Les données actuelles montrent une tendance positive, avec un nombre croissant d'utilisateurs actifs.
//         </p>
//         <ul className="list-disc list-inside text-gray-700 mb-4">
//           <li>Le total des leads générés a augmenté de 20 % au cours du dernier mois.</li>
//           <li>Les réservations montrent une croissance constante, indiquant un intérêt accru des utilisateurs.</li>
//           <li>Plus de 70 % des utilisateurs s'engagent activement avec la plateforme.</li>
//         </ul>
//         <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">
//           Voir Plus de Détails
//         </button>
//       </div>
// </div>


// {/*   
//       <div className="mt-8">
//         <h3 className="text-xl font-semibold text-gray-700 mb-4">Aperçus</h3>
//         <ul className="list-disc list-inside text-gray-700">
//           <li>Le total des leads générés a augmenté de 20 % au cours du dernier mois.</li>
//           <li>Les réservations montrent une croissance constante, indiquant un intérêt accru des utilisateurs.</li>
//           <li>Plus de 70 % des utilisateurs s'engagent activement avec la plateforme.</li>
//         </ul>
//       </div> */}
//     </div>
//   );
// };

// const DashboardCards = () => {
//   return (
//     <div>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
//         <DashboardCard title="Total des Leads" stat="245" icon={faUserPlus} bgColor="border-blue-500" />
//         <DashboardCard title="Réservations" stat="30" icon={faCalendarCheck} bgColor="border-green-500" />
//         <DashboardCard title="Suivis" stat="15" icon={faPhone} bgColor="border-yellow-500" />
//         <DashboardCard title="Taux de Conversion" stat="12%" icon={faChartLine} bgColor="border-purple-500" />
//       </div>
      
//       {/* Additional charts and performance data */}
//       <DashboardCharts />
//     </div>
//   );
// };

// export default DashboardCards;
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faCalendarCheck, faPhone, faChartLine } from '@fortawesome/free-solid-svg-icons';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

const DashboardCard = ({ title, stat, icon, bgColor }) => {
  return (
    <div className={`p-6 bg-white rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300 border-t-4 ${bgColor}`}>
      <div className="flex items-center justify-center mb-4">
        <FontAwesomeIcon icon={icon} className="text-4xl text-gray-700" />
      </div>
      <h4 className="text-lg font-semibold mb-2 text-gray-700">{title}</h4>
      <p className="text-3xl font-bold text-gray-900">{stat}</p>
    </div>
  );
};

// Sample data for the charts
const barChartData = {
  labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin'],
  datasets: [
    {
      label: 'Leads Générés',
      backgroundColor: '#3B82F6',
      borderColor: '#3B82F6',
      borderWidth: 1,
      hoverBackgroundColor: '#2563EB',
      data: [30, 45, 60, 75, 90, 110],
    },
  ],
};

const lineChartData = {
  labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin'],
  datasets: [
    {
      label: 'Réservations au Fil du Temps',
      fill: false,
      lineTension: 0.1,
      backgroundColor: '#34D399',
      borderColor: '#34D399',
      borderCapStyle: 'butt',
      borderDash: [],
      borderWidth: 2,
      data: [5, 15, 25, 35, 45, 60],
    },
  ],
};

// New pie chart data for user engagement
const pieChartData = {
  labels: ['Utilisateurs Actifs', 'Utilisateurs Inactifs', 'Nouveaux Utilisateurs'],
  datasets: [
    {
      label: 'Engagement des Utilisateurs',
      data: [200, 100, 50],
      backgroundColor: ['#3B82F6', '#FBBF24', '#34D399'],
      borderWidth: 1,
    },
  ],
};

const DashboardCharts = () => {
  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold text-gray-700 mb-4">Performance du Site Web</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="text-lg font-semibold text-gray-700 mb-2">Leads Générés au Fil du Temps</h4>
          <Bar data={barChartData} />
        </div>
        {/* Line Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="text-lg font-semibold text-gray-700 mb-2">Croissance des Réservations</h4>
          <Line data={lineChartData} />
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col items-start">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Métriques d'Engagement</h3>
          <div className="bg-white p-4 rounded-lg shadow-md w-full h-80 flex items-center justify-center">
            <h4 className="text-md font-semibold text-gray-700 mb-2">Aperçu de l'Engagement</h4>
            <Pie data={pieChartData} />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md flex flex-col">
          <h4 className="text-lg font-semibold text-gray-700 mb-2">Aperçus Professionnels</h4>
          <p className="text-gray-700 mb-2">
            L'engagement des utilisateurs est essentiel pour le succès de notre plateforme. Les données actuelles montrent une tendance positive, avec un nombre croissant d'utilisateurs actifs.
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>Le total des leads générés a augmenté de 20 % au cours du dernier mois.</li>
            <li>Les réservations montrent une croissance constante, indiquant un intérêt accru des utilisateurs.</li>
            <li>Plus de 70 % des utilisateurs s'engagent activement avec la plateforme.</li>
          </ul>
          <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">
            Voir Plus de Détails
          </button>
        </div>
      </div>
    </div>
  );
};

const DashboardCards = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
        <DashboardCard title="Total des Leads" stat="245" icon={faUserPlus} bgColor="border-blue-500" />
        <DashboardCard title="Réservations" stat="30" icon={faCalendarCheck} bgColor="border-green-500" />
        <DashboardCard title="Suivis" stat="15" icon={faPhone} bgColor="border-yellow-500" />
        <DashboardCard title="Taux de Conversion" stat="12%" icon={faChartLine} bgColor="border-purple-500" />
      </div>

      {/* Additional charts and performance data */}
      <DashboardCharts />
    </div>
  );
};

export default DashboardCards;

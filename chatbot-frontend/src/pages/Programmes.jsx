// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Card, Col, Row, message, Button } from "antd";
// import { PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons"; // Importing required icons
// import { Link, useNavigate } from "react-router-dom";

// const Programmes = () => {
//   const [program, setProgram] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchBanners = async () => {
//       try {
//         const response = await axios.get("/program"); // Replace with your API endpoint
//         setProgram(response.data);
//         console.log("Programmes:", response.data);
//       } catch (error) {
//         message.error("Failed to fetch programmes.");
//         console.error(error);
//       } finally {
//         setLoading(false); // Set loading to false once data is fetched
//       }
//     };

//     fetchBanners();
//   }, []); // Empty dependency array means this will run only once when the component mounts

//   const handleCreateNewBanner = () => {
//     navigate("/create-programmes");
//   };

 


//   const handleDeleteBanner = async (programId) => {
//     try {
//       await axios.delete(`/program/${programId}`); // Delete the banner by ID
//       const updatedBanners = program.filter(
//         (program) => program._id !== programId
//       ); // Remove the banner from the state
//       setProgram(updatedBanners); // Update the UI
//       message.success("Programme deleted successfully!");
//     } catch (error) {
//       message.error("Failed to delete Programme.");
//       console.error(error);
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="p-2">
//       <div className="mb-4">
//         <Button
//           type="primary"
//           icon={<PlusOutlined />}
//           className="bg-purple-800 text-white"
//           onClick={handleCreateNewBanner}
//         >
//           Créer un offre
//         </Button>
//       </div>

//       <h1 className="text-2xl font-bold mb-4">Offres</h1>
//       <div className="p-2">
//         <Row gutter={[16, 16]}>
//           {program.map((pro) => (
//             <Col span={8}  xs={32}
//             sm={24} 
//             md={10}  key={pro._id}>
//               <Card
//                 hoverable
//                 cover={
//                   <img
//                     alt="Banner Image"
//                     src={pro.imageUrl}
//                     className="banner-image"
//                   />
//                 }
//               >
//                 <Card.Meta title={pro.title} description={pro.mainText} className="text-md font-semibold" />

//                 {/* Bottom buttons */}
//                 <div className="mt-4 flex justify-between items-center">
                

//                   <div className="flex space-x-2">
//                     <Link to={`/create-programmes/${pro._id}`}>
//                       <Button icon={<EditOutlined />} type="link" />
//                     </Link>

//                     <Button
//                       icon={<DeleteOutlined />}
//                       onClick={() => handleDeleteBanner(pro._id)}
//                       type="danger"
//                       className="text-red-500"
//                     />
//                   </div>
//                 </div>
//               </Card>
//             </Col>
//           ))}
//         </Row>
//       </div>
//     </div>
//   );
// };

// export default Programmes;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Col, Row, message, Button } from "antd";
import { PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";

const Programmes = () => {
  const [program, setProgram] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await axios.get("/program");
        setProgram(response.data);
        console.log("Programmes:", response.data);
      } catch (error) {
        message.error("Failed to fetch programmes.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  const handleCreateNewBanner = () => {
    navigate("/create-programmes");
  };

  const handleDeleteBanner = async (programId) => {
    try {
      await axios.delete(`/program/${programId}`);
      const updatedBanners = program.filter((program) => program._id !== programId);
      setProgram(updatedBanners);
      message.success("Programme deleted successfully!");
    } catch (error) {
      message.error("Failed to delete Programme.");
      console.error(error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <div className="mb-6">
        <Button
          type="primary"
          icon={<PlusOutlined />}
          className="bg-purple-800 text-white"
          onClick={handleCreateNewBanner}
        >
          Créer un offre
        </Button>
      </div>

      <h1 className="text-2xl font-bold mb-4">Offres</h1>
     <div className="w-full">
     <Row gutter={[16, 16]}>
        {program.map((pro) => (
          <Row
            xs={24} // Full width on extra small screens
            sm={12} // Half width on small screens
            md={16} // One-third width on medium screens
            lg={6} // One-fourth width on large screens
            key={pro._id}
          >
            <Card
              hoverable
              cover={
                <img
                  alt="Programme"
                  src={pro.imageUrl}
                  className="h-40 w-full object-cover rounded-t-md"
                />
              }
              className="border border-gray-200 shadow-lg rounded-md"
            >
              <Card.Meta
                title={<span className="font-semibold">{pro.title}</span>}
                description={<p className="text-sm text-gray-600">{pro.mainText}</p>}
              />
              <div className="mt-4 flex justify-between">
                <Link to={`/create-programmes/${pro._id}`}>
                  <Button icon={<EditOutlined />} type="primary" />
                </Link>
                <Button
                  icon={<DeleteOutlined />}
                  type="danger"
                  onClick={() => handleDeleteBanner(pro._id)}
                />
              </div>
            </Card>
          </Row>
        ))}
      </Row>
     </div>
    </div>
  );
};

export default Programmes;

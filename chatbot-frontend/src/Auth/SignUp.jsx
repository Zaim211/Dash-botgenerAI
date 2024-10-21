import React, { useState } from "react"; 
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faEnvelope, faUser, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import logo from "../assets/images/chatbot-logo.png";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('/register', {
        name,
        email,
        password,
      });
      console.log("response", response);
      navigate("/SignIn");

    } catch (e) {
      alert('Registration failed. Please try again later');
      console.error(e);
    }
  };

  return (
    <section className="relative w-full bg-white bg-no-repeat bg-cover bg-center" 
    style={{ backgroundColor: "#1C1C1C"}}>
      <div className="absolute inset-0 bg-black opacity-70"></div>
      <div className="flex justify-center items-center px-6 py-8 mx-auto h-full">
        <div className="bg-black rounded-lg shadow-md p-6 space-y-4 md:space-y-6 sm:p-8 z-10 relative" style={{ maxWidth: "500px", width: "100%" }}>
          <div className="logo flex justify-center items-center">
          <img
            src={logo} alt="logo"
            className="w-[200px] h-[100px]"
          />
          </div>
          <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl">Créez votre compte</h1>
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-white">Nom complet</label>
              <div className="flex items-center border-2 border-orange-500 rounded-md">
                <FontAwesomeIcon icon={faUser} className="text-md mx-3 text-white" />
                <input
                  type="text"
                  name="name"
                  id="name"
                  onChange={handleNameChange}
                  className="bg-gray-800 text-white sm:text-sm rounded-r-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
                  placeholder="Votre nom"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">Votre email</label>
              <div className="flex items-center border-2 border-orange-500 rounded-md">
                <FontAwesomeIcon icon={faEnvelope} className="text-md mx-3 text-white" />
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={handleEmailChange}
                  className="bg-gray-800 text-white sm:text-sm rounded-r-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
                  placeholder="nom@entreprise.com"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">Mot de passe</label>
              <div className="flex items-center border-2 border-orange-500 rounded-md">
                <FontAwesomeIcon icon={faLock} className="text-md mx-3 text-white" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  onChange={handlePasswordChange}
                  className="bg-gray-800 text-white sm:text-sm rounded-r-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
                  placeholder="••••••••"
                  required
                />
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="text-md mx-3 text-white cursor-pointer" onClick={toggleShowPassword} />
              </div>
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-white">Confirmez le mot de passe</label>
              <div className="flex items-center border-2 border-orange-500 rounded-md">
                <FontAwesomeIcon icon={faLock} className="text-md mx-3 text-white" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  id="confirmPassword"
                  onChange={handleConfirmPasswordChange}
                  className="bg-gray-800 text-white sm:text-sm rounded-r-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>
            <button type="submit" className="w-full text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              S'inscrire
            </button>
          </form>

          <p className="text-sm font-light text-gray-300">
            Vous avez déjà un compte ?{" "}
            <Link to="/SignIn" className="font-medium text-orange-500 hover:underline">
              Connectez-vous
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignUp;



// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faLock, faEnvelope, faUser, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
// import axios from "axios";

// const SignUp = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [name, setName] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();

//   const handleEmailChange = (event) => {
//     setEmail(event.target.value);
//   };

//   const handlePasswordChange = (event) => {
//     setPassword(event.target.value);
//   };

//   const handleConfirmPasswordChange = (event) => {
//     setConfirmPassword(event.target.value);
//   };

//   const handleNameChange = (event) => {
//     setName(event.target.value);
//   };

//   const toggleShowPassword = () => {
//     setShowPassword((prevState) => !prevState);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
   
//     try {
//        const response =  await axios.post('/register', {
//           name,
//           email,
//           password,
  
//         });
//         console.log("response", response);
//         navigate("/SignIn");

//       } catch (e) {
//         alert('Registration failed. Please try again later');
//         console.error(e);
//       }
//   };

//   return (
//     <>
//       <section className="relative w-full  bg-no-repeat bg-cover bg-center">
//         <div className="absolute inset-0 bg-black opacity-70"></div>
//         <div className="flex justify-center items-center px-6 py-8 mx-auto h-full">
//           <div className="bg-white rounded-lg shadow-md p-6 space-y-4 md:space-y-6 sm:p-8 z-10 relative" style={{ maxWidth: "500px", width: "100%" }}>
//             <div className="logo flex justify-center items-center">
//               <span className="font-bold text-2xl" style={{ color: "navy" }}>Chat</span>
//               <span className="font-bold text-2xl text-cons-light" style={{ color: "navy" }}>Bot</span>
//             </div>
//             <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">Créez votre compte</h1>
//             <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
//               <div>
//                 <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Nom complet</label>
//                 <div className="flex items-center border-2 border-gray-300 rounded-md">
//                   <FontAwesomeIcon icon={faUser} className="text-md mx-3 text-gray-600" />
//                   <input
//                     type="text"
//                     name="name"
//                     id="name"
//                     onChange={handleNameChange}
//                     className="bg-gray-50 text-gray-900 sm:text-sm rounded-r-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
//                     placeholder="Votre nom"
//                     required
//                   />
//                 </div>
//               </div>
//               <div>
//                 <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Votre email</label>
//                 <div className="flex items-center border-2 border-gray-300 rounded-md">
//                   <FontAwesomeIcon icon={faEnvelope} className="text-md mx-3 text-gray-600" />
//                   <input
//                     type="email"
//                     name="email"
//                     id="email"
//                     onChange={handleEmailChange}
//                     className="bg-gray-50 text-gray-900 sm:text-sm rounded-r-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
//                     placeholder="nom@entreprise.com"
//                     required
//                   />
//                 </div>
//               </div>
//               <div>
//                 <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Mot de passe</label>
//                 <div className="flex items-center border-2 border-gray-300 rounded-md">
//                   <FontAwesomeIcon icon={faLock} className="text-md mx-3 text-gray-600" />
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     name="password"
//                     id="password"
//                     onChange={handlePasswordChange}
//                     className="bg-gray-50 text-gray-900 sm:text-sm rounded-r-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
//                     placeholder="••••••••"
//                     required
//                   />
//                   <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="text-md mx-3 text-gray-600 cursor-pointer" onClick={toggleShowPassword} />
//                 </div>
//               </div>
//               <div>
//                 <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900">Confirmez le mot de passe</label>
//                 <div className="flex items-center border-2 border-gray-300 rounded-md">
//                   <FontAwesomeIcon icon={faLock} className="text-md mx-3 text-gray-600" />
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     name="confirmPassword"
//                     id="confirmPassword"
//                     onChange={handleConfirmPasswordChange}
//                     className="bg-gray-50 text-gray-900 sm:text-sm rounded-r-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
//                     placeholder="••••••••"
//                     required
//                   />
//                 </div>
//               </div>
//               <button type="submit" className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
//                 S'inscrire
//               </button>
//             </form>

//             <p className="text-sm font-light text-gray-500">
//               Vous avez déjà un compte ?{" "}
//               <Link to="/SignIn" className="font-medium text-blue-600 text-primary-600 hover:underline">
//                 Connectez-vous
//               </Link>
//             </p>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default SignUp;
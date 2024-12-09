import React, { useState } from "react";
import whatsapplogo from "../../Images/whatsapp logo.jpg";
import whtsappqrcode from "../../Images/whtsapp qrcode.png";
import profileimage from "../../Images/profile image.png";
import { RiDownloadLine } from "react-icons/ri";
import { HiDotsVertical } from "react-icons/hi";
import { GrSettingsOption } from "react-icons/gr";
import { FiArrowUpRight } from "react-icons/fi";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { PiWarningCircleFill } from "react-icons/pi";
import { CiLock } from "react-icons/ci";
import Flag from "react-world-flags";
import { useFormik } from "formik";
import { loginvalid } from "../Form_validation/loginFormSchema";
import { useNavigate } from "react-router-dom";

function Login() {
  const [state, setState] = useState("page-1");

  const countries = [
    { code: "IN", name: "India", dialCode: "+91" },
    { code: "US", name: "United States", dialCode: "+1" },
    { code: "GB", name: "United Kingdom", dialCode: "+44" },
    { code: "CA", name: "Canada", dialCode: "+1" },
  ];

  const [CountryCode, setCountryCode] = useState("+91");

  const handleCountryChange = (e) => {
    const countryCode = e.target.value;
    setCountryCode(countryCode);
    setPhoneNumber("");
  };

  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: {
        phonenumber: "",
      },
      validationSchema: loginvalid,
      onSubmit: (value) => {
        console.log("value", value);
      },
    });
  console.log("errors", errors.phonenumber);
  const navigate = useNavigate()

  return (
    <div className="m-4">
      <div>
        <div className="flex justify-between">
          <img className="w-36 ml-9" src={whatsapplogo} alt="whatsapp logo" />

          <button className="bg-green-500 rounded-full border w-40 h-14 text-lg border-black mt-3 mr-10 flex justify-center gap-2 px-4 py-2">
            Download <RiDownloadLine />
          </button>
        </div>
        <div className="flex items-center justify-center">
          <div
            className={
              state == "page-1"
                ? "w-auto border border-black rounded-3xl h-auto p-12 flex flex-wrap items-center"
                : "w-96 border border-black rounded-3xl xl:w-3/4 md:w-3/4 flex flex-wrap h-auto justify-center items-center p-10"
            }
          >
            {state == "page-1" && (
              <>
                <div className="max-w-xl">
                  <h1 className="text-3xl mb-2">Log into WhatsApp Web</h1>
                  <p className="mb-6 text-xl text-wrap">
                    Message privately with friends and family using WhatsApp on
                    your browser.
                  </p>
                  <p className="text-xl mb-3 text-wrap">
                    1. Open WhatsApp on your phone
                  </p>
                  <p className="text-xl mb-3 flex text-wrap">
                    2. Tap Menu{" "}
                    <span className="border border-gray-300 text-sm h-6 rounded-md w-5 flex items-center justify-center ml-1 mr-1">
                      {" "}
                      <HiDotsVertical />{" "}
                    </span>{" "}
                    on Android, or settings{" "}
                    <span className="border border-gray-300 text-sm h-6 rounded-md w-5 flex items-center justify-center ml-1 mr-1 text-gray-500">
                      <GrSettingsOption />
                    </span>{" "}
                    on iPhone
                  </p>
                  <p className="text-xl mb-3 text-wrap">
                    3. Tap Linked devices And Then Link a device
                  </p>
                  <p className="text-xl mb-7 text-wrap">
                    4. Point your phone at this screen to scan the QR code
                  </p>
                  <p className="text-lg mb-2 flex underline w-fit decoration-green-500 underline-offset-4 decoration-2 hover:text-green-500 cursor-pointer">
                    Need help getting started?{" "}
                    <span className="flex items-center justify-center ml-1 mr-1">
                      <FiArrowUpRight />
                    </span>
                  </p>
                  <p
                    className="text-lg flex underline w-fit decoration-green-500 underline-offset-4 decoration-2 hover:text-green-500 cursor-pointer"
                    onClick={() => setState("page-2")}
                  >
                    Log in with phone number{" "}
                    <span className="flex items-center justify-center ml-1 mr-1">
                      <MdOutlineKeyboardArrowRight />
                    </span>
                  </p>
                </div>
                <div>
                  <img src={whtsappqrcode} alt="login qr code" />
                  <div className="flex items-center ml-3">
                    <input
                      className="w-5 h-5 accent-green-400 cursor-pointer"
                      type="checkbox"
                    />
                    <label className="text-sm font-light ml-3 mr-1">
                      Stay logged in on browser
                    </label>
                    <div className="relative group">
                      <span className="text-gray-600 text-sm flex items-center ">
                        <PiWarningCircleFill />
                      </span>
                      <span className="absolute left-1/2 w-48 text-center transform -translate-x-1/2 mt-2 px-2 py-1 text-sm text-black bg-white rounded opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out">
                        If selected, you'll stay logged into WhatsApp Web after
                        closing the browser tab.
                      </span>
                    </div>
                  </div>
                </div>
              </>
            )}
            {state == "page-2" && (
              <div className="felx justify-center items-center ">
                <h1 className="text-4xl text-center mb-3">
                  Enter phone number
                </h1>
                <p className="text-xl text-center mb-6">
                  Select a country and your phone number.
                </p>

                <div className="flex flex-col gap-3 justify-center items-center">
                  <select
                    className="border border-black w-80 rounded-full p-4"
                    onChange={handleCountryChange}
                  >
                    {countries.map((country, index) => (
                      <option key={index} value={country.dialCode}>
                        <span className="mr-2">
                          <Flag
                            code={country.code}
                            style={{ width: 20, height: 15 }}
                          />
                        </span>
                        {country.name} ({country.dialCode})
                      </option>
                    ))}
                  </select>
                  <form action="" onSubmit={handleSubmit}>
                    <div className="border border-black w-80 rounded-full p-4 flex justify-center items-center">
                      <span>{CountryCode}</span>
                      <input
                        className="border-none focus:outline-none  w-full"
                        type="text"
                        value={values.phonenumber}
                        name="phonenumber"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Enter phone number"
                      />
                    </div>
                    <span className="text-red-500">
                      {errors.phonenumber && touched.phonenumber
                        ? errors.phonenumber
                        : null}
                    </span>
                    <div className="flex justify-center mt-14">
                      <button
                        className="p-2 bg-green-800 text-white rounded-full w-20"
                        onClick={() => setState("page-3")}
                      >
                        Next
                      </button>
                    </div>
                  </form>
                  <p
                    className="text-lg flex underline w-fit decoration-green-500 underline-offset-4 decoration-2 hover:text-green-500 cursor-pointer"
                    onClick={() => setState("page-1")}
                  >
                    Log in with QR code{" "}
                    <span className="flex items-center justify-center ml-1 mr-1">
                      <MdOutlineKeyboardArrowRight />
                    </span>
                  </p>
                </div>
              </div>
            )}
            {state == "page-3" && (
              <div className="w-full h-full justify-end pl-10">
                <div>
                  <h1 className="text-3xl mb-2">Enter code on phone</h1>

                  <div className="text-xl mb-6 flex gap-2">
                    <p>
                      Linking WhatsApp account{" "}
                      <span className="text-lg font-bold">
                        {" "}
                        {CountryCode} {values.phonenumber}
                      </span>
                    </p>
                    <span
                      className="cursor-pointer"
                      onClick={() => setState("page-2")}
                    >
                      (<span className="text-gray-500 font-normal">edit</span>)
                    </span>
                  </div>
                  <div className="w-full h-full flex justify-center m-10">
                    <form
                      action=""
                      className="flex flex-wrap gap-4 justify-center items-center"
                    >
                      <input
                        className="w-12 h-12 p-2 border-2 border-black rounded-md text-center"
                        type="text"
                      />
                      <input
                        className="w-12 h-12 p-2 border-2 border-black rounded-md text-center"
                        type="text"
                      />
                      <input
                        className="w-12 h-12 p-2 border-2 border-black rounded-md text-center"
                        type="text"
                      />
                      <input
                        className="w-12 h-12 p-2 border-2 border-black rounded-md text-center"
                        type="text"
                      />
                      <button
                        className=" w-20 h-8 bg-green-500 rounded-lg"
                        onClick={() => setState("page-4")}
                      >
                        Next
                      </button>
                    </form>
                  </div>

                  <div className="max-w-xl">
                    <p className="text-xl mb-3 text-wrap">
                      1. Open WhatsApp on your phone
                    </p>
                    <p className="text-xl mb-3 flex text-wrap">
                      2. Tap Menu{" "}
                      <span className="border border-gray-300 text-sm h-6 rounded-md w-5 flex items-center justify-center ml-1 mr-1">
                        {" "}
                        <HiDotsVertical />{" "}
                      </span>{" "}
                      on Android, or settings{" "}
                      <span className="border border-gray-300 text-sm h-6 rounded-md w-5 flex items-center justify-center ml-1 mr-1 text-gray-500">
                        <GrSettingsOption />
                      </span>{" "}
                      on iPhone
                    </p>
                    <p className="text-xl mb-3 text-wrap">
                      3. Tap Linked devices And Then Link a device
                    </p>
                    <p className="text-xl mb-7 text-wrap">
                      4. Point your phone at this screen to scan the QR code
                    </p>
                    <p className="text-lg mb-2 flex underline w-fit decoration-green-500 underline-offset-4 decoration-2 hover:text-green-500 cursor-pointer">
                      Need help getting started?{" "}
                      <span className="flex items-center justify-center ml-1 mr-1">
                        <FiArrowUpRight />
                      </span>
                    </p>
                    <p
                      className="text-lg flex underline w-fit decoration-green-500 underline-offset-4 decoration-2 hover:text-green-500 cursor-pointer"
                      onClick={() => setState("page-2")}
                    >
                      Log in with QR code
                      <span className="flex items-center justify-center ml-1 mr-1">
                        <MdOutlineKeyboardArrowRight />
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            )}
            {state == "page-4" && (
             <div className="w-full h-full flex justify-center items-center mb-32">
             <div className="flex flex-col items-center text-center">
               <div className="w-32 h-32 overflow-hidden rounded-full relative">
                 <img
                   id="file-upload"
                   src={profileimage}
                   alt="User Profile Image"
                   className="w-full h-full object-cover"
                 />
                 <input
                   id="file-upload"
                   type="file"
                   className="absolute w-full h-full opacity-0 cursor-pointer"
                 />
               </div>
               <h1 className="text-sm text-slate-400 mt-2">
                 Click and upload profile image
               </h1>
           
               <form action="" className="mt-4">
                 <input
                   type="text"
                   placeholder="Enter your name..."
                   className="border-b-2 border-slate-400 p-2 focus:outline-none focus:border-b-green-500 w-80"
                 />
                 <button onClick={()=>navigate('/home')} className="bg-green-500 w-16 h-8 ml-3 m-3 rounded-md">
                   Login
                 </button>
               </form>
             </div>
           </div>
           
            )}
          </div>
        </div>
      </div>
      <h1 className="flex justify-center items-center mt-10">
        <span>
          <CiLock />
        </span>
        Your personal messages are end-to-end encrypted
      </h1>
    </div>
  );
}
export default Login;

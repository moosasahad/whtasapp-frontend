

import React, { useRef } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

// const otpSchema = Yup.object().shape({
//   otp: Yup.array()
//     .of(Yup.string().matches(/^\d$/, "Must be a digit").required("Required"))
//     .required("OTP is required"),
// });

function Otpfeald({settabs}) {
    // console.log(value)
  const inputs = useRef([]);

  const handleFocus = (event, index) => {
    const { value } = event.target;
    if (value.length === 1 && index < 3) {
      inputs.current[index + 1].focus();
    }
  };

  const handleBackspace = (event, index, setFieldValue) => {
    if (event.key === "Backspace" && !event.target.value && index > 0) {
      inputs.current[index - 1].focus();
      setFieldValue(`otp[${index}]`, ""); // Clear the current field
    }
  };

  const handlePaste = (event, setFieldValue) => {
    const pasteData = event.clipboardData.getData("text").slice(0, 4).replace(/\D/g, "");
    if (pasteData) {
      pasteData.split("").forEach((digit, idx) => {
        setFieldValue(`otp[${idx}]`, digit);
        if (inputs.current[idx]) {
          inputs.current[idx].value = digit;
        }
      });
      inputs.current[pasteData.length - 1]?.focus();
    }
  };
  return (
    <Formik
      initialValues={{ otp: ["", "", "", ""] }}
      onSubmit={(values) => {
        alert(`Entered OTP: ${values.otp.join("")}`);
      }}
    >
      {({ values, errors, touched, setFieldValue }) => (
        <form className="w-full h-full flex justify-center m-10">
          <div className="flex flex-wrap gap-4 justify-center items-center">
            {values.otp.map((_, index) => (
              <Field
                key={index}
                name={`otp[${index}]`}
                render={({ field }) => (
                  <input
                    {...field}
                    ref={(el) => (inputs.current[index] = el)}
                    className="w-12 h-12 p-2 border-2 border-black rounded-md text-center"
                    type="text"
                    maxLength="1"
                    onChange={(e) => {
                      setFieldValue(`otp[${index}]`, e.target.value.slice(0, 1));
                      handleFocus(e, index);
                    }}
                    onKeyDown={(e) => handleBackspace(e, index, setFieldValue)}
                    onPaste={(e) => handlePaste(e, setFieldValue)}
                  />
                )}
              />
            ))}
            <button
              type="submit"
              className="w-20 h-8 bg-green-500 rounded-lg"
              onClick={()=>settabs("page-4")}
            >
              Submit
            </button>
          </div>
          
        </form>
      )}
    </Formik>
  );
}

export default Otpfeald;

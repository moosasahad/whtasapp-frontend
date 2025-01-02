import React, { useRef } from "react";
import { Formik, Field, Form } from "formik";
import axios from 'axios';
import { axiosPrivate } from "../../Axiosinstens"; 
import { toast } from "react-toastify";

function OtpField(props) {
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
      setFieldValue(`otp[${index}]`, ""); d
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
      onSubmit={async (values, { setSubmitting }) => {
        const enteredOTP = values.otp.join("");
        console.log("Entered OTP:", enteredOTP, props.number);
        try {
          const res = await axiosPrivate.post("/send-otp", { otp: enteredOTP, userNumber: props.number });
          console.log("OTP submitted successfully:", res.data);
          toast.success("Otp Verifiyde", {
                              style: {
                                  width: "250px",
                                  height: "10px",
                                 
                                },
                            });
          props.settabs("page-4")
        } catch (error) {
          console.error("Error submitting OTP:", error);
          toast.error("Invalid Otp", {
                              style: {
                                  width: "250px",
                                  height: "10px",
                                 
                                },
                            });
          
        }

        setSubmitting(false); 
      }}
    >
      {({ values, setFieldValue, isSubmitting }) => (
        <Form className="w-full h-full flex items-center gap-3 justify-center m-10">
          <div className="flex flex-wrap gap-4 justify-center items-center">
            {values.otp.map((_, index) => (
              <Field key={index} name={`otp[${index}]`}>
                {({ field }) => (
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
              </Field>
            ))}
          </div>
          <button
            type="submit"
            className="w-20 h-8 bg-green-500 rounded-lg"
            disabled={isSubmitting} 
          >
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default OtpField;

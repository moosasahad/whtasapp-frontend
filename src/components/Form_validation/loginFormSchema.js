import * as Yup from 'yup';

export const loginvalid = Yup.object({
    phonenumber: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
    .required("Please enter your correct phone number"),
})
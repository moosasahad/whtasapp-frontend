import * as Yup from 'yup';

export const contactsave = Yup.object({
    phonenumber: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
    .required("Please enter your correct phone number"),
    name:Yup.string().min(2).required("Please enter your name")
})
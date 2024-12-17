import React, { useState } from 'react'
import { FaUser } from 'react-icons/fa6'
import { FiArrowLeft } from 'react-icons/fi'
import { FaPhone } from "react-icons/fa6";
import { useFormik } from 'formik';
import { contactsave } from '../../Form_validation/contactsaveSchema';
import { axiosPrivate } from '../../../Axiosinstens';


function NewContacts({setTabs}) {
  const [respons,setresponese] = useState('')
    const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: {
        phonenumber: "",
        name:'',
      },
      validationSchema:contactsave,
      onSubmit: async (value) => {
        const {name,phonenumber} = value;
        try {
                  const res = await axiosPrivate.post("/savecontact",{name,number:phonenumber});
                  console.log("res post contact", res.data.response);
                } catch (error) {
                  setresponese(error?.response.data.message)

                  console.log("Error in contact post", error.response.data.message);
                }
      },
    });
  return (
    <div>
         <div className='flex gap-7 pl-3'>
        <button onClick={()=>setTabs('contacts')}>
        <FiArrowLeft className='text-2xl text-gray-600 '/>
        </button>
        <h1>New contacts</h1>
      </div>

      <div className='flex justify-center items-center h-96'>
        <form onSubmit={handleSubmit}>
        <div className='flex items-center gap-5 mb-5'>
            <span className='mt-5 text-gray-500'>
            <FaUser/>
            </span>
            <div className='w-full pr-8'>
                <h3 className='text-gray-500'>Name</h3>
                <input type="text" 
                placeholder='name'
                name='name'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                className='border-b-2 outline-none w-full'
                />
            </div>
        </div>
        <div className='flex items-center gap-5 mb-5'>
            <span className='mt-5 text-gray-500'>
            <FaPhone/>
            </span>
            <div className='flex gap-3'>
            <div>
                <h3 className='text-gray-500'>Country</h3>
            <select className='border-b-2 pb-1 outline-none'>
                    <option value="">INR +91</option>
                </select>
            </div>
            <div>
                <h3 className='text-gray-500'>Phone</h3>
                <input type="number" 
                placeholder='Number'
                name='phonenumber'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phonenumber}
                className='border-b-2 outline-none '
               
                
                />
                
            </div>
            
            </div>
            
        </div>
        <span className='text-red-500'>
                    {errors.phonenumber&& touched.phonenumber?(errors.phonenumber):(null)}
                </span>
                <span className='text-red-500'>{respons}</span>
        <div className='flex justify-center items-center'>
        <button type='submit' className='text-white bg-green-500 p-2 w-20  rounded-3xl'>Save</button>
        </div>
        </form>
      </div>
    </div>
  )
}

export default NewContacts

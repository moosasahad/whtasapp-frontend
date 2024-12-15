import React, { useEffect, useState } from 'react'
import { createContext } from 'react'
export const Product = createContext();
function Productcontext({children}) {
    const[state,setState]=useState(null)
    const[userid,setusesrid]=useState('')
    console.log("userid---",userid);
    const [login,setlogin]=useState(true)
    const [tabs,settabs]=useState('page-1')
    const [owner,setOwner]=useState({
        id: 1,
                  name: "Moosa sahad pk",
                  number: "+1234567890",
                  profilePhoto: "https://imgs.search.brave.com/vgTiX1UVJWxFqIuZ7JizAkeSs9Mm5igjGG5sN-68f0E/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5nYWxsLmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvNS9Qcm9m/aWxlLnBuZw",
                  title: "Software Engineer",
                  body: "Experienced in developing web applications using modern frameworks."
    })
    
    useEffect(()=>{
        setState(
            [
                {
                  id: 1,
                  name: "John Doe",
                  number: "+1234567890",
                  profilePhoto: "https://via.placeholder.com/150",
                  title: "Software Engineer",
                  body: "Experienced in developing web applications using modern frameworks."
                },
                {
                  id: 2,
                  name: "Jane Smith",
                  number: "+9876543210",
                  profilePhoto: "https://via.placeholder.com/150",
                  title: "Product Manager",
                  body: "Specializes in agile methodologies and cross-functional team leadership."
                },
                {
                  id: 3,
                  name: "Alice Johnson",
                  number: "+1122334455",
                  profilePhoto: "https://via.placeholder.com/150",
                  title: "UX Designer",
                  body: "Passionate about creating user-centered designs and improving usability."
                },
                {
                  id: 4,
                  name: "Bob Williams",
                  number: "+9988776655",
                  profilePhoto: "https://via.placeholder.com/150",
                  title: "Data Scientist",
                  body: "Expert in machine learning, data analysis, and visualization."
                },
                {
                  id: 5,
                  name: "Sarah Brown",
                  number: "+7766554433",
                  profilePhoto: "https://via.placeholder.com/150",
                  title: "Marketing Specialist",
                  body: "Proficient in digital marketing, SEO, and social media strategies."
                },
                {
                  id: 6,
                  name: "Mike Davis",
                  number: "+5432109876",
                  profilePhoto: "https://via.placeholder.com/150",
                  title: "Web Developer",
                  body: "Skilled in front-end and back-end development using modern technologies."
                },
                {
                  id: 7,
                  name: "Emily Wilson",
                  number: "+6789012345",
                  profilePhoto: "https://via.placeholder.com/150",
                  title: "Data Analyst",
                  body: "Experienced in analyzing large datasets and creating actionable insights."
                },
                {
                  id: 8,
                  name: "David Lee",
                  number: "+9876543210",
                  profilePhoto: "https://via.placeholder.com/150",
                  title: "Project Manager",
                  body: "Expert in managing complex projects, ensuring deadlines and budgets are met."
                },
                {
                  id: 9,
                  name: "Jessica Martinez",
                  number: "+1230987654",
                  profilePhoto: "",
                  title: "Content Creator",
                  body: "Creates engaging content for various platforms to enhance brand presence."
                },
                {
                  id: 10,
                  name: "Chris Brown",
                  number: "+5678901234",
                  profilePhoto: "https://via.placeholder.com/150",
                  title: "Graphic Designer",
                  body: "Specializes in creating visual content, logos, and branding materials."
                }
              ]
              
        
          )
    },[])
    const obj = {
        state,
        setusesrid,
        userid,
        owner,
        login,
        setlogin,
        tabs,
        settabs,
    };
  return (
    <Product.Provider value={obj}>
        {children}
    </Product.Provider>
  )
}

export default Productcontext

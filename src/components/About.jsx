import React from 'react'
import image from '../assets/dear1.jpeg'

const About = () => {
    return (
        <div className='h-[90vh]  flex  justify-between flex-col px-[3vw] pt-[8vh] pb-[5vh] w-full '>
            <div className="info">
                <div className="description">
                    <h2 className='text-[1rem] font-[400] pt-[3vw] w-[80%] text-balance'>Hi, I'm Yash Pratap Singh , a passionate Full Stack Developer and Computer Science Engineering student who loves transforming creative ideas into meaningful digital experiences.
                        I specialize in building modern, responsive, and user-friendly web applications using technologies like **React.js, Next.js, JavaScript, Node.js, Express.js, and MongoDB**. I enjoy working on both frontend and backend development, creating seamless user interfaces and scalable backend solutions.
                        I have hands-on experience developing projects involving REST APIs, authentication systems, database management, and AI-powered applications. I'm always exploring new technologies, improving my problem-solving skills, and challenging myself to build better digital products.
                        My goal is to become a skilled software engineer who creates innovative solutions that make a real-world impact.
                    </h2>
                </div>
                <div className="contacts mt-[1.8vw]">
                    <h3 className="h3 text-[1.1vw] uppercase ">Contacts</h3>
                    <h3 className="h3 text-[1.15vw] ">yashbundela018@gmail.com</h3>
                    <h3 className="h3 text-[1.15vw] ">+91 6392898949</h3>
                </div>
            </div>
            <div className="image pt-[2vw] ">
                <div className="imagediv h-[13vw] w-[12vw] bg-red-500 ">
                    <img className='h-full w-full  ' src={image} />

                </div>

            </div>
        </div>
    )
}

export default About

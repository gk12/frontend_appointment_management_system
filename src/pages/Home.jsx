import React, { useState } from "react";
import Navbar from "../components/Navbar";
import im from "../assets/Beautiful young female doctor looking at camera in the office..svg";
import img2 from "../assets/section2Img.svg";
import s1 from "../assets/pill.svg";
import s2 from "../assets/injection.svg";
import s3 from "../assets/Vector3.svg";
import s4 from "../assets/Vector4.svg";
import s5 from "../assets/Vector5.svg";
import s6 from "../assets/Vector6.svg";
import s7 from "../assets/DNA.svg";
import s8 from "../assets/blood_pressure_02.svg";
import s9 from "../assets/health.svg";
import s4_1 from "../assets/sec4_1.svg";
import s4_2 from "../assets/sec4_2.svg";
import s4_3 from "../assets/sec4_3.svg";
import s4_4 from "../assets/sec4_4.svg";
import patient from "../assets/Patient.svg";
import doubleIcon from "../assets/sec5_icon.svg";
import { FaInstagram } from "react-icons/fa";
import { LiaFacebookSquare } from "react-icons/lia";
import { FiTwitter } from "react-icons/fi";
const Home = () => {
  const [cardData, setCardData] = useState([
    {
      title: "Dentistry",
      value1: "Get consultation form our ",
      value2: "General Diagnosis team",
      image: s1,
    },
    {
      title: "General Diagnosis",
      value1: "Get consultation form our ",
      value2: "General Diagnosis team",
      image: s2,
    },
    {
      title: "Neuro Surgery",
      value1: "Get consultation form our ",
      value2: "General Diagnosis team",
      image: s3,
    },
    {
      title: "Cardiology",
      value1: "Get consultation form our ",
      value2: "General Diagnosis team",
      image: s4,
    },
    {
      title: "Pharmacy",
      value1: "Get consultation form our ",
      value2: "General Diagnosis team",
      image: s5,
    },
    {
      title: "Trained Staff",
      value1: "Get consultation form our ",
      value2: "General Diagnosis team",
      image: s6,
    },
    {
      title: "DNA Mapping",
      value1: "Get consultation form our ",
      value2: "General Diagnosis team",
      image: s7,
    },
    {
      title: "Ophthalmology",
      value1: "Get consultation form our ",
      value2: "General Diagnosis team",
      image: s8,
    },
    {
      title: "Medical Aid",
      value1: "Get consultation form our ",
      value2: "General Diagnosis team",
      image: s9,
    },
  ]);
  console.log(cardData, "card");
  return (
    <div className="w-full h-auto p-0 m-0 border-8 border-black  ">
      <Navbar />
      {/* first screen */}
      <div className="flex w-full  h-[87dvh] bg-[#e0eaf3]">
        <div className="w-[50%] border-2  p-10 flex">
          <div className="flex flex-col justify-center w-[70%] space-y-8 pl-20">
            <h1 className="font-bold text-5xl tracking-wide">
              Get Expert
              <span className="text-[#0086FF] ">Medical Consultation</span>
            </h1>
            <p className="text-[#4c4c4e]">
              Our doctors provide expert medical advice and <br />
              consultation. Get in touch with our team to discuss.
            </p>
            <div className="h-[4rem] rounded-md bg-white w-[87%] p-2">
              {/* add location icon */}
              <input
                type="search"
                placeholder="search doctor in your location"
                className="h-[3rem] rounded-lg w-[78%]   text-black"
              />
              <button className="w-[22%] h-[3rem] rounded-lg bg-[#0086FF]">
                b
              </button>
            </div>
          </div>
        </div>
        <div className="w-[50%] flex items-end  px-[8%]">
          <img src={im} alt="" className="h-[80%]" />
        </div>
      </div>

      {/* second screen */}
      <div className="w-full flex h-[70dvh] border-3 border-black ">
        <div className="w-[50%] p-24">
          <img src={img2} alt="" />
        </div>
        <div className="w-[50%] p-28 space-y-4">
          <h3 className="text-[#0086FF] font-bold">About Us</h3>
          <h1 className="text-bold text-5xl">
            World-Class Preventive, Prescriptive & Curative <br /> Medical
            Practices
          </h1>
          <p>
            Being in the healthcare sector, we consider it our paradigm duty{" "}
            <br /> to ensure Safety of our patients, effectiveness of our
            treatments, <br />
            transparency in our practices, and absolute timely care.
          </p>
          <button className="p-4 bg-[#0086FF] text-white rounded-lg w-[25%]">
            Contact Us
          </button>
        </div>
      </div>

      {/* third screen */}
      <div className="w-full h-[240dvh]  bg-[#e0eaf3]">
        <div className="p-24 flex flex-col items-center ">
          <h1 className="font-bold text-5xl">Our Speciality</h1>
          <p>We provide the world class services with the |</p>
          <p>best medical team!</p>
        </div>
        <div className="px-40 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-36  w-full">
          {cardData?.map((val, index) => (
            <div
              key={index}
              className="  h-[26rem]  space-y-6 bg-white items-center  rounded-3xl flex flex-col  p-8 hover:bg-[#3D9DF1] hover:text-white"
            >
              <div className="w-[60%] h-[10rem] bg-slate-100 justify-center items-center flex-col flex">
                <img src={val.image} alt="" />
              </div>
              <h1 className="font-bold text-3xl">{val?.title}</h1>
              <p>
                {val?.value1} <br /> {val?.value2}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* fourth */}
      <div className="h-[90dvh] w-full flex ">
        <div className="h-full w-[50%]  flex gap-8 p-24">
          <div className="w-[50%]  h-[90%] ">
            <img src={s4_1} alt="" />
            <img src={s4_2} alt="" />
          </div>
          <div className="w-[50%]  h-[90%]  mt-14">
            <img src={s4_3} alt="" />
            <img src={s4_4} alt="" />
          </div>
        </div>
        <div className="w-[50%] px-24 py-56 space-y-4">
          <h3 className="text-[#0086FF] font-bold">Integrity</h3>
          <h1 className="text-bold text-5xl">
            World-Class Preventive, Prescriptive & Curative <br /> Medical
            Practices
          </h1>
          <p>
            The cornerstone of our establishment is ‘Making the <br />
            benefits of exceptional medical services reach the people <br />
            without Discrimination.’ We strive to live up to this <br />
            philosophy through our stellar values, that are the pillars <br />
            of every service that we offer under the banner of our <br />
            prestigious hospital.
          </p>
          <button className="p-4 bg-[#0086FF] text-white rounded-lg w-[25%]">
            Contact Us
          </button>
        </div>
      </div>

      {/* fifth */}
      <div className="w-full h-[100dvh]  bg-[#e0eaf3]">
        <div className="w-full h-[50%] p-24">
          <h1 className="font-bold text-5xl">
            Read feedback about our <br />
            Services and wonderful team!
          </h1>
          <p>We take care of our patients just like a family</p>
          <p>member . Read the testimonials from our patients. </p>
        </div>
        <div className="w-full h-[50%]   px-24 pb-24 flex gap-8">
          <div className="w-[50%] h-full bg-white px-16 space-y-8 py-16 rounded-2xl">
            <img src={doubleIcon} alt="" />
            <p>
              Amazing team and amazing <br /> treatment from the best doctor{" "}
              <br /> in the world
            </p>
            <div className="flex gap-4">
              <img src={patient} alt="" />
              <div>
                <h2>Michael</h2>
                <p>Patient</p>
              </div>
            </div>
          </div>

          <div className="w-[50%] h-full bg-white px-16 space-y-8 py-16 rounded-2xl">
            <img src={doubleIcon} alt="" />
            <p>
              Amazing team and amazing <br /> treatment from the best doctor{" "}
              <br /> in the world
            </p>
            <div className="flex gap-4">
              <img src={patient} alt="" />
              <div>
                <h2>Michael</h2>
                <p>Patient</p>
              </div>
            </div>
          </div>
          <div className="w-[50%] h-full bg-white px-16 space-y-8 py-16 rounded-2xl">
            <img src={doubleIcon} alt="" />
            <p>
              Amazing team and amazing <br /> treatment from the best doctor{" "}
              <br /> in the world
            </p>
            <div className="flex gap-4">
              <img src={patient} alt="" />
              <div>
                <h2>Michael</h2>
                <p>Patient</p>
              </div>
            </div>
          </div>
          <div className="w-[50%] h-full bg-white px-16 space-y-8 py-16 rounded-2xl">
            <img src={doubleIcon} alt="" />
            <p>
              Amazing team and amazing <br /> treatment from the best doctor{" "}
              <br /> in the world
            </p>
            <div className="flex gap-4">
              <img src={patient} alt="" />
              <div>
                <h2>Michael</h2>
                <p>Patient</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* footer */}
      <div className="w-full h-[50dvh] text-white flex p-24 gap-16 tracking-wider bg-[#13324F]">
        <div className="w-[30%]  px-20 py-12 ">
          <h1 className="font-bold text-2xl ">Gaurav Doctor</h1>
          <p>
            The ultimate destination for <br />
            all of your medical needs
          </p>
          <div className="flex gap-8 mt-8">
            <LiaFacebookSquare className="size-10" />
            <FaInstagram className="size-10" />
            <FiTwitter className="size-10" />
          </div>
        </div>
        <div className="w-[25%]  px-20 py-12">
          <h1 className="font-bold text-2xl">Explore</h1>
          <p>Home</p>
          <p>Surgery</p>
          <p>OPD</p>
          <p>Specialty</p>
          <p>Consultation</p>
        </div>
        <div className="w-[25%]  px-20 py-12">
          <h1 className="font-bold text-2xl">About Us</h1>
          <p>Who we are</p>
          <p>Our Vision</p>
          <p>Our Team</p>
          <p>Term & Condition</p>
          <p>FAQs</p>
        </div>
        <div className="w-[25%]  px-20 py-12">
          <h1 className="font-bold text-2xl">Contact</h1>
          <p>+1234567890</p>
          <p>doctor@gmail.com</p>
          <p>sector 82,</p>
          <p>Mohali,</p>
          <p>Punjab</p>
        </div>
      </div>
    </div>
  );
};

export default Home;

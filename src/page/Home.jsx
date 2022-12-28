import React, { useState } from "react";
import video1 from "../assets/media/Andy-Bio-01.mp4";
import img1 from "../assets/media/16.jpg";
import emailjs from "emailjs-com";
import { toast } from "react-toastify";
import bioTrackingIcon from '../icons/bio-tracking-icon.png';
import fitnessIcon from '../icons/fitness-icon.png';
import healthIcon from '../icons/health-icon.png';
import longevityLivingIcon from '../icons/longevity-living-icon.png';
import musculationIcon from '../icons/musculation-icon.png';
import nutritionIcon from '../icons/nutrition-icon.png';
import logoSmlSecond from '../icons/logo-sml-second.png';
import logoBigFirst from '../icons/logo-big-first.png';
import {
  FaFacebookSquare,
  FaInstagram,
  FaLinkedin,
  FaTwitterSquare,
} from "react-icons/fa";
import axios from "axios";

const BenefitsItem = ({ number = 0 }) => {
  let [openMore, setOpenMore] = useState(false);

  const toggleOpen = () => {
    // 👇️ passed function to setState
    setOpenMore(current => !current);
    console.log('Hey')
  };

  const benefitItem = [
    {
      image: <img src={longevityLivingIcon} alt='bioTracking icon' style={{width: '4rem', height: '4rem', marginRight: "1rem" }} />,
      text: "Increasing our health span is a combination of balance, physical exercise and movement, nutrition, reducing stress, meaningful, connection, mindfulness, a sense or purpose and emerging biohacking modalities.",
      long: false,
      longText: ''
    },
    {
      image: (
        <img src={musculationIcon} alt='bioTracking icon' style={{width: '4rem', height: '4rem', marginRight: "1rem" }} />
      ),
      text: "Muscularity and looking fit enhance your attractiveness and are positive byproducts of increased physical performance, injury prevention and reducing disease risk and/or progression.",
      long: false,
      longText: ''
    },
    {
      image: <img src={fitnessIcon} alt='bioTracking icon' style={{width: '4rem', height: '4rem', marginRight: "1rem" }} />,
      text: "Exercise is the cornerstone of health and looking great.  Physical activity, resistance training and optimum protein intake is critical for men between the ages of 45 and 65.",
      long: false,
      longText: ''
    },
    {
      image: (
        <img src={nutritionIcon} alt='bioTracking icon' style={{width: '4rem', height: '4rem', marginRight: "1rem" }} />
      ),
      text: "Everyone has their own bio-chemical individuality.  What is optimum nutrition differs from person to person.  How much protein, carbohydrates and fat you should eat, which supplements you need and which you don’t, and how many daily calories you should consume varies wildly.",
      long: true,
      longText: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, incidunt"
    },
    {
      image: <img src={bioTrackingIcon} alt='bioTracking icon' style={{width: '4rem', height: '4rem', marginRight: "1rem" }} />,
      text: "Tracking your fitness and health development and implementing reliable indictors to gauge your progress is essential.  To live your healthiest and longest life possible, your physical activity levels, your diet, health history, and many other factors must be taken into account.",
      long: true,
      longText: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, incidunt"
    },
    {
      image: (
        <img src={healthIcon} alt='bioTracking icon' style={{width: '4rem', height: '4rem', marginRight: "1rem" }} />
      ),
      text: "Objective measures of health status shift in response to what you eat, how you move, how you respond to stress and the quality of your sleep.",
      long: true,
      longText: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, incidunt"
    },
  ];

  return (
    <div style={{ display: "flex", margin: "2rem 0rem", alignItems: 'center' }}>
      {benefitItem[number].image}
      <p style={{ width: "100%", marginTop: "1rem", fontFamily: "'CMU Serif', sans-serif" }}>
        {benefitItem[number].text}
        {
          openMore.more ? (
            benefitItem[number].longText
          ) : ('')
        }
        {
          benefitItem[number].long ? (
            <button onClick={toggleOpen} style={{border: 'none', color: '#502c49', fontWeight: 'bold'}} >More About</button>
          ) : ('')
        }
      </p>
    </div>
  );
};

const Home = () => {

  let [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  let [subscribers, setSubscribers] = useState("");
  let [emailInfo, setEmailInfo] = useState("");

  let { name, email } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/subscribers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    toast.success("Thank you for subscribing!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

    setFormData({
      name: "",
      email: "",
    });

    console.log((await axios.get("http://localhost:5000/subscribers")).data);

    // const res = await axios.get('http://localhost:5000/subscribers').data;

    axios.get("http://localhost:5000/subscribers").then(async (response) => {
      console.log(response);
      console.log(response.data.length);
      for (let index = 0; index < response.data.length; index++) {
        setSubscribers(
          (subscribers += `\nName: ${response.data[index].name} | Email: ${response.data[index].email}`)
        );
      }
      await delay(10000);
      // console.log('after');
      emailjs
        .sendForm(
          "service_7l3mgyo",
          "template_zxjofmm",
          e.target,
          "zsbz2VeOWieYntBFq"
        )
        .then(
          (result) => {
            console.log(result.text);
          },
          (error) => {
            console.log(error.text);
          }
        );
    });
  };

  return (
    <div>
      <header>
        <img src={logoBigFirst} alt="" />
      </header>

      <video controls>
        <source src={video1} type="video/mp4" />
      </video>

      <div className="subscribeSocials">
        <div className="subscribeContainer" style={{ width: "95%" }}>
          <div className="formContainer">
            <form onSubmit={onSubmit}>
              <label>Register for Webinar</label>
              <input
                type="text"
                placeholder="Name"
                name="name"
                id="name"
                value={name}
                onChange={onChange}
              />
              <input
                type="email"
                placeholder="Email"
                name="email"
                id="email"
                value={email}
                onChange={onChange}
              />
              <input
                type="hidden"
                name="subject"
                id="subject"
                defaultValue="AKLC Subscribers"
              />
              <input
                type="hidden"
                name="subscribers"
                id="subscribers"
                defaultValue={subscribers}
              />

              <button>Register</button>
            </form>
          </div>
        </div>

        
        <div className="socialsContainer">
          <small>Socials</small>
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
            <FaInstagram
              style={{
                display: "block",
                width: "2.5rem",
                height: "2.5rem",
                marginBottom: "1rem",
                marginTop: "0.5rem",
              }}
            />
          </a>
          <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin
              style={{
                display: "block",
                width: "2.5rem",
                height: "2.5rem",
                marginBottom: "1rem",
              }}
            />
          </a>
          <a href="https://www.twitter.com/" target="_blank" rel="noopener noreferrer">
            <FaTwitterSquare
              style={{ width: "2.5rem", height: "2.5rem", marginBottom: "1rem" }}
            />
          </a>
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
            <FaFacebookSquare
              style={{ width: "2.5rem", height: "2.5rem", marginBottom: "1rem" }}
            />
          </a>
        </div>
      </div>

      <div className="bio">
        <img src={img1} style={{borderRadius: '50%'}} alt="" />
        <div className="bioInfo">
          <h2>Andrew's Bio</h2>
          <p>
          Andrew Kolasko is the CEO and founder of Andrew Kolasko Life Center. He is a visionary health leader and former champion natural bodybuilder with more than 40 years of weight training, athletic performance and sound eating and nutritional practices. Andrew has achieved the rare air balance of combining the right amount of real world fitness education with longevity based emerging sciences to implement healthy processes and the proven methodologies to attain the look, performance and body mechanics and metabolic health of men several years younger than his chronological age of 55.
          </p>
          <br />
          <p>
          Andrew uses his own healthy practices, nutritional knowledge and novel training methods with his clients to enhance their musculation, strength, vitality, appearance and improve lifespan.
          </p>
          <br />
          <p>
          Andrew’s specialization is working with business owners and corporate executives who have put all their energy and time into building their companies, while sacrificing their own physical well being.  At this later stage of life, enjoying the fruits of their labour can be challenging because of physical and health limitations, but turning back time is not impossible. 
          </p>
          <br/>
          <p>
          Andrew’s skills and passion for his craft has the power to change the way men will live their lives in their later years by sharing his expertise to adjust metabolic health and fitness to a level that will make men over 45, feel more confident and look years younger.
          </p>
        </div>
      </div>

      <div className="benefits">
        <h2>Benefits of Andrew Kolasko Life Center</h2>
        <div className="benefitsItems">
          <div className="leftUl">
            <ul>
              <li>
                <BenefitsItem number={0} />
              </li>
              <li>
                <BenefitsItem number={1} />
              </li>
              <li>
                <BenefitsItem number={2} />
              </li>
            </ul>
          </div>
          <div className="rightUl">
            <ul>
              <li>
                <BenefitsItem number={3} />
              </li>
              <li>
                <BenefitsItem number={4} />
              </li>
              <li>
                <BenefitsItem number={5} />
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="subscribeSocials">
        <div className="subscribeContainer" style={{ width: "95%" }}>
          <div className="formContainer">
            <form>
              <label>Register for Webinar</label>
              <input type="text" placeholder="Name" name="name" id="name" />
              <input type="email" placeholder="Email" name="email" id="email" />
              <button>Register</button>
            </form>
          </div>
        </div>
        <div className="socialsContainer">
          <small>Socials</small>
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
            <FaInstagram
              style={{
                display: "block",
                width: "2.5rem",
                height: "2.5rem",
                marginBottom: "1rem",
                marginTop: "0.5rem",
              }}
            />
          </a>
          <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin
              style={{
                display: "block",
                width: "2.5rem",
                height: "2.5rem",
                marginBottom: "1rem",
              }}
            />
          </a>
          <a href="https://www.twitter.com/" target="_blank" rel="noopener noreferrer">
            <FaTwitterSquare
              style={{ width: "2.5rem", height: "2.5rem", marginBottom: "1rem" }}
            />
          </a>
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
            <FaFacebookSquare
              style={{ width: "2.5rem", height: "2.5rem", marginBottom: "1rem" }}
            />
          </a>
        </div>
      </div>

      <div className="footer">
        <img src={logoSmlSecond} alt="" />
        <div className="footerMoreInfoRight">
          <p>
            This website is for informational purposes only. It does not constitute the practice of medicine, nursing or other professional health care services, including the giving of medical advice. No doctor/patient relationship is formed. The use of the information contained within this website and any video, text, graphics, images and/or other materials linked to this website is at the users own risk. The content of this website is not intended to be a substitute for professional medical advice, diagnosis and/or treatment. Consult with your doctor before taking any medications, vitamins, herbs and/or supplements of any kind. Users should not disregard or delay in obtaining medical advice for any medical condition they have and they should seek the assistance of their qualified health care professionals for any such conditions.
          </p>
          <small style={{position: 'absolute', right: '3rem'}}>© 2022 Andrew Kolasko Life Center</small>
        </div>
      </div>
    </div>
  );
};

export default Home;

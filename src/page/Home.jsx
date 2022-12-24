import React, { useState } from "react";
import video1 from "../assets/media/Andyclip16.mp4";
import img1 from "../assets/media/16.jpg";
import logo3 from "../assets/media/logo3.svg";
import logo1 from "../assets/media/logo1.svg";
import emailjs from "emailjs-com";
import { toast } from "react-toastify";
import {
  FaPlayCircle,
  FaPauseCircle,
  FaInstagram,
  FaLinkedin,
  FaTwitterSquare,
  FaTiktok,
} from "react-icons/fa";
import { GiStrong, GiHealthNormal, GiLifeBar } from "react-icons/gi";
import { IoIosNutrition, IoIosFitness } from "react-icons/io";
import { FaHandHoldingHeart } from "react-icons/fa";
import axios from "axios";

const BenefitsItem = ({ number = 0 }) => {
  const benefitItem = [
    {
      image: <GiStrong style={{ fontSize: "4rem", marginRight: "1rem" }} />,
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid mollitia error inventore laudantium voluptatibus laboriosam ipsa",
    },
    {
      image: (
        <GiHealthNormal style={{ fontSize: "4rem", marginRight: "1rem" }} />
      ),
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid mollitia error inventore laudantium voluptatibus laboriosam ipsa",
    },
    {
      image: <IoIosFitness style={{ fontSize: "4rem", marginRight: "1rem" }} />,
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid mollitia error inventore laudantium voluptatibus laboriosam ipsa",
    },
    {
      image: (
        <IoIosNutrition style={{ fontSize: "4rem", marginRight: "1rem" }} />
      ),
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid mollitia error inventore laudantium voluptatibus laboriosam ipsa",
    },
    {
      image: <GiLifeBar style={{ fontSize: "4rem", marginRight: "1rem" }} />,
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid mollitia error inventore laudantium voluptatibus laboriosam ipsa",
    },
    {
      image: (
        <FaHandHoldingHeart style={{ fontSize: "4rem", marginRight: "1rem" }} />
      ),
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid mollitia error inventore laudantium voluptatibus laboriosam ipsa",
    },
  ];

  return (
    <div style={{ display: "flex", margin: "2rem 1rem" }}>
      {benefitItem[number].image}
      <p style={{ width: "100%", marginTop: "1rem" }}>
        {benefitItem[number].text}
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
        <img src={logo1} alt="" />
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
          <FaInstagram
            style={{
              display: "block",
              width: "2.5rem",
              height: "2.5rem",
              marginBottom: "1rem",
              marginTop: "0.5rem",
            }}
          />
          <FaLinkedin
            style={{
              display: "block",
              width: "2.5rem",
              height: "2.5rem",
              marginBottom: "1rem",
            }}
          />
          <FaTwitterSquare
            style={{ width: "2.5rem", height: "2.5rem", marginBottom: "1rem" }}
          />
          <FaTiktok
            style={{ width: "2.5rem", height: "2.5rem", marginBottom: "1rem" }}
          />
        </div>
      </div>

      <div className="bio">
        <img src={img1} alt="" />
        <div className="bioInfo">
          <h2>Andrew's Bio</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Non saepe
            architecto nisi illo quam recusandae ipsam quibusdam labore
            molestias atque tempora totam, animi est! Eius ratione adipisci
            voluptatibus earum dolorumLorem ipsum dolor sit amet consectetur
            adipisicing elit. Non saepe architecto nisi illo quam recusandae
            ipsam quibusdam labore molestias atque tempora totam, animi est!
            Eius ratione adipisci voluptatibus earum dolorum.
          </p>
          <br />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Non saepe
            architecto nisi illo quam recusandae ipsam quibusdam labore
            molestias atque tempora totam, animi est! Eius ratione adipisci
            voluptatibus earum dolorumLorem ipsum dolor sit amet consectetur
            adipisicing elit. Non saepe architecto nisi illo quam recusandae
            ipsam quibusdam labore molestias atque tempora totam, animi est!
            Eius ratione adipisci voluptatibus earum dolorum.
          </p>
          <br />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Non saepe
            architecto nisi illo quam recusandae ipsam quibusdam labore
            molestias atque tempora totam, animi est! Eius ratione adipisci
            voluptatibus earum dolorumLorem ipsum dolor sit amet consectetur
            adipisicing elit.
          </p>
        </div>
      </div>

      <div className="benefits">
        <h2>Benefits of AKLC</h2>
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
              <button>Subscribe</button>
            </form>
          </div>
        </div>
        <div className="socialsContainer">
          <small>Socials</small>
          <FaInstagram
            style={{
              display: "block",
              width: "2.5rem",
              height: "2.5rem",
              marginBottom: "1rem",
              marginTop: "0.5rem",
            }}
          />
          <FaLinkedin
            style={{
              display: "block",
              width: "2.5rem",
              height: "2.5rem",
              marginBottom: "1rem",
            }}
          />
          <FaTwitterSquare
            style={{ width: "2.5rem", height: "2.5rem", marginBottom: "1rem" }}
          />
          <FaTiktok
            style={{ width: "2.5rem", height: "2.5rem", marginBottom: "1rem" }}
          />
        </div>
      </div>

      <div style={{ overflow: "auto", padding: "2rem" }}>
        <img style={{ float: "left", overflow: "auto" }} src={logo3} alt="" />
        <div className="footerMoreInfoRight">
          <p style={{ marginBottom: "3rem" }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Necessitatibus tenetur qui nobis, at veniam atque quaerat sapiente,
            harum facere odit voluptate delectus in dolorum obcaecati nemo
            assumenda pariatur soluta nihil nesciunt et. Vero exercitationem
            voluptate ratione fugit nostrum, voluptatum corporis aliquid saepe!
            Ipsum illum consequuntur modi eveniet voluptates! Nobis, molestiae.
          </p>
          <small>© Andrew Kolasko Life Center</small>
        </div>
      </div>
    </div>
  );
};

export default Home;

import React from "react";
import Header from "../Header/Header";
import Button from "../Button/Button";
import Slideshow from "../Slideshow/Slideshow";
import Footer from "../Footer/Footer";
import "./Home.css";

const Home = () => {
  const images = [
    { src: "AC-Room.png", text: "AC & Non-AC Rooms" },
    { src: "dining.png", text: "Dining Area" },
    { src: "corridor.png", text: "Wi-Fi Connectivity" },
    { src: "living2.png", text: "Spacious Hall" },
    { src: "hall2.png", text: "Housekeeping" },
  ];

  const img = [
    { src: "hall.png", title: "Spacious Rooms" },
    { src:"dining1.png", title: "Dining Hall" },
    { src: "corridor.png", title: "Wi-Fi Connectivity" },
    { src: "living.png", title: "Living Room" },
    { src: "gym.png", title: "Gym Area" },
    { src: "hall-w.png", title: "Housekeeping" },
  ];
  return (
    <div className="home">
      <Header />
      <div className="image-container">
        <img src="out3.png" alt="gsits" />
        <div className="overlay-content">
          <h3>
            Welcome to, <br />
            <span>Narmada Guest House</span>
          </h3>
          <Button text="View Rooms" />
        </div>
      </div>

      <div className="slideshow">
        <h3>WHAT WE HAVE TO OFFER</h3>
        <Slideshow images={images} />
      </div>

      <div className="brief">
        <h3>THE GUEST HOUSE</h3>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda in
          eaque porro reprehenderit voluptatem fugit nobis! In error illum id
          soluta nemo aut, officia autem nisi eligendi quidem reiciendis,
          impedit distinctio perspiciatis consectetur, nobis illo. Doloremque
          nemo corporis laboriosam quis animi consequuntur officia vel aut ad,
          expedita nostrum autem ipsam deleniti, provident veritatis. Debitis
          numquam inventore tempore omnis laborum ipsa et placeat? Voluptatum,
          repudiandae est. Suscipit repellat enim assumenda saepe nobis eaque
          rem repudiandae blanditiis. Beatae explicabo, temporibus totam
          dignissimos adipisci odit non eum placeat alias consectetur, libero
          hic. Delectus modi voluptate fugiat quis et qui non officiis deserunt
          accusantium, ipsa ut, mollitia, ratione ex soluta laudantium ducimus.
          Consectetur aut explicabo molestias eveniet reiciendis repudiandae
          eaque repellendus dicta incidunt facilis nam quidem totam hic, ab
          molestiae sed magni. Minus doloribus quasi maiores necessitatibus quia
          facilis non harum unde facere! Blanditiis ipsam animi aliquid quidem
          adipisci delectus cumque iste eveniet nemo.
        </p>
      </div>

      <div className="charges-container">
        <h3>CHARGES DETAILS</h3>
        <table>
          <thead>
            <tr>
              <th>S. NO.</th>
              <th>TYPE</th>
              <th>TYPE OF GUEST</th>
              <th>CAPACITY</th>
              <th>CHARGES</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>AC Room</td>
              <td>Visitor</td>
              <td>2</td>
              <td>Rs.1500/night</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Non-AC Room</td>
              <td>Visitor</td>
              <td>2</td>
              <td>Rs.1500/night</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Hall</td>
              <td>Visitor</td>
              <td>2 or more</td>
              <td>Rs.300/bed</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="facility-glimpse">
        <h2>GLIMPSES OF GUEST HOUSE FACILITY</h2>
        <div className="facility-images">
          {img.map((img, index) => (
            <div key={index} className="facility-card">
              <img src={img.src} alt={img.title} />
              <div className="overlay">
                <h4>{img.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="team-section">
        <h3>MEET OUR TEAM</h3>
        <div className="team-members">
          <div className="team-member">
            <div className="team-photo">
              <img src="man.jpeg" />
            </div>
            <p>
              <strong>Prof. Ravi Jatola</strong>
            </p>
            <p>Professor in-charge</p>
          </div>
          <div className="team-member">
            <div className="team-photo">
              <img src="caretaker.png" />
            </div>
            <p>
              <strong>Prakash Pal</strong>
            </p>
            <p>Care Taker</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;

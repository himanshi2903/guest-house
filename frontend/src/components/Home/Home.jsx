import React from "react";
import Header from "../Header/Header";
import Button from "../Button/Button";
import Slideshow from "../Slideshow/Slideshow";
import Footer from "../Footer/Footer";
import "./Home.css";

const Home = () => {
  const images = [
    { src: "https://plus.unsplash.com/premium_photo-1661963657190-ecdd1ca794f9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c3BhY2lvdXMlMjByb29tc3xlbnwwfHwwfHx8MA%3D%3D", text: "PROP 1" },
    { src: "https://images.unsplash.com/photo-1602081112620-4da569dda684?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGluaW5nJTIwaGFsbHxlbnwwfHwwfHx8MA%3D%3D", text: "PROP 2" },
    { src: "https://plus.unsplash.com/premium_photo-1687558345854-a07ac0be8cd6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d2lmaXxlbnwwfHwwfHx8MA%3D%3D", text: "PROP 3" },
    { src: "https://plus.unsplash.com/premium_photo-1661879435429-a396d927c686?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y29uZmVyZW5jZSUyMHJvb218ZW58MHx8MHx8fDA%3D", text: "PROP 4" },
    { src: "https://plus.unsplash.com/premium_photo-1679920025550-75324e59680f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG91c2VrZWVwaW5nfGVufDB8fDB8fHww", text: "PROP 5" },
  ];

  const img = [
    { src: "https://plus.unsplash.com/premium_photo-1661963657190-ecdd1ca794f9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c3BhY2lvdXMlMjByb29tc3xlbnwwfHwwfHx8MA%3D%3D", title: "Spacious Rooms" },
    { src:"https://images.unsplash.com/photo-1602081112620-4da569dda684?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGluaW5nJTIwaGFsbHxlbnwwfHwwfHx8MA%3D%3D", title: "Dining Hall" },
    { src: "https://plus.unsplash.com/premium_photo-1687558345854-a07ac0be8cd6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d2lmaXxlbnwwfHwwfHx8MA%3D%3D", title: "Wi-Fi Connectivity" },
    { src: "https://plus.unsplash.com/premium_photo-1661879435429-a396d927c686?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y29uZmVyZW5jZSUyMHJvb218ZW58MHx8MHx8fDA%3D", title: "Conference Room" },
    { src: "https://images.unsplash.com/photo-1617897711385-df9c86b7dfe3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2N0dnxlbnwwfHwwfHx8MA%3D%3D", title: "24/7 Security" },
    { src: "https://plus.unsplash.com/premium_photo-1679920025550-75324e59680f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG91c2VrZWVwaW5nfGVufDB8fDB8fHww", title: "Housekeeping" },
  ];
  return (
    <div className="home">
      <Header />
      <div className="image-container">
        <img src="gs-photo.jpg" alt="gsits" />
        <div className="overlay-content">
          <h3>
            Welcome to, <br />
            <span>SGSITS Guest House</span>
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
              <td>Type 1</td>
              <td>Visitor</td>
              <td>2</td>
              <td>Rs.x/night</td>
            </tr>
            <tr>
              <td>1</td>
              <td>Type 2</td>
              <td>Visitor</td>
              <td>4</td>
              <td>Rs.y/night</td>
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
              <img src="man.jpeg" />
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

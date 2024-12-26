import React, { useState, useEffect } from 'react';
import client, { urlFor } from './sanity'; // Import the Sanity client
import { PortableText } from '@portabletext/react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

import './App.css';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true, // Enables autoplay
  autoplaySpeed: 5000, // Time between slides in milliseconds (5000ms = 5 seconds)
  cssEase: 'ease-in-out', // Smooth transition
};

function App() {
  const [homeContent, setHomeContent] = useState(null);
  const [aboutContent, setAboutContent] = useState(null);
  const [portfolioContent, setPortfolioContent] = useState(null);
  const [contactContent, setContactContent] = useState(null);

  // Fetch content for each section on component mount
  useEffect(() => {
    client
      .fetch(`*[_type == "home"][0] {description }`)
      .then((data) => setHomeContent(data))
      .catch(console.error);

    client
      .fetch(`*[_type == "about"][0] { title, description, images[] { asset-> { _id, url } } }`)
      .then((data) => setAboutContent(data))
      .catch(console.error);

    client
      .fetch(`*[_type == "portfolio"][0] { title, description }`)
      .then((data) => setPortfolioContent(data))
      .catch(console.error);

    client
      .fetch(`*[_type == "contact"][0] { title, description }`)
      .then((data) => setContactContent(data))
      .catch(console.error);
  }, []);

  return (
    <div>
      {/* Navigation */}
      <nav>
        <img id="logo" src="./public/jopelogo.png" alt="logo" />
        <ul>
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#portfolio">Portfolio</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </nav>

      {/* Home Section */}
      <section id="home">
        <div className="homeHeader">
          <h1 className="headerOne">
            CREATE <span id="heroheaderOne">MAGIC </span>
            <div id="on">ON</div> <span id="heroheaderOne">PAPER</span>
          </h1>
          <img id="heroimage" src="/heroimage.JPG" alt="heroimage" />
        </div>
        <p className="heroparagraph">
          {homeContent
            ? homeContent.description.split(',').map((part, index) => (
                <span key={index}>
                  {part.trim()}
                  <br />
                </span>
              ))
            : 'Loading...'}
        </p>
        <button id="btn-hireme">Hire Me!</button>
      </section>

      {/* About Section */}
      <section id="about">
        <p id="top-content">ABOUT</p>
        {/* Carousel Section */}
        <div className="carousel">
          {aboutContent && aboutContent.images && aboutContent.images.length > 0 ? (
            <Slider {...settings}>
              {aboutContent.images.map((image, index) => (
                <div key={index}>
                  <img
                    src={urlFor(image.asset).url()} // Make sure you're passing the full image asset to `urlFor()`
                    alt={`Carousel image ${index + 1}`}
                    style={{ width: '100%', height: 'auto' }}
                  />
                </div>
              ))}
            </Slider>
          ) : (
            <p>Loading carousel...</p>
          )}
        </div>
        {aboutContent && aboutContent.description ? (
          <PortableText value={aboutContent.description} />
        ) : (
          <p>Loading content...</p>
        )}
      </section>

      {/* Portfolio Section */}
      <section id="portfolio">
        <h1>{portfolioContent ? portfolioContent.title : 'Loading Portfolio...'}</h1>
        <p>{portfolioContent ? portfolioContent.description : 'Loading content...'}</p>
      </section>

      {/* Contact Section */}
      <section id="contact">
        <h1>{contactContent ? contactContent.title : 'Loading Contact...'}</h1>
        <p>{contactContent ? contactContent.description : 'Loading content...'}</p>
      </section>
    </div>
  );
}

export default App;

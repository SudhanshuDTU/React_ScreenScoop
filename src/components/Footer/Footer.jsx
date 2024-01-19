import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaGithub
} from "react-icons/fa";

import ContentWrapper from "../contentWrapper/ContentWrapper";

import "./style.scss";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="footer">
      <ContentWrapper>
        <ul className="menuItems">
          <li className="menuItem">Terms Of Use</li>
          <li className="menuItem">Privacy-Policy</li>
          <li className="menuItem">About</li>
          <li className="menuItem">Blog</li>
          <li className="menuItem">FAQ</li>
        </ul>
        <div className="infoText">
          🎬 Explore the world of cinema with us: From trending hits to timeless
          classics.Your one-stop destination for discovering movies and TV
          shows, tailored for every mood. 🍿 🌐 Join our community of movie
          enthusiasts – because every film is a new emotion. 🌟🎥
        </div>
        <div className="socialIcons">
          <span className="icon">
            <a href="https://www.facebook.com/sudhanshudtu" target="_blank" style={{color:"white", }}><FaFacebookF /></a>
            
        
          </span>
          <span className="icon">
          <a href="https://github.com/SudhanshuDTU" target="_blank" style={{color:"white", }}><FaGithub /></a>
          </span>
          <span className="icon">
          <a href="https://twitter.com/Sudhanshu_dtu" target="_blank" style={{color:"white", }}> <FaTwitter /></a>

            
           
          </span>
          <span className="icon">
          <a href="https://www.linkedin.com/in/sudhanshu-dtu/" target="_blank" style={{color:"white", }}><FaLinkedin /></a>
          </span>

          


        </div>
      </ContentWrapper>
    </footer>
  );
};

export default Footer;

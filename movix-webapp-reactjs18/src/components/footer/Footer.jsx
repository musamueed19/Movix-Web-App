// import social icons
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";

import "./style.scss";

// importing custom comps
import ContentWrapper from "../contentWrapper/ContentWrapper";
import { footerItems } from "../../constants/constants";

const Footer = () => {
  return (
    <footer className="footer">
      <ContentWrapper>
        <ul className="menuItems">
          {footerItems.map((item, index) => (
            <li key={index} className="menuItem">
              {item.title}
            </li>
          ))}
        </ul>

        {/*  */}
        <div className="infoText">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias optio
          amet doloremque cupiditate nulla repellendus fugit odit enim ex
          laboriosam atque delectus sint, suscipit nihil saepe quia. Repellendus
          tempora enim, molestiae eius molestias repellat tenetur laborum
          exercitationem libero sequi nostrum earum facilis quibusdam laboriosam
          nulla.
        </div>

        {/*  */}
        <div className="socialIcons">
          <span className="icon">
            <FaFacebookF />
          </span>
          <span className="icon">
            <FaInstagram />
          </span>
          <span className="icon">
            <FaTwitter />
          </span>
          <span className="icon">
            <FaLinkedin />
          </span>
        </div>
      </ContentWrapper>
    </footer>
  );
};

export default Footer;

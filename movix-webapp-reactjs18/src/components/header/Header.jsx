// useStates & useEffect
import {useState, useEffect} from "react"

// icons imports
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";

// react-router-dom imports
import { useNavigate, useLocation } from "react-router-dom";

// styling ".scss" file
import "./style.scss"


// importing our images, & customs comps
// This "ContentWrapper" is used in almost every Page
import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "/movix-logo.svg";

// import constants - menuItems
import {menuItems} from '../../constants/constants'
const Header = () => {
  
  // defining use States
  // "show" state is used to - show scrolling effect - for header
  const [show, setShow] = useState("top");
  // This is also used to show the scroll effect
  const [lastScrollY, setLastScrollY] = useState(0);
  // "mobileMenu" is used to show Mobile Header / Desktop on the basis of this state
  const [mobileMenu, setMobileMenu] = useState(false);
  // We are also storing search value in this state
  const [query, setQuery] = useState("");

  // This state is used to manage "show/hide" searchbar
  const [showSearch, setShowSearch] = useState("");

  // used to navigate between pages <Link />
  const navigate = useNavigate();
  const location = useLocation();


  return (
    <header className="header">
      <ContentWrapper>
        <div className="logo">
          <img src={logo} alt="" />
        </div>

        <ul className="menuItems">
          {menuItems.map(item => (
            <li className="menuItem">{item.title}</li>
          ))}
          <li className="menuItem"><HiOutlineSearch /></li>
        </ul>

        <div className="mobileMenuItems">
          
        </div>
      </ContentWrapper>
    </header>
  )
}

export default Header
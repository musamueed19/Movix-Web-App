// useStates & useEffect
import { useState, useEffect } from "react";

// icons imports
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";

// react-router-dom imports
import { useNavigate, useLocation } from "react-router-dom";

// styling ".scss" file
import "./style.scss";

// importing our images, & customs comps
// This "ContentWrapper" is used in almost every Page
import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "/movix-logo.svg";

// import constants - menuItems
import { menuItems } from "../../constants/constants";
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


  // setting default scroll - on chnages route
  useEffect(() => {
    window.scroll(0, 0);
  }, [location])


  // control navbar method
  function controlNavbar() {
    console.log(Math.trunc(window.scrollY));
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("hide");
      } else {
        setShow("show");
      }
    }
    else {
      setShow("top")
    }
    setLastScrollY(window.scrollY);
  }

  // useEffect to show scrolling effect on header
  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  // function to handle mobileMenu
  function openSearch() {
    setMobileMenu(false);
    setShowSearch(true);
  }
  function openMobileMenu() {
    setMobileMenu(true);
    setShowSearch(false);
  }

  // Search Query Handler
  function searchQueryHandler(e) {
    if (e.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
      setTimeout(() => {
        setShowSearch(false);
      }, 1000);
    }
  }

  // navigation handler
  function navigationHandler(href) {
    navigate("/explore" + href);
    setMobileMenu(false);
  }

  return (
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
      <ContentWrapper>
        <div className="logo" onClick={() => navigate("/")}>
          <img src={logo} alt="" />
        </div>

        <ul className="menuItems">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className="menuItem"
              onClick={() => navigationHandler(item.href)}
            >
              {item.title}
            </li>
          ))}
          <li className="menuItem">
            <HiOutlineSearch onClick={openSearch} />
          </li>
        </ul>

        <div className="mobileMenuItems">
          <HiOutlineSearch onClick={openSearch} />
          {!mobileMenu ? (
            <SlMenu onClick={openMobileMenu} />
          ) : (
            <VscChromeClose onClick={() => setMobileMenu(false)} />
          )}
        </div>
      </ContentWrapper>
      {showSearch && (
        <div className="searchBar">
          <ContentWrapper>
            <div className="searchInput">
              <input
                type="text"
                placeholder="Search for movies or TV shows..."
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={searchQueryHandler}
              />
              <VscChromeClose onClick={() => setShowSearch(false)} />
            </div>
          </ContentWrapper>
        </div>
      )}
    </header>
  );
};

export default Header;

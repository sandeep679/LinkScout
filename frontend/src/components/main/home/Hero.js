import React, { useContext, useState } from "react";
import { IoIosLink } from "react-icons/io";
import { HiOutlineQuestionMarkCircle } from "react-icons/hi2";
import { FaRegCopy } from "react-icons/fa";
import axios from "axios";
import UserContext from "../../functions/UserContext";
import isUrl from "is-url";
import { handleCopyClick } from "../../functions/UserAction";

import "../styles/Hero.css";
import { Link } from "react-router-dom";

function Hero() {
  const [linknum, setLinkNum] = useState(5);
  const [link, setlink] = useState("");
  const [redirectURl, setRedirectUrl] = useState("");
  const [show, setShow] = useState(false);

  const { loggedIn } = useContext(UserContext);

  async function handleNewShortUrl() {
    console.log("req recieved " + link);
    if(link.length ===0 || !isUrl(link)){
      return;
    }
    
    const { data } = await axios.post(
      "https://linkscout-j2of.onrender.com/temp",
      {
        //body
        url: link,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(data);
    setRedirectUrl(data.shortenURL);
    setShow(true);
    setLinkNum(linknum - 1);
  }


  return (
    <div className="hero">
      <h1 className="hero-head">Shorten Your Looong Links :)</h1>
      <p className="hero-para">
        LinkScout is an efficient and easy-to-use URL shortening service that
        streamlines your online experience
      </p>
      {loggedIn ? (
        <>
          <Link to={"/user"}>
            <div className="trial-alert">Go to DashBoard !</div>
          </Link>
        </>
      ) : (
        <>
          {linknum ? (
            <div className="input-container">
              <div className="icon-link">
                <IoIosLink size={25} />
              </div>
              <input
                type="text"
                placeholder="Enter your link here"
                onChange={(e) => {
                  setlink(e.target.value);
                }}
              />
              <button onClick={handleNewShortUrl}>Shorten</button>
            </div>
          ) : (
            <Link to={"/register"}>
              <div className="trial-alert">Register Now !</div>
            </Link>
          )}
          {show && linknum ? (
            <div className="result-container">
              <div className="result-link">{redirectURl}</div>
              <button onClick={()=>{handleCopyClick(redirectURl)}}>
                <FaRegCopy size={12} />
              </button>
            </div>
          ) : (
            <></>
          )}

          <div className="hero-meta">
            <p>
              You can create <span className="trial-count">{linknum}</span> more
              links.Register Now to enjoy Unlimited Usage{" "}
              <span title="Limited Usage for Unregistered User !">
                <HiOutlineQuestionMarkCircle />
              </span>
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export default Hero;

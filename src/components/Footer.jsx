import React from "react";
import { Instagram, GitHub, Telegram } from "@mui/icons-material";
function Footer() {
  return (
    <div>
      <footer className="footer">
        <div className="footer__logo-container"></div>

        <div className="footer__social d-flex justify-content-center m-2 ">
          <a href="https://www.instagram.com/_.ig_daim._">
            <Instagram style={{ color: "white", margin: "0 15px" }} />
          </a>
          <a href="https://www.github.com.devdaim6">
            <GitHub style={{ color: "white", margin: "0 15px" }} />
          </a>
          <a href="https://www.t.me/dayim2109">
            <Telegram style={{ color: "white", margin: "0 15px" }} />
          </a>
        </div>
        <p className="footer__text text-white text-center">
          Copyright &copy; 2023{" "}
          <a
            style={{ textDecoration: "none", color: "#5acdfe" }}
            href="https://devdaim.tech"
          >
            DevDaim
          </a>
          . All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default Footer;

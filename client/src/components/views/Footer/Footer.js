import React from "react";
import { Icon } from "antd";
import "./footer.css";

function Footer() {
  return (
    <div
      style={{
        height: "80px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1rem",
      }}
    >
      <p>
        {" "}
        <a href="https://www.linkedin.com/in/derek-jinxiao-xu/">
          <Icon
            className="footerIcon"
            type="linkedin"
            style={{ fontSize: 30, margin: "1rem" }}
          />
        </a>
        <a href="https://github.com/dxu5">
          <Icon
            className="footerIcon"
            type="github"
            style={{ fontSize: 30, margin: "1rem" }}
          />
        </a>
        <a href="https://www.instagram.com/derekdjxx/?hl=en">
          <Icon
            className="footerIcon"
            type="instagram"
            style={{ fontSize: 30, margin: "1rem" }}
          />
        </a>
        <a href="mailto: derek_xu@brown.edu">
          <Icon
            className="footerIcon"
            type="mail"
            style={{ fontSize: 30, margin: "1rem" }}
          />
        </a>
      </p>
    </div>
  );
}

export default Footer;

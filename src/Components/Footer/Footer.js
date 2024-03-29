import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedinIn, faGithub } from "@fortawesome/free-brands-svg-icons";
import { FaEnvelope } from "react-icons/fa";
import classes from "../Footer/Footer.module.css";

const Footer = () => {
  return (
    <footer>
      <div className={classes["footer-container"]}>
        <div className={classes.logo}>
          <img
            src={require(`../../assets/images/logo.svg`).default}
            alt="logo"
          ></img>
          <p>Memory Game</p>
        </div>
        <div className={classes["social-media"]}>
          <a
            href="https://github.com/mmohamedgit"
            rel="noreferrer"
            target="_blank"
          >
            <FontAwesomeIcon icon={faGithub} className="fa-beat" />
          </a>
          <a
            href="https://www.linkedin.com/in/mohamed-mohamed-dev"
            rel="noreferrer"
            target="_blank"
          >
            <FontAwesomeIcon icon={faLinkedinIn} className="fa-beat" />
          </a>
          <a
            href="mailto:mohamed.mohamed91@hotmail.com"
            rel="noreferrer"
            target="_blank"
          >
            <FaEnvelope className="fa-beat" />
          </a>
        </div>
        <div>
          <p>Developed by Mohamed Mohamed</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

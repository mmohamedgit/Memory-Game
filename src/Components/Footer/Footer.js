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
            src={require(`../../assets/images/brain-logo.svg`).default}
            alt="starry-night"
          ></img>
          <p>Weather App Project</p>
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
        <p>Developed by Mohamed Mohamed</p>
      </div>
    </footer>
  );
};

export default Footer;

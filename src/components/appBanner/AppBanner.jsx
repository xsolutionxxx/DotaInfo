import "./appBanner.scss";
import bloodseeker from "../../resources/img/bg-banner-bl.png";
import juggernaut from "../../resources/img/bg-banner-jg.png";

const AppBanner = () => {
  return (
    <div className="app__banner">
      <img src={bloodseeker} alt="Bloodseeker" className="app__banner__first" />
      <div className="app__banner-text">
        Learn more about professional teams!
        <br />
        Stay in touch!
      </div>
      <img src={juggernaut} alt="Juggernaut" className="app__banner__second" />
    </div>
  );
};

export default AppBanner;

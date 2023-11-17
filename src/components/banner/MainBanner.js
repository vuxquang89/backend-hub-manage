import banner from "../../assets/images/banner.png";
import "./MainBanner.css";

function MainBanner() {
  return (
    <div className="mainBanner">
      <img src={banner} alt="Main banner" className="imgBanner" />
    </div>
  );
}

export default MainBanner;

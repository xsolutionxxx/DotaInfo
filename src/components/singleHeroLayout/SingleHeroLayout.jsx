import { Link } from "react-router-dom";

import "./singleHeroLayout.scss";

const SingleHeroLayout = ({ data }) => {
  const { thumbnail, name, description } = data;

  return (
    <div className="single-hero">
      <img src={thumbnail} alt={name} className="single-hero__img" />
      <div className="single-hero__info">
        <h2 className="single-hero__name">{name}</h2>
        <div className="single-hero__descr">{description}</div>
      </div>
      <Link to="/" className="single-hero__back">
        Back to main
      </Link>
    </div>
  );
};

export default SingleHeroLayout;

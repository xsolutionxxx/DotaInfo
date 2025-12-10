import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import "./singleHeroLayout.scss";

const SingleHeroLayout = ({ data }) => {
  const { thumbnail, name, description } = data;

  return (
    <div className="single-hero">
      <Helmet>
        <meta
          name="description"
          content={`Information about hero: ${name} dota 2`}
        />
        <title>Dota 2 {name}</title>
      </Helmet>
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

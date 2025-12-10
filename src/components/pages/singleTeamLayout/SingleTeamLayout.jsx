import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import "./singleTeamLayout.scss";

const SingleTeamLayout = ({ data }) => {
  const { name, tag, logo_url, wins, losses, rating, last_match_time } = data;
  const lastMatchDate = new Date(last_match_time * 1000).toLocaleString(
    "uk-UA",
    { dateStyle: "long", timeStyle: "short" }
  );

  return (
    <div className="single-team">
      <Helmet>
        <meta
          name="description"
          content={`Information about team: ${name} dota 2`}
        />
        <title>Dota 2 {name}</title>
      </Helmet>
      <img src={logo_url} alt={tag} className="single-team__img" />
      <div className="single-team__info">
        <h2 className="single-team__name">{name}</h2>
        <p className="single-team__descr">Tag: {tag}</p>
        <p className="single-team__descr">Rating: {rating}</p>
        <p className="single-team__descr">
          Wins: {wins} / Losses: {losses}
        </p>
        <p className="single-team__descr">Last match: {lastMatchDate}</p>
      </div>
      <Link to="/teams" className="single-team__back">
        Back to all
      </Link>
    </div>
  );
};

export default SingleTeamLayout;

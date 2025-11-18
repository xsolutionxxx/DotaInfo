import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import useDotaService from "../../services/DotaService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import "./teamsList.scss";

const TeamsList = () => {
  const { _baseLimit, getTeamsByRating, loading, error } = useDotaService();
  const [teams, setTeams] = useState([]);
  const [newTeamsLoading, setNewTeamsLoading] = useState(false);
  const [start, setStart] = useState(0);
  const [limit] = useState(8);
  const [teamsEnded, setTeamsEnded] = useState(false);

  useEffect(() => {
    onTeamsByRating(start, limit, true);
  }, []);

  const onTeamsByRating = (start, limit, initial) => {
    const rating = 1350;
    initial ? setNewTeamsLoading(false) : setNewTeamsLoading(true);
    getTeamsByRating(rating, start, limit).then(onTeamsListLoaded);
  };

  const onTeamsListLoaded = (newTeamsList) => {
    const merged = [...teams, ...newTeamsList];
    const unique = merged.filter(
      (team, index, self) => index === self.findIndex((t) => t.id === team.id)
    );

    const started = start + limit === limit ? _baseLimit : start + limit;

    let ended = false;

    if (newTeamsList.length < 8) {
      ended = true;
    }

    setTeams(unique);
    setNewTeamsLoading(false);
    setStart(started);
    setTeamsEnded(ended);
  };

  const renderTeams = (arr) => {
    const elements = arr?.map(({ id, name, tag, logo_url, rating }) => (
      <li key={id} className="comics__item">
        <Link to={`/teams/${id}`}>
          <img src={logo_url} alt={name} className="comics__item-img" />
          <div className="comics__item-name">{name}</div>
          <div className="comics__item-rating">
            Rating {tag}: {rating}
          </div>
        </Link>
      </li>
    ));
    return <ul className="comics__grid">{elements}</ul>;
  };

  const teamsList = renderTeams(teams);

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading && !newTeamsLoading ? <Spinner /> : null;

  return (
    <div className="comics__list">
      {errorMessage}
      {spinner}
      {teamsList}
      <button
        className="button button__main button__long"
        style={{ display: teamsEnded ? "none" : "block" }}
        disabled={newTeamsLoading}
        onClick={() => onTeamsByRating(start, limit)}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default TeamsList;

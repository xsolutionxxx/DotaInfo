import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import useDotaService from "../../services/DotaService";
import SetContent from "../../utils/SetContent";

import "./heroInfo.scss";

const HeroInfo = ({ heroId }) => {
  const [hero, setHero] = useState(null);

  const { getHeroById, process, setProcess, clearError } = useDotaService();

  useEffect(() => {
    updateHero();
  }, [heroId]);

  const updateHero = () => {
    if (!heroId) {
      return;
    }

    clearError();
    getHeroById(heroId)
      .then(onHeroLoaded)
      .then(() => setProcess("confirmed"));
  };

  const onHeroLoaded = (hero) => {
    setHero(hero);
  };

  return <div className="hero__info">{SetContent(process, View, hero)}</div>;
};

const View = ({ data }) => {
  const { id, name, description, thumbnail, fandom, baseStats } = data;

  return (
    <>
      <div>
        <div className="hero__basics">
          <img src={thumbnail} alt={name} />
          <div>
            <div className="hero__info-name">{name}</div>
            <div className="hero__btns">
              <Link to={`/heroes/${id}`} className="button button__main">
                <div className="inner">homepage</div>
              </Link>
              <Link
                to={fandom}
                target="_blank"
                rel="noopener noreferrer"
                className="button button__secondary"
              >
                <div className="inner">Fandom</div>
              </Link>
            </div>
          </div>
        </div>
        <div className="hero__descr">{description}</div>
        <div className="hero__stats">base stats:</div>
        <ul className="hero__stats-list">
          {baseStats.map((item, i) => {
            return (
              <li key={i} className="hero__stats-item">
                <span>{item[0]}:</span> {item[1]}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

HeroInfo.propTypes = {
  heroId: PropTypes.number.isRequired,
};

export default HeroInfo;

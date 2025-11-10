import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import DotaService from "../../services/DotaService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Skeleton from "../skeleton/Skeleton";

import "./heroInfo.scss";

const HeroInfo = ({ heroId }) => {
  const [hero, setHero] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setErorr] = useState(false);

  const dotaService = new DotaService();

  useEffect(() => {
    updateHero();
  }, []);

  useEffect(() => {
    updateHero();
  }, [heroId]);

  const updateHero = () => {
    if (!heroId) {
      return;
    }

    onHeroLoading();

    dotaService.getHeroById(heroId).then(onHeroLoaded).catch(onError);
  };

  const onHeroLoaded = (hero) => {
    setHero(hero);
    setLoading(true);
  };

  const onHeroLoading = () => {
    setLoading(true);
  };

  const onError = () => {
    setLoading(false);
    setErorr(true);
  };

  const skeleton = hero || loading || error ? null : <Skeleton />;
  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(spinner || errorMessage || !hero) ? (
    <View hero={hero} />
  ) : null;

  return (
    <div className="hero__info">
      {skeleton}
      {errorMessage}
      {spinner}
      {content}
    </div>
  );
};

const View = ({ hero }) => {
  const { name, description, thumbnail, homepage, fandom, baseStats } = hero;

  return (
    <>
      <div className="hero__basics">
        <img src={thumbnail} alt={name} />
        <div>
          <div className="hero__info-name">{name}</div>
          <div className="hero__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={fandom} className="button button__secondary">
              <div className="inner">Fandom</div>
            </a>
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
    </>
  );
};

HeroInfo.propTypes = {
  heroId: PropTypes.number.isRequired,
};

export default HeroInfo;

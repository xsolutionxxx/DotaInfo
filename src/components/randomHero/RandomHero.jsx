import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import useDotaService from "../../services/DotaService";
import SetContent from "../../utils/SetContent";

import "./randomHero.scss";

import ogre from "../../resources/img/ogre.png";

const RandomHero = () => {
  const [hero, setHero] = useState({});
  const { getRandomHero, clearError, process, setProcess } = useDotaService();

  useEffect(() => {
    updateRandomHero();
  }, []);

  const onHeroLoaded = (hero) => setHero(hero);

  const updateRandomHero = () => {
    clearError();

    getRandomHero()
      .then(onHeroLoaded)
      .then(() => setProcess("confirmed"));
  };

  return (
    <div className="randomhero">
      {SetContent(process, View, hero)}
      <div className="randomhero__static">
        <p className="randomhero__title">
          Random hero for today!
          <br />
          Do you want to get to know him better?
        </p>
        <p className="randomhero__title">Or choose another one</p>
        <button
          className="button button__main"
          onClick={() => updateRandomHero()}
        >
          <div className="inner">try it</div>
        </button>
        <img src={ogre} alt="ogre" className="randomhero__decoration" />
      </div>
    </div>
  );
};

const View = ({ data }) => {
  const { id, name, description, thumbnail, fandom } = data;

  return (
    <div className="randomhero__block">
      <img src={thumbnail} alt="Random character" className="randomhero__img" />
      <div className="randomhero__info">
        <p className="randomhero__name">{name}</p>
        <div className="randomhero__descr">
          {!description
            ? "Hero description is currently unavailable"
            : description}
        </div>
        <div className="randomhero__btns">
          <Link to={`/heroes/${id}`} className="button button__main">
            <div className="inner">homepage</div>
          </Link>
          <Link
            to={fandom}
            target="_blank"
            rel="noopener noreferrer"
            className="button button__secondary"
          >
            <div className="inner">fandom</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RandomHero;

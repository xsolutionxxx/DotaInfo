import { useState, useEffect } from "react";

import DotaService from "../../services/DotaService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import "./randomHero.scss";

import ogre from "../../resources/img/ogre.png";

const RandomHero = () => {
  const [hero, setHero] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    updateRandomHero();
  }, []);

  const dotaService = new DotaService();

  const onHeroLoaded = (hero) => {
    setHero(hero);
    setLoading(false);
  };

  const onHeroLoading = () => {
    setLoading(true);
  };

  const onError = () => {
    setLoading(false);
    setError(true);
  };

  const updateRandomHero = () => {
    const id = Math.floor(Math.random() * (126 - 1) + 1);

    onHeroLoading();

    dotaService.getHeroById(id).then(onHeroLoaded).catch(onError);
  };

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(spinner || errorMessage) ? <View hero={hero} /> : null;

  return (
    <div className="randomhero">
      {errorMessage}
      {spinner}
      {content}
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
        <img src={ogre} alt="mjolnir" className="randomhero__decoration" />
      </div>
    </div>
  );
};

const View = ({ hero }) => {
  const { name, description, thumbnail, homepage, fandom } = hero;

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
          <a href={homepage} className="button button__main">
            <div className="inner">homepage</div>
          </a>
          <a href={fandom} className="button button__secondary">
            <div className="inner">fandom</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RandomHero;

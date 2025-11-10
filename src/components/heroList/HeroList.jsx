import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

import useDotaService from "../../services/DotaService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import "./heroList.scss";

const HeroList = ({ onHeroSelected }) => {
  const [heroes, setHeroes] = useState([]);
  const [newHeroesLoading, setNewHeroesLoading] = useState(false);
  const [start, setStart] = useState(0);
  const [limit] = useState(9);
  const [heroEnded, setHeroEnded] = useState(false);
  const [activeHeroId, setActiveHeroId] = useState(null);

  const { _baseLimit, loading, error, getHeroLimit } = useDotaService();

  useEffect(() => {
    onRequest(start, limit, true);
  }, []);

  const onRequest = (start, limit, initial) => {
    initial ? setNewHeroesLoading(false) : setNewHeroesLoading(true);
    getHeroLimit(start, limit).then(onHeroListLoaded);
  };

  const onHeroListLoaded = (newHeroList) => {
    const merged = [...heroes, ...newHeroList];
    const unique = merged.filter(
      (hero, index, self) => index === self.findIndex((h) => h.id === hero.id)
    );

    const started = start + limit === limit ? _baseLimit : start + limit;

    let ended = false;

    if (newHeroList.length < 9) {
      ended = true;
    }

    setHeroes(unique);
    setNewHeroesLoading(false);
    setStart(started);
    setHeroEnded(ended);
  };

  const heroRefs = useRef({});

  const onHeroClick = (id) => {
    setActiveHeroId(id);
    const el = heroRefs.current[id];
    if (el) el.focus();
  };

  const renderElements = (arr) => {
    const elements = arr?.map(({ id, name, thumbnail }) => (
      <li
        key={id}
        ref={(el) => {
          if (el) heroRefs.current[id] = el;
          else delete heroRefs.current[id];
        }}
        tabIndex={0}
        className={`hero__item ${
          activeHeroId === id ? "hero__item_selected" : ""
        }`}
        onClick={() => {
          onHeroSelected(id);
          onHeroClick(id);
        }}
        onKeyDown={(e) => {
          if (e.key === " " || e.key === "Enter") {
            onHeroSelected(id);
            onHeroClick(id);
          }
        }}
      >
        <img src={thumbnail} alt={name} />
        <div className="hero__name">{name}</div>
      </li>
    ));

    return <ul className="hero__grid">{elements}</ul>;
  };

  const heroList = renderElements(heroes);

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading && !newHeroesLoading ? <Spinner /> : null;

  return (
    <div className="hero__list">
      {errorMessage}
      {spinner}
      {heroList}
      <button
        className="button button__main button__long"
        style={{ display: heroEnded ? "none" : "block" }}
        disabled={newHeroesLoading}
        onClick={() => onRequest(start, limit)}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

HeroList.propTypes = {
  onHeroSelected: PropTypes.func.isRequired,
};

export default HeroList;

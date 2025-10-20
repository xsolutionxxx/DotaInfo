import { Component } from "react";
import PropTypes from "prop-types";

import DotaService from "../../services/DotaService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import "./heroList.scss";

class HeroList extends Component {
  state = {
    heroes: [],
    loading: true,
    error: false,
    newHeroesLoading: false,
    start: 0,
    limit: 9,
    heroEnded: false,
  };

  dotaService = new DotaService();

  componentDidMount() {
    this.onRequest();
  }

  onRequest = (start, limit) => {
    this.onHeroListLoading();
    this.dotaService
      .getHeroLimit(start, limit)
      .then(this.onHeroListLoaded)
      .catch(this.onError);
  };

  onHeroListLoading = () => {
    this.setState({
      newHeroesLoading: true,
    });
  };

  onHeroListLoaded = (newHeroList) => {
    let ended = false;

    if (newHeroList.length < 9) {
      ended = true;
    }

    this.setState(({ start, limit, heroes }) => {
      const merged = [...heroes, ...newHeroList];
      const unique = merged.filter(
        (hero, index, self) => index === self.findIndex((h) => h.id === hero.id)
      );

      return {
        heroes: unique,
        loading: false,
        newHeroesLoading: false,
        start:
          start + limit === limit ? this.dotaService.baseLimit : start + limit,
        heroEnded: ended,
      };
    });
  };

  onError = () => {
    this.setState({ loading: false, error: true });
  };

  renderElements(arr) {
    const elements = arr?.map(({ id, name, thumbnail }) => (
      <li
        key={id}
        className="hero__item"
        onClick={() => this.props.onHeroSelected(id)}
      >
        <img src={thumbnail} alt={name} />
        <div className="hero__name">{name}</div>
      </li>
    ));

    return <ul className="hero__grid">{elements}</ul>;
  }

  render() {
    const {
      heroes,
      loading,
      error,
      newHeroesLoading,
      start,
      limit,
      heroEnded,
    } = this.state;

    const heroList = this.renderElements(heroes);

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? heroList : null;

    return (
      <div className="hero__list">
        {errorMessage}
        {spinner}
        {content}
        <button
          className="button button__main button__long"
          style={{ display: heroEnded ? "none" : "block" }}
          disabled={newHeroesLoading}
          onClick={() => this.onRequest(start, limit)}
        >
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

HeroList.propTypes = {
  onCharSelected: PropTypes.func.isRequired,
};

export default HeroList;

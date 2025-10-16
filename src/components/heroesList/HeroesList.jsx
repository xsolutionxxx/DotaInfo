import { Component } from "react";

import DotaService from "../../services/DotaService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import "./heroesList.scss";

class HeroesList extends Component {
  state = {
    heroes: [],
    loading: true,
    error: false,
  };

  dotaService = new DotaService();

  componentDidMount() {
    this.dotaService
      .getHeroLimit(12)
      .then(this.onHeroesLoaded)
      .catch(this.onError);
  }

  onHeroesLoaded = (heroes) => {
    this.setState({ heroes, loading: false });
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
    const { heroes, loading, error } = this.state;

    const heroList = this.renderElements(heroes);

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? heroList : null;

    return (
      <div className="hero__list">
        {errorMessage}
        {spinner}
        {content}
        <button className="button button__main button__long">
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

export default HeroesList;

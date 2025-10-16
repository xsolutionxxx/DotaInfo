import { Component } from "react";

import DotaService from "../../services/DotaService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Skeleton from "../skeleton/Skeleton";

import "./heroInfo.scss";

class HeroInfo extends Component {
  state = {
    hero: null,
    loading: false,
    error: false,
  };

  dotaService = new DotaService();

  componentDidMount() {
    this.updateHero();
  }
  componentDidUpdate(prevProps) {
    if (this.props.heroId !== prevProps.heroId) {
      this.updateHero();
    }
  }

  updateHero = () => {
    const { heroId } = this.props;

    if (!heroId) {
      return;
    }

    this.onHeroLoading();

    this.dotaService
      .getHeroById(heroId)
      .then(this.onHeroLoaded)
      .catch(this.onError);
  };

  onHeroLoaded = (hero) => {
    this.setState({ hero, loading: false });
  };

  onHeroLoading = () => {
    this.setState({
      loading: true,
    });
  };

  onError = () => {
    this.setState({ loading: false, error: true });
  };

  render() {
    const { hero, loading, error } = this.state;

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
  }
}

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

export default HeroInfo;

import { Component } from "react";

import DotaService from "../../services/DotaService";

import "./RandomHero.scss";

import ogre from "../../resources/img/ogre.png";

class RandomHero extends Component {
  constructor(props) {
    super(props);
    this.updateHero();
  }

  state = {
    hero: {},
  };

  dotaService = new DotaService();

  onHeroLoaded = (hero) => {
    this.setState({ hero });
  };

  updateHero = () => {
    const id = Math.floor(Math.random() * (126 - 1) + 1);

    this.dotaService.getRandomHeroStats(id).then(this.onHeroLoaded);
  };

  render() {
    const {
      hero: { name, description, thumbnail, homepage, wiki },
    } = this.state;

    return (
      <div className="randomhero">
        <div className="randomhero__block">
          <img
            src={thumbnail}
            alt="Random character"
            className="randomhero__img"
          />
          <div className="randomhero__info">
            <p className="randomhero__name">{name}</p>
            <p className="randomhero__descr">
              {!description
                ? "Hero description is currently unavailable"
                : description}
            </p>
            <div className="randomhero__btns">
              <a href={homepage} className="button button__main">
                <div className="inner">homepage</div>
              </a>
              <a href={wiki} className="button button__secondary">
                <div className="inner">Wiki</div>
              </a>
            </div>
          </div>
        </div>
        <div className="randomhero__static">
          <p className="randomhero__title">
            Random hero for today!
            <br />
            Do you want to get to know him better?
          </p>
          <p className="randomhero__title">Or choose another one</p>
          <button className="button button__main">
            <div className="inner">try it</div>
          </button>
          <img src={ogre} alt="mjolnir" className="randomhero__decoration" />
        </div>
      </div>
    );
  }
}

export default RandomHero;

import { Component } from "react";

import AppHeader from "../appHeader/AppHeader";
import RandomHero from "../randomHero/RandomHero";
import HeroesList from "../heroesList/HeroesList";
import HeroInfo from "../heroInfo/HeroInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import enigma from "../../resources/img/enigma.png";

class App extends Component {
  state = {
    selectedHero: null,
  };

  onHeroSelected = (id) => {
    this.setState({
      selectedHero: id,
    });
  };

  render() {
    return (
      <div className="app">
        <AppHeader />
        <main>
          <ErrorBoundary>
            <RandomHero />
          </ErrorBoundary>
          <div className="hero__content">
            <ErrorBoundary>
              <HeroesList onHeroSelected={this.onHeroSelected} />
            </ErrorBoundary>
            <ErrorBoundary>
              <HeroInfo heroId={this.state.selectedHero} />
            </ErrorBoundary>
          </div>
          <img className="bg-decoration" src={enigma} alt="vision" />
        </main>
      </div>
    );
  }
}

export default App;

import { useState } from "react";

import RandomHero from "../randomHero/RandomHero";
import HeroList from "../heroList/HeroList";
import HeroInfo from "../heroInfo/HeroInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import enigma from "../../resources/img/enigma.png";

const MainPage = () => {
  const [selectedHero, setHero] = useState(null);

  const onHeroSelected = (id) => {
    setHero(id);
  };

  return (
    <>
      <ErrorBoundary>
        <RandomHero />
      </ErrorBoundary>
      <div className="hero__content">
        <ErrorBoundary>
          <HeroList onHeroSelected={onHeroSelected} />
        </ErrorBoundary>
        <ErrorBoundary>
          <HeroInfo heroId={selectedHero} />
        </ErrorBoundary>
      </div>
      <img className="bg-decoration" src={enigma} alt="vision" />
    </>
  );
};

export default MainPage;

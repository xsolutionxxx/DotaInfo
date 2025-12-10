import { useState } from "react";
import { Helmet } from "react-helmet-async";

import RandomHero from "../randomHero/RandomHero";
import HeroList from "../heroList/HeroList";
import HeroInfo from "../heroInfo/HeroInfo";
import HeroSearchForm from "../heroSearchForm/HeroSearchForm";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import enigma from "../../resources/img/enigma.png";

const MainPage = () => {
  const [selectedHero, setHero] = useState(null);

  const onHeroSelected = (id) => {
    setHero(id);
  };

  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="Information about all heroes dota 2"
        />
        <title>Dota 2 Information Portal</title>
      </Helmet>
      <ErrorBoundary>
        <RandomHero />
      </ErrorBoundary>
      <div className="hero__content">
        <ErrorBoundary>
          <HeroList onHeroSelected={onHeroSelected} />
        </ErrorBoundary>

        <div>
          <ErrorBoundary>
            <HeroSearchForm />
          </ErrorBoundary>
          <ErrorBoundary>
            <HeroInfo heroId={selectedHero} />
          </ErrorBoundary>
        </div>
      </div>
      <img className="bg-decoration" src={enigma} alt="vision" />
    </>
  );
};

export default MainPage;

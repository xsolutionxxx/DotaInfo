import AppHeader from "../appHeader/AppHeader";
import RandomHero from "../randomChar/RandomHero";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import decoration from "../../resources/img/vision.png";

const App = () => {
  return (
    <div className="app">
      <AppHeader />
      <main>
        <RandomHero />
        <div className="char__content">
          <CharList />
          <CharInfo />
        </div>
        <img className="bg-decoration" src={decoration} alt="vision" />
      </main>
    </div>
  );
};

export default App;

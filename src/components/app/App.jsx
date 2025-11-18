import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { MainPage, TeamsPage, SingleTeamPage, Page404 } from "../pages";
import AppHeader from "../appHeader/AppHeader";

const App = () => {
  return (
    <Router>
      <div className="app">
        <AppHeader />
        <main>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/teams" element={<TeamsPage />} />
            <Route path="/teams/:id" element={<SingleTeamPage />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;

import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import Spinner from "../spinner/Spinner";
import SingleTeamLayout from "../singleTeamLayout/SingleTeamLayout";
import SingleHeroLayout from "../singleHeroLayout/SingleHeroLayout";

const MainPage = lazy(() => import("../pages/MainPage"));
const TeamsPage = lazy(() => import("../pages/TeamsPage"));
const SinglePage = lazy(() => import("../pages/SinglePage"));
const Page404 = lazy(() => import("../pages/Page404"));

const App = () => {
  return (
    <Router>
      <div className="app">
        <AppHeader />
        <main>
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/teams" element={<TeamsPage />} />
              <Route
                path="/teams/:id"
                element={
                  <SinglePage Component={SingleTeamLayout} dataType="team" />
                }
              />
              <Route
                path="/heroes/:id"
                element={
                  <SinglePage Component={SingleHeroLayout} dataType="hero" />
                }
              />
              <Route path="*" element={<Page404 />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
};

export default App;

import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import AppHeader from "../appHeader/AppHeader";
import Spinner from "../spinner/Spinner";
import SingleTeamLayout from "../pages/singleTeamLayout/SingleTeamLayout";
import SingleHeroLayout from "../pages/singleHeroLayout/SingleHeroLayout";

const MainPage = lazy(() => import("../pages/MainPage"));
const TeamsPage = lazy(() => import("../pages/TeamsPage"));
const SinglePage = lazy(() => import("../pages/SinglePage"));
const Page404 = lazy(() => import("../pages/Page404"));

const App = () => {
  return (
    <HelmetProvider>
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
    </HelmetProvider>
  );
};

export default App;

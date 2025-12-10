import { Helmet } from "react-helmet-async";

import AppBanner from "../appBanner/AppBanner";
import TeamsList from "../teamsList/TeamsList";

const TeamsPage = () => {
  return (
    <>
      <Helmet>
        <meta name="description" content="Page with list of TOP Dota 2 teams" />
        <title>Dota 2 High-tier Teams</title>
      </Helmet>
      <AppBanner />
      <TeamsList />
    </>
  );
};

export default TeamsPage;

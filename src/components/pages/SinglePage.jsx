import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import AppBanner from "../appBanner/AppBanner";
import setContent from "../../utils/SetContent";

import useDotaService from "../../services/DotaService";

const SinglePage = ({ Component, dataType }) => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const { getHeroById, getTeamById, process, setProcess, clearError } =
    useDotaService();

  useEffect(() => {
    updateData();
  }, [id]);

  const updateData = () => {
    clearError();

    switch (dataType) {
      case "hero":
        getHeroById(id)
          .then(onDataLoaded)
          .then(() => setProcess("confirmed"));
        break;
      case "team":
        getTeamById(id)
          .then(onDataLoaded)
          .then(() => setProcess("confirmed"));
        break;
    }
  };

  const onDataLoaded = (data) => {
    setData(data);
  };

  return (
    <>
      <AppBanner />
      {setContent(process, Component, data)}
    </>
  );
};

export default SinglePage;

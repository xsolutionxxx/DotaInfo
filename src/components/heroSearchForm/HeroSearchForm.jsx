import { useState } from "react";
import {
  Formik,
  Form,
  Field,
  ErrorMessage as FormikErrorMessage,
} from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

import useDotaService from "../../services/DotaService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import "./heroSearchForm.scss";

const SetContent = (process, Component, data) => {
  switch (process) {
    case "waiting":
      return null;
    case "loading":
      return <Spinner widthSpin={"38px"} heightSpin={"38px"} />;
    case "confirmed":
      return <Component data={data} />;
    case "error":
      return <ErrorMessage />;
    default:
      throw Error("Unexpected process state");
  }
};

const Results = ({ data }) => {
  if (!data) {
    return null;
  }

  if (data === "not_found") {
    return (
      <div className="form__text form__text__error">
        The hero was not found. Check the name and try again
      </div>
    );
  }

  return (
    <div className="form__wrapper">
      <span className="form__text form__text__correct">
        There is! Visit {data.name} page?
      </span>
      <Link to={`/heroes/${data.id}`} className="button button__secondary">
        <div className="inner">to page</div>
      </Link>
    </div>
  );
};

const HeroSearchForm = () => {
  const [hero, setHero] = useState(null);
  const { getHeroByName, process, setProcess, clearError } = useDotaService();

  const onHeroLoaded = (hero) => {
    !hero ? setHero("not_found") : setHero(hero);
  };

  const updateHero = (heroName) => {
    clearError();
    setProcess("loading");

    getHeroByName(heroName)
      .then(onHeroLoaded)
      .then(() => setProcess("confirmed"));
  };

  const isLoading = process === "loading";

  return (
    <Formik
      initialValues={{ heroName: "" }}
      validationSchema={Yup.object({
        heroName: Yup.string().required("This field is required"),
      })}
      onSubmit={({ heroName }) => {
        updateHero(heroName);
      }}
    >
      <Form className="form">
        <label htmlFor="heroName" className="form__text">
          Find a hero by name:
        </label>
        <div className="form__wrapper">
          <Field
            name="heroName"
            type="text"
            placeholder="Enter name"
            className="form__input"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="button button__main"
          >
            <div className="inner">find</div>
          </button>
        </div>
        <FormikErrorMessage
          name="heroName"
          className="form__text form__text__error"
          component="span"
        />
        {SetContent(process, Results, hero)}
      </Form>
    </Formik>
  );
};

export default HeroSearchForm;

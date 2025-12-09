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
import ErrorMessage from "../errorMessage/ErrorMessage";

import "./heroSearchForm.scss";

const HeroSearchForm = () => {
  const [hero, setHero] = useState(null);
  const { getHeroByName, error, clearError } = useDotaService();

  const updateHero = (heroName) => {
    clearError();

    getHeroByName(heroName).then(onHeroLoaded);
  };

  const onHeroLoaded = (hero) => {
    if (!hero) {
      setHero(false);
      return;
    }

    setHero(hero);
  };

  const errorMessage = error ? <ErrorMessage /> : null;
  const results =
    hero === false ? (
      <div className="form__text form__text__error">
        The hero was not found. Check the name and try again
      </div>
    ) : !hero ? null : (
      <div className="form__wrapper">
        <span className="form__text form__text__correct">
          There is! Visit {hero.name} page?
        </span>
        <Link to={`/heroes/${hero.id}`} className="button button__secondary">
          <div className="inner">to page</div>
        </Link>
      </div>
    );

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
          <button type="submit" className="button button__main">
            <div className="inner">find</div>
          </button>
        </div>
        <FormikErrorMessage
          name="heroName"
          className="form__text form__text__error"
          component="span"
        />
        {results}
        {errorMessage}
      </Form>
    </Formik>
  );
};

export default HeroSearchForm;

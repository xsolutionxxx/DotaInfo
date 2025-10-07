import "./errorMessage.scss";

import errorImg from "./error.gif";

const ErrorMessage = () => {
  return (
    <div className="error">
      <img src={errorImg} alt="Error" className="error__img" />
      <h2 className="error__message">Something went wrong</h2>
    </div>
  );
};

export default ErrorMessage;

import { Link } from "react-router-dom";

import "./message404.scss";

const Message404 = () => {
  return (
    <div className="message-404">
      <Link to="/" className="message-404__link">
        Back to main page
      </Link>
      <div className="message-404__text">
        <h2 className="message-404__text__title">
          Be careful, the mider is gone.
        </h2>

        <p className="message-404__text__subtitle">Page doesn't exist</p>
      </div>
    </div>
  );
};

export default Message404;

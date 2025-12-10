import { Helmet } from "react-helmet-async";

import ErrorMessage from "../errorMessage/ErrorMessage";
import Message404 from "../message404/Message404";

const Page404 = () => {
  return (
    <>
      <Helmet>
        <meta name="description" content="Page not found" />
        <title>Not Found</title>
      </Helmet>
      <ErrorMessage />
      <Message404 />
    </>
  );
};

export default Page404;

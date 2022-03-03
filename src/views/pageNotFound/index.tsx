import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./pageNotFound.css";

type Props = {};

const PageNotFound = (props: Props) => {
  const redirect = useNavigate();

  useEffect(() => {
    document
      .getElementById("pg404svg")
      ?.classList.remove("pg404svg195Inactive");

    const timeout = setTimeout(() => {
      redirect("/");
    }, 5000);

    return () => {
      clearTimeout(timeout);
      document.getElementById("pg404svg")?.classList.add("pg404svg195Inactive");
    };
  }, []);

  return (
    <div className="pg404Container">
      <div className="pg404messageBox">
        <h1>404</h1>
        <p>Page not found</p>
        <div className="pg404Redirect">
          <p>Automaticlly Redirecting You...</p>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;

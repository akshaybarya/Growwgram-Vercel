import React, { useEffect } from "react";

type Props = {
  typ: string;
};

const Error = (props: Props) => {
  const temp = props.typ === "user";

  useEffect(() => {
    document
      .getElementById("pg404svg")
      ?.classList.remove("pg404svg195Inactive");

    return () => {
      document.getElementById("pg404svg")?.classList.add("pg404svg195Inactive");
    };
  }, []);

  return (
    <div className="pg404Container">
      <div className="pg404messageBox">
        {temp && <h1>404</h1>}
        {temp ? <p>User not found!</p> : <p>Something Went Wrong</p>}
      </div>
    </div>
  );
};

export default Error;

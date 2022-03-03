import React from "react";
import PuffLoader from "react-spinners/PuffLoader";

type Props = {
  loading: boolean;
};

const Spinner = (props: Props) => {
  return (
    <div className="loading195Container">
      <PuffLoader color="#a5a4a4" loading={props.loading} size={70} />
    </div>
  );
};

export default Spinner;

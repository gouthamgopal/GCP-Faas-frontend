import React from "react";
import { Spinner } from "react-bootstrap";

export default function List(props) {
  const data = props.imgData;
  const loader = props.loader;

  return (
    <div>
      {loader && (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}
      {!loader && (
        <div className="image">
          <embed type="image/svg+xml" src={data} alt="responseChart" />
        </div>
      )}
    </div>
  );
}

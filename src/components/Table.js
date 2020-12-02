import React from "react";
import Table from "react-bootstrap/Table";
import { Spinner } from "react-bootstrap";

export default function TableData(props) {
  console.log(props.countData);
  const loader = props.loader;
  return (
    <div>
      {loader && (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}
      {!loader && props && props.countData && (
        <Table striped bordered hover size="sm">
          <thead>
            <th>Sentence Length</th>
            <th>Number of Occurence</th>
          </thead>
          <tbody>
            {Object.entries(props.countData).map((data, index) => {
              return (
                <tr key={index}>
                  <td>{data[0]}</td>
                  <td>{data[1]}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </div>
  );
}

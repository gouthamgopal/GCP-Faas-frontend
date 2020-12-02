import React, { useState } from "react";
import List from "./List";
import TableData from "./Table";
import axios from "axios";
import "./Search.css";
import { Button, Spinner } from "react-bootstrap";

const booklist = [
  {
    name: "Moby-Dick; or, The Whale by Herman Melville",
    url: "https://dev.gutenberg.org/files/15/15-0.txt",
  },
  {
    name: "Pride and Prejudice by Jane Austen",
    url: "https://dev.gutenberg.org/files/1342/1342-0.txt",
  },
  {
    name: "The Scarlet Letter by Nathaniel Hawthorne",
    url: "https://dev.gutenberg.org/files/25344/25344-0.txt",
  },
  {
    name: "A Tale of Two Cities by Charles Dickens",
    url: "https://dev.gutenberg.org/files/98/98-0.txt",
  },
  {
    name: "Medicine in the Middle Ages by Edmond Dupouy",
    url: "https://www.gutenberg.org/files/63938/63938-0.txt",
  },
  {
    name: "Strange Exodus by Robert Abernathy",
    url: "http://www.gutenberg.org/cache/epub/63936/pg63936.txt",
  },
  {
    name: "The Lost Tribes Of Venus by Erik Fennel",
    url: "http://www.gutenberg.org/cache/epub/63932/pg63932.txt",
  },
];
export default function Search() {
  const [isLoading, setIsLoading] = useState(false);
  const [isImageLoading, setimageLoading] = useState(false);
  const [searchUrl, setSearchUrl] = useState("");
  const [imgData, setimgData] = useState(null);
  const [countData, setCountData] = useState(null);
  onsubmit = () => {
    setIsLoading(true);
    setimageLoading(true);

    const imgurl =
      "https://us-central1-goutham-gopal.cloudfunctions.net/get_histogram?url=" +
      searchUrl.trim();
    axios
      .get(imgurl, {
        headers: { "content-type": "application/json" },
      })
      .then((response) => {
        console.log(response);
        setimgData(response.data);
        setimageLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });

    const countUrl =
      "https://us-central1-goutham-gopal.cloudfunctions.net/get_count?url=" +
      searchUrl.trim();

    axios
      .get(countUrl, {
        headers: {
          "content-type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        setCountData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });

    setIsLoading(false);
  };

  onreset = () => {
    setSearchUrl("");
    setimgData(null);
    setCountData(null);
  };
  return (
    <div>
      <section className="input">
        <h2 className="header">Sentence Distribution</h2>
        <section className="searchBar">
          <input
            list="booklist"
            type="text"
            placeholder="Enter any url for a book or select from the list."
            onChange={(e) => {
              setSearchUrl(e.target.value);
            }}
            value={searchUrl}
            className="inputText"
          />
          <datalist id="booklist">
            {booklist.map((book, idx) => {
              return (
                <option value={book.url} key={idx}>
                  {book.name}
                </option>
              );
            })}
          </datalist>
          <Button
            type="submit"
            value="Analyze"
            onClick={() => onsubmit()}
            className="button"
          >
            Analyze
          </Button>
          <Button
            type="reset"
            value="Reset"
            onClick={() => onreset()}
            className="button"
          >
            Reset
          </Button>
        </section>
      </section>

      <section className="output">
        <section className="tableOutput">
          <TableData countData={countData} loader={isLoading} />
        </section>
        <section className="imgOutput">
          <List url={searchUrl} imgData={imgData} loader={isImageLoading} />
        </section>
      </section>
    </div>
  );
}

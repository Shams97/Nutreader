/**@jsx jsx */
import { useState } from "react";
import { jsx, css } from "@emotion/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import axios from "axios";
import { Spinner } from "reactstrap";

export const Contribute = () => {
  // eslint-disable-next-line
  const [mains, setMains] = useState([]);
  const namess = ["mustafaKamal-fe", "bradtraversy"];
  const [spin, setStopSpin] = useState(false);
  useEffect(() => {
    let collect: {}[] = [];
    namess.forEach((name, i) => {
      if (i === namess.length - 1) {
        updateUI();
      }
      axios
        .get(
          `https://api.github.com/users/${name}?client_id=${process.env.REACT_APP_GITHUB_KEY}&client_secret=${process.env.REACT_APP_GITHUB_SECRET}`
        )
        .then((res) => {
          collect.push(res.data);
        });
    });

    function updateUI() {
      window.setTimeout(() => {
        setStopSpin(true);
        setMains(collect);
      }, 1000);
    }
    //  eslint-disable-next-line
  }, []);

  return (
    <div
      className="container"
      css={css`
        font-size: 14px;
      `}
    >
      <div className="row text-center">
        <p className="col-12 lead">
          {" "}
          <b className="mr-1">
            Nutreader<sup>&copy;</sup>
          </b>
          is proud of its maintainers
        </p>
        <div className="col-12">
          <div className="btn btn-primary mt-4">
            Contribute <FontAwesomeIcon icon={["fab", "github"]} />
          </div>
        </div>
      </div>
      <div className="row">
        <div
          css={css`
            padding: 1rem;
            margin-top: 2rem;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(30px, 50px));
            grid-column-gap: 5px;
            justify-content: center;
          `}
          className="col-12"
        >
          {spin ? (
            mains.map((person: any, i: number) => {
              return (
                <div key={i}>
                  <a href={person.html_url} target="_new">
                    <img
                      title={person.login}
                      css={css`
                        width: 55px;
                        height: 50px;
                        border-radius: 50px;
                      `}
                      src={person.avatar_url}
                      alt={person.login}
                      className="img-fluid"
                    ></img>
                  </a>
                </div>
              );
            })
          ) : (
            <Spinner />
          )}
        </div>
      </div>
    </div>
  );
};

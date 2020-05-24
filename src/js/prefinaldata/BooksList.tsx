/** @jsx jsx */
import { useContext } from "react";
import { NyBooks } from "./NyBooks";
import { ErrorHandlerUi } from "../comps/errors/ErrorHandlerUi";
import { css, jsx } from "@emotion/core";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import ViewBookContext from "../view/book";
import ScrollPosContext from "../scrollPositionContext/scrollPosContext";
import GoogleBookMetaInfo from "../comps/GoogleBookMetaInfo";
/**
 * this component recieves either books or errors
 * such as network request errors and API request errors
 */

export const BooksList = ({ data }: any) => {
  // eslint-disable-next-line
  const [viewBook, setViewbook] = useContext(ViewBookContext);
  // eslint-disable-next-line
  const [scrollPos, setScrollPos] = useContext(ScrollPosContext);

  const style = css`
    background-color: transparent;
    border: none;
    height: 196px;
    width: 128px;
    padding: 0;
    margin: 0;
    &:focus {
      box-shadow: none !important;
    }
    @media (max-width: 592px) {
      border-radius: 5px;
      background-color: transparent;
      height: auto;
      width: 55%;
      &:hover {
        background-color: transparent;
      }
      &:blur {
        background-color: transparent;
      }
      &:focus {
        background-color: transparent;
        box-shadow: none;
        outline: none;
      }
      &:active {
        background-color: transparent !important;
      }
    }
  `;

  return (
    // google books or Ny books or error handling
    <div
      className="books-list"
      css={css`
        @media (min-width: 992px) {
          width: 80%;
          margin: auto;
        }
      `}
    >
      {data.items !== undefined ? (
        data.items.map((e: any, i: number) => {
          return (
            <div
              id={`book-${i}`}
              key={i}
              css={css`
                background-color: #f9f9f9;
                border-radius: 10px;
                border: 1px solid transparent;
                @media (max-width: 592px) {
                  margin-top: 2rem !important;
                }
                @media (min-width: 593px) {
                  margin: 1rem;
                  padding: 1rem;
                }
              `}
              className="text-center d-flex-column align-items-center justify-content-center"
            >
              <div
                className="books-list-item-peak"
                css={css`
                  @media (max-width: 592px) {
                    background-color: #f9f9f9;
                    padding: 1.5rem 0 1rem 0;
                    &:focus {
                      outline: none;
                      box-shadow: none;
                    }
                  }
                  @media (min-width: 591px) and (max-width: 780px) {
                    margin-bottom: 1.5rem;
                  }
                  @media (min-width: 781px) and (max-width: 991px) {
                    margin-bottom: 1.8rem;
                  }
                `}
              >
                <Button css={style}>
                  <div
                    css={css`
                      background-color: transparent !important;
                      @media (max-width: 592px) {
                        &:focus {
                          outline: none;
                          background-color: transparent;
                        }
                        &:active {
                          outline: none;
                          background-color: transparent;
                        }
                      }
                    `}
                  >
                    {e.volumeInfo.imageLinks !== undefined &&
                    e.volumeInfo.imageLinks.thumbnail !== undefined &&
                    e.volumeInfo.imageLinks.thumbnail !== null &&
                    e.volumeInfo.imageLinks.thumbnail !== "" ? (
                      <Link
                        css={css`
                          text-decoration: none;
                          &:hover {
                            text-decoration: none;
                            cursor: initial;
                          }
                        `}
                        to={`/books/${e.volumeInfo.title
                          .split(" ")
                          .join("-")
                          .toLowerCase()}`}
                      >
                        <img
                          onClick={() => {
                            setViewbook(e);
                            setScrollPos(`book-${i}`);
                          }}
                          css={style}
                          src={e.volumeInfo.imageLinks.thumbnail}
                          alt={
                            e.volumeInfo.title !== undefined &&
                            e.volumeInfo.title !== "" &&
                            e.volumeInfo.title
                          }
                        ></img>
                      </Link>
                    ) : (
                      <Link
                        css={css`
                          text-decoration: none;
                          &:hover {
                            text-decoration: none;
                            cursor: initial;
                          }
                        `}
                        to={`/books/${e.volumeInfo.title
                          .split(" ")
                          .join("-")
                          .toLowerCase()}`}
                      >
                        <div
                          css={css`
                            height: 165px;
                            width: 150px;
                            margin: auto;
                            display: flex;
                            justify-content: center;
                            background-color: #eff0fa;
                          `}
                        >
                          {e.volumeInfo.title}
                        </div>
                        <div
                          css={css`
                            width: 55%;
                            margin: 1rem auto;
                            display: flex;
                            text-align: left;
                            flex-direction: column;
                            justify-content: flex-start;
                            color: black;
                          `}
                        ></div>
                      </Link>
                    )}
                  </div>
                </Button>
              </div>
              <GoogleBookMetaInfo bookData={e} />
            </div>
          );
        })
      ) : data.error ? (
        <ErrorHandlerUi data={data} />
      ) : (
        <NyBooks books={data} />
      )}
    </div>
  );
};

/** @jsx jsx */
import { useContext } from "react";
import ViewBookContext from "../view/book";
import { css, jsx } from "@emotion/core";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import ScrollPosContext from "../scrollPositionContext/scrollPosContext";
export const BookComponent = ({
  book,
  i,
  searchMethod,
}: {
  book: any;
  i: number;
  searchMethod: string;
}) => {
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
  `;

  // set current book and navigate to /ny/otherbooks
  return (
    <div
      key={i}
      id={`book-${i}`}
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
          <Link to={`/books/ny/otherbooks/${searchMethod}`}>
            <img
              src={
                book.book_image !== undefined &&
                book.book_image &&
                book.book_image
              }
              alt={book.title}
              onClick={() => {
                setViewbook(book);
                setScrollPos(`book-${i}`);
              }}
              css={style}
            ></img>
          </Link>
        </Button>
      </div>
    </div>
  );
};

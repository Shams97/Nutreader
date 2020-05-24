/** @jsx jsx */
import { useContext } from "react";
import ViewBookContext from "../view/book";
import { css, jsx } from "@emotion/core";
import { Button, CardHeader, Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import ScrollPosContext from "../scrollPositionContext/scrollPosContext";

export const NyAllBestBooks = ({ books }: any) => {
  // eslint-disable-next-line
  const [viewBook, setViewbook] = useContext(ViewBookContext);
  // eslint-disable-next-line
  const [scrollPos, setScrollPos] = useContext(ScrollPosContext);
  return books.results.map((book: { title?: string }, i: number) => {
    return (
      <div
        key={i}
        id={`book-${i}`}
        css={css`
          width: 250px;
          margin: 1rem auto 0 auto;
        `}
        className="text-center d-flex-column align-items-center justify-content-center"
      >
        <div className="books-list-item-peak">
          <Card>
            <CardHeader>{book.title}</CardHeader>
            <CardBody>
              <Button color="primary" size="sm">
                <Link to={`/books/ny/allbest`}>
                  <div
                    css={css`
                      color: white;
                      & a:hover {
                        text-decoration: none;
                      }
                    `}
                    onClick={() => {
                      setViewbook(book);
                      setScrollPos(`book-${i}`);
                    }}
                  >
                    Details
                  </div>
                </Link>
              </Button>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  });
};

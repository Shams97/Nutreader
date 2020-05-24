/**this component is rendered when any google books search(keywords and suggestions )
 * is clicked for more details..
 * the url path is changed to '/books'
 */
/**@jsx jsx */
import { useContext, createRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormContext } from "../formContext/FormContext";
import { KeywordsContext } from "../keywordsContext/KeywordsContext";
import { ScrollContext } from "../scrollcontext/ScrollContext";
import ViewBookContext from "../view/book";
import { SuggestionsContext } from "../suggestionsContext/SuggestionsContext";
import { useHistory, Redirect } from "react-router-dom";
import { PrevSugContext } from "../suggestionsContext/PrevSugContext";
import { PrevKeysContext } from "../keywordsContext/PrevKeysContext";
import { PrevFormContext } from "../formContext/PrevFormContext";
import NavBack from "../comps/Navback";
import ScrollPosContext from "../scrollPositionContext/scrollPosContext";
import { jsx, css } from "@emotion/core";

const GoogleBooks = () => {
  let history = useHistory();
  const [scrollPos] = useContext(ScrollPosContext);
  const [currentBook] = useContext(ViewBookContext);
  // eslint-disable-next-line
  const [suggestions, setSuggestions] = useContext(SuggestionsContext);
  // eslint-disable-next-line
  const [formcontext, setFormContext] = useContext(FormContext);
  // eslint-disable-next-line
  const [keywordsConext, setKeyWordsContext] = useContext(KeywordsContext);
  const suggestionsArrow = createRef<HTMLDivElement>();
  // eslint-disable-next-line
  const [scroll, setScroll] = useContext(ScrollContext);
  // eslint-disable-next-line
  const [prevSug, setPrevSug] = useContext(PrevSugContext);
  // eslint-disable-next-line
  const [prevKeyWords, setPrevKeyWords] = useContext(PrevKeysContext);
  // eslint-disable-next-line
  const [prevForm, setPrevForm] = useContext(PrevFormContext);

  // this navigates back from /books to whatever i want
  // Ny books must also sit in /books so that navigation looks the same

  const navigateToSuggestions = () => {
    if (scroll.suggestion) {
      setSuggestions(prevSug);
      // clear form context
      setFormContext({});
      // clear search context
      setKeyWordsContext({});
      setScroll({ suggestion: true, form: false, keywords: false });
      window.setTimeout(() => {
        history.push("/");
        document
          .querySelector(`#${scrollPos}`)
          .scrollIntoView({ behavior: "auto", block: "center" });
      }, 0);
    }

    if (scroll.keywords) {
      setKeyWordsContext(prevKeyWords);
      // clear form context
      setFormContext({});
      setScroll({ suggestion: false, form: false, keywords: true });
      window.setTimeout(() => {
        history.push("/");
        document
          .querySelector(`#${scrollPos}`)
          .scrollIntoView({ behavior: "auto", block: "start" });
      }, 0);
    }
  };

  const headersStyles = css`
    @media (max-width: 592px) {
      text-align: center;
      font-weight: bold;
      font-size: 14px;
      background-color: #fafbfd;
    }
  `;

  const dataStyles = css`
    background-color: #fcfdff;
    text-align: center;
  `;

  return currentBook.volumeInfo !== undefined ? (
    <div className="books-list-item-details">
      <NavBack
        refTo={suggestionsArrow}
        handleClick={navigateToSuggestions}
        styleClass="go-to-suggestions"
      />
      <div
        css={css`
          margin-top: 0.8rem;
        `}
      >
        <div className="row">
          <div
            className="col-sm-12 text-xs-center col-md-2 text-md-left col-lg-12 text-lg-center"
            css={headersStyles}
          >
            Title:{" "}
          </div>
          <div
            css={dataStyles}
            className="col-sm-12 text-xs-center col-md-10 text-md-left col-lg-12 text-lg-center"
          >
            {currentBook.volumeInfo.title}
          </div>
        </div>
        {currentBook.volumeInfo.subtitle !== undefined &&
          currentBook.volumeInfo.subtitle !== "" && (
            <div className="row">
              <div
                css={headersStyles}
                className="col-sm-12 text-sm-center col-md-2 text-md-left col-lg-12 text-lg-center"
              >
                Subtitle:{" "}
              </div>
              <div
                css={dataStyles}
                className="col-sm-12 text-sm-center col-md-2 text-md-left col-lg-12 text-lg-center"
              >
                {currentBook.volumeInfo.subtitle}
              </div>
            </div>
          )}
        {currentBook.volumeInfo.authors !== undefined &&
          currentBook.volumeInfo.authors !== "" && (
            <div className="row">
              <div
                css={headersStyles}
                className="col-sm-12 text-sm-center col-md-2 text-md-left col-lg-12 text-lg-center"
              >
                Author(s):{" "}
              </div>
              <div
                css={dataStyles}
                className="col-sm-12 text-sm-center col-md-2 text-md-left col-lg-12 text-lg-center"
              >
                {currentBook.volumeInfo.authors}
              </div>
            </div>
          )}
        {currentBook.volumeInfo.publishedDate !== undefined &&
          currentBook.volumeInfo.publishedDate !== "" && (
            <div className="row">
              <div
                css={headersStyles}
                className="col-sm-12 text-sm-center col-md-2 text-md-left col-lg-12 text-lg-center"
              >
                Published:{" "}
              </div>
              <div
                css={dataStyles}
                className="col-sm-12 text-sm-center col-md-2 text-md-left col-lg-12 text-lg-center"
              >
                {currentBook.volumeInfo.publishedDate}
              </div>
            </div>
          )}
        {currentBook.volumeInfo.categories !== undefined &&
          currentBook.volumeInfo.categories !== "" && (
            <div className="row">
              <div
                css={headersStyles}
                className="col-sm-12 text-sm-center col-md-2 text-md-left col-lg-12 text-lg-center"
              >
                Categories:
              </div>
              <div
                css={dataStyles}
                className="col-sm-12 text-sm-center col-md-2 text-md-left col-lg-12 text-lg-center"
              >
                {currentBook.volumeInfo.categories}
              </div>
            </div>
          )}
        {currentBook.volumeInfo.publisher !== undefined &&
          currentBook.volumeInfo.publisher !== "" && (
            <div className="row">
              <div
                css={headersStyles}
                className="col-sm-12 text-sm-center col-md-2 text-md-left col-lg-12 text-lg-center"
              >
                Publisher:
              </div>
              <div
                css={dataStyles}
                className="col-sm-12 text-sm-center col-md-2 text-md-left col-lg-12 text-lg-center"
              >
                {currentBook.volumeInfo.publisher}
              </div>
            </div>
          )}
        {currentBook.volumeInfo.language !== undefined &&
          currentBook.volumeInfo.language !== "" && (
            <div className="row">
              <div
                css={headersStyles}
                className="col-sm-12 text-sm-center col-md-2 text-md-left col-lg-12 text-lg-center"
              >
                Language:
              </div>
              <div
                css={dataStyles}
                className="col-sm-12 text-sm-center col-md-2 text-md-left col-lg-12 text-lg-center"
              >
                {currentBook.volumeInfo.language}
              </div>
            </div>
          )}
        {currentBook.volumeInfo.previewLink !== undefined &&
          currentBook.volumeInfo.previewLink !== "" && (
            <div className="row">
              <div
                css={headersStyles}
                className="col-sm-12 text-sm-center col-md-2 text-md-left col-lg-12 text-lg-center"
              >
                Preview:
              </div>
              <div
                css={dataStyles}
                className="col-sm-12 text-sm-center col-md-2 text-md-left col-lg-12 text-lg-center"
              >
                <a target="_new" href={currentBook.volumeInfo.previewLink}>
                  <FontAwesomeIcon icon="external-link-alt"></FontAwesomeIcon>
                </a>{" "}
              </div>
            </div>
          )}
        {currentBook.accessInfo !== undefined && (
          <div className="row">
            <div
              css={headersStyles}
              className="col-sm-12 text-sm-center col-md-2 text-md-left col-lg-12 text-lg-center"
            >
              Available In:
            </div>
            <div
              css={dataStyles}
              className="col-sm-12 text-sm-center col-md-2 text-md-left col-lg-12 text-lg-center"
            >
              <div className="d-inline mr-4">
                PDF{" "}
                {currentBook.accessInfo.pdf.isAvailable ? (
                  <span className="text-success">
                    <FontAwesomeIcon icon="check-circle" />
                  </span>
                ) : (
                  <span className="text-danger">
                    <FontAwesomeIcon icon="times-circle" />
                  </span>
                )}
              </div>
              <div className="d-inline">
                ePUB{" "}
                {currentBook.accessInfo.epub.isAvailable ? (
                  <span className="text-success">
                    <FontAwesomeIcon icon="check-circle" />
                  </span>
                ) : (
                  <span className="text-danger">
                    <FontAwesomeIcon icon="times-circle" />
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
        {currentBook.saleInfo !== undefined &&
          currentBook.saleInfo.listPrice !== undefined &&
          currentBook.saleInfo.listPrice.amount !== undefined &&
          currentBook.saleInfo.listPrice.amount !== "" &&
          currentBook.saleInfo.listPrice.currencyCode !== undefined && (
            <div className="row">
              <div
                css={headersStyles}
                className="col-sm-12 text-sm-center col-md-2 text-md-left col-lg-12 text-lg-center"
              >
                Price:
              </div>
              <div
                css={dataStyles}
                className="col-sm-12 text-sm-center col-md-2 text-md-left col-lg-12 text-lg-center"
              >
                <span className="text-warning">
                  <FontAwesomeIcon icon="dollar-sign" />
                </span>{" "}
                {currentBook.saleInfo.listPrice.amount}
              </div>
            </div>
          )}
        <div css={dataStyles} className="text-snippet">
          {currentBook.searchInfo !== undefined &&
            currentBook.searchInfo.textSnippet !== "" &&
            currentBook.searchInfo.textSnippet !== undefined && (
              <iframe
                className="lead"
                id="text-snippet"
                title={currentBook.volumeInfo.title}
                sandbox="allow-same-origin"
                srcDoc={currentBook.searchInfo.textSnippet}
                css={css`
                  margin-top: 0.8rem;
                  box-shadow: none;
                  border: none;
                  height: 200px;
                `}
              ></iframe>
            )}
        </div>
      </div>
    </div>
  ) : (
    <Redirect to="/"></Redirect>
  );
};

export default GoogleBooks;

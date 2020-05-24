/**this component is rendered when NY otherbooks search (top 5, one subj)
 * is clicked for more details..
 * the url path is changed to '/ny/otherbooks'
 */
import React, { useContext, createRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ViewBookContext from "../view/book";
import { useHistory, Redirect } from "react-router-dom";
import { FormContext } from "../formContext/FormContext";
import { KeywordsContext } from "../keywordsContext/KeywordsContext";
import { ScrollContext } from "../scrollcontext/ScrollContext";
import { PrevFormContext } from "../formContext/PrevFormContext";
import NavBack from "../comps/Navback";
import { SuggestionsContext } from "../suggestionsContext/SuggestionsContext";
import ScrollPosContext from "../scrollPositionContext/scrollPosContext";

const NyOtherBooks = () => {
  const [currentBook] = useContext(ViewBookContext);
  let history = useHistory();
  const [scrollPos] = useContext(ScrollPosContext);
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
  const [prevForm, setPrevForm] = useContext(PrevFormContext);
  const navigateToSuggestions = () => {
    setFormContext(prevForm);
    // clear search context
    setKeyWordsContext({});
    setSuggestions({});
    setScroll({ suggestion: false, form: true, keywords: false });
    // }
    window.setTimeout(() => {
      history.push("/");
      document.querySelector(`#${scrollPos}`).scrollIntoView({
        behavior: "auto",
        block: "center",
      });
    }, 1);
  };

  return currentBook.title !== undefined ? (
    <div className="books-list-item-details">
      <NavBack
        refTo={suggestionsArrow}
        handleClick={navigateToSuggestions}
        styleClass="go-to-suggestions"
      />

      <div className="row">
        <div className="col-xs-12 text-sm-center col-md-2 text-md-center col-lg-12 text-lg-center">
          Title:{" "}
        </div>
        <div className="col-xs-12 text-sm-center col-md-10 text-md-center col-lg-12 text-lg-center">
          {currentBook.title}
        </div>
      </div>
      {currentBook.author !== undefined && currentBook.author !== "" && (
        <div className="row">
          <div className="col-xs-12 text-sm-center col-md-2 text-md-center col-lg-12 text-lg-center">
            Author(s):{" "}
          </div>
          <div className="col-xs-12 text-sm-center col-md-10 text-md-center col-lg-12 text-lg-center">
            {currentBook.author}
          </div>
        </div>
      )}
      {currentBook.description !== undefined && currentBook.description !== "" && (
        <div className="row">
          <div className="col-xs-12 text-sm-center col-md-2 text-md-center col-lg-12 text-lg-center">
            Description :{" "}
          </div>
          <div className="col-xs-12 text-sm-center col-md-10 text-md-center col-lg-12 text-lg-center">
            {currentBook.description}
          </div>
        </div>
      )}

      {currentBook.contributor !== undefined && currentBook.contributor !== "" && (
        <div className="row">
          <div className="col-xs-12 text-sm-center col-md-2 text-md-center col-lg-12 text-lg-center">
            Contributor(s):{" "}
          </div>
          <div className="col-xs-12 text-sm-center col-md-10 text-md-center col-lg-12 text-lg-center">
            {currentBook.contributor}
          </div>
        </div>
      )}

      {currentBook.contributor_note !== undefined &&
        currentBook.contributor_note !== "" && (
          <div className="row">
            <div className="col-xs-12 text-sm-center col-md-2 text-md-center col-lg-12 text-lg-center">
              Contributor Note:{" "}
            </div>
            <div className="col-xs-12 text-sm-center col-md-10 text-md-center col-lg-12 text-lg-center">
              {currentBook.contributor_note}
            </div>
          </div>
        )}

      {currentBook.created_date !== undefined &&
        currentBook.created_date !== "" && (
          <div className="row">
            <div className="col-xs-12 text-sm-center col-md-2 text-md-center col-lg-12 text-lg-center">
              Created Dated:{" "}
            </div>
            <div className="col-xs-12 text-sm-center col-md-10 text-md-center col-lg-12 text-lg-center">
              {`${new Date(currentBook.created_date).getFullYear()}-${
                new Date(currentBook.created_date).getMonth() + 1
              }-${new Date(currentBook.created_date).getDate()}`}
            </div>
          </div>
        )}

      {currentBook.publisher !== undefined && currentBook.publisher !== "" && (
        <div className="row">
          <div className="col-xs-12 text-sm-center col-md-2 text-md-center col-lg-12 text-lg-center">
            Publisher:
          </div>
          <div className="col-xs-12 text-sm-center col-md-10 text-md-center col-lg-12 text-lg-center">
            {currentBook.publisher}
          </div>
        </div>
      )}

      {currentBook.first_chapter_link !== undefined &&
        currentBook.first_chapter_link !== "" && (
          <div className="row">
            <div className="col-xs-12 text-sm-center col-md-2 text-md-center col-lg-12 text-lg-center">
              Preview:
            </div>
            <div className="col-xs-12 text-sm-center col-md-10 text-md-center col-lg-12 text-lg-center">
              <a target="_new" href={currentBook.first_chapter_link}>
                <FontAwesomeIcon icon="external-link-alt"></FontAwesomeIcon>
              </a>{" "}
            </div>
          </div>
        )}
      {currentBook.rank !== undefined && currentBook.rank !== "" && (
        <div className="row">
          <div className="col-xs-12 text-sm-center col-md-2 text-md-center col-lg-12 text-lg-center">
            Rank:
          </div>
          <div className="col-xs-12 text-sm-center col-md-10 text-md-center col-lg-12 text-lg-center">
            {currentBook.rank}
          </div>
        </div>
      )}
      {currentBook.rank_last_week !== undefined &&
        currentBook.rank_last_week !== "" && (
          <div className="row">
            <div className="col-xs-12 text-sm-center col-md-2 text-md-center col-lg-12 text-lg-center">
              Rank Last Week:
            </div>
            <div className="col-xs-12 text-sm-center col-md-10 text-md-center col-lg-12 text-lg-center">
              {currentBook.rank_last_week}
            </div>
          </div>
        )}

      {currentBook.weeks_on_list !== undefined && (
        <div className="row">
          <div className="col-xs-12 text-sm-center col-md-2 text-md-center col-lg-12 text-lg-center">
            Weeks On List:
          </div>
          <div className="col-xs-12 text-sm-center col-md-10 text-md-center col-lg-12 text-lg-center">
            {currentBook.weeks_on_list}
          </div>
        </div>
      )}

      {currentBook.price !== undefined && currentBook.price > 0 && (
        <div className="row">
          <div className="col-xs-12 text-sm-center col-md-2 text-md-center col-lg-12 text-lg-center">
            Price:
          </div>
          <div className="col-xs-12 text-sm-center col-md-10 text-md-center col-lg-12 text-lg-center">
            <span className="text-warning">
              <FontAwesomeIcon icon="dollar-sign" />
            </span>{" "}
            {currentBook.price}
          </div>
        </div>
      )}

      {currentBook.book_review_link !== "" && (
        <div className="row">
          <div className="col-xs-12 text-sm-center col-md-2 text-md-center col-lg-12 text-lg-center">
            Book Review:
          </div>
          <div className="col-xs-12 text-sm-center col-md-10 text-md-center col-lg-12 text-lg-center">
            <a target="_new" href={currentBook.book_review_link}>
              <FontAwesomeIcon icon="external-link-alt"></FontAwesomeIcon>
            </a>{" "}
          </div>
        </div>
      )}

      {currentBook.sunday_review_link !== "" && (
        <div className="row">
          <div className="col-xs-12 text-sm-center col-md-2 text-md-center col-lg-12 text-lg-center">
            Sunday Review:
          </div>
          <div className="col-xs-12 text-sm-center col-md-10 text-md-center col-lg-12 text-lg-center">
            {currentBook.rank_last_week}
          </div>
        </div>
      )}

      {currentBook.buy_links !== undefined && (
        <div className="row">
          <div className="col-xs-12 text-sm-center col-md-2 text-md-center col-lg-12 text-lg-center">
            Purchase <FontAwesomeIcon icon="shopping-cart" />:
          </div>
          <div className="col-xs-12 text-sm-center col-md-10 text-md-center col-lg-12 text-lg-center">
            {currentBook.buy_links.map(
              (link: { url: string; name: string }, i: number) => {
                return (
                  <div key={i} className="d-inline mr-4">
                    <div className="d-inline-flex d-inline-flex-column">
                      <a target="_new" href={link.url} className="text-muted">
                        {link.name}
                      </a>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
      )}
    </div>
  ) : (
    <Redirect to="/" />
  );
};

export default NyOtherBooks;

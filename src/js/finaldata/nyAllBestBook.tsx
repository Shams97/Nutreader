/**this component is rendered when NY AllBest books search
 * is clicked for more details..
 * the url path is changed to '/ny/allbest'
 */
import React, { useContext, createRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ViewBookContext from "../view/book";
import { SuggestionsContext } from "../suggestionsContext/SuggestionsContext";
import { useHistory, Redirect } from "react-router-dom";
import { FormContext } from "../formContext/FormContext";
import { KeywordsContext } from "../keywordsContext/KeywordsContext";
import { ScrollContext } from "../scrollcontext/ScrollContext";
import { PrevFormContext } from "../formContext/PrevFormContext";
import NavBack from "../comps/Navback";
import ScrollPosContext from "../scrollPositionContext/scrollPosContext";

const NyAllBestBook = () => {
  const [currentBook] = useContext(ViewBookContext);
  const [scrollPos] = useContext(ScrollPosContext);
  let history = useHistory();
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

    window.setTimeout(() => {
      history.push("/");
      document.querySelector(`#${scrollPos}`).scrollIntoView({
        behavior: "auto",
        block: "center",
      });
    }, 0);
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
      {currentBook.ranks_history.length > 0 && (
        <div className="row">
          <div className="col-xs-12 text-sm-center col-md-2 text-md-center col-lg-12 text-lg-center">
            Published:{" "}
          </div>
          <div className="col-xs-12 text-sm-center col-md-10 text-md-center col-lg-12 text-lg-center">
            {`${new Date(
              currentBook.ranks_history[0].published_date
            ).getFullYear()}-${
              new Date(currentBook.ranks_history[0].published_date).getMonth() +
              1
            }-${new Date(
              currentBook.ranks_history[0].published_date
            ).getDate()}`}
          </div>
        </div>
      )}
      <div className="row">
        <div className="col-xs-12 text-sm-center col-md-2 text-md-center col-lg-12 text-lg-center">
          Contributor:{" "}
        </div>
        <div className="col-xs-12 text-sm-center col-md-10 text-md-center col-lg-12 text-lg-center">
          {currentBook.contributor}
        </div>
      </div>

      {currentBook.contributor_note !== "" && (
        <div className="row">
          <div className="col-xs-12 text-sm-center col-md-2 text-md-center col-lg-12 text-lg-center">
            Contributor Note:{" "}
          </div>
          <div className="col-xs-12 text-sm-center col-md-10 text-md-center col-lg-12 text-lg-center">
            {currentBook.contributor_note}
          </div>
        </div>
      )}

      {currentBook.ranks_history.length > 0 && (
        <div className="row">
          <div className="col-xs-12 text-sm-center col-md-2 text-md-center col-lg-12 text-lg-center">
            Category:{" "}
          </div>
          <div className="col-xs-12 text-sm-center col-md-10 text-md-center col-lg-12 text-lg-center">
            {currentBook.ranks_history[0].display_name}
          </div>
        </div>
      )}
      {currentBook.ranks_history.length > 0 && (
        <div className="row">
          <div className="col-xs-12 text-sm-center col-md-2 text-md-center col-lg-12 text-lg-center">
            Best Seller Date:{" "}
          </div>
          <div className="col-xs-12 text-sm-center col-md-10 text-md-center col-lg-12 text-lg-center">
            {`${new Date(
              currentBook.ranks_history[0].bestsellers_date
            ).getFullYear()}-${
              new Date(
                currentBook.ranks_history[0].bestsellers_date
              ).getMonth() + 1
            }-${new Date(
              currentBook.ranks_history[0].bestsellers_date
            ).getDate()}`}
          </div>
        </div>
      )}

      {currentBook.ranks_history.length > 0 &&
        currentBook.ranks_history[0].rank !== null &&
        currentBook.ranks_history[0].rank !== undefined &&
        currentBook.ranks_history[0].rank !== "" && (
          <div className="row">
            <div className="col-xs-12 text-sm-center col-md-2 text-md-center col-lg-12 text-lg-center">
              Rank:{" "}
            </div>
            <div className="col-xs-12 text-sm-center col-md-10 text-md-center col-lg-12 text-lg-center">
              {currentBook.ranks_history[0].rank}
            </div>
          </div>
        )}

      {currentBook.ranks_history.length > 0 &&
        currentBook.ranks_history[0].ranks_last_week !== null && (
          <div className="row">
            <div className="col-xs-12 text-sm-center col-md-2 text-md-center col-lg-12 text-lg-center">
              Rank Last Week:{" "}
            </div>
            <div className="col-xs-12 text-sm-center col-md-10 text-md-center col-lg-12 text-lg-center">
              {currentBook.ranks_history[0].ranks_last_week}
            </div>
          </div>
        )}

      {currentBook.ranks_history.length > 0 &&
        currentBook.ranks_history[0].weeks_on_list !== null && (
          <div className="row">
            <div className="col-xs-12 text-sm-center col-md-2 text-md-center col-lg-12 text-lg-center">
              Weeks On List:{" "}
            </div>
            <div className="col-xs-12 text-sm-center col-md-10 text-md-center col-lg-12 text-lg-center">
              {currentBook.ranks_history[0].weeks_on_list}
            </div>
          </div>
        )}

      <div className="row">
        <div className="col-xs-12 text-sm-center col-md-2 text-md-center col-lg-12 text-lg-center">
          Publisher:{" "}
        </div>
        <div className="col-xs-12 text-sm-center col-md-10 text-md-center col-lg-12 text-lg-center">
          {currentBook.publisher}
        </div>
      </div>

      {currentBook.reviews.length > 0 &&
        currentBook.reviews[0].book_review_link !== undefined &&
        currentBook.reviews[0].book_review_link !== "" &&
        currentBook.reviews[0].book_review_link !== null && (
          <div className="row">
            <div className="col-xs-12 text-sm-center col-md-2 text-md-center col-lg-12 text-lg-center">
              Review :{" "}
            </div>
            <div className="col-xs-12 text-sm-center col-md-10 text-md-center col-lg-12 text-lg-center">
              currentBook{" "}
              <a target="_new" href={currentBook.reviews[0].book_review_link}>
                <FontAwesomeIcon icon="external-link-alt" />
              </a>
            </div>
          </div>
        )}

      {currentBook.reviews.length > 0 &&
        currentBook.reviews[0].first_chapter_link !== undefined &&
        currentBook.reviews[0].first_chapter_link !== "" &&
        currentBook.reviews[0].first_chapter_link !== null && (
          <div className="row">
            <div className="col-xs-12 text-sm-center col-md-2 text-md-center col-lg-12 text-lg-center">
              Read First Chapter :{" "}
            </div>
            <div className="col-xs-12 text-sm-center col-md-10 text-md-center col-lg-12 text-lg-center">
              <a target="_new" href={currentBook.reviews[0].first_chapter_link}>
                <FontAwesomeIcon icon="external-link-alt" />
              </a>
            </div>
          </div>
        )}

      {currentBook.reviews.length > 0 &&
        currentBook.reviews[0].sunday_review_link !== undefined &&
        currentBook.reviews[0].sunday_review_link !== "" &&
        currentBook.reviews[0].sunday_review_link !== null && (
          <div className="row">
            <div className="col-xs-12 text-sm-center col-md-2 text-md-center col-lg-12 text-lg-center">
              Sunday Review :{" "}
            </div>
            <div className="col-xs-12 text-sm-center col-md-10 text-md-center col-lg-12 text-lg-center">
              <a target="_new" href={currentBook.reviews[0].sunday_review_link}>
                <FontAwesomeIcon icon="external-link-alt" />
              </a>
            </div>
          </div>
        )}
    </div>
  ) : (
    // this is used to redirect to home page when refreshing on /books/ny
    <Redirect to="/"></Redirect>
  );
};

export default NyAllBestBook;

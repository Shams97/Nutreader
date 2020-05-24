/** @jsx jsx */
import { useEffect, useContext, Fragment, createRef, useState } from "react";
import { Home } from "../comps/Home";
import { Contribute } from "../comps/Contribute";
import { About } from "../comps/About";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import { SuggestionsContext } from "../suggestionsContext/SuggestionsContext";
import { PrevSugContext } from "../suggestionsContext/PrevSugContext";
import { UserForm } from "../form/userForm";
import { Analyze } from "../analyze/Analyze";
import randomWords from "random-words";
import SpinnerContext from "../spinnerContext/spinnerContext";
import { FormContext } from "../formContext/FormContext";
import { KeywordsContext } from "../keywordsContext/KeywordsContext";
import { ScrollContext } from "../scrollcontext/ScrollContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { css, jsx } from "@emotion/core";
import GoogleBooks from "./GoogleBooks";
import { PrevFormContext } from "../formContext/PrevFormContext";
import nyAllBestBook from "./nyAllBestBook";
import nyOtherBooks from "./nyOtherBooks";
import NotFoundPage from "../comps/NotFoundPage";
import NavBack from "../comps/Navback";

/**
 * this is where the middle of the page sits
 * depending on route, comps will be rendered
 * also, the first suggested list of books is loaded here,
 *
 */

export const MainContainer = () => {
  // eslint-disable-next-line
  const [suggestions, setSuggestions] = useContext(SuggestionsContext);
  // eslint-disable-next-line
  const [spinner, setSpinner] = useContext(SpinnerContext);
  const [formcontext, setFormContext] = useContext(FormContext);
  // eslint-disable-next-line
  const [keywordsConext, setKeyWordsContext] = useContext(KeywordsContext);
  // eslint-disable-next-line
  const [scroll, setScroll] = useContext(ScrollContext);
  // eslint-disable-next-line
  const [prevSug, setPrevSug] = useContext(PrevSugContext);

  // eslint-disable-next-line
  const [prevForm, setPrevForm] = useContext(PrevFormContext);
  const suggestionsArrow = createRef<HTMLDivElement>();
  const [isRendered, setIsRendered] = useState<boolean>(false);
  const [navLine, setNavLine] = useState<HTMLDivElement>();

  const navigateToSuggestions = () => {
    setSuggestions(prevSug);
    // clear form context
    setFormContext({});
    // clear search context
    setKeyWordsContext({});
    setScroll({ suggestion: true, form: false, keywords: false });
  };
  const location = useLocation();

  // hide and show back to top icon
  const handleScroll = () => {
    if (window.scrollY > 0) {
      document.querySelector(".back-to-top").classList.remove("d-none");
    } else {
      document.querySelector(".back-to-top").classList.add("d-none");
    }
  };
  // scroll top top
  const handleClick = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };
  window.onscroll = handleScroll;

  useEffect(() => {
    setPrevForm(formcontext);
  });
  // show sugg on first load
  useEffect(() => {
    setSpinner({ spin: true });
    // gab api data of suggested books
    Analyze({
      searchProtocol: { api: "google", method: "random" },
      words: randomWords({ min: 2, max: 3, join: "+" }),
    })
      .then((res) => {
        // update suggestions context
        setSuggestions(res);
        setFormContext({});
        setKeyWordsContext({});
        setScroll({ suggestion: true, keywords: false, form: false });
        setSpinner({ spin: false });
      })
      .catch((e) => {
        setSuggestions(e);
        setFormContext({});
        setKeyWordsContext({});
        setScroll({ suggestion: true, keywords: false, form: false });
        setSpinner({ spin: false });
      });

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (suggestions.apiOrigin !== undefined) {
      setPrevSug(suggestions);
    }
    // eslint-disable-next-line
  });

  useEffect(() => {
    // get dimensions after render
    let target = document.querySelector(".navigation-line") as HTMLDivElement;
    setNavLine(target);
    setIsRendered(true);
  }, [navLine, isRendered]);

  return (
    <Fragment>
      <div
        className="navigation-line"
        css={css`
          position: fixed;
          top: 6.5%;
          left: 0;
          right: 0;
          padding: 1rem 1rem 1rem 1.5rem;
          background-color: white;
          @media (min-width: 991px) {
            top: 16%;
            left: ${isRendered
              ? (50 % -navLine.getBoundingClientRect().width) / 2
              : 50}%;
          }
        `}
      >
        {location.pathname === "/" && (
          <div>
            {/* show nav back on all searches except suggestions*/}
            {scroll.suggestion !== true && spinner.spin !== true && (
              <NavBack
                handleClick={navigateToSuggestions}
                refTo={suggestionsArrow}
              />
            )}
          </div>
        )}
      </div>

      <div
        className="middle"
        css={css`
          width: 50%;
          margin: auto;
          @media (max-width: 990px) {
            width: 70%;
          }
          @media (min-width: 991px) and (max-width: 1115px) {
            width: 75%;
            margin-right: 0;
            margin-left: auto;
          }
        `}
      >
        <main
          className="main-layout"
          css={css`
            z-index: -1;
          `}
        >
          {/* show content at center */}
          <div className="main-layout-search-results pt-4">
            <Switch>
              <Route path="/books/ny/allbest" component={nyAllBestBook}></Route>
              <Route
                path="/books/ny/otherbooks"
                component={nyOtherBooks}
              ></Route>
              <Route path="/books/:id" component={GoogleBooks}></Route>
              <Route path="/about/:aboutId" component={About} />
              <Route path="/contribute" component={Contribute} />
              <Route
                path="/search"
                render={() => {
                  if (window.innerWidth < 992) return <UserForm />;
                  else {
                    return <Redirect to="/" />;
                  }
                }}
              />
              <Route exact path="/" component={Home}></Route>
              <Route
                path="*"
                render={() => {
                  return <NotFoundPage />;
                }}
              ></Route>
            </Switch>
            <div
              css={css`
                position: sticky;
                bottom: 0;
                padding: 0.8rem;
                width: 3.2rem;
                text-align: center;
                border-radius: 50px;
                &:hover {
                  background-color: #dbd3d3;
                }
              `}
              className="back-to-top d-none"
              onClick={() => handleClick()}
            >
              <FontAwesomeIcon icon="arrow-up" onClick={() => handleClick()} />
            </div>
          </div>
          {/* aside  */}
          <div className="main-layout-editors-pick"></div>
        </main>
      </div>
    </Fragment>
  );
};

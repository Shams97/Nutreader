/** @jsx jsx */
import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { HeaderNavbar } from "./nav/HeaderNavBar";
import { MainContainer } from "./finaldata/MainContainer";
import { SideBar } from "./sideleft/Sidebar";
import SpinnerContext from "./spinnerContext/spinnerContext";
import { Right } from "./sideright/Right";
import { NyList, names } from "./NyContext/NyContext";
import { FormContext } from "./formContext/FormContext";
import { KeywordsContext } from "./keywordsContext/KeywordsContext";
import { SuggestionsContext } from "./suggestionsContext/SuggestionsContext";
import { PrevSugContext } from "./suggestionsContext/PrevSugContext";
import { ScrollContext } from "./scrollcontext/ScrollContext";
import ViewBookContext from "./view/book";
import { PrevKeysContext } from "./keywordsContext/PrevKeysContext";
import { jsx, css } from "@emotion/core";
import { PrevFormContext } from "./formContext/PrevFormContext";
import ScrollPosContext from "./scrollPositionContext/scrollPosContext";
import "../style/final.scss";
import { library } from "@fortawesome/fontawesome-svg-core";
// import all free brands
import { fab } from "@fortawesome/free-brands-svg-icons";
// import any icon to use through the entire APP
import {
  faSearch,
  faExternalLinkAlt,
  faCheckCircle,
  faTimesCircle,
  faDollarSign,
  faBook,
  faShoppingCart,
  faArrowUp,
  faArrowLeft,
  faHome,
  faPaintBrush,
  faStream,
  faPlus,
  faUserEdit,
  faGlasses,
  faLink,
} from "@fortawesome/free-solid-svg-icons";

// init everything..fab to be used with 'fab' icons and overwrite default 'fas'...see docs
// grab icon name here camleCased
// use it there as normal
library.add(
  fab,
  faSearch,
  faExternalLinkAlt,
  faCheckCircle,
  faTimesCircle,
  faDollarSign,
  faBook,
  faShoppingCart,
  faArrowUp,
  faArrowLeft,
  faHome,
  faPaintBrush,
  faStream,
  faPlus,
  faUserEdit,
  faGlasses,
  faLink
);

function App() {
  const formContext = useState({});
  const keywordsContext = useState({});
  const suggestionsContext = useState({});
  const scrollContext = useState({
    suggestion: true,
    keywords: false,
    form: false,
  });
  const nyLists = useState([]);
  const spinner = useState({ spin: false });
  const viewCurrentBook = useState("default value");
  const prevSugContext = useState({});
  const prevKeysContext = useState({});
  const prevFormContext = useState({});
  const scrollPos = useState(5000);

  useEffect(() => {
    //  get NY Lists
    names.then((resp) => {
      if (resp.error) {
        formContext[1](names);
      } else {
        nyLists[1](
          resp.map((name) => {
            return name.display_name;
          })
        );
      }
    });
    // eslint-disable-next-line
  }, []);

  return (
    <BrowserRouter>
      <ScrollPosContext.Provider value={scrollPos}>
        <PrevFormContext.Provider value={prevFormContext}>
          <PrevKeysContext.Provider value={prevKeysContext}>
            <PrevSugContext.Provider value={prevSugContext}>
              <ScrollContext.Provider value={scrollContext}>
                <NyList.Provider value={nyLists[0]}>
                  <FormContext.Provider value={formContext}>
                    <KeywordsContext.Provider value={keywordsContext}>
                      <SuggestionsContext.Provider value={suggestionsContext}>
                        <ViewBookContext.Provider value={viewCurrentBook}>
                          <SpinnerContext.Provider value={spinner}>
                            <div
                              className="header"
                              css={css`
                                height: 15%;
                                @media (max-height: 1440px) {
                                  height: 25%;
                                }
                              `}
                            ></div>
                            <HeaderNavbar />
                            <MainContainer />
                            <SideBar />
                            <Right />
                          </SpinnerContext.Provider>
                        </ViewBookContext.Provider>
                      </SuggestionsContext.Provider>
                    </KeywordsContext.Provider>
                  </FormContext.Provider>
                </NyList.Provider>
              </ScrollContext.Provider>
            </PrevSugContext.Provider>
          </PrevKeysContext.Provider>
        </PrevFormContext.Provider>
      </ScrollPosContext.Provider>
    </BrowserRouter>
  );
}

export default App;

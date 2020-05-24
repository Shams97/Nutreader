/** @jsx jsx */
import { UserForm } from "../form/userForm";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import { Right } from "../sideright/Right";
import { jsx, css } from "@emotion/core";
import Footer from "../comps/Footer";

export const SideBar = () => {
  const location = useLocation();

  return (
    <div
      className="left"
      css={css`
        position: fixed;
        top: 15%;
        width: 25%;
        height: auto;
        bottom: 0;
        @media (min-width: 992px) and (max-width: 1115px) {
          padding-bottom: 6rem;
        }
        @media (max-height: 967px) {
          top: 25%;
          overflow-y: ${!(
            location.pathname.includes("/about") ||
            location.pathname.includes("/contribute")
          ) && "scroll"};
        }
      `}
    >
      <div className="sidebar-styles" id="sidebar">
        <div className="px-2">
          <Switch>
            <Route path="/" exact>
              <UserForm />
              <div id="ourpicks-mobile">
                <Right />
              </div>
            </Route>
            <Route path="/books">
              <UserForm />
            </Route>
            <Route path="/about" exact>
              <Redirect to="about/creator"></Redirect>
            </Route>
          </Switch>

          <div
            css={css`
              display: none;
              @media (max-width: 1114px) {
                display: block;
              }
            `}
          >
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

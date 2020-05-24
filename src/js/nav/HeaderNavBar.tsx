/** @jsx jsx */
import { useState } from "react";
import { Link, Route } from "react-router-dom";
import { css, jsx } from "@emotion/core";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavbarText,
} from "reactstrap";
import { SearchField } from "./SearchField";
import Footer from "../comps/Footer";
export const HeaderNavbar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const toggleNavbar = (e?: any) => {
    // collapse only on small screens
    // this is a small hack for the original function

    if (document.documentElement.clientWidth < 992) {
      setCollapsed(!collapsed);
    }
  };

  const fontColor = "#6d5f5f";
  return (
    <nav
      css={css`
        position: fixed;
        z-index: 2000;
        right: 0;
        left: 0;
        top: 0;
        bottom: 90%;
        background-color: #f1f1f1;
        color: ${fontColor};
        height: 15%;
        @media (max-width: 992px) {
          height: 0%;
        }
      `}
    >
      <Navbar
        light
        color="black"
        expand="lg"
        css={css`
          background-color: white;
          padding-top: 1rem;
        `}
      >
        <NavbarToggler onClick={toggleNavbar} className="mr-2"></NavbarToggler>
        <Collapse
          isOpen={!collapsed}
          navbar
          css={css`
            padding: 1rem;
            border-radius: 10px;
            text-align: center;
            /* make collapse 100vh */
            visibility: ${collapsed ? "hidden" : "visibile"};
            @media (min-width: 991px) {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              visibility: visible;
            }
          `}
        >
          <NavbarText className="mx-auto">
            {/* this will only show on wide screens */}
            <Route
              path={[
                "/",
                "/books/:id",
                "/books/ny/otherbooks/top-five",
                "/books/ny/otherbooks/one-catg",
                "/books/ny/allbest",
              ]}
              exact
            >
              <SearchField closeToggler={toggleNavbar} />
            </Route>
            {/* this is a workaround to keep the navbar look consistent!! worst solution ever!!lol */}
            <Route path={["/contribute", "/about"]}>
              <div
                css={css`
                  visibility: hidden;
                `}
              >
                <SearchField closeToggler={toggleNavbar} />
              </div>
            </Route>
          </NavbarText>
          <Nav
            navbar
            css={css`
              margin-top: 1rem;
              & li {
                margin-left: 1rem;
                font-size: 1rem;
                & a {
                  text-decoration: none;
                  color: #858585;
                  margin-top: 0.9rem;
                  font-size: 16px;
                  &:hover {
                    text-decoration: none;
                    font-size: bold;
                    color: black;
                  }
                }
              }
            `}
          >
            <NavItem>
              <Link onClick={toggleNavbar} to="/">
                Home
              </Link>
            </NavItem>
            <NavItem className="d-lg-none">
              <Link onClick={toggleNavbar} to="/search">
                Search
              </Link>
            </NavItem>
            <NavItem>
              <Link onClick={toggleNavbar} to="/contribute">
                Contribute
              </Link>
            </NavItem>
            <NavItem>
              <Link onClick={toggleNavbar} to="/about/creator">
                Creator
              </Link>
            </NavItem>
            <NavItem>
              <div
                css={css`
                  display: none;
                  @media (max-width: 992px) {
                    display: block;
                  }
                `}
              >
                <Footer />
              </div>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </nav>
  );
};

/**@jsx jsx */
import { jsx, css } from "@emotion/core";
import { Route, Switch, RouteComponentProps } from "react-router-dom";
import NotFoundPage from "../comps/NotFoundPage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AboutMe = () => {
  return (
    <div className="container">
      <div className="text-center">
        <div className="display-4 d-block">Hi</div>
        <p className="lead mt-4">You can reach me at:</p>
        <div className="text-center mt-4">
          <a href="https://twitter.com/gist32091948" target="_new">
            <FontAwesomeIcon
              icon={["fab", "twitter"]}
              css={css`
                font-size: 1.8rem;
                margin: 0 0.8rem;
                &:hover {
                  cursor: pointer;
                }
              `}
            />
          </a>
          <a href="https://github.com/mustafaKamal-fe" target="_new">
            <FontAwesomeIcon
              icon={["fab", "github"]}
              css={css`
                font-size: 1.8rem;
                margin: 0 0.8rem;
                &:hover {
                  cursor: pointer;
                }
              `}
              color="black"
            />
          </a>
          <a href="https://www.imustafa.com/" target="_new">
            <FontAwesomeIcon
              icon="link"
              color="gray"
              css={css`
                font-size: 1.8rem;
                margin: 0 0.8rem;
                &:hover {
                  cursor: pointer;
                }
              `}
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export const About = ({ match }: RouteComponentProps<{ aboutId: string }>) => {
  return (
    <div>
      <Switch>
        <Route path="/about/creator" render={AboutMe} />
        <Route
          path="*"
          render={() => {
            return <NotFoundPage />;
          }}
        />
      </Switch>
    </div>
  );
};

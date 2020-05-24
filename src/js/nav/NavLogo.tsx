/**@jsx jsx */
import { Link } from "react-router-dom";
import logo from "../../images/logos/logo.svg";
import { css, jsx } from "@emotion/core";

export const NavLogo = () => {
  return (
    <Link to="/">
      <div
        css={css`
          width: 65px;
          height: 65px;

          @media (max-width: 500px) {
            width: 50px;
            height: 50px;
          }
        `}
      >
        <img src={logo} alt="Nutreader" className="img-fluid"></img>
      </div>
    </Link>
  );
};

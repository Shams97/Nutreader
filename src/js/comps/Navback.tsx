/**@jsx jsx */
import { RefObject } from "react";
import { css, jsx } from "@emotion/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface navBackProps {
  refTo: RefObject<HTMLDivElement>;
  handleClick: () => void;
  styleClass?: string;
}

const Navback = ({ refTo, handleClick, styleClass }: navBackProps) => {
  return (
    <div ref={refTo} className={styleClass} onClick={handleClick}>
      <span
        css={css`
          padding: 0.5rem 0.8rem;
          border-radius: 50px;
          text-align: center;
          &:hover {
            background-color: #dbd3d3;
            cursor: pointer;
          }
        `}
      >
        {" "}
        <FontAwesomeIcon icon="arrow-left" />{" "}
      </span>
    </div>
  );
};
export default Navback;

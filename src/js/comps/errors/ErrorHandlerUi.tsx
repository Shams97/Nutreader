/**@jsx jsx */
import { jsx, css } from "@emotion/core";
import { ErrorResponse } from "../../typed/TypedExports";

interface Props {
  data: ErrorResponse & { isNotAvailable: boolean };
}

export const ErrorHandlerUi = ({ data }: Props) => {
  return (
    <div
      css={css`
        grid-column: 1/-1;
        text-align: center;
      `}
    >
      {data.isNotAvailable === true ? (
        <div>No data was found. Please try a different search.</div>
      ) : (
        <div>
          <div>Error in {data.errorIn}.</div>
          <p>{data.message}</p>
        </div>
      )}
    </div>
  );
};

/**@jsx jsx */
import { jsx, css } from "@emotion/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const GoogleBookMetaInfo = ({ bookData }: any) => {
  return (
    <div
      css={css`
        width: 100%;
        margin: 1rem auto;
        display: flex;
        flex-direction: column;
        text-align: left;
        justify-content: flex-start;
        align-items: center;
        color: black;
        background-color: #f9f9f9;
        @media (min-width: 592px) {
          flex-direction: row;
          align-items: flex-start;
          justify-content: space-around;
        }
      `}
    >
      {/*google book author icon */}
      {bookData.volumeInfo.authors !== undefined && (
        <div>
          <FontAwesomeIcon icon="user-edit" color="red" />
          <span
            title={bookData.volumeInfo.authors}
            className="ml-2"
            css={css`
              font-size: 10px;
              &:hover {
                text-decoration: none;
              }
            `}
          >
            {bookData.volumeInfo.authors.length > 1
              ? bookData.volumeInfo.authors[0].split(" ").length > 1
                ? bookData.volumeInfo.authors[0].split(" ")[0] + "..."
                : bookData.volumeInfo.authors[0]
              : bookData.volumeInfo.authors[0].split(" ").length > 3
              ? bookData.volumeInfo.authors[0].split(" ")[0] + "..."
              : bookData.volumeInfo.authors[0]}
          </span>
        </div>
      )}
      {/* google book category */}
      {bookData.volumeInfo.categories !== undefined && (
        <div>
          <FontAwesomeIcon icon="glasses" color="blue" />
          <span
            title={bookData.volumeInfo.categories}
            className="ml-2"
            css={css`
              font-size: 10px;
            `}
          >
            {bookData.volumeInfo.categories.length > 1
              ? bookData.volumeInfo.categories[0] + "..."
              : bookData.volumeInfo.categories}
          </span>
        </div>
      )}
      {/* google book page count */}
      {bookData.volumeInfo.pageCount !== undefined && (
        <div>
          <FontAwesomeIcon icon="book" color="green" />
          <span
            title={bookData.volumeInfo.pageCount}
            className="ml-2"
            css={css`
              font-size: 10px;
            `}
          >
            {bookData.volumeInfo.pageCount} Pages
          </span>
        </div>
      )}
    </div>
  );
};

export default GoogleBookMetaInfo;

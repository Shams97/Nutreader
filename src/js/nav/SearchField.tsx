/** @jsx jsx */
import { useState, useContext, useRef, KeyboardEvent, MouseEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input, InputGroup, InputGroupAddon, InputGroupText } from "reactstrap";
import { KeywordsContext } from "../keywordsContext/KeywordsContext";
import { FormContext } from "../formContext/FormContext";
import { Analyze } from "../analyze/Analyze";
import SpinnerContext from "../spinnerContext/spinnerContext";
import { SuggestionsContext } from "../suggestionsContext/SuggestionsContext";
import { ScrollContext } from "../scrollcontext/ScrollContext";
import { css, jsx } from "@emotion/core";
import { useHistory } from "react-router-dom";

export const SearchField = ({ closeToggler }: { closeToggler: () => void }) => {
  let history = useHistory();
  const [userText, setUserText] = useState("");

  // eslint-disable-next-line
  const [keywords, setKeywords] = useContext(KeywordsContext);
  // eslint-disable-next-line
  const [form, setForm] = useContext(FormContext);
  // eslint-disable-next-line
  const [spinner, setSpinner] = useContext(SpinnerContext);
  // eslint-disable-next-line
  const [suggestions, setSuggestions] = useContext(SuggestionsContext);
  // eslint-disable-next-line
  const [scroll, setScroll] = useContext(ScrollContext);

  // type handleSubmit = (p: KeyboardEvent<HTMLInputElement>) => void;
  // type handlemouseSubmit = (p: MouseEvent<HTMLElement, MouseEvent>) => void;

  const submitSerach = (
    e:
      | KeyboardEvent<HTMLInputElement>
      | MouseEvent<HTMLElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    closeToggler();
    // on search nav back to home page to show results (in case user is at "/books")
    history.push("/");
    setSpinner({ spin: true });
    // grab api data
    Analyze({
      searchProtocol: { api: "google", method: "standard" },
      userText,
    }).then((res) => {
      setUserText("");
      setKeywords(res);
      setScroll({ suggestions: false, keywords: true, form: false });
      setForm({});
      setSuggestions({});
      setSpinner({ spin: false });
    });
  };

  const searchFieldInput = useRef(null);

  return (
    <div
      className="search-wrapper w-100"
      css={css`
        z-index: 1000;
        color: black;
        padding: 0 1rem;
        &-input {
          border: none;
        }
        &-find-logo {
          border-radius: 30px;
        }
      `}
    >
      <InputGroup>
        <Input
          innerRef={searchFieldInput}
          css={css`
            border-right: none;
            border-radius: 30px;
            width: 100%;
            height: 50px;
            &:focus {
              box-shadow: none;
              outline: none;
              border: 1px solid #ced4da;
              border-right: none;
            }
          `}
          value={userText.split("+").join(" ")}
          onChange={(e) => {
            setUserText(e.target.value);
          }}
          type="text"
          id="serach-input"
          title="Simply just type anything and books will show"
          placeholder="Book Name, Author, Topic"
          className="search-wrapper-input d-inline"
          onKeyDown={(e) => {
            // tell compiler what target is
            let target = e.target as HTMLInputElement;
            if (
              e.key === "Enter" &&
              target.value.length !== 0 &&
              target.value !== "" &&
              !target.value.split("").every((e: string) => e === " ")
            ) {
              // submit
              submitSerach(e);
            }
          }}
        />
        <InputGroupAddon addonType="append">
          <InputGroupText
            onClick={(e) => {
              e.preventDefault();
              if (
                searchFieldInput.current.value !== "" &&
                !searchFieldInput.current.value
                  .split("")
                  .every((e: string) => e === " ")
              ) {
                submitSerach(e);
              }
            }}
            css={css`
              background-color: white;
              padding-right: 1rem;
              border-radius: 30px;
              border-left: 1px solid black !important;
              &:hover {
                cursor: pointer;
              }
            `}
          >
            {" "}
            <span
              className="search-wrapper-find-logo d-inline"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (
                  searchFieldInput.current.value !== "" &&
                  !searchFieldInput.current.value
                    .split("")
                    .every((e: string) => e === " ")
                ) {
                  submitSerach(e);
                }
              }}
            >
              <FontAwesomeIcon icon="search" />
            </span>
          </InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
};

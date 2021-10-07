import React, { useState, useEffect } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from "reactstrap";
import Multiselect from "./Multiselect";
import Singleselect from "./Singleselect";

function Create() {
  const [dropdownOpen, setOpen] = useState(false);
  const [dropdowntext, setDropdowntext] = useState("Select Question Type");

  const { surveyId } = useParams();
  const history = useHistory();
  const query = useLocation().search;
  const toggle = () => setOpen(!dropdownOpen);
  ///SECTION USEEFFECT
  useEffect(() => {
    if (query === "?create=true") {
      setDropdowntext("Select Question Type");
      history.push("/create/" + surveyId);
    }
  }, [query, history, surveyId]);

  return (
    <div className="body">
      <p>{/* <b>Survey ID: {surveyId}</b> */}</p>
      <ButtonDropdown className="dropbtn" isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle caret>{dropdowntext}</DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => setDropdowntext("Multi-select")}>
            Multi-select
          </DropdownItem>
          <DropdownItem onClick={() => setDropdowntext("Single select")}>
            Single select
          </DropdownItem>
        </DropdownMenu>
      </ButtonDropdown>
      {dropdowntext === "Multi-select" ? <Multiselect /> : null}
      {dropdowntext === "Single select" ? <Singleselect /> : null}
    </div>
  );
}

export default Create;

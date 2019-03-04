import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

import "./index.css";

import Map from "./components/Map";

const Content = ({ stylization }) => (
  <div className={classNames("content", stylization)}>
    <div className="content-container">
      <Map />
    </div>
  </div>
);

Content.propTypes = {
  stylization: PropTypes.string
};

Content.defaultProps = {
  stylization: ""
};

export default Content;

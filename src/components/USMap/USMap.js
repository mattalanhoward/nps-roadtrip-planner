import React, { Component } from "react";
import { BrowserRouter, Switch, Link, Route } from "react-router-dom";

import { VectorMap } from "@south-paw/react-vector-maps";
import usmap from "../../VectorUSMap.json";
import "./USMap.css";

const USMap = () => {
  const style = { margin: "1rem auto", width: "300px" };

  const onClick = ({ target }) => {
    const stateAbbr = target.attributes.id.value.slice(3);
    window.open(`/state/${stateAbbr}`);
  };

  return (
    <div style={style}>
      <VectorMap {...usmap} layerProps={{ onClick }} />
    </div>
  );
};

export default USMap;

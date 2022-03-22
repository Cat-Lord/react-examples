import React from "react";
import { Route } from "react-router-dom";
import { App } from "./App";
import { Cats } from "./Cats";
import { Shelters } from "./Shelters";

// TODO: play around with the routing and test matching paths,
//       nested paths, non-existent paths, etc...
export const Navigation = () => {
  return (
    <React.Fragment>
      <Route path="/" element={<App />}/>
      <Route path="/cats" element={<Cats />}/>
      <Route path="/shelters" element={<Shelters />}/>
    </React.Fragment>
  );
}
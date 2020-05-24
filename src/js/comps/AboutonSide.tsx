import React from "react";
import { RouteComponentProps } from "react-router-dom";

const AboutonSide = ({ match }: RouteComponentProps<{ subIdPage: string }>) => {
  return (
    <div>
      <h2>ADD {match.params.subIdPage} info here</h2>
    </div>
  );
};

export default AboutonSide;

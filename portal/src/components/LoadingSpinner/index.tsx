import React from "react";
import { FormattedMessage } from "react-intl";
import { Loader } from "semantic-ui-react";

const LoadingSpinner: React.FC = () => (
  <Loader active>
    <FormattedMessage id="LoadingSpinner.text" />
  </Loader>
);

export default LoadingSpinner;

import React, { FunctionComponent, PropsWithChildren } from "react";
import { Row } from "react-bootstrap";

const Topbar: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <Row className="mt-4 mb-3 align-items-center">{children}</Row>;
};

export default Topbar;

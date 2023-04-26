import * as React from "react";
import Layout from "../layout";
import { render } from "@testing-library/react";

test("Link to homepage displays", () => {
  const { getAllByText } = render(<Layout />);
  expect(getAllByText("Home")).toBeInTheDocument;
});

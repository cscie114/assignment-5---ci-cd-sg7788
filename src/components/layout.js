import * as React from "react";
import { Link } from "gatsby";

const Layout = ({ pageTitle, children }) => {
  return (
    <div>
      <header>
        <h1>National Parks</h1>
        <nav>
          <p>
            <Link to="/">Home</Link> |{" "}
            <Link to="/parks">All National Parks</Link> |{" "}
            <Link to="/weather">Weather Alerts</Link>
          </p>
        </nav>
      </header>
      <main>
        <h2 data-testid="page-title">{pageTitle}</h2>
        {children}
      </main>
    </div>
  );
};

export default Layout;

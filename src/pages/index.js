import * as React from "react";
import "../styles/global.css";
import { StaticImage } from "gatsby-plugin-image";
import Layout from "../components/layout.js";
const IndexPage = () => {
  return (
    <Layout pageTitle="Home">
      <div>
        <p>
          Welcome to the National Parks application! Here you will find a list
          of all the national parks in the United States, along with some
          information about each park and any available reviews.
        </p>
        <StaticImage
          src="../images/acadia.jpeg"
          width={600}
          alt="Acadia National Park"
        ></StaticImage>
      </div>
    </Layout>
  );
};

export const Head = () => {
  return <title>Home Page</title>;
};

export default IndexPage;

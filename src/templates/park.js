import * as React from "react";
import Layout from "../components/layout";
import { Review } from "../components/reviews";

function Park({ pageContext }) {
  const { park } = pageContext;

  // display individual park information
  return (
    <Layout pageTitle={park.fullName}>
      <p>
        <img
          src={park.images[0]?.url}
          width="100%"
          alt={park.images[0]?.title}
        />
      </p>
      <p className="caption">{park.images[0]?.title}</p>
      <p className="description">{park.description}</p>
      <h4>Address:</h4>
      <p>
        {park.addresses[0]?.line1}
        <br />
        {park.addresses[0]?.city}, {park.addresses[0]?.stateCode}{" "}
        {park.addresses[0]?.postalCode}
      </p>
      <h4>For more information:</h4>
      <p>
        Visit{" "}
        <a href={park.url} target="_blank" rel="noreferrer">
          {park.url}
        </a>
      </p>
      <Review park={park}></Review>
    </Layout>
  );
}

export default Park;

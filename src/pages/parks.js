import * as React from "react";
import { graphql, Link } from "gatsby";
import "../styles/global.css";
import Layout from "../components/layout";
import { ReviewsAvailableIcon } from "../components/reviews";

const ParksList = ({ data }) => {
  const parks = data?.allParks?.nodes || [];

  // list all of the parks
  return (
    <div>
      <Layout pageTitle="All Parks">
        <ul>
          {parks.map((park) => {
            return (
              <li key={park.id}>
                <Link to={"/park/" + park.parkCode}>{park.fullName}</Link>
                <ReviewsAvailableIcon park={park}></ReviewsAvailableIcon>
              </li>
            );
          })}
        </ul>
      </Layout>
    </div>
  );
};

export const query = graphql`
  query {
    allParks {
      nodes {
        fullName
        id
        parkCode
      }
    }
  }
`;

export default ParksList;

export const Head = () => <title>All National Parks</title>;

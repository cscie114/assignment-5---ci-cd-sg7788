import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-regular-svg-icons";

const Review = ({ park }) => {
  const review = GetReviews(park);

  // displays image for review if it exists
  const reviewImage = getImage(
    review?.frontmatter.image?.childImageSharp.gatsbyImageData
  );

  // if a review exists for a park, display it
  if (review) {
    return (
      <div>
        <hr />
        <h3>Reviews</h3>
        <h4>{review.frontmatter.title}</h4>
        <small>
          <em>
            Reviewed on {review.frontmatter.date} by {review.frontmatter.author}
          </em>
        </small>
        <p
          dangerouslySetInnerHTML={{ __html: review.html }}
          className="review"
        ></p>
        <GatsbyImage image={reviewImage} alt=""></GatsbyImage>
      </div>
    );
  }
};

// if a review exists for a park, display an icon
const ReviewsAvailableIcon = ({ park }) => {
  const review = GetReviews(park);
  if (review) {
    return (
      <FontAwesomeIcon
        icon={faComment}
        style={{ color: "#339952", paddingLeft: "10px" }}
      />
    );
  }
};

// get every review
const GetReviews = (park) => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark {
        nodes {
          frontmatter {
            title
            author
            date
            parkCode
            image {
              childImageSharp {
                gatsbyImageData(width: 300, placeholder: BLURRED)
              }
            }
          }
          html
        }
      }
    }
  `);
  // look for the first object that has parkCode in its frontmatter, and if the park codes match, return it
  return data.allMarkdownRemark.nodes.find(
    (p) => p.frontmatter.parkCode === park.parkCode
  );
};

export { Review, ReviewsAvailableIcon };

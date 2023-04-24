require("dotenv").config();
const EleventyFetch = require("@11ty/eleventy-fetch");
const path = require("path");

// get 100 parks at a time until all parks are retrieved
async function getParks() {
  let apiKey = process.env.NPS_API_KEY;
  let parksUrl = "https://developer.nps.gov/api/v1/parks";
  let requestParams = {
    limit: 100,
    start: 0,
  };

  let totalParks;
  let nextPage;
  let allParksData = { data: [] };

  do {
    // Set up the full request URL
    let params = new URLSearchParams(requestParams);
    let queryString = params.toString();
    let requestUrl = parksUrl + "?" + queryString;
    console.log(requestUrl);

    try {
      // fetch the data from the `/parks` endpoint, using the full request URL
      let parksData = await EleventyFetch(requestUrl, {
        duration: "1d",
        type: "json",
        directory: ".11tycache",
        fetchOptions: {
          headers: {
            "user-agent":
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36",
            "X-Api-Key": apiKey,
          },
        },
      });

      // put data into array
      allParksData.data.push(...parksData.data);
      allParksData.total = parksData.total;

      // determine last and next pages based on updated start and limit values
      totalParks = parksData.total;
      lastPage = requestParams.start;
      nextPage = lastPage + requestParams.limit;
      requestParams.start = nextPage;
      console.log("last page: ", lastPage);
      console.log("next page: ", nextPage);
      console.log("total parks: ", totalParks);
    } catch (err) {
      console.error("Something went wrong with request\n" + requestUrl);
      console.log(err);
    }
  } while (nextPage <= totalParks);
  return allParksData;
}

// create node for each park
exports.sourceNodes = async ({
  actions,
  createContentDigest,
  createNodeId,
}) => {
  const { createNode } = actions;

  const parksData = await getParks();

  // loop through data and create Gatsby nodes
  parksData.data.forEach((park) =>
    createNode({
      ...park,
      id: createNodeId(park.parkCode),
      parent: null,
      children: [],
      internal: {
        type: "Parks",
        contentDigest: createContentDigest(park),
      },
    })
  );
  return;
};

// create a page for each park
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const queryResults = await graphql(`
    query {
      allParks {
        nodes {
          fullName
          description
          id
          parkCode
          url
          addresses {
            line1
            city
            stateCode
            postalCode
          }
          images {
            url
            title
          }
        }
      }
    }
  `);

  // use the park.js file as the template for each created page
  const parkTemplate = path.resolve(`src/templates/park.js`);
  queryResults.data.allParks.nodes.forEach((node) => {
    createPage({
      path: `/park/${node.parkCode}`,
      component: parkTemplate,
      context: {
        // pass park as context
        park: node,
      },
    });
  });
};

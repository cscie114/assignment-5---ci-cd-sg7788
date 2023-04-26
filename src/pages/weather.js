import React, { useState, useEffect } from "react";
import Layout from "../components/layout";
import fetch from "node-fetch";

const WeatherPage = ({ pageContext }) => {
  const { park } = pageContext;
  const [weatherData, setWeatherData] = useState({ features: [] });
  //const requestUrl = `/.netlify/functions/weatherApi?state=${park.addresses[0].stateCode}`;

  useEffect(() => {
    fetch(`/.netlify/functions/weatherApi?state=KY`, {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        console.log(json.data);
        setWeatherData(json.data);
      })
      .catch((error) => alert(error));
  }, [weatherData.title]);

  return (
    <Layout>
      <div>
        <h3>Weather Alerts</h3>

        <ul style={{ columnCount: 1 }}>
          {Object.entries(weatherData).map(([key, value]) => {
            return (
              <li key={key}>
                <strong>{key}:</strong>
                {value.toString()}
                {/* {JSON.stringify(value)} */}
              </li>
            );
          })}
        </ul>
      </div>
    </Layout>
  );
};

export default WeatherPage;

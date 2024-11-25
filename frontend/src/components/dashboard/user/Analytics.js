import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/Analytics.css";
import axios from "axios";
import { FaExternalLinkAlt } from "react-icons/fa";
import { TailSpin } from "react-loader-spinner";
import ClickChart from './ClickChart'

function Analytics() {
  const { shortid } = useParams();
  const [data, setData] = useState([]);
  const [countryCount, setCountryCount] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPie, setPie] = useState(false);


  console.log(shortid);

  function countCountries(array) {
    return Object.values(
      array.reduce((acc, curr) => {
        // Check if the country exists, increment count, else initialize
        if (acc[curr.country]) {
          acc[curr.country].count += 1;
        } else {
          acc[curr.country] = { name: curr.country, count: 1 };
        }
        return acc;
      }, {})
    );
  }

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await axios.get(
          `https://linkscout-j2of.onrender.com/url/analytics/${shortid}`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(response);
        setData(response.data);
        
        const CData = countCountries(response.data.visitHistory);
        console.log(CData);

        setCountryCount(CData); // Update state instead of direct variable
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      } finally {
        setLoading(false); // Only stop loading once data is fetched
      }
    };
    fetchAnalytics();
  }, [shortid]);

  return (
    <div className="analytics">
      {loading ? (
        <div className="loading">
          <TailSpin
            visible={true}
            height="150"
            width="150"
            color="#4fa94d"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      ) : (
        <>
          <div className="chart-area">
            <ClickChart visitHistory={data.visitHistory}/>
          </div>
          <div className="link-info">
            <h1>Link Name - {data.name}</h1>
            <p>
              Original Link -{" "}
              <a href={data.redirectURL} target="_blank" rel="noreferrer">
                {data.redirectURL}
              </a>
            </p>
            <p>
              Shortened URL -{" "}
              <a href={data.shortId} target="_blank" rel="noreferrer">
                {data.shortId}
              </a>
            </p>
            <p>
              Qr Image -
              <a href={data.qrImageUrl} target="_blank" rel="noreferrer">
                Open <FaExternalLinkAlt size={10} />
              </a>
            </p>
            <p>Created Time & day - URL</p>

            <p>
              <strong>Total Clicks - {data.totalClicks}</strong>
            </p>
          </div>

          <div className="geo-info">
            <h3>Geographic Analytics</h3>
            <table className="geo-table">
              <tbody>
                <tr>
                  <th>Country</th>
                  <th>Clicks</th>
                </tr>
                {countryCount.map((country) => (
                  <tr key={country.name}>
                    <td>{country.name}</td>
                    <td>{country.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="pie-chart">
              <h2 onClick={()=>{setPie(!showPie)}}>Visits by Country </h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Analytics;

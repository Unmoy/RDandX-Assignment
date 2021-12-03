import axios from "axios";
import React, { useEffect, useState } from "react";
import "./ExchangeCurrency.css";
const ExchangeCurrency = () => {
  const apikey = "81cd40f0-bf2e-49a2-97fc-48e86ffc35f4";
  const geolocationapikey = "0f49d5c1c1a6f35c97f8171e5fd87a6c";
  const [localCurrency, setLocalCurrency] = useState("");
  const [rates, setRates] = useState({});

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const coordinate = pos.coords;
        axios({
          methos: "GET",
          url: `https://api.openweathermap.org/data/2.5/weather?lat=${coordinate.latitude}&lon=${coordinate.longitude}&appid=${geolocationapikey}`,
        }).then((data) => {
          setLocalCurrency(data.data.sys.country);
        });
      });
    }
  }, []);
  useEffect(() => {
    const apiurl = `/rates/latest.json?from=${localCurrency}&to=ESP,ITL&key=${apikey}`;
    axios.get(apiurl).then((data) => {
      setRates(data.data.rates);
    });
  }, [localCurrency]);
  return (
    <div className="table_wrapper">
      <table className="rates_table" style={{ width: "100%" }}>
        <tr>
          <th>From(Currency)</th>
          <th>To(Currency)</th>
          <th>Price</th>
        </tr>
        <tr>
          <td>{localCurrency}</td>
          <td>ESP(Spanish Pesetas)</td>
          <td>{rates.ESP}</td>
        </tr>
        <tr>
          <td>{localCurrency}</td>
          <td>ITL(Italian Lira)</td>
          <td>{rates.ITL}</td>
        </tr>
      </table>
    </div>
  );
};

export default ExchangeCurrency;

import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Weather.css";
const Weather = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [visible, setVisible] = useState(1);
  const [current, setCurrent] = useState({});
  const [cityName, setCityName] = useState("");
  const [countryName, setCountryName] = useState("");
  const [icon, setIcon] = useState("");

  const apikey = "0f49d5c1c1a6f35c97f8171e5fd87a6c";
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const coordinate = pos.coords;
        axios({
          methos: "GET",
          url: `https://api.openweathermap.org/data/2.5/weather?lat=${coordinate.latitude}&lon=${coordinate.longitude}&appid=${apikey}`,
        }).then((data) => {
          setCityName(data.data.name);
          setCountryName(data.data.sys.country);
          setIcon(data.data.weather[0].icon);
        });
      });
    }
  }, []);
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const coordinate = pos.coords;
        const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinate.latitude}&lon=${coordinate.longitude}&units=metric&exclude=hourly,minutely&id=524901&appid=${apikey}`;
        fetch(url)
          .then((res) => res.json())
          .then((data) => {
            setWeatherData(data.daily);
            setCurrent(data.current);
          });
      });
    }
  }, []);

  const loadMore = () => {
    setVisible(visible + 5);
  };
  const options = { day: "numeric", month: "short" };
  const CurrentDate = new Date().toLocaleString(undefined, options);
  const CurrentTime = new Date().toLocaleTimeString(navigator.language, {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="weather_wrapper">
      <div className="temp_header">
        <span style={{ color: "red" }}>{CurrentDate}, </span>
        <span style={{ color: "red" }}>{CurrentTime}</span>
        <div className="temp_place_holder">
          <span>{cityName}, </span>
          <span>{countryName}</span>
        </div>
        <div className="temp_view">
          <img
            src={`http://openweathermap.org/img/w/${icon}.png`}
            alt="weather_icon"
          />
          <span>{current.temp}&deg;C</span>
        </div>
        <div className="temp_button">
          <button onClick={loadMore}>Show next 3 days forcast</button>
        </div>
      </div>
      <div>
        {weatherData.slice(0, visible).map((day, index) => {
          if (index <= 3) {
            let dt = new Date(day.dt * 1000).toLocaleString(undefined, options);
            return (
              <div className="temp_card">
                <h5>{dt}</h5>
                <img
                  src={`http://openweathermap.org/img/w/${day.weather[0].icon}.png`}
                  alt="weather_icon"
                  width="50px"
                />
                <h4>{day.temp.min}&deg;C</h4>
                <p className="temp_desc">{day.weather[0].description}</p>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default Weather;

import { Navbar } from "../components/Navbar";
import "../App.css";
import axios from "axios";
import { useState } from "react";
import { WeatherInfo } from "./CurrentWeather";

export const FrontPage = () => {
  const [cityObject, setCityObject] = useState<WeatherInfo>();

  const getData = async () => {
    const response = await axios.get<WeatherInfo>(
      `http://api.weatherapi.com/v1/current.json?key=4498031c7d2a498cb9a102202232804&lang=sv&q=Stockholm`
    );
    console.log("Hämtade datan: ", response.data);

    setCityObject(response.data);
  };
  getData();

  return (
    <div className="wrapper">
      <Navbar></Navbar>
      <div>
        <h2>Välkommen till min väderapp!</h2>
        <h4>
          {cityObject?.location.name}, {cityObject?.location.country}
        </h4>
        <h1>{cityObject?.current.temp_c}&#x2103;</h1>
        <h2>
          {cityObject?.current.condition.text}{" "}
          <img
            src={cityObject?.current.condition.icon}
            alt={cityObject?.current.condition.text}
          />
        </h2>
      </div>
    </div>
  );
};

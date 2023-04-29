import axios from "axios";
import { ChangeEvent, useState } from "react";
import { Navbar } from "../components/Navbar";
import "../App.css";

export interface Location {
  name: string;
  region: string;
  country: string;
  localtime: string;
}

export interface Current {
  last_updated: string;
  temp_c: number;
  temp_f: number;
  is_day: number;
  condition: Condition;
}

export interface Condition {
  text: string;
  icon: string;
}

export interface WeatherInfo {
  location: Location;
  current: Current;
  feelslike_c: number;
  feelslike_f: number;
}

export const CurrentWeather = () => {
  const [searchText, setSearchText] = useState("");
  const [cityObject, setCityObject] = useState<WeatherInfo>();
  const weekday = [
    "söndag",
    "måndag",
    "tisdag",
    "onsdag",
    "torsdag",
    "fredag",
    "lördag",
  ];
  const months = [
    "Januari",
    "Februari",
    "Mars",
    "April",
    "Maj",
    "Juni",
    "Juli",
    "Augusti",
    "September",
    "Oktober",
    "November",
    "December",
  ];
  const now = new Date();
  const day = weekday[now.getDay()];
  const date = now.getDate();
  const month = months[now.getMonth()];

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleSearchClick = async () => {
    const response = await axios.get<WeatherInfo>(
      `http://api.weatherapi.com/v1/current.json?key=4498031c7d2a498cb9a102202232804&lang=sv&q=${searchText}`
    );
    console.log("Hämtade datan: ", response.data);

    setCityObject(response.data);
  };

  if (cityObject !== undefined) {
    return (
      <div className="wrapper">
        <Navbar></Navbar>
        <h2>Sök på en stad</h2>
        <input
          type="text"
          placeholder="London"
          value={searchText}
          onChange={handleTextChange}
        />
        <button onClick={handleSearchClick}>Search</button>

        <div>
          <p>
            <span>
              Idag är det {day} {date} {month}
            </span>
          </p>
          <p>
            <span>{cityObject?.location.name},</span>
            <span>{cityObject?.location.region},</span>
            <span>{cityObject?.location.country}</span>
          </p>
          <p>
            <span>
              Temperatur i celsius: {cityObject?.current.temp_c} &#x2103;{" "}
            </span>
          </p>
          <p>
            <span>
              Temperatur i fahrenheit: {cityObject?.current.temp_f} &#x2109;{" "}
            </span>
          </p>
          <p>
            <span>{cityObject?.current.condition.text}</span>{" "}
            <img
              src={cityObject?.current.condition.icon}
              alt={cityObject?.current.condition.text}
            />
          </p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="wrapper">
        <Navbar></Navbar>

        <h2>Sök på en stad</h2>
        <input
          type="text"
          placeholder="London"
          value={searchText}
          onChange={handleTextChange}
        />
        <button onClick={handleSearchClick}>Sök</button>
        <p>
          <span>
            Idag är det {day} {date} {month}
          </span>
        </p>
      </div>
    );
  }
};

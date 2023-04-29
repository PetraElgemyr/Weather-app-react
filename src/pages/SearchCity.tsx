import { ChangeEvent, useState } from "react";
import axios from "axios";
import { CityWeather } from "../models/ICityWeather";
import { CityList } from "../components/CityList";

export function SearchCity() {
  const [searchText, setSearchText] = useState("");
  const [cities, setCities] = useState<CityWeather[]>([]);

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleClick = async () => {
    const response = await axios.get<CityWeather[]>(
      `http://api.weatherapi.com/v1/search.json?key=4498031c7d2a498cb9a102202232804&q=${searchText}`
    );
    console.log(response.data);

    setCities(response.data);
  };

  return (
    <>
      <h1>Se vädret!</h1>
      <p>Sök på en stad</p>
      <input
        value={searchText}
        placeholder="Stockholm"
        onChange={handleTextChange}
      />
      <button onClick={handleClick}>Sök</button>

      <div>
        <h3>Sökförslag</h3>

        {cities.map((place, index) => {
          return (
            <CityList
              key={index}
              name={place.name}
              region={place.region}
              country={place.country}
            ></CityList>
          );
        })}
      </div>

      {/* 
      {cities.map((city) => {
        return (
          <>
            <span>{city.name}</span>
            <span>{city.region}</span>
            <span>{city.country}</span>
          </>
        );
      })} */}
    </>
  );
}

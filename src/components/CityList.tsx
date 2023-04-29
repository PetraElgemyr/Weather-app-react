import "./CityList.scss";
interface CityProps {
  name: string;
  region: string;
  country: string;
}

import { CityWeather } from "../models/ICityWeather";

export interface CityListProps {
  city: CityWeather;
}

export const CityList = ({ name, region, country }: CityProps) => {
  return (
    <div>
      <span>{name}</span>
      <span>{region}</span>
      <span>{country}</span>
    </div>
  );
};

"use client";
import { useState, useEffect } from "react";

import Lottie from "lottie-react";
import sunnyAnimation from "../lib/sunny-lottie.json";
import Image from "next/image";

export default function Home() {
  const [location, setLocation] = useState(null);
  const [weatherResponse, setWeatherResponse] = useState(null);
  const geo = navigator.geolocation;

  async function getLocation() {
    return new Promise((resolve, reject) => {
      geo.getCurrentPosition(resolve, reject);
    });
  }
  // 42.10443042743036, 24.482829363072177
  async function getWeather() {
    const { latitude, longitude } = location.coords;
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${42.10443042743036}&lon=${24.482829363072177}&appid=46699d8f05da1bf3e70c435bd71b3d44`,
    );
    const data = await response.json();
    setWeatherResponse(data);
  }

  useEffect(() => {
    const position = getLocation().then(setLocation);
  }, []);

  useEffect(() => {
    const { latitude, longitude } = location?.coords || {};
    if (!latitude || !longitude) return;
    getWeather();
  }, [location]);

  return (
    <main className=" min-h-[100svh] border-2 border-red-500 container">
      <Lottie className="h-20 w-20" animationData={sunnyAnimation} />
    </main>
  );
}

import React, { useState, useEffect } from "react";

import {MapContainer, TileLayer, Marker} from 'react-leaflet'
import Inputarea from "./Inputarea";
import "leaflet/dist/leaflet.css";
import Resultbox from "./Resultbox";
import Divider from "@mui/material/Divider";
import "./App.css";
import { duration } from "@mui/material";



function App() {
  const apiKey = import.meta.env.VITE_API_KEY;
  const baseUrl = "https://geo.ipify.org/api/v2/country";

  const [url, setUrl] = useState(null);
  const [data, setData] = useState(null);


  



  useEffect(() => {
    async function fetchInitialData() {
      try {
        const response = await fetch(`${baseUrl}?apiKey=${apiKey}`);
        const jsonData = await response.json();
        console.log(jsonData);
        setData(jsonData);

        

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchInitialData();
    anime({
      targets: ".search-result",
      translateX: [-1500, 0],
      duration: 1000,
      easing: 'easeOutQuint',
      delay: 500,
    })

    anime({
      targets : 'form',
      scale : [0.2, 1],
      duration: 1000,
    })

  }, []);



  function checkInputType(input) {
    const ipv4Pattern = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    const ipv6Pattern = /^(?:[a-fA-F0-9]{1,4}:){7}[a-fA-F0-9]{1,4}$/;
    const domainPattern = /^(?!:\/\/)([a-zA-Z0-9-_]{1,63}\.)+[a-zA-Z]{2,6}$/;
    if (ipv4Pattern.test(input) || ipv6Pattern.test(input)) {
      setUrl(`${baseUrl}?apiKey=${apiKey}&ipAddress=${input}`);
    } else if (domainPattern.test(input)) {
      setUrl(`${baseUrl}?apiKey=${apiKey}&domain=${input}`);
    } else {
      console.error("invalid input");
    }
    console.log(url);
  }


useEffect(() => {
  async function fetchData() {
    if (!url) return;

    try {
      const response = await fetch(url);
      const jsonData = await response.json();
      
      setData(jsonData);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  fetchData();
}, [url]);




  return (
    <>
      <div className="main-container">
        <h1>IP Address Tracker</h1>
        <Inputarea onSubmit={checkInputType} />
        <div className="search-result">
          <Resultbox title="IP ADDRESS" content={data?.ip || "Loading..."}/>
          <Divider
            orientation="vertical"
            flexItem
            aria-hidden="true"
            variant="middle"
          />
          <Resultbox title="LOCATION" content={data?.location?.region + "," + data?.location?.country || "Loading..."} />
          <Divider
            orientation="vertical"
            flexItem
            aria-hidden="true"
            variant="middle"
          />
          <Resultbox title="TIMEZONE" content={data?.location?.timezone || "Loading..."} />
          <Divider
            orientation="vertical"
            flexItem
            aria-hidden="true"
            variant="middle"
          />
          <Resultbox title="ISP" content={data?.isp || "Loading..."}/>
        </div>
       
      </div>
      <MapContainer center={[36.66353,4.912546]} zoom={15} >
           <TileLayer attribution= '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
           url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'></TileLayer>
           <Marker  position={[36.66353, 4.912546]}></Marker>
           
        </MapContainer>
     
    </>
  );
}

export default App;

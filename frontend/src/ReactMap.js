/** @format */

import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import * as states from "./states.json";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { handleStateChange } from "./Action/MapAction";
import Navbar from "./Navbar";

function ReactMap() {
  let [mapLoading, setMapLoading] = useState(true);
  let dispatch = useDispatch();
  let viewState = useSelector((state) => state.mapState.state);
  let history = useHistory();
  let [total, setTotal] = useState({
    death: 0,
    confirmed: 0,
    recovered: 0,
    lastUpdate: 0,
  });

  useEffect(() => {
    fetch("https://covidtracking.com/api/states")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        let deathCount = 0;
        let recoveredCount = 0;
        let confirmedCount = 0;
        let lastUpdateCount = 0;

        data.forEach((state) => {
          deathCount = state.death + deathCount;
          recoveredCount = state.recovered + recoveredCount;
          confirmedCount = state.positive + confirmedCount;
          lastUpdateCount = state.lastUpdateEt;
        });
        setTotal({
          death: deathCount,
          recovered: recoveredCount,
          confirmed: confirmedCount,
          lastUpdate: date,
        });
      });
  }, []);

  let today = new Date();

  let date =
    today.getMonth() +
    1 +
    "/" +
    today.getDate() +
    "/" +
    today.getFullYear() +
    ", " +
    today.getHours() +
    ":" +
    today.getMinutes();
  console.log(date);

  const [viewport, setViewport] = useState({
    latitude: 39.381266,
    longitude: -97.922211,
    width: "80vw",
    height: "100vh",
    frameborder: "0",
    scrolling: "no",
    marginheight: "0",
    marginwidth: "0",
    zoom: 3,
  });

  let [selectedState, setSelectedState] = useState(null);

  useEffect(() => {
    fetch("https://covidtracking.com/api/states")
      .then((response) => {
        return response.json();
      })

      .then((data) => {
        if (selectedState !== null) {
          let state = data.filter((d) => d.state === selectedState.state);

          dispatch(handleStateChange(state[0]));
          console.log(state[0]);
        }
      });
  }, [selectedState]);

  let REACT_APP_MAPBOX_TOKEN =
    "pk.eyJ1IjoibWVsa2lsaWMiLCJhIjoiY2tiZHZxNjVpMGZ6MjJ6bXVnYWZxbnEzOSJ9.IP_IrNqwNLG6yar2f9d6Qw";

  useEffect(() => {
    setTimeout(() => {
      setMapLoading(false);
    }, 2000);
  }, []);

  return (
    <div>
      <Navbar />
      <div
        style={{
          width: "100vw",
          height: "100vh",
          position: "fixed",
          display: mapLoading ? "block" : "none",
          top: 0,
          left: 0,
          backgroundColor: "black",
          color: "white",
          zIndex: 100,
        }}
      >
        {" "}
        Loading...{" "}
      </div>
      <div className="table">
        <h1 className="tabledata">Total Confirmed: </h1>
        <h1 className="tabledata">{total.confirmed}</h1>
        <br />
        <br />
        <br />
        <h1 className="tabledata">Recovered: </h1>
        <h1 className="tabledata">{total.recovered}</h1>
        <br />
        <br />
        <br />
        <h1 className="tabledata">Total Deaths:</h1>
        <h1 className="tabledata"> {total.death}</h1>
        <br />
        <br />
        <br />
        <h1 className="tabledata">Last Updated At</h1>
        <h1 className="tabledata">(M/DD/YYYY):</h1>
        <h1 className="tabledata">{date}</h1>
      </div>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={REACT_APP_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/melkilic/ckbdrfn9516m01iry6d8v2w0o"
        onViewportChange={(viewport) => {
          setViewport(viewport);
        }}
      >
        {states.features.map((state) => (
          <Marker key={state.id} latitude={state.lat} longitude={state.long}>
            <button
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                width: "10px",
                height: "10px",
              }}
              onMouseOver={(e) => {
                e.preventDefault();
                setSelectedState(state);
              }}
            >
              <img src="https://img.icons8.com/cotton/30/000000/place-marker.png" />
            </button>
          </Marker>
        ))}
        {selectedState ? (
          <Popup
            latitude={selectedState.lat}
            longitude={selectedState.long}
            onClose={() => {
              setSelectedState(null);
            }}
          >
            <div onClick={() => history.push("/show")}>
              <h2>{viewState.state}</h2>
              {viewState.positive !== null ? (
                <h4>Confirmed Cases: {viewState.positive}</h4>
              ) : (
                <h4>Confirmed Cases: No current info</h4>
              )}
              {viewState.negative !== null ? (
                <h4>Negative Cases: {viewState.negative}</h4>
              ) : (
                <h4> Negative Cases: No current info</h4>
              )}
              {viewState.death !== null ? (
                <h4>Death:{viewState.death}</h4>
              ) : (
                <h4> Death: No current info</h4>
              )}
              {viewState.recovered !== null ? (
                <h4>Recovered:{viewState.recovered}</h4>
              ) : (
                <h4> Recovered: No current info</h4>
              )}
              {viewState.lastUpdateEt !== null ? (
                <h4> Last Update: {viewState.lastUpdateEt}</h4>
              ) : (
                <h4> Last Update: No current info </h4>
              )}
            </div>
          </Popup>
        ) : null}
      </ReactMapGL>
    </div>
  );
}

export default ReactMap;

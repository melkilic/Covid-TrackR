/** @format */

import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import { Bar, Line, Pie } from "react-chartjs-2";
import Navbar from "./Navbar";
import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button'

export default function UsDaily() {
  const [chartData, setChartData] = useState({});
  const [death, setDeath] = useState([]);
  const [date, setDate] = useState([]);
  const [positive, setPositive] = useState([]);
  

  const chart = () => {
    let deathArr = [];
    let dateArr = [];
    let positiveArr = [];

    let totalTestResults = [];
    let deathColor= "#646d5a"
    let positiveColor="#859d87"

    fetch("https:covidtracking.com/api/us/daily")
      .then((res) => res.json())
      .then((r) => {
        r.forEach((element) => {
          console.log(element);
          let deathCount =
            element.death === null ? (element.death = 0) : element.death;
  
          deathArr.push(deathCount);
          dateArr.push(element.date);
          positiveArr.push(element.positive);
    
          totalTestResults.push(element.totalTestResults);

        });

        dateArr.reverse();
        deathArr.reverse();
        positiveArr.reverse();
        totalTestResults.reverse();
        console.log(totalTestResults);
        
      

        setDeath({
          labels: dateArr,
          datasets: [
            {
              label: "death",
              data: deathArr,
              backgroundColor: deathColor,
            },
          ],
        });
        setPositive({
          labels: totalTestResults,
          datasets: [
            {
              label: "positive",
              data: positiveArr,
              backgroundColor: positiveColor,
            },
          ],
        });
      });
  };

  useEffect(() => {
    chart();
  }, []);

  let divStyle={ display: "block", height: "300px", width: "1450px" }
  return (
    <div className="chart">
      <Navbar />
      <div style={divStyle}>
        <Bar
          data={death}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            title: {
              text: "COVID-19 Death-Date Ratio",
              display: true,
              fontSize: 25,
            },
            legend: {
              display: true,
              position: "right",
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10,
                    beginAtZero: true,
                  },
                  gridLines: {
                    display: false,
                  },
                },
              ],
              xAxes: [
                {
                  gridLines: {
                    display: false,
                  },
                },
              ],
            },
          }}
        />
      </div>
    
  
      <div style={divStyle}>
        <Line
          data={positive}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            title: {
              text: "Positive Cases vs Total Test Results",
              display: true,
              fontSize: 25,
            },
            legend: {
              display: true,
              position: "right",
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10,
                    beginAtZero: true,
                  },
                  gridLines: {
                    display: false,
                  },
                },
              ],
              xAxes: [
                {
                  gridLines: {
                    display: false,
                  },
                },
              ],
            },
          }}
        />
      </div>
     
    </div>
  );
}

import React, { useState, useEffect } from 'react';


import APIClient from 'utils/apiClient';

import './styles.scss';
import { Spin} from 'antd';

import { Chart } from "react-google-charts";

// import { Line } from "react-chartjs-2";

import moment from 'moment';

const HistoryOfWallet = () => {
  const [historyOfWallet, setWallletAmount] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [chartData, setChartData] = useState({});
  useEffect(() => {
    getWalletActions()
  }, []);

  const getWalletActions = async () => {
    let response = await APIClient.request(
      '/api/wallet/get-wallet-actions',
      {},
      'GET'
    );



    console.log("respone: ",response);
    var dataSet = [];
    for (var i = 0; i < response.length; i++) {
      var a = parseInt(response[i]['remaining']);
      dataSet.push([moment(response[i]['updated_at']).format('dddd, h:mm:ss'), a]);

      // [[response[i]['remaining']],[i]];



    }

    dataSet.reverse();
    dataSet.unshift(["Date", "Amount"]);
    // console.log(data);
    setWallletAmount(dataSet);

    let chartJSDataset = [];

    let chartJSLabel = [];
    for (var i = response.length-1; i >= 0; i--) {
      chartJSDataset.push(parseInt(response[i]["remaining"]));
    }
    for (var i = response.length-1; i >= 0; i--) {
      chartJSLabel.push(response[i]["created_at"].toLocaleString());
    }


    console.log("chartJSLabel: ",chartJSLabel);
    setIsLoading(false);
    setChartData({
      labels: chartJSDataset,
      datasets: [
        {
          label: chartJSLabel,
          data: chartJSDataset,
          backgroundColor: ["rgba(75, 192, 192, 0.6)"],
          borderWidth: 4
        }

      ],
      options: {
        scales: {
          xAxes: [{
            type: 'time'
          }]
        }
      }
    });


  };




  return (
    <Spin
      spinning={isLoading}
    >
      <div className='chart'>
        {/* <Chart
          chartType="Line"
          loader={<div />}
          data={historyOfWallet}
          width="100%"
          height="400px"
          // legendToggle
          options={{
            title: 'Wallet amount',
            hAxis: { title: 'Date' },
            vAxis: { title: 'Amount' },
            legend: 'none',
            animation: {
              startup: true,
              easing: 'linear',
              duration: 3000,
            },
            enableInteractivity: false,
          }}
        />

        <Line data={chartData} ></Line> */}
      </div>

    </Spin>

  );


};

export default HistoryOfWallet;

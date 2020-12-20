import React, { useState, useEffect } from 'react';
import { Tabs, Table ,Spin} from 'antd';
import APIClient from 'utils/apiClient';
import moment from 'moment';
import Button from 'components/Button';
import BetModal from 'components/BetModal';

import MatchCards from 'components/MatchCards';
import './styles.scss';
import Nuberfromarter from 'utils/numberFormatter';
const { TabPane } = Tabs;
const myBetsKey = "my-bets";
const matchesKey = "matches";

function useWindowsWidthSize(){

  const [size,setSize] = useState([window.innerHeight,window.innerWidth]);
  // return width;
  

useEffect(() => {
    const handleReSize = () =>{
    setSize([window.innerHeight,window.innerWidth]);
  };
  window.addEventListener("resize",handleReSize);
  return () =>{
    window.removeEventListener("resize",handleReSize);
  }
},[]);
return size;
}





const Matches = ({ walletAmount, getWalletAmount }) => {
  const [height,width]= useWindowsWidthSize();
  const [matches, setMatches] = useState([]);
  const [isMatchesLoading, isSetMatchesLoading] = useState(true);
  const [isBetModalVisible, setIsBetModalVisible] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState({});
  const [ifMybets, setIfMybets] = useState(0);

  useEffect(() => {


    getMatches();
  }, []);


  const getMatches = async () => {

    let response = await APIClient.request(
      '/api/match/get-upcoming-matches',
      {},
      'GET'
    );

    console.log(response);

    setMatches(response);
    isSetMatchesLoading(false);
  }


  const tabChanged = (key) => {

  }

  const columns = [
    {
      title: 'Date',
      dataIndex: 'time',
      key: 'date',
      render: (value) => moment(value).format("DD.MM.YYYY")
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
      render: (value) => moment(value).format("HH:mm")
    },
    {
      title: 'Teams',
      dataIndex: 'team_1',
      key: 'teams',
      render: (value, record) => record.team_1 + ' - ' + record.team_2
    },
    {
      title: '1',
      dataIndex: 'team_1_win_coef',
      key: 'team_1_win_coef'
    },
    {
      title: 'x',
      dataIndex: 'draw_coef',
      key: 'draw_coef'
    },
    {
      title: '2',
      dataIndex: 'team_2_win_coef',
      key: 'team_2_win_coef'
    },
    {
      render: (value, match) => {
        const walletEmpty = walletAmount < 0.01;
        if (match.amount) {
          return (
            <div className="bet-amount">{Nuberfromarter.formatMoney(match.amount)} &euro;</div>
          )
        }

        return (
          <Button
            onClick={() => {
              setSelectedMatch(match);
              setIsBetModalVisible(true);
            }}
            disabled={walletEmpty}
          >
            Bet now
          </Button >
        )
      }
    }
  ];

  return (
    <>
  
      <Tabs defaultActiveKey="matches" onChange={(key) => tabChanged(key)}>
        <TabPane tab="Matches" key={matchesKey}>
          <Spin spinning={isMatchesLoading}>
            
            {width<650? <MatchCards  walletAmount={walletAmount} ifMyBets={ifMybets} />: <Table className="matches-table" rowKey="id" dataSource={matches} columns={columns} pagination={false} />}
            
            
  
            
          </Spin>
          
        </TabPane>
        <TabPane tab="My bets" key={myBetsKey}>
        {width<650?<MatchCards  walletAmount={walletAmount} ifMyBets={ifMybets} />:           <Table className="matches-table" rowKey="id" dataSource={matches.filter(el => el.amount)} columns={columns} pagination={false} />}

        </TabPane>
      </Tabs>
      <BetModal
        visible={isBetModalVisible}
        setIsModalVisible={setIsBetModalVisible}
        match={selectedMatch}
        maxBetAmount={walletAmount}
        getWalletAmount={getWalletAmount}
        getMatches={getMatches}
      />
    </>
  )
}

export default Matches;

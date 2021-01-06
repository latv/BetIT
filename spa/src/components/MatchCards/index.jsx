import React, { useState, useEffect } from 'react';
import {Spin,Card, Button} from 'antd';
import APIClient from '../../utils/apiClient';
import BetModal from 'components/BetModal';
import Nuberfromarter from 'utils/numberFormatter';
import moment from 'moment';
import './styles.scss';


const Cards = ({matches,isMatchesLoading,walletEmpty,walletAmount,getWalletAmount,getMatches}) => {
    


    const [isBetModalVisible, setIsBetModalVisible] = useState(false);
    const [selectedMatch, setSelectedMatch] = useState({});


    return (

        <div className="cards">
            
            <Spin spinning={isMatchesLoading}>
                    {matches.map((match) =>
                     // time={match.time}
                // team_1={match.team_1}
                // team_2={match.team_2}
                // team_1_win_coef={match.team_1_win_coef}
                // draw_coef={match.draw_coef}
                // team_2_win_coef={match.team_2_win_coef} 
                // walletAmount={walletAmount}
                // selectedMatch={match}
                //  match={match} 
                //   setIsBetModalVisible={setIsBetModalVisible}
            <Card title={match.team_1 + " - " +match.team_2} className="card">
                <p>{moment(match.time).format("DD.MM.YYYY")}</p>
                <p>{moment(match.time).format("HH:mm")}</p>
                <p>{match.team_1_win_coef + " " + match.draw_coef + " " + match.team_2_win_coef}</p>
                {match.amount ? <div className="bet-amount">{Nuberfromarter.formatMoney(match.amount)} &euro;</div> :
    

    
          <Button className="bet-btn"
            onClick={() => {
              setSelectedMatch(match);
              setIsBetModalVisible(true);
            }}
            disabled={walletEmpty}
          >
            Bet now
          </Button >
}
            </Card>)}
            </Spin>
            <BetModal
        visible={isBetModalVisible}
        setIsModalVisible={setIsBetModalVisible}
        match={selectedMatch}
        maxBetAmount={walletAmount}
        getWalletAmount={getWalletAmount}
        getMatches={getMatches}
      />
          
        </div>
     
    )

}
export default Cards;
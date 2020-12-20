import React, { useState, useEffect } from 'react';
import Card from './Card';
import {Spin} from 'antd';
import APIClient from '../../utils/apiClient';
import './styles.scss';


const Cards = (walletAmount,ifMyBets) => {
    const [isMatchesLoading, isSetMatchesLoading] = useState(true);
    const [matches, setMatches] = useState([]);
    const getMatches = async () => {

        let response = await APIClient.request(
          '/api/match/get-upcoming-matches',
          {},
          'GET'
        );
        console.log("ifMybets: ",ifMyBets);
        console.log(response);
        if (ifMyBets===true){
            setMatches(response.filter(el => el.amount));
        }else if(ifMyBets===false) {
            setMatches(response);
    }
        isSetMatchesLoading(false);
      }
      useEffect(() => {


        getMatches();
      }, []);
   
    const listItems = (matches) =>{
        
            try {
            
            const card =  matches.map((match) =>
            <Card 
                time={match.time}
                team_1={match.team_1}
                team_2={match.team_2}
                team_1_win_coef={match.team_1_win_coef}
                draw_coef={match.draw_coef}
                team_2_win_coef={match.team_2_win_coef} 
                walletAmount={walletAmount}
                loading={isSetMatchesLoading}
            />);
            return card;
            }catch(e){console.log(e);}
}

    


    return (

        <div className="cards">
            
            <Spin spinning={isMatchesLoading}>
                    {listItems(matches)}
            </Spin>
          
        </div>
     
    )

}
export default Cards;
import React from 'react';
import './styles.scss';
import moment from 'moment';

const Card = ({time,team_1,team_2,team_1_win_coef,draw_coef,team_2_win_coef,walletAmount}) => {

    return (
     

        
        <div className="card">
        <div className="header">
            <h1 className="time">{moment(time).format("DD.MM.YYYY")}</h1>
            <h1 className="time">{moment(time).format("HH:mm")}</h1>
        </div>
        <div className="teams"><p  >{team_1}</p> <p className="VS">VS</p> <p>{team_2}</p></div>
        </div>
           
    )

}
export default Card;
import { useEffect, useState } from "react";
import { getmatchdetail } from "./interaction";

function ViewMatch(props){

    const id=props.path.split("/");
    const [loading,setLoading]=useState(0);
    const [detail,setDetail]=useState({});
    const token=localStorage.getItem('auth_token')
    const getDetail=()=>{
        getmatchdetail(token,id[2]).then((data)=>{
            const {detail}=data;
            console.log(data);
            setDetail(detail);
            setLoading(1);
        }).catch((error)=>{
            console.log(error);
        })
    }

    useEffect(()=>{
        if(!loading){
            getDetail();
        }
    },[loading])
    return(
        <div className="container p-2">
            <div className="row">
            {loading ? <div><h4>{detail.team1} Vs {detail.team2}</h4>
                        <p>{detail.season}, {detail.date}, at {detail.venue}, {detail.city}</p>
                        <p>Toss won by :{detail.toss_winner}, Toss_Decision :{detail.toss_decision}</p>
                        <h3>{detail.result}</h3>
                        <p>Player of the match: {detail.player_of_match}</p>
                        <p>Umpires : {detail.umpire1 ? <span>{detail.umpire1}</span>:<></>} 
                        {detail.umpire2 ? <span>, {detail.umpire2}</span>:<></>}
                        {detail.umpire3 ? <span>, {detail.umpire3}</span>:<></>}
                       </p> </div>: <></>}
            </div>
            
        </div>
        
    )
}
export default ViewMatch;
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
                <div  className="col-12" style={{textAlign:"center",top:100}}>
            {loading ? <div><h1>{detail.team1} Vs {detail.team2}</h1>
                        <p>{detail.season}, {detail.date}, at {detail.venue}, {detail.city}</p>
                        <p>{detail.toss_winner} won the toss and elected to {detail.toss_decision}</p>
                       <p> <h4>{detail.winner?<span>{detail.winner}</span>:<></>}&nbsp;<span>{detail.result}</span>
                        </h4></p>
                        <p><span style={{fontWeight:"bold"}}>Player of the match:</span> {detail.player_of_match}</p>
                        <p><span style={{fontWeight:"bold"}}>Umpires</span> : {detail.umpire1 ? <span>{detail.umpire1}</span>:<></>} 
                        {detail.umpire2 ? <span>, {detail.umpire2}</span>:<></>}
                        {detail.umpire3 ? <span>, {detail.umpire3}</span>:<></>}
                       </p> </div>: <></>}
                </div>
            </div>
        </div>
        
    )
}
export default ViewMatch;
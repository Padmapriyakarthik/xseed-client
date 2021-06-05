import { useEffect, useState } from "react";
import {getTeam,getVenue,getPrediction} from "./interaction";

function Prediction(){

    const[team,setTeam]=useState([]);
    const[venue,setVenue]=useState([]);
    const[loading,setloading]=useState(0)
    const[bat,setBat]=useState(null);
    const[team1,setTeam1]=useState(null);
    const[team2,setTeam2]=useState(null);
    const[Venue,setvenue]=useState(null);
    const [prediction,setPrediction]=useState({});
    const[load,setload]=useState(0);
    const teamlists=()=>{
        getTeam().then((data)=>{
            const {team}=data;
            setTeam(team);
        }).catch((error)=>{
            console.log(error);
        })
    }
    const venuelists=()=>{
        getVenue().then((data)=>{
            const {venue}=data;
            console.log(venue);
            setVenue(venue);
            setloading(1);
        }).catch((error)=>{
            console.log(error);
        })
    }

       const TeamOne=()=>{
           setload(0);
            var x = document.getElementById("team1").value;
            if(x!=-1){
                setTeam1(x);
            }else{
                setTeam1(null);
            }
       }
       const TeamTwo=()=>{
        setload(0);
            var x = document.getElementById("team2").value;
            if(x!=-1){
               setTeam2(x);
            }else{
                setTeam2(null)
            }
       }
        const chooseBat=()=>{
            setload(0);
            var x = document.getElementById("bat").value;
            if(x!=-1){
                setBat(x);
            }else{
                setBat(null)
            }
       }

       const chooseVenue=()=>{
        setload(0);
            var x = document.getElementById("venue").value;
            if(x!=-1){
                setvenue(x);
            }else{
                setvenue(null)
            }
        }
       const predict=()=>{
           if((team1==null)||(team2==null)||(bat==null)||(Venue==null)){
                document.getElementById("message").innerText="all inputs must be selected for prediction"
           }else if(team1==team2){
             document.getElementById("message").innerText="both teams can not be the same"
           }else{
            document.getElementById("message").innerText="";
            getPrediction(team1,team2,Venue,bat).then((data)=>{
                const {result}=data;
                setPrediction(result);
                setload(1);
                console.log(data);
            }).catch((error)=>{
                console.log(error)
            })
           }
       }

       useEffect(()=>{
           if(!loading){
                teamlists();
                venuelists();
           }
       },[loading])
    return(
        <div className="container ">
            <div className="row p-2">
                <div className="col-2">
                <select className="custom-select custom-select-md" id="team1" onChange={TeamOne} >
                            <option value={-1} >Select Team1</option>
                            {team.map((elem,index)=>{
                                return(
                                    <option key={index} value={elem}>{elem}</option>
                                )
                            })
                        }
                        </select>
                </div>
                <div className="col-2">
                    <select className="custom-select custom-select-md mb-2" id="team2" onChange={TeamTwo}>
                        <option value={-1} >Select Team2</option>
                        {team.map((elem,index)=>{
                            return(
                                <option key={index} value={elem}>{elem}</option>
                            )
                        })}
                    </select>
                </div>
                <div className="col-4">
                    <select className="custom-select custom-select-md mb-2" id="venue" onChange={chooseVenue}>
                        <option value={-1} >Select Team2</option>
                        {venue.map((elem,index)=>{
                            return(
                                <option key={index} value={elem}>{elem}</option>
                            )
                        })}
                    </select>
                </div>
                <div className="col-2">
                    <select className="custom-select custom-select-md mb-2" id="bat" onChange={chooseBat}>
                    <option value={-1} >Choose Batting</option>
                    {team1 ? <option value={team1}>{team1}</option>:<></>}
                    {team2 ? <option value={team2}>{team2}</option>:<></>}
                    </select>
                </div>
                <div className="col-2">
                <button style={{color:"white"}} type="submit" className="btn btn-primary"  onClick={e => {e.preventDefault();predict()}}>Predict</button>
                </div>
                </div>
                <div className="row">
                    <p id="message"></p>  
                </div>
                {load?
                <div className="row">
                    <div className="col-12">
                    <div className="row">
                        {(!prediction.team1count) && (!prediction.team2count) && (!prediction.tiecount) ? 
                        <h2>NO Matches</h2>:
                            <div style={{textAlign:"center"}} className="col-6">{(prediction.team1count) || (prediction.team2count)?
                            <div> <h2>Prediction Result</h2><p>{team1} : {prediction.team1predict}%</p>
                            <p>{team2}: {prediction.team2predict}%</p></div>:<p></p>}</div>
                             }

                            <div style={{textAlign:"center"}}  className="col-6">
                            {(prediction.team1count) || (prediction.team2count)?<div>
                                <h2>Prediction result is based on Head to Head Matches</h2>
                                <p>Total Match : {prediction.team1count+prediction.team2count}</p>
                                <p>{team1} wins : {prediction.team1count}</p>
                                <p>{team2} wins : {prediction.team2count}</p>
                                {prediction.tiecount ?<p>Tie: {prediction.tiecount}</p>:<></>}</div>:<></>}
                            </div>
                            </div>
                    </div> 
                </div>:<></>}
            
            </div>
    )
}

export default Prediction;
import { useEffect,useState} from "react";
import './App.css';
import {getmatchlist,getSeason, getTeam,getMatchesCount} from "./interaction";
function ListMatches(props){
    
    const limit=20;
    const token=localStorage.getItem('auth_token')
    const [match_list,setList]=useState([]);
    const [count,setCount]=useState(0);
    const [loading,setLoading]=useState(0);
    const [page,setPage]=useState(1);
    const [season,setSeason]=useState([]);
    const [team,setTeam]=useState([]);
    const [end,setEnd]=useState(Math.ceil(props.count/limit));
    const [fseason,setFseason]=useState(null);
    const [fteam,setFteam]=useState(null);

    const matchesCount=(fteam,fseason)=>{  
        getMatchesCount(fteam,fseason).then((data)=>{
           const {count}=data;
            setCount(count);
            let last=Math.ceil(count/limit)
            setEnd(Math.ceil(count/limit))
            matchlist(1,last,fseason,fteam);
        }).catch((error)=>{
            console.log(error);
        })
    }

    const seasonlists=()=>{
     getSeason().then((data)=>{
         const {season}=data;
         setSeason(season);
     }).catch((error)=>{
         console.log(error);
     })
     }

    const teamlists=()=>{
     getTeam().then((data)=>{
         const {team}=data;
         console.log(data);
         setTeam(team);
     }).catch((error)=>{
         console.log(error);
     })
    }

    const matchlist=(_page,last,fseason,fteam)=>{
        getmatchlist(token,_page,limit,fseason,fteam).then((data)=>{
            const {list}=data;
            setList(list);
            setLoading(1);
        }).catch((error)=>{
            console.log(error);
        })
        if(_page<=1){
            document.getElementById('prev').disabled=true;
        }else{
            document.getElementById('prev').disabled=false;
        }
        if(_page>=last){
            document.getElementById('next').disabled=true;
        }else{
            document.getElementById('next').disabled=false;
        }
    }

    useEffect(() => {
        if(!loading){
            teamlists();
            seasonlists();
            matchlist(page,end,fseason,fteam)
        }
      },[loading,page]);

    const previous=()=>{
        let newpage=page-1;
        setPage(newpage);
        matchlist(newpage,end,fseason,fteam);
    }
    const next=()=>{
        let newpage=page+1;
        setPage(newpage);
        matchlist(newpage,end,fseason,fteam);
    }

    const getdetail=(id)=>{
    props.history.push(`/matches/`+id);
    }

    const viewSeason=()=>{
        var x = document.getElementById("season").value;
        setFseason(x);
        if(x==-1){
            setFseason(null);
            x=null;
        }
        matchesCount(fteam,x)
        
    }
   
    const viewTeam=()=>{
        var x = document.getElementById("team").value;
        setFteam(x);
        if(x==-1){
            setFteam(null);
            x=null;
        }
        matchesCount(x,fseason)
    }
   
    return(
        <div className="container">
            <div className="row p-2">
                <div className="offset-4 col-4">
                    <h3 style={{textAlign:"center"}}>Matches</h3>
                </div>
                <div className="col-2">
                    <select className="custom-select custom-select-md mb-2" id="season" onChange={viewSeason}>
                        <option value={-1} >select season</option>
                        {season.map((elem,index)=>{
                            return(
                                <option key={index} value={elem}>{elem}</option>
                            )
                        })}
                    </select>
                </div>
                <div className="col-2">
                    <select className="custom-select custom-select-md mb-2" id="team" onChange={viewTeam}>
                    <option value={-1} >select Team</option>
                        {team.map((elem,index)=>{
                            return(
                                <option key={index} value={elem}>{elem}</option>
                            )
                        })}
                    </select>
                </div>
            </div>
            <div className="row">  
            <div className="col-12">
                
                {loading ?<div>{match_list.map((elem,index)=>{
                    return(
                        <>
                        <div className="p-1 onmouse" key={index} onClick={()=>getdetail(elem._id)}>
                            <h4>{elem.team1} Vs {elem.team2}</h4>
                            <p>{elem.season}, {elem.date} at {elem.venue}, {elem.city}</p>
                        </div>
                         <hr/>
                         </>
                    )
                })} 
               </div> : <p>Loading</p>}
               </div>
               </div>
               <div style={{textAlign:"center"}}>
               <button type="button" id="prev" className="btn btn-link" onClick={previous}>prev</button>
               <button type="button" id="next" className="btn btn-link" onClick={next}>next</button>
               </div>
        </div>    
    )
}

export default ListMatches;
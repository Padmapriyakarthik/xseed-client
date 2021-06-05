import { useEffect,useState} from "react";
import './App.css';

import {getmatchlist,getSeason, getTeam,getMatchesCount, getUserFavourite, setUserFavourite, removeUserFavourite} from "./interaction";

function ListMatches(props){
    
    const limit=20;
    const token=localStorage.getItem('auth_token')
    const [user,setUser]=useState({});
    const [match_list,setList]=useState([]);
    const [count,setCount]=useState(0);
    const [loading,setLoading]=useState(0);
    const [page,setPage]=useState(1);
    const [season,setSeason]=useState([]);
    const [team,setTeam]=useState([]);
    const [end,setEnd]=useState(Math.ceil(props.count/limit));
    const [fseason,setFseason]=useState(null);
    const [fteam,setFteam]=useState(null);

    //total number documents available after applying filter
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

    // sesaon list for filter
    const seasonlists=()=>{
     getSeason().then((data)=>{
         const {season}=data;
         setSeason(season);
     }).catch((error)=>{
         console.log(error);
     })
     }

     // team list for filter
    const teamlists=()=>{
     getTeam().then((data)=>{
         const {team}=data;
         setTeam(team);
     }).catch((error)=>{
         console.log(error);
     })
    }

    // to retrive matchlist works with or without filter along with pagination
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

    //favourite
    const [favouriteTeams,setFavouriteTeams]=useState({"Delhi Capitals":{"color":"red"},
            "Chennai Super Kings":{"color":"yellow"}, "Mumbai Indains":{"color":"blue"},"Royal Challengers Banglore":{"color":"blue"},
        "Rajasthan Royals":{"color":"blue"},"Punjab Kings":{"color":"blue"},"Kolkata Knight Rider":{"color":"blue"},"Sunrises Hyderabad":{"color":"blue"}});
    const [favouriteteam,setFavouriteTeam]=useState("");
    const removeprevious=()=>{
        let list=document.getElementById('bg').classList
        Object.keys(favouriteTeams).map((elem)=>{
            for(let i=0;i<list.length;i++){
                if((elem.split(' ')[0])==list[i]){
                    document.getElementById('bg').classList.remove(list[i]) ;
                }
            }
         }) 
    }
    const setFavourite=()=>{
            var x = document.getElementById("favourite").value;
            if(x!=-1){
                console.log(x.split(' ')[0])
                setFavouriteTeam(x);
                setuserfavourite(x);
                
                removeprevious();    
                 document.getElementById('bg').classList.add(x.split(' ')[0]);
        }else{
            removeprevious();
            removeuserfavourite();
        }
    }

    const removeuserfavourite=()=>{
        console.log(token);
       removeUserFavourite(token).then((data)=>{
           console.log(data);
       }).catch((error)=>{
           console.log(error);
       })
    }

    const getuserfavourite=()=>{
        getUserFavourite(token).then((data)=>{
                let {user}=data;
                let {favouriteteam}=user;
                setUser(user);
                if(user.favouriteteam){
                    document.getElementById('bg').classList.add(favouriteteam.split(' ')[0]);
                    document.getElementById("favourite").value=favouriteteam;
                }
        }).catch((error)=>{
            console.log(error);
        })
    }

    const setuserfavourite=(favouriteteam)=>{
        setUserFavourite(token,favouriteteam).then((data)=>{
            console.log(data);
        }).catch((error)=>{
            console.log(error);
        })
    }
    
    useEffect(() => {
        if(!loading){
            teamlists();
            seasonlists();
            getuserfavourite();
            matchlist(page,end,fseason,fteam)
        }
      },[loading,page]);

      // next and previous page
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

    // to view detail of particular match
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
        <div className="container ">
            <div className="row p-2">
                <div className="col-4">
                <select className="custom-select custom-select-md" id="favourite" onChange={setFavourite} >
                            <option value={-1} >Choose Favourite</option>
                            {Object.keys(favouriteTeams).map((elem,index)=>{
                                return(
                                    <option key={index} value={elem}>{elem}</option>
                                )
                            })
                        }
                        </select>
                </div>
                <div className="col-4">
                    <h3 style={{textAlign:"center"}}>Matches</h3>
                </div>
                <div className="col-2">
                    <select className="custom-select custom-select-md mb-2" id="season" onChange={viewSeason}>
                        <option value={-1} >Select Season</option>
                        {season.map((elem,index)=>{
                            return(
                                <option key={index} value={elem}>{elem}</option>
                            )
                        })}
                    </select>
                </div>
                <div className="col-2">
                    <select className="custom-select custom-select-md mb-2" id="team" onChange={viewTeam}>
                    <option value={-1} >Select Team</option>
                        {team.map((elem,index)=>{
                            return(
                                <option key={index} value={elem}>{elem}</option>
                            )
                        })}
                    </select>
                </div>
            </div>
            <div className="row" >  
            <div className="col-6">
                
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
               <div id="bg" className="col-6">
                   
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
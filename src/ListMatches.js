import { useEffect,useState} from "react";
import './App.css';
import {getmatchlist} from "./interaction";
function ListMatches(props){
    
    const token=localStorage.getItem('auth_token')
    const [match_list,setList]=useState([]);
    const [loading,setLoading]=useState(0);
    const [page,setPage]=useState(1);
    const limit=5;
    const end=Math.ceil(props.count/limit);
 

    const matchlist=(_page)=>{
        getmatchlist(token,_page,limit).then((data)=>{
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
        if(_page>=end){
            document.getElementById('next').disabled=true;
        }else{
            document.getElementById('next').disabled=false;
        }
    }

    const previous=()=>{
        let newpage=page-1;
        setPage(newpage);
        matchlist(newpage);
    }
  const next=()=>{
        let newpage=page+1;
        setPage(newpage);
        matchlist(newpage);
    }
const getdetail=(id)=>{
    props.history.push(`/matches/`+id);
}
    useEffect(() => {
        if(!loading){
            matchlist(page)
        }
      },[loading,page]);

    return(
        <div className="container">
            <h3 style={{textAlign:"center"}}>Matches</h3>
            <div className="row">  
            <div className="col-12">    
                {loading ? <div>{match_list.map((elem,index)=>{
                    return(
                        <div className="p-1" key={index} onClick={()=>getdetail(elem._id)}>
                            <h4>{elem.team1} Vs {elem.team2}</h4>
                            <p>{elem.season}, {elem.date} at {elem.venue}, {elem.city}</p>
                            <hr/>
                        </div>

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
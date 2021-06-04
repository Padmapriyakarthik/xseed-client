
import logo from "./Images/IPL-Logo-w.png";
function TopBar(props){

   
    const logout=()=>{
        console.log(props);
        props.props.history.push(`/logout`)
    }
    return(
        <div>
            <nav className="navbar navbar-inverse navbar-dark bg-dark">
                <div className="container-fluid">
                    <div className="navbar-header">
                    <li className="navbar-brand" ><img src={logo} alt="IPL" width="50" height="30"/></li>
                    </div>

                    <ul className="nav navbar-nav navbar-right">
                    <button type="button" style={{color:"white"}} className="btn btn-link" onClick={logout}>Logout</button>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default TopBar;
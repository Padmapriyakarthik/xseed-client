import './App.css';
function RedirectLogin({history}){

    const signin=()=>{
        history.push("/signin");
    }
    return(
        <div className="container p-5">
            <div className="row p-5">
                <div className="offset-4 col-8 p-5">
                    <div>Account has been activated. Please signin to continue</div>
                    <button type="button" className="btn btn-primary mt-4" id="redirect" onClick={signin}>Signin</button>
                </div>
            </div>
        </div>
    )
}

export default RedirectLogin;
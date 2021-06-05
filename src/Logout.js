
function Logout({history}){
    
        console.log(history);
        localStorage.removeItem('auth_token');
        history.go('/signup');
}

export default Logout;
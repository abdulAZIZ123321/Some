


const Navbar = ({setToken}) => {

    const handleExitApp = () => {
        window.localStorage.removeItem('sessionToken');
        setToken(false)
    }


    return (
                
                    <nav className="navbar navbar-light bg-light">
                           <div className="container">
                           
                                    <div className="d-flex justify-content-between align-items-center" style={{width: '100%'}}>
                                        <span className="navbar-brand mb-0 h1">Navbar</span>


                                        <button className="btn btn-danger" onClick={handleExitApp}>Exit</button>
                                    </div>
                         
                           </div>
                    </nav>
               
    )
}


export default Navbar;
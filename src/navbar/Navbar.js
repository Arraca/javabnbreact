import React from "react";
import 'bootstrap/dist/css/bootstrap.css';//importare bootstrap

class Navbar extends React.Component
{
    constructor(props)
    {
        super(props);
       
    }

    notifyShowRooms = () =>
    {
        this.props.ShowRooms();
    }

    notifyShowHome = () =>
    {
        this.props.ShowHomepage();
    }

    notifyShowLoginForm = () =>
    {
        this.props.ShowLoginForm();
    }

    notifyEmployeeBookings = () =>
    {
        this.props.EmployeeBookings();
    }

    notifyShowBookings = () =>
    {
        this.props.ShowBookings();
    }

    notifyLogout= ()=>
    {
        this.props.Logout();
    }

    render()
    {
        return(
            <div>
                <nav className="navbar bg-dark navbar-expand-lg bg-body-tertiary" data-bs-theme="dark" style={{fontSize:20}}>
                    <div class="container-fluid">
                        <a class="navbar-brand" href="#" onClick={this.notifyShowHome}><img src="/images/logo.png" style={{borderRadius:"50%", width:60}}></img></a>
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                            <button class="nav-link active" aria-current="page" onClick={this.notifyShowHome}>Home</button>
                            </li>
                            <li class="nav-item">
                            <button class="nav-link" onClick={this.notifyShowRooms}>Rooms</button>
                            </li>
                            
                            
                            {
                            (this.props.loginDone && !this.props.adminView)?
                            <li class="nav-item">
                            <button class="nav-link" onClick={this.notifyShowBookings}>I tuoi soggiorni</button> 
                            </li> 
                            :
                        
                            (this.props.loginDone && this.props.adminView)?
                            <li class="nav-item">
                            <button class="nav-link" onClick={this.notifyEmployeeBookings}>Lista di prenotazioni</button> 
                            </li> 
                            :
                            ""    
                            }
                            
                            


                        </ul>
                        {
                                this.props.loginDone===false?
                                <div class="d-flex">
                                <button class="btn btn-success" onClick={this.notifyShowLoginForm} style={{fontSize:20}}>Login <i class="bi bi-box-arrow-right"></i></button>
                                </div>
                                :
                                <div class="d-flex">
                                <button className="btn btn-danger" onClick={this.notifyLogout} style={{fontSize:20}}>Logout <i class="bi bi-box-arrow-left"></i></button>
                                </div>
                        }

                        </div>
                    
                    </nav>
            </div>
        )
    }
}
export default Navbar;
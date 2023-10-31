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

    render()
    {
        return(
            <div>
                <nav className="navbar bg-dark navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
                    <div class="container-fluid">
                        <a class="navbar-brand" href="#">JavaB&B</a>
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                            <button class="nav-link active" aria-current="page" onClick={this.notifyShowHome}>Home</button>
                            </li>
                            <li class="nav-item">
                            <button class="nav-link" onClick={this.notifyShowRooms}>Camere</button>
                            </li>
                            <li class="nav-item">
                            <button class="nav-link" onClick={this.notifyShowLoginForm}>Login</button>
                            </li>

                        </ul>
                        <form class="d-flex" role="search">
                            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                            <button class="btn btn-outline-success" type="submit">Search</button>
                        </form>
                        </div>
                    
                    </nav>
            </div>
        )
    }
}
export default Navbar;
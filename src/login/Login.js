import React from "react";
import 'bootstrap/dist/css/bootstrap.css';//importare bootstrap

class Login extends React.Component
{
    constructor(props)
    {
        super(props);
       this.state = {showRegister : false, tempCredentialsLogin : {}, tempCredentialsRegister : {}}
       
    }
    
    handleShowRegister = (e) =>
    {
        document.getElementById("formlogin").reset();
        this.setState({tempCredentialsLogin : {}, tempCredentialsRegister : {}})
        this.setState({showRegister:true});
    }

    handleShowLogin = (e) =>
    {
        document.getElementById("formregister").reset();
        this.setState({tempCredentialsLogin : {}, tempCredentialsRegister : {}})
        this.setState({showRegister:false});
    }

    handleChangeLogin = (e) =>
    {
        let tempCredentials = this.state.tempCredentialsLogin;
        tempCredentials[e.target.name] = e.target.value;
        console.log(tempCredentials);
        this.setState({tempCredentialsLogin: tempCredentials});
    }

    handleChangeRegister = (e) =>
    {
        let tempCredentials = this.state.tempCredentialsRegister;
        tempCredentials[e.target.name] = e.target.value;
        console.log(tempCredentials);

        this.setState({tempCredentialsRegister: tempCredentials});
    }

    handleLogin = (e) =>
    {
        e.preventDefault();
        console.log(this.state.tempCredentialsLogin)
    }

    handleRegister = (e) =>
    {
        e.preventDefault();
        console.log(this.state.tempCredentialsRegister)
    }





    render()
    {
        if(!this.state.showRegister)
        return(
            <div className="container">
                <form id="formlogin" onSubmit={this.handleLogin}>
                    <div class="mb-3">
                        <label for="exampleInputEmail" class="form-label">Email address</label>
                        <input name="username" type="email" class="form-control" id="exampleInputEmail" aria-describedby="emailHelp" required onChange={this.handleChangeLogin}/>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Password</label>
                        <input name="password" type="password" class="form-control" id="exampleInputPassword1" required onChange={this.handleChangeLogin}/>
                    </div>
                    <br/>
                    <button className="btn btn-light" onClick={this.handleShowRegister}>Need a new account?</button>
                    <br/><br/>
                    <button type="submit" class="btn btn-success">Sign In</button>
                </form>
            </div>
        )

        return(
            <div className="container">
                <form id="formregister" onSubmit={this.handleRegister}>
                    <div class="mb-3">
                        <label for="exampleInputEmail" class="form-label">Email address</label>
                        <input name="username" type="email" class="form-control" id="exampleInputEmail" aria-describedby="emailHelp" required onChange={this.handleChangeRegister}/>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Password</label>
                        <input name="password" type="password" class="form-control" id="exampleInputPassword1" required onChange={this.handleChangeRegister}/>
                    </div>
                    <div class="mb-3">
                        <label for="nameInput" class="form-label">Name</label>
                        <input name="name" type="text" class="form-control" id="nameInput" required onChange={this.handleChangeRegister}/>
                    </div>
                    <div class="mb-3">
                        <label for="surnameInput" class="form-label">Surname</label>
                        <input name="surname" type="text" class="form-control" id="surnameInput" required onChange={this.handleChangeRegister}/>
                    </div>
                    <div class="mb-3">
                        <label for="dobInput" class="form-label">Date of birth</label>
                        <input name="dob" type="date" class="form-control" id="dobInput" required onChange={this.handleChangeRegister}/>
                    </div>
                    <br/>
                    <button className="btn btn-light" onClick={this.handleShowLogin}>Already have an account?</button>
                    <br/><br/>
                    <button type="submit" class="btn btn-success">Sign Up</button>
                </form>
            </div>
        )


    }
}
export default Login;
import React from "react";
import 'bootstrap/dist/css/bootstrap.css';//importare bootstrap
import $ from 'jquery';
class Login extends React.Component
{
    constructor(props)
    {
        super(props);
        let todayTimestamp = Date.now();
        // Converti il timestamp in una data nel formato "YYYY-MM-DD"
        let today = new Date(todayTimestamp).toISOString().split('T')[0];

       this.state = {showRegister : false, maxDate : today, tempCredentialsLogin : {}, tempCredentialsRegister : {}, showLoginError:false, emailError:false, showRegisterError:false}
       
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
        this.setState({tempCredentialsLogin: tempCredentials, showLoginError:false});
    }

    handleChangeRegister = (e) =>
    {
        let tempCredentials = this.state.tempCredentialsRegister;
        tempCredentials[e.target.name] = e.target.value;
        console.log(tempCredentials);

        this.setState({tempCredentialsRegister: tempCredentials, showRegisterError:false});
    }

    handleLogin = (e) =>
    {
        e.preventDefault();
        var settings = {
            "url": "http://localhost:8080/authenticate",
            "method": "POST",
            "timeout": 0,
            "headers": {
              "Content-Type": "application/json"
            },
            "data": JSON.stringify(this.state.tempCredentialsLogin),
          };
          
          $.ajax(settings).done((response) => {

            localStorage.setItem("token",response.token);
            localStorage.setItem("username",this.state.tempCredentialsLogin.username);
            this.props.Login(this.state.tempCredentialsLogin.username);
            
          }).fail(()=>
          {this.setState({showLoginError:true});
          $.ajaxSetup
          ({
            headers:{"Authorization":""}
          }); });
        
    }

     ValidateEmail=(e)=>
    {
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(e.target.value.match(mailformat))
        {
            this.setState({emailError:false});
        }
        else
        {
            this.setState({emailError:true});
        }
    }


    handleRegister = (e) =>
    {
        e.preventDefault();
        if(this.state.emailError)
            alert("L'email non è nel formato corretto! rispetta il formato indicato.");
        else
        {
            this.setState({showRegisterError : false})
            console.log(this.state.tempCredentialsRegister);
            var settings = {
                "url": "http://localhost:8080/register",
                "method": "POST",
                "timeout": 0,
                "headers": {
                  "Content-Type": "application/json"
                },
                "data": JSON.stringify(this.state.tempCredentialsRegister),
              };
              
              $.ajax(settings).done((response) => {
    
                localStorage.setItem("token",response.token);
                localStorage.setItem("username",this.state.tempCredentialsRegister.username);
                this.props.Register(this.state.tempCredentialsRegister);
                
              }).fail(()=>
              {this.setState({showRegisterError:true});
              $.ajaxSetup
              ({
                headers:{"Authorization":""}
              }); });
    
        }

    }





    render()
    {
        if(!this.state.showRegister)
        return(
            <div className="container">
                <h2 style={{textAlign:"center"}}>Sign In</h2>
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
                    {
                    this.state.showLoginError? 
                    <div class="alert alert-danger" role="alert">
                    Error in logging in: Account not yet registered or wrong password.
                    </div>
                    :
                    ""
                    }
                    <br/>
                    <button className="btn btn-light" onClick={this.handleShowRegister}>Need a new account?</button>
                    <br/><br/>
                    <button type="submit" class="btn btn-success">Sign In</button>
                </form>
            </div>
        )

        return(
            <div className="container">
                <h2 style={{textAlign:"center"}}>Sign Up</h2>
                <form id="formregister" onSubmit={this.handleRegister}>
                    <div class="mb-3">
                        <label for="exampleInputEmail" class="form-label">Email address</label>
                        <input name="username" type="email" class="form-control" id="exampleInputEmail" aria-describedby="emailHelp" required onChange={this.handleChangeRegister} onBlur={this.ValidateEmail}/>
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
                        <input name="dob" type="date" max={this.state.maxDate} class="form-control" id="dobInput" required onChange={this.handleChangeRegister}/>
                    </div>
                    <br/>
                    {
                        this.state.emailError?
                        <div class="alert alert-danger" role="alert">
                        Error: Email is not in the correct format (example@domain.ccc)!
                        </div>
                        :
                       ""        
                    }
                    <br/>
                    {
                    this.state.showRegisterError? 
                    <div class="alert alert-danger" role="alert">
                    Error during registration: email already registered!
                    </div>
                    :
                    ""
                    }


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
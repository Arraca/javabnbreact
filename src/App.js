import React from "react";
import 'bootstrap/dist/css/bootstrap.css';//importare bootstrap
import Navbar from "./navbar/Navbar";
import AllRooms from "./rooms/AllRooms";
import $ from "jquery";
import Login from "./login/Login";
class App extends React.Component
{
  componentDidMount()
  {
    var settings = {
      "url": "http://localhost:8080/rooms/nolist",
      "method": "GET",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/json"
      }
    };
    
    $.ajax(settings).done((response) =>
    {
      this.setState({allRooms:response, loaded:true, showLoginForm:false});
    });
  }

    constructor(props)
    {
        super(props);
       this.state={loaded : false,showRooms:false};
    }

    ShowRooms = () =>
    {
      this.setState({showRooms:true, showLoginForm:false})
    }

    ShowHomepage = () =>
    {
      this.setState({showRooms:false , showLoginForm:false})
    }

    ShowLoginForm = () =>
    {
      this.setState({showLoginForm : true, showRooms:false })
    }
 
    render()
    {
      if(!this.state.loaded)
      return(
          <div>
          </div>
      )

      if(this.state.showLoginForm)
      return(
        <section className="layout">
        <div className="header">
          <Navbar ShowRooms={this.ShowRooms} ShowHomepage={this.ShowHomepage} ShowLoginForm = {this.ShowLoginForm}/>
        </div>
        <div className="main">
          <Login />
        </div>
        <div className="footer">
          TODO contatti e info della 
        </div>
      </section>

        )

      if(!this.state.showRooms)
        return(
          <section className="layout">
          <div className="header">
            <Navbar ShowRooms={this.ShowRooms} ShowHomepage={this.ShowHomepage} ShowLoginForm = {this.ShowLoginForm}/>
          </div>
          <div className="main">
            LA NOSTRA HOMPAGE
          </div>
          <div className="footer">
            TODO contatti e info della 
          </div>
        </section>

          )
      
        return(
                <section className="layout">
                  <div className="header">
                    <Navbar ShowRooms={this.ShowRooms} ShowHomepage={this.ShowHomepage} ShowLoginForm = {this.ShowLoginForm}/>
                  </div>
                  <div className="main">
                    <AllRooms rooms={this.state.allRooms}/>
                  </div>
                  <div className="footer">
                    TODO contatti e info della 
                  </div>
                </section>
        )
    }
}
export default App;
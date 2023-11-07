import React from "react";
import 'bootstrap/dist/css/bootstrap.css';//importare bootstrap
import Navbar from "./navbar/Navbar";
import AllRooms from "./rooms/AllRooms";
import $ from "jquery";
import Login from "./login/Login";
import Booking from "./booking/Booking";
import 'bootstrap-icons/font/bootstrap-icons.css';
import FormRoom from "./formroom/FormRoom";
import RoomDetails from "./rooms/RoomDetails";
import ReserveRoom from "./rooms/ReserveRoom";
import Footer from "./footer/Footer";
import Homepage from "./homepage/Homepage";
import HomeCarousel from "./homepage/HomeCarousel";

class App extends React.Component
{
  componentDidMount()
  {
    if(localStorage.getItem('token'))
    $.ajaxSetup({
        headers:{"Authorization":"Bearer "+localStorage.getItem('token')}
    }); 


    var settings = {
      "url": "http://localhost:8080/rooms/nolist",
      "method": "GET",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/json"
      }
    };

    var settingsBookings = {
      "url": "/roombookings",
      "method": "GET",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/json"
      }
    }
    
    $.ajax(settings).done((response) =>
    {
      this.setState({allRooms:response, showLoginForm:false});
    }).done($.ajax(settingsBookings).done((response) => 
    {
      this.setState({allBookings : response, loaded:true})
    }));
  }

    constructor(props)
    {
        super(props);
       this.state=
       {
        loaded : false,
        showRooms:false,
        loginDone:false,
        showBookings : false,
        adminView : false,
        showEmployeeBookings : false,
        showRoomForm : false,
        showRoomDetails : false,
        showReserveRoom : false
      };
    }
    //---------------------------------------------------------SHOWING METHODS-------------------------------------------------------------------------------------
    ShowHomepage = () =>
    {
      this.setState({showRooms:false , showLoginForm:false , showBookings : false, showRoomForm:false, showRoomDetails : false, showReserveRoom : false, showEmployeeBookings : false})
    }

    ShowLoginForm = () =>
    {
      this.setState({showLoginForm : true, showRooms:false , showBookings : false, showRoomForm:false, showRoomDetails : false, showReserveRoom : false, showEmployeeBookings : false})
    }

    ShowBookings= () =>
    {
      this.setState({showLoginForm : false, showRooms:false, showBookings : true, showRoomForm:false, showRoomDetails : false, showReserveRoom : false, showEmployeeBookings : false})
    }

    ShowRooms = () =>
    {
      this.setState({showRooms:true, showLoginForm:false , showBookings : false, showRoomForm:false, showRoomDetails : false, showReserveRoom : false, showEmployeeBookings : false})
    }

    ShowRoomForm = (roomToUpdate) =>
    {
      if(!roomToUpdate)
      {
        this.setState({showRoomForm:true, updatingRoom : false,showRooms:false, showLoginForm:false , showBookings : false, showRoomDetails : false, showReserveRoom : false, showEmployeeBookings : false})
      }
      else
      {
        this.setState({showRoomForm:true, updatingRoom : true, roomToUpdate : roomToUpdate,showRooms:false, showLoginForm:false , showBookings : false , showRoomDetails : false, showReserveRoom : false, showEmployeeBookings : false})
      }
    }

    ShowRoomDetails = (roomDet) =>
    {
      this.setState({showRoomDetails : true,showRoomForm:false, updatingRoom : false, roomDet : roomDet,showRooms:false, showLoginForm:false , showBookings : false, showReserveRoom : false, showEmployeeBookings : false})

    }

    ShowReserveRoom = (room) =>
    {
      this.setState({showReserveRoom : true, roomToReserve: room,showRoomForm:false, updatingRoom : false,showRooms:false, showLoginForm:false , showBookings : false, showRoomDetails : false, showEmployeeBookings : false})
    }
    //-----------------------------------------------------------------------SAVING ROOM-----------------------------------------------------------
    SaveRoom = (features) =>
    {
      var settings = {
        "url": "/rooms",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Authorization": "Bearer "+ localStorage.getItem("token"),
          "Content-Type": "application/json"
        },
        "data": JSON.stringify(features),
      };
      
      $.ajax(settings).done((response) => {
        let rooms = this.state.allRooms;
        rooms.push(response);
        this.setState({allRooms : rooms, showRooms:true , showLoginForm:false , showBookings : false, showRoomForm:false});
      }).fail(()=>alert("Errore"));
    }
    //--------------------------------------------------------------------UPDATING BOOKINGS-----------------------------------------------------------
    UpdateRoom = (roomToUpdate, features) =>
    {
      var settings = {
        "url": "/rooms/"+roomToUpdate.id,
        "method": "PUT",
        "timeout": 0,
        "headers": {
          "Authorization": "Bearer "+ localStorage.getItem("token"),
          "Content-Type": "application/json"
        },
        "data": JSON.stringify(features),
      };
      
      $.ajax(settings).done((response) => {
        let rooms = this.state.allRooms;
        let index = rooms.indexOf(roomToUpdate);
        rooms[index] = response;
        this.setState({allRooms : rooms, showRooms:true , showLoginForm:false , showBookings : false, showRoomForm:false});

      }).fail(()=>alert("Errore"));
    }

    ApproveOrRejectBooking = (boolean, booking) =>
    {
      var settings = {
        "url": "/approve/"+boolean+"/roombookings/"+booking.id,
        "method": "PUT",
        "timeout": 0,
        "headers": {
          "Authorization": "Bearer "+ localStorage.getItem("token"),
          "Content-Type": "application/json"
        }
      };
      
      $.ajax(settings).done((response) => {
        let newAllBookings = this.state.allBookings;
        let index = newAllBookings.indexOf(booking);
        newAllBookings[index] = response;
        this.setState({allBookings : newAllBookings, showRooms:false , showLoginForm:false , showBookings : true, showRoomForm:false});
      });
    }
    //----------------------------------------------------------------DELETE ROOM------------------------------------------------
    DeleteRoom = (room) =>
    {
      var settings = {
        "url": "/rooms/"+room.id,
        "method": "DELETE",
        "timeout": 0,
        "headers": {
          "Authorization": "Bearer "+ localStorage.getItem("token"),
          "Content-Type": "application/json"
        }
      };
      
      $.ajax(settings).done((response) => {
        // console.log(response);
        let rooms = this.state.allRooms;
        let index = rooms.indexOf(room);
        rooms.splice(index,1);
        this.setState({allRooms : rooms, showRooms:true , showLoginForm:false , showBookings : false, showRoomForm:false});

      });
    }
    //------------------------------------------------------------DELETE BOOKING CUSTOMER------------------------------------------
    DeleteBooking = (booking) =>
    {
      var settings = {
        "url": "/roombookings/"+booking.id,
        "method": "DELETE",
        "timeout": 0,
        "headers": {
          "Authorization": "Bearer "+ localStorage.getItem("token"),
          "Content-Type": "application/json"
        }
      };
      
      $.ajax(settings).done((response) => {
        if(this.state.customer)
        {
          //RIMUOVO DALL'ELENCO GLOBALE
          let newAllBookings = this.state.allBookings;
          let indexAllBookings = newAllBookings.indexOf(booking);
          newAllBookings.splice(indexAllBookings,1);
          //RIMUOVO DALL'ELENCO DI CUSTOMER
          let newCustomer = this.state.customer;
          let newBookings = newCustomer.bookings;
          let index = newBookings.indexOf(booking);
          newBookings.splice(index,1);
          newCustomer.bookings = newBookings
          //AGGIORNO LO STATO
          this.setState({customer : newCustomer, allBookings : newAllBookings, showRooms:false , showLoginForm:false, showBookings : true, showRoomForm:false});
  
        }
        else
        {
          //RIMUOVO DALL'ELENCO GLOBALE
          let newAllBookings = this.state.allBookings;
          let indexAllBookings = newAllBookings.indexOf(booking);
          newAllBookings.splice(indexAllBookings,1);
          this.setState({allBookings : newAllBookings, showRooms:false , showLoginForm:false, showBookings : true, showRoomForm:false});

        }

      });
    }

    //------------------------------------------------------------READ ALL BOOKINGS-------------------------------------------------
    EmployeeBookings = () =>
    {
      // var settings = {
      //   "url": "/roombookings",
      //   "method": "GET",
      //   "timeout": 0,
      //   "headers": {
      //     "Authorization": "Bearer "+ localStorage.getItem("token"),
      //     "Content-Type": "application/json"
      //   }
      // };
      
      // $.ajax(settings).done((response) => {
      //   this.setState({allBookings : response, showEmployeeBookings : true})
      //   console.log(this.state.allBookings)
      // });

      this.setState({showEmployeeBookings : true})


    }

    //-----------------------------------------------------------LOGIN, LOGOUT, & REGISTER--------------------------------------------
    Logout = () =>
    {
      localStorage.setItem("token","");
      localStorage.setItem("username","");
      $.ajaxSetup({headers:{"Authorization":""}}); 
      this.setState({customer:undefined, employee:undefined, loginDone : false, showBookings : false, adminView : false, showEmployeeBookings : false, showRooms:false ,showReserveRoom : false});
    }

    Login = (username) =>
    {
      console.log(username);
      var settings = {
        "url": "/customers/"+username+"/username",
        "method": "GET",
        "timeout": 0,
        "headers": {
          "Authorization": "Bearer "+ localStorage.getItem("token"),
          "Content-Type": "application/json"
        }
      };

      var settingsEmployee = {
        "url": "/employees/"+username+"/username",
        "method": "GET",
        "timeout": 0,
        "headers": {
          "Authorization": "Bearer "+ localStorage.getItem("token"),
          "Content-Type": "application/json"
        }
      };

      
      $.ajax(settings).done((response) => {
        this.setState({customer : response, loginDone : true,showRooms:false , showLoginForm:false, adminView : false});
      })
      .fail(() =>
        $.ajax(settingsEmployee).done((response) => {
        this.setState({employee : response, loginDone : true,showRooms:false , showLoginForm:false, adminView : true});
      }))
      .fail(()=> console.log("Errore!"));

    }
    Register = (credentials) =>
    {
      console.log(credentials);
      var settings = {
        "url": "/customers",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Authorization": "Bearer "+ localStorage.getItem("token"),
          "Content-Type": "application/json"
        },
        "data": JSON.stringify(credentials),
      };
            
      $.ajax(settings).done((response) => {
        this.setState({customer : response, loginDone : true,showRooms:false , showLoginForm:false});
      }).fail(()=> console.log("Errore!"));


    }

    //------------------------------------------------------------RESERVE A ROOM--------------------------------------------------------------
    ReserveRoom = (date) =>
    {

      var settings = {
        "url": "/roombookings/"+this.state.roomToReserve.id+"/room/"+this.state.customer.id+"/customer",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Authorization": "Bearer "+ localStorage.getItem("token"),
          "Content-Type": "application/json"
        },
        "data": JSON.stringify(date),
      };
      
      $.ajax(settings).done((response) => {
        console.log(response);
        let reservingCustomer = this.state.customer;
        reservingCustomer.bookings.push(response);
        let newAllBookings = this.state.allBookings;
        newAllBookings.push(response);
        this.setState({customer : reservingCustomer, allBookings : newAllBookings, showLoginForm : false, showRooms:false, showBookings : true, showRoomForm:false, showRoomDetails : false})
      }).fail(()=> alert("Errore"));
    }

    //-----------------------------------------------------------------------------------------------------------------------------------------------------
    //ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo RENDER oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
    //-----------------------------------------------------------------------------------------------------------------------------------------------------

    render()
    {
      console.log(this.state)
      //------------------------------------------------------------NON HA FATTO IL COMPONENT DID MOUNT---------------------------------------------------------------------------
      if(!this.state.loaded)
      return(
          <div>
          </div>
      )
      //---------------------------------------------------------------------------VISTA PRENOTAZIONI IMPIEGATO--------------------------------------------------------------------
      if(this.state.showEmployeeBookings && this.state.loginDone)
      return(
          <section className="layout">
            <div className="header">
              <Navbar ShowRooms={this.ShowRooms} ShowHomepage={this.ShowHomepage} ShowLoginForm = {this.ShowLoginForm} loginDone = {this.state.loginDone} Logout={this.Logout} ShowBookings={this.ShowBookings} adminView={this.state.adminView} EmployeeBookings = {this.EmployeeBookings}/>
            </div>
            <div className="main">
              <table className="table table-dark table-striped">
              <thead>                
                <tr>
                  <th scope="col">Room</th>
                  <th scope="col">Check-in</th>
                  <th scope="col">Check-out</th>
                  <th scope="col">Customer</th>
                  <th scope="col">Total price</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                  {this.state.allBookings.map(booking => <Booking booking={booking} DeleteBooking={this.DeleteBooking} showEmployeeBookings={this.state.showEmployeeBookings} employee = {this.state.employee} ApproveOrRejectBooking = {this.ApproveOrRejectBooking}/>)}
              </tbody>
            </table>
            </div>
            <div className="footer">
              <Footer/> 
            </div>
        </section>

        )

      //---------------------------------------------------------------------VISTA PRENOTAZIONI CLIENTE--------------------------------------------------------------------------
      if(this.state.showBookings && this.state.loginDone)
      return(
          <section className="layout">
            <div className="header">
              <Navbar ShowRooms={this.ShowRooms} ShowHomepage={this.ShowHomepage} ShowLoginForm = {this.ShowLoginForm} loginDone = {this.state.loginDone} Logout={this.Logout} ShowBookings={this.ShowBookings} adminView={this.state.adminView} EmployeeBookings = {this.EmployeeBookings}/>
            </div>
            <div className="main">
              <table className="table table-dark table-striped">
              <thead>                
                <tr>
                  <th scope="col">Room</th>
                  <th scope="col">Check-in</th>
                  <th scope="col">Check-out</th>
                  <th scope="col">Notes</th>
                  <th scope="col">Total price</th>
                  <th scope="col">Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                  {this.state.customer.bookings.map(booking => <Booking booking={booking} DeleteBooking={this.DeleteBooking} customer = {this.state.customer}/>)}
              </tbody>
            </table>
            </div>
            <div className="footer">
              <Footer/> 
            </div>
        </section>

        )
      //--------------------------------------------------------MOSTRA LA FORM DI LOGIN--------------------------------------------------------------------------------------
      if(this.state.showLoginForm)
      return(
        <section className="layout">
        <div className="header">
          <Navbar ShowRooms={this.ShowRooms} ShowHomepage={this.ShowHomepage} ShowLoginForm = {this.ShowLoginForm} loginDone = {this.state.loginDone} Logout={this.Logout} ShowBookings={this.ShowBookings} adminView={this.state.adminView} EmployeeBookings = {this.EmployeeBookings}/>
        </div>
        <div className="main">
          <Login Login={this.Login} Register = {this.Register}/>
        </div>
        <div className="footer">
          <Footer/> 
        </div>
      </section>

        )
        //---------------------------------------------------------MOSTRA FORM CAMERA -------------------------------------------------------------------------------------
        if(this.state.showRoomForm)
        return(
          <section className="layout">
          <div className="header">
            <Navbar ShowRooms={this.ShowRooms} ShowHomepage={this.ShowHomepage} ShowLoginForm = {this.ShowLoginForm} loginDone = {this.state.loginDone} Logout={this.Logout} ShowBookings={this.ShowBookings} adminView={this.state.adminView} EmployeeBookings = {this.EmployeeBookings}/>
          </div>
          <div className="main">
            <FormRoom updatingRoom={this.state.updatingRoom} SaveRoom={this.SaveRoom} roomToUpdate = {this.state.roomToUpdate} UpdateRoom={this.UpdateRoom} ShowRooms={this.ShowRooms}/>
          </div>
          <div className="footer">
            <Footer/> 
          </div>
        </section>
          )
        //----------------------------------------------------------MOSTRA LISTA CAMERE---------------------------------------------------------------------------------------
        if(this.state.showRooms)
        return(
                <section className="layout">
                  <div className="header">
                    <Navbar ShowRooms={this.ShowRooms} ShowHomepage={this.ShowHomepage} ShowLoginForm = {this.ShowLoginForm} loginDone = {this.state.loginDone} Logout={this.Logout} ShowBookings={this.ShowBookings} adminView={this.state.adminView} EmployeeBookings = {this.EmployeeBookings}/>
                  </div>
                  <div className="main">
                    <AllRooms rooms={this.state.allRooms} adminView={this.state.adminView} ShowRoomForm={this.ShowRoomForm} DeleteRoom={this.DeleteRoom} ShowRoomDetails = {this.ShowRoomDetails}/>
                  </div>
                  <div className="footer">
                    <Footer/> 
                  </div>
                </section>
        )

        //-------------------------------------------------------MOSTRA DETTAGLI CAMERA------------------------------------------------------------------------------------
        if(this.state.showRoomDetails)
        return(
          <section className="layout">
          <div className="header">
            <Navbar ShowRooms={this.ShowRooms} ShowHomepage={this.ShowHomepage} ShowLoginForm = {this.ShowLoginForm} loginDone = {this.state.loginDone} Logout={this.Logout} ShowBookings={this.ShowBookings} adminView={this.state.adminView} EmployeeBookings = {this.EmployeeBookings}/>
          </div>
          <div className="main">
           <RoomDetails room = {this.state.roomDet} ShowRooms={this.ShowRooms} customer={this.state.customer} ShowReserveRoom={this.ShowReserveRoom}/>
          </div>
          <div className="footer">
            <Footer/> 
          </div>
        </section>
          )

        //-------------------------------------------------------MOSTRA PRENOTA CAMERA-----------------------------------------------------------------------------
        if(this.state.showReserveRoom)
        return(
          <section className="layout">
          <div className="header">
            <Navbar ShowRooms={this.ShowRooms} ShowHomepage={this.ShowHomepage} ShowLoginForm = {this.ShowLoginForm} loginDone = {this.state.loginDone} Logout={this.Logout} ShowBookings={this.ShowBookings} adminView={this.state.adminView} EmployeeBookings = {this.EmployeeBookings}/>
          </div>
          <div className="main">
            <ReserveRoom ReserveRoom={this.ReserveRoom} allBookings = {this.state.allBookings}/>
          </div>
          <div className="footer">
            <Footer/> 
          </div>
        </section>
          )
        //--------------------------------------------------------MOSTRA HOMEPAGE-------------------------------------------------------------------------------------------
        return(
          <section className="layout">
          <div className="header">
            <Navbar ShowRooms={this.ShowRooms} ShowHomepage={this.ShowHomepage} ShowLoginForm = {this.ShowLoginForm} loginDone = {this.state.loginDone} Logout={this.Logout} ShowBookings={this.ShowBookings} adminView={this.state.adminView} EmployeeBookings = {this.EmployeeBookings}/>
            <Homepage allRooms={this.state.allRooms}/>
          </div>
          <div className="main">
            <HomeCarousel allRooms={this.state.allRooms} />

          </div>
          <div className="footer">
            <Footer/> 
          </div>
        </section>

          )

    }
}
export default App;
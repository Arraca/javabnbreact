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
      "url": "http://localhost:8080/rooms/full",
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
      this.setState({showRooms:false , showLoginForm:false , showBookings : false, showRoomForm:false, showRoomDetails : false, showReserveRoom : false, showEmployeeBookings : false, visibleRooms : undefined})
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
      this.setState({showRooms:true, showLoginForm:false , showBookings : false, showRoomForm:false, showRoomDetails : false, showReserveRoom : false, showEmployeeBookings : false, visibleRooms : undefined})
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
    //-----------------------------------------------------------------------FILTER ROOMS----------------------------------------------------------
    FilterRooms = (array) =>
    {
      this.setState({visibleRooms : array, showRooms:true, showLoginForm:false , showBookings : false, showRoomForm:false, showRoomDetails : false, showReserveRoom : false, showEmployeeBookings : false});
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
      window.location.reload();
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
            <div className="main container">
              <div style={{textAlign:"center"}}>
                <h2>All reservations</h2>
              </div>
              <table className="table table-dark table-striped">
              <thead style={{textAlign:"center"}}>                
                <tr style={{fontSize:30}}>
                  <th scope="col">Room</th>
                  <th scope="col">Check-in</th>
                  <th scope="col">Check-out</th>
                  <th scope="col">Customer</th>
                  <th scope="col">Customer e-mail</th>
                  <th scope="col">Total price</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody style={{textAlign:"center"}}>
                  {this.state.allBookings.map(booking => <Booking booking={booking} DeleteBooking={this.DeleteBooking} showEmployeeBookings={this.state.showEmployeeBookings} employee = {this.state.employee} ApproveOrRejectBooking = {this.ApproveOrRejectBooking}/>)}
              </tbody>
            </table>
            <div class="card" style={{width: "18rem;", textAlign: "center"}}>
                <div class="card-header">
                <b>Services</b>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item"><i class="bi bi-wifi"></i> Free Wi-Fi</li>
                    <li class="list-group-item"><i class="bi bi-car-front"></i> Free parking on the property</li>
                    <li class="list-group-item"><i class="bi bi-egg-fried"></i> Breakfast included</li>
                    <li class="list-group-item"><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M80-80v-526q0-85 44-147.5T248-848q54-21 115-26.5t117-5.5q56 0 117 5.5T712-848q80 32 124 94.5T880-606v526H80Zm284-80h230l-60-60H424l-60 60Zm-64-280h360v-160H300v160Zm320 140q17 0 28.5-11.5T660-340q0-17-11.5-28.5T620-380q-17 0-28.5 11.5T580-340q0 17 11.5 28.5T620-300Zm-280 0q17 0 28.5-11.5T380-340q0-17-11.5-28.5T340-380q-17 0-28.5 11.5T300-340q0 17 11.5 28.5T340-300ZM160-160h140v-20l42-42q-44-6-73-39.5T240-340v-260q0-78 74.5-99T480-720q100 0 170 21t70 99v260q0 45-29 78.5T618-222l42 42v20h140v-446q0-60-29.5-102.5T682-774q-44-17-97.5-21.5T480-800q-51 0-104.5 4.5T278-774q-59 23-88.5 65.5T160-606v446Zm0 0h640-640Z" /></svg> Near Subway</li>
                    <li class="list-group-item"><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M240-360v40q0 17-11.5 28.5T200-280h-40q-17 0-28.5-11.5T120-320v-320l84-240q6-18 21.5-29t34.5-11h440q19 0 34.5 11t21.5 29l84 240v320q0 17-11.5 28.5T800-280h-40q-17 0-28.5-11.5T720-320v-40H240Zm-8-360h496l-42-120H274l-42 120Zm-32 80v200-200Zm100 160q25 0 42.5-17.5T360-540q0-25-17.5-42.5T300-600q-25 0-42.5 17.5T240-540q0 25 17.5 42.5T300-480Zm360 0q25 0 42.5-17.5T720-540q0-25-17.5-42.5T660-600q-25 0-42.5 17.5T600-540q0 25 17.5 42.5T660-480ZM520-40 280-160h160v-80l240 120H520v80ZM200-440h560v-200H200v200Z"/></svg> Recharge station</li>
                    <li class="list-group-item"><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M180-475q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29Zm180-160q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29Zm240 0q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29Zm180 160q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29ZM266-75q-45 0-75.5-34.5T160-191q0-52 35.5-91t70.5-77q29-31 50-67.5t50-68.5q22-26 51-43t63-17q34 0 63 16t51 42q28 32 49.5 69t50.5 69q35 38 70.5 77t35.5 91q0 47-30.5 81.5T694-75q-54 0-107-9t-107-9q-54 0-107 9t-107 9Z"/></svg> Pets allowed</li>
                    <li class="list-group-item"><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M720-360v-80h80q17 0 28.5 11.5T840-400q0 17-11.5 28.5T800-360h-80Zm0 160v-80h80q17 0 28.5 11.5T840-240q0 17-11.5 28.5T800-200h-80Zm-160 40q-33 0-56.5-23.5T480-240h-80v-160h80q0-33 23.5-56.5T560-480h120v320H560ZM280-280q-66 0-113-47t-47-113q0-66 47-113t113-47h60q25 0 42.5-17.5T400-660q0-25-17.5-42.5T340-720H200q-17 0-28.5-11.5T160-760q0-17 11.5-28.5T200-800h140q58 0 99 41t41 99q0 58-41 99t-99 41h-60q-33 0-56.5 23.5T200-440q0 33 23.5 56.5T280-360h80v80h-80Z"/></svg> Electrical services</li>
                    <li class="list-group-item"><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M160-80q-33 0-56.5-23.5T80-160v-480q0-33 23.5-56.5T160-720h160v-80q0-33 23.5-56.5T400-880h160q33 0 56.5 23.5T640-800v80h160q33 0 56.5 23.5T880-640v480q0 33-23.5 56.5T800-80H160Zm0-80h640v-480H160v480Zm240-560h160v-80H400v80ZM160-160v-480 480Zm280-200v120h80v-120h120v-80H520v-120h-80v120H320v80h120Z"/></svg> Medical services</li>
                    <li class="list-group-item"><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-760q-25 0-42.5-17.5T420-820q0-21 14.5-45t45.5-55q31 31 45.5 55t14.5 45q0 25-17.5 42.5T480-760Zm-200 0q-25 0-42.5-17.5T220-820q0-21 14.5-45t45.5-55q31 31 45.5 55t14.5 45q0 25-17.5 42.5T280-760Zm400 0q-25 0-42.5-17.5T620-820q0-21 14.5-45t45.5-55q31 31 45.5 55t14.5 45q0 25-17.5 42.5T680-760ZM240-120v40q0 17-11.5 28.5T200-40h-40q-17 0-28.5-11.5T120-80v-320l84-240q6-18 21.5-29t34.5-11h440q19 0 34.5 11t21.5 29l84 240v320q0 17-11.5 28.5T800-40h-40q-17 0-28.5-11.5T720-80v-40H240Zm-8-360h496l-42-120H274l-42 120Zm-32 80v200-200Zm100 160q25 0 42.5-17.5T360-300q0-25-17.5-42.5T300-360q-25 0-42.5 17.5T240-300q0 25 17.5 42.5T300-240Zm360 0q25 0 42.5-17.5T720-300q0-25-17.5-42.5T660-360q-25 0-42.5 17.5T600-300q0 25 17.5 42.5T660-240Zm-460 40h560v-200H200v200Z"/></svg> Local car wash</li>
                    <li class="list-group-item"><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M180-520q-26 0-43-17t-17-43q0-26 17-43t43-17q26 0 43 17t17 43q0 26-17 43t-43 17ZM120-80v-200H80v-160q0-17 11.5-28.5T120-480h120q17 0 28.5 11.5T280-440v160h-40v120h320v-200h-70q-71 0-120.5-49.5T320-530q0-53 28.5-94.5T422-686q11-65 60.5-109.5T600-840q68 0 117.5 44.5T778-686q45 20 73.5 61.5T880-530q0 71-49.5 120.5T710-360h-70v200h200v80H120Zm370-360h220q38 0 64-26t26-64q0-27-14.5-49T746-612l-42-18-6-44q-6-37-33.5-61.5T600-760q-37 0-64.5 24.5T502-674l-6 44-42 18q-25 11-39.5 33T400-530q0 38 26 64t64 26Zm110-160Z"/></svg>Near by Tesoriera park</li>

                    <li class="list-group-item"><i class="bi bi-person-wheelchair"></i>Accessibility</li>


                </ul>
              </div>                  
            

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
            <div className="main container">
              <div style={{textAlign:"center"}}>
                <h2>Your visits</h2>
              </div>
              <br/>
              <div>
                {
                  this.state.customer.bookings.length>0?
                  <table className="table table-dark table-striped">
                    <thead style={{fontSize:30, textAlign:"center"}}>                
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
                    <tbody style={{textAlign:"center"}}>
                        {this.state.customer.bookings.map(booking => <Booking booking={booking} DeleteBooking={this.DeleteBooking} customer = {this.state.customer}/>)}
                    </tbody>
                </table>
                :
                <div class="alert alert-warning" role="alert">
                  You have no reservation yet, book your stay now to view it!
                </div>
                }
              
              <div class="card" style={{width: "18rem;", textAlign: "center"}}>
                  <div class="card-header">
                  <b>Services</b>
                  </div>
                  <ul class="list-group list-group-flush">
                      <li class="list-group-item"><i class="bi bi-wifi"></i> Free Wi-Fi</li>
                      <li class="list-group-item"><i class="bi bi-car-front"></i> Free parking on the property</li>
                      <li class="list-group-item"><i class="bi bi-egg-fried"></i> Breakfast included</li>
                      <li class="list-group-item"><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M80-80v-526q0-85 44-147.5T248-848q54-21 115-26.5t117-5.5q56 0 117 5.5T712-848q80 32 124 94.5T880-606v526H80Zm284-80h230l-60-60H424l-60 60Zm-64-280h360v-160H300v160Zm320 140q17 0 28.5-11.5T660-340q0-17-11.5-28.5T620-380q-17 0-28.5 11.5T580-340q0 17 11.5 28.5T620-300Zm-280 0q17 0 28.5-11.5T380-340q0-17-11.5-28.5T340-380q-17 0-28.5 11.5T300-340q0 17 11.5 28.5T340-300ZM160-160h140v-20l42-42q-44-6-73-39.5T240-340v-260q0-78 74.5-99T480-720q100 0 170 21t70 99v260q0 45-29 78.5T618-222l42 42v20h140v-446q0-60-29.5-102.5T682-774q-44-17-97.5-21.5T480-800q-51 0-104.5 4.5T278-774q-59 23-88.5 65.5T160-606v446Zm0 0h640-640Z" /></svg> Near Subway</li>
                      <li class="list-group-item"><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M240-360v40q0 17-11.5 28.5T200-280h-40q-17 0-28.5-11.5T120-320v-320l84-240q6-18 21.5-29t34.5-11h440q19 0 34.5 11t21.5 29l84 240v320q0 17-11.5 28.5T800-280h-40q-17 0-28.5-11.5T720-320v-40H240Zm-8-360h496l-42-120H274l-42 120Zm-32 80v200-200Zm100 160q25 0 42.5-17.5T360-540q0-25-17.5-42.5T300-600q-25 0-42.5 17.5T240-540q0 25 17.5 42.5T300-480Zm360 0q25 0 42.5-17.5T720-540q0-25-17.5-42.5T660-600q-25 0-42.5 17.5T600-540q0 25 17.5 42.5T660-480ZM520-40 280-160h160v-80l240 120H520v80ZM200-440h560v-200H200v200Z"/></svg> Recharge station</li>
                      <li class="list-group-item"><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M180-475q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29Zm180-160q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29Zm240 0q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29Zm180 160q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29ZM266-75q-45 0-75.5-34.5T160-191q0-52 35.5-91t70.5-77q29-31 50-67.5t50-68.5q22-26 51-43t63-17q34 0 63 16t51 42q28 32 49.5 69t50.5 69q35 38 70.5 77t35.5 91q0 47-30.5 81.5T694-75q-54 0-107-9t-107-9q-54 0-107 9t-107 9Z"/></svg> Pets allowed</li>
                      <li class="list-group-item"><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M720-360v-80h80q17 0 28.5 11.5T840-400q0 17-11.5 28.5T800-360h-80Zm0 160v-80h80q17 0 28.5 11.5T840-240q0 17-11.5 28.5T800-200h-80Zm-160 40q-33 0-56.5-23.5T480-240h-80v-160h80q0-33 23.5-56.5T560-480h120v320H560ZM280-280q-66 0-113-47t-47-113q0-66 47-113t113-47h60q25 0 42.5-17.5T400-660q0-25-17.5-42.5T340-720H200q-17 0-28.5-11.5T160-760q0-17 11.5-28.5T200-800h140q58 0 99 41t41 99q0 58-41 99t-99 41h-60q-33 0-56.5 23.5T200-440q0 33 23.5 56.5T280-360h80v80h-80Z"/></svg> Electrical services</li>
                      <li class="list-group-item"><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M160-80q-33 0-56.5-23.5T80-160v-480q0-33 23.5-56.5T160-720h160v-80q0-33 23.5-56.5T400-880h160q33 0 56.5 23.5T640-800v80h160q33 0 56.5 23.5T880-640v480q0 33-23.5 56.5T800-80H160Zm0-80h640v-480H160v480Zm240-560h160v-80H400v80ZM160-160v-480 480Zm280-200v120h80v-120h120v-80H520v-120h-80v120H320v80h120Z"/></svg> Medical services</li>
                      <li class="list-group-item"><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-760q-25 0-42.5-17.5T420-820q0-21 14.5-45t45.5-55q31 31 45.5 55t14.5 45q0 25-17.5 42.5T480-760Zm-200 0q-25 0-42.5-17.5T220-820q0-21 14.5-45t45.5-55q31 31 45.5 55t14.5 45q0 25-17.5 42.5T280-760Zm400 0q-25 0-42.5-17.5T620-820q0-21 14.5-45t45.5-55q31 31 45.5 55t14.5 45q0 25-17.5 42.5T680-760ZM240-120v40q0 17-11.5 28.5T200-40h-40q-17 0-28.5-11.5T120-80v-320l84-240q6-18 21.5-29t34.5-11h440q19 0 34.5 11t21.5 29l84 240v320q0 17-11.5 28.5T800-40h-40q-17 0-28.5-11.5T720-80v-40H240Zm-8-360h496l-42-120H274l-42 120Zm-32 80v200-200Zm100 160q25 0 42.5-17.5T360-300q0-25-17.5-42.5T300-360q-25 0-42.5 17.5T240-300q0 25 17.5 42.5T300-240Zm360 0q25 0 42.5-17.5T720-300q0-25-17.5-42.5T660-360q-25 0-42.5 17.5T600-300q0 25 17.5 42.5T660-240Zm-460 40h560v-200H200v200Z"/></svg> Local car wash</li>
                      <li class="list-group-item"><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M180-520q-26 0-43-17t-17-43q0-26 17-43t43-17q26 0 43 17t17 43q0 26-17 43t-43 17ZM120-80v-200H80v-160q0-17 11.5-28.5T120-480h120q17 0 28.5 11.5T280-440v160h-40v120h320v-200h-70q-71 0-120.5-49.5T320-530q0-53 28.5-94.5T422-686q11-65 60.5-109.5T600-840q68 0 117.5 44.5T778-686q45 20 73.5 61.5T880-530q0 71-49.5 120.5T710-360h-70v200h200v80H120Zm370-360h220q38 0 64-26t26-64q0-27-14.5-49T746-612l-42-18-6-44q-6-37-33.5-61.5T600-760q-37 0-64.5 24.5T502-674l-6 44-42 18q-25 11-39.5 33T400-530q0 38 26 64t64 26Zm110-160Z"/></svg>Near by Tesoriera park</li>

                      <li class="list-group-item"><i class="bi bi-person-wheelchair"></i>Accessibility</li>


                  </ul>
                </div> 
                </div>           
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
                    <AllRooms rooms={this.state.allRooms} filteredRooms = {this.state.visibleRooms} adminView={this.state.adminView} ShowRoomForm={this.ShowRoomForm} DeleteRoom={this.DeleteRoom} ShowRoomDetails = {this.ShowRoomDetails}/>
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
            <Homepage allRooms={this.state.allRooms} allBookings = {this.state.allBookings} FilterRooms = {this.FilterRooms}/>
          </div>
          <div>
            <div style={{textAlign:"center"}}>
              <img src="/images/logo.png" style={{borderRadius:"50%", width:200}}/>
            </div>
            <br/>
          <div className="container" style={{marginBottom:"5%"}}>
              <p  style={{textAlign:"justify"}}>Cras tincidunt felis mauris. Morbi congue ullamcorper vulputate. Suspendisse id odio vel purus bibendum volutpat mollis non nulla. Fusce pulvinar elit velit, ac tempus quam convallis quis. In vel risus at libero rhoncus fringilla id non velit. Duis tempor ante ligula, varius facilisis tellus pretium eget. Mauris congue efficitur scelerisque. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Mauris non ipsum aliquam, semper est non, commodo velit. Phasellus ac lobortis sapien. Nullam egestas urna id faucibus semper.</p>
              <div>
                <HomeCarousel allRooms={this.state.allRooms} />
              </div>
              <br/>
              <div style={{textAlign:"center"}}>
                <h2>About Us</h2>
              </div>
              <p  style={{textAlign:"justify"}}>Cras tincidunt felis mauris. Morbi congue ullamcorper vulputate. Suspendisse id odio vel purus bibendum volutpat mollis non nulla. Fusce pulvinar elit velit, ac tempus quam convallis quis. In vel risus at libero rhoncus fringilla id non velit. Duis tempor ante ligula, varius facilisis tellus pretium eget. Mauris congue efficitur scelerisque. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Mauris non ipsum aliquam, semper est non, commodo velit. Phasellus ac lobortis sapien. Nullam egestas urna id faucibus semper. Aliquam erat volutpat. In ut scelerisque augue, id pharetra sapien. Ut viverra, lacus ut pulvinar blandit, massa tellus interdum lectus, a porttitor lectus nibh sed augue. Maecenas sit amet neque ut ipsum lacinia euismod. Nullam a magna augue. Sed pulvinar ultricies metus, nec bibendum nunc facilisis sit amet. Maecenas dapibus ac dolor ac consequat. Aliquam fermentum a nisl a condimentum. Donec id volutpat neque. Nam congue, arcu et vehicula condimentum, purus turpis suscipit massa, sed porttitor purus libero nec metus.</p>
              <div style={{textAlign:"center"}}>
                <h2>Our Location</h2>
              </div>
              <div className="row">
                <div className="col">
                <p   style={{textAlign:"justify"}}>
                Curabitur lectus felis, venenatis tempor erat a, consectetur venenatis orci. Nunc rhoncus turpis vel eros blandit mattis. Suspendisse molestie lacinia malesuada. Suspendisse quis dolor sed ligula pretium pretium vel nec leo. Fusce metus ante, bibendum vel fringilla et, aliquet nec sem. Fusce fringilla, sem non convallis elementum, ipsum dolor ullamcorper velit, ac vulputate nibh urna eget lectus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; In molestie accumsan massa, eget sagittis nulla tincidunt ut.
                </p>
                <br/>
                <p style={{fontSize:25}}>
                <i class="bi bi-geo-alt-fill" style={{color:"red"}}></i> Strada del Lionetto 151/G 
                </p>
                </div>
                <div className="col d-flex justify-content-end">
                  <img src="/images/Mappa.png" style={{width:600, borderRadius:5, border:"1px solid", borderColor:"rgb(200, 200, 200)", filter:"drop-shadow(5px 5px 5px #cccccc)"}}/>
                </div>
              </div>
          </div>


          </div>
          <div className="footer">
            <Footer/> 
          </div>
        </section>

          )

    }
}
export default App;
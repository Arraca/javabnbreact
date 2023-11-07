import React from "react";
import 'bootstrap/dist/css/bootstrap.css';//importare bootstrap
import HomeCarousel from "./HomeCarousel";

class Homepage extends React.Component
{
    constructor(props)
    {
        super(props);
      // Ottieni il timestamp della data odierna
      let todayTimestamp = Date.now();
      // Converti il timestamp in una data nel formato "YYYY-MM-DD"
      let today = new Date(todayTimestamp).toISOString().split('T')[0];
      //Lista intervalli di ciascuna prenotazione
      let timeIntervals = this.props.allBookings.map(booking => ({checkIn: booking.checkIn, checkOut: booking.checkOut}));

      this.state = {tempCredentials : {}, minDate : today, timeIntervals : timeIntervals};
      
    }

    handleChange = (e) =>
    {
        let tempCredentials = this.state.tempCredentials;
        tempCredentials[e.target.name] = e.target.value;
        console.log(tempCredentials);
        console.log(this.props.allBookings)
        console.log(this.props.allRooms)
        this.setState({tempCredentials: tempCredentials});
    }

    handleCheckInChange = (e) => 
    {
    
        // Calcola il minimo per il secondo input come data selezionata nel primo campo + 1 giorno
        let selectedDate = new Date(e.target.value);
        selectedDate.setDate(selectedDate.getDate() + 1);
        this.setState({ minCheckOut: selectedDate.toISOString().split('T')[0] });
      };

      notifyFilterRooms = (e) =>
      {
        e.preventDefault();

        let checkInDate = new Date(e.target.checkIn.value);
        let checkOutDate = new Date(e.target.checkOut.value);
        console.log(checkInDate)
        let newRooms;
        if(checkInDate=="Invalid Date" || checkOutDate =="Invalid Date")
        {
          newRooms = this.props.allRooms

        }
        else 
        {
          newRooms = this.props.allRooms.filter((room) => {
            // Filtra le stanze in base alle prenotazioni
            return room.bookings.every((booking) => {
              let bookingCheckIn = new Date(booking.checkIn);
              let bookingCheckOut = new Date(booking.checkOut);
        
              // Verifica se le date non si sovrappongono
              return (
                checkOutDate <= bookingCheckIn || checkInDate >= bookingCheckOut
              );
            });
          });

        }
    
        let capacity = e.target.capacity.value;
        let visibleRooms = newRooms.filter((room) => 
          room.capacity >= capacity
        )
        this.props.FilterRooms(visibleRooms);

      }



    render()
    {
        return(
            <div>
              <div 
          style={{
           position:"relative",
            width: "100%",
            height:"550px",
            display: "flex",
            justifyContent: "center",
            backgroundImage: 'url("/images/SkylineTorino3Buona.jpg")',
            backgroundRepeat : "no-repeat",
            backgroundSize: 'cover'
          }}
        >
          <form style={{width:"40%", color:"#ffc107", padding:70}} onSubmit={this.notifyFilterRooms}>
            <div style={{textAlign:"center"}}>
              <h2 style={{color:"#ffc107"}}>Find rooms </h2>
            </div>
            <div class="mb-3">
              <label for="checkIn" class="form-label"><b>Check-In</b></label>
              <input name="checkIn" type="date" min={this.state.minDate} class="form-control" id="checkIn" onChange={(e)=>{this.handleChange(e); this.handleCheckInChange(e)}} />
            </div>
            <div class="mb-3">
              <label for="checkOut" class="form-label"><b>Check-Out</b></label>
              <input name="checkOut" type="date" min={this.state.minCheckOut} class="form-control" id="checkOut" onChange={this.handleChange} />
            </div>
            <div class="mb-3">
              <label for="capacity" class="form-label"><b>Capacity</b></label>
              <input name="capacity" type="number" class="form-control" id="capacity" onChange={this.handleChange} />
            </div>


            <div style={{textAlign:"center"}}>
              <button type="submit" class="btn btn-warning" ><i class="bi bi-search" style={{fontSize:40, color:"whitesmoke", fontWeight:900}}></i></button>
            </div>
          </form>

        </div>


          </div>


            
        )
    }
}
export default Homepage;
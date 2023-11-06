import React from "react";
import 'bootstrap/dist/css/bootstrap.css';//importare bootstrap

class ReserveRoom extends React.Component
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

        this.state = {tempCredentialsData : {}, minDate : today, timeIntervals : timeIntervals};
          
       
    }


    
    isDateDisabled() {
        // // Funzione per controllare se una data è disabilitata
        // for (let interval of this.state.timeIntervals) {
        // if (date > interval.checkIn && date < interval.checkOut) {
        //     return false;
        // }
        // }
        // return true;
    }

    

    handleDate1Change = (e) => 
    {
    
        // Calcola il minimo per il secondo input come data selezionata nel primo campo + 1 giorno
        let selectedDate = new Date(e.target.value);
        selectedDate.setDate(selectedDate.getDate() + 1);
        this.setState({ minCheckOut: selectedDate.toISOString().split('T')[0] });
      };

    handleChangeData = (e) =>
    {
        let tempCredentials = this.state.tempCredentialsData;
        tempCredentials[e.target.name] = e.target.value;
        console.log(tempCredentials);
        this.setState({c: tempCredentials});

    }

    notifyReserveRoom = (e) =>
    {
        e.preventDefault()
        this.props.ReserveRoom(this.state.tempCredentialsData);
    }


    render()
    {
        return(
            <div className="container">
                <h2 style={{textAlign:"center"}}>Reserve room</h2>

                <form onSubmit={this.notifyReserveRoom}>
                    <div class="mb-3">
                        <label for="checkIn" class="form-label">Check-In</label>
                        <input name="checkIn" type="date" min={this.state.minDate} class="form-control" id="checkIn" onChange={(e)=> {this.handleChangeData(e); this.handleDate1Change(e)}} required/>
                    </div>
                    <div class="mb-3">
                        <label for="checkOut" class="form-label">Check-Out</label>
                        <input name="checkOut" type="date" min={this.state.minCheckOut} class="form-control" id="checkOut" onChange={this.handleChangeData} required/>
                    </div>
                    <button type="submit" class="btn btn-success">Prenota ora!</button>                   
                </form>     

            </div>
        )
    }
}
export default ReserveRoom;
import React from "react";
import 'bootstrap/dist/css/bootstrap.css';//importare bootstrap

class ReserveRoom extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {tempCredentialsData : {}};
       
    }

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
                <form onSubmit={this.notifyReserveRoom}>
                    <div class="mb-3">
                        <label for="checkIn" class="form-label">Check-In</label>
                        <input name="checkIn" type="date" class="form-control" id="checkIn" onChange={this.handleChangeData} required/>
                    </div>
                    <div class="mb-3">
                        <label for="checkOut" class="form-label">Check-Out</label>
                        <input name="checkOut" type="date" class="form-control" id="checkOut" onChange={this.handleChangeData} required/>
                    </div>
                    <button type="submit" class="btn btn-success">Prenota ora!</button>                   
                </form>     

            </div>
        )
    }
}
export default ReserveRoom;
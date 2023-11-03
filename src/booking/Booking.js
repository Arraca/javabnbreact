import React from "react";
import 'bootstrap/dist/css/bootstrap.css';//importare bootstrap

class Booking extends React.Component
{
    constructor(props)
    {
        super(props);
       
    }

    render()
    {
        return(
                <tr>
                    <td>
                    {this.props.booking.room.name}
                    </td>
                    <td>
                    {this.props.booking.checkIn}
                    </td>
                    <td>
                    {this.props.booking.checkOut}
                    </td>
                    {
                        this.props.showEmployeeBookings ?
                        <td>
                        {this.props.booking.customer.username}
                        </td>
                        :
                        <td>
                        {this.props.booking.room.notes}
                        </td>
                    }
                    <td>
                    &euro; {this.props.booking.totalPrice}
                    </td>
                </tr>
        )
    }
}
export default Booking;
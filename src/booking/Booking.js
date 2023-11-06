import React from "react";
import 'bootstrap/dist/css/bootstrap.css';//importare bootstrap

class Booking extends React.Component
{
    constructor(props)
    {
        super(props);
       
    }

    notifyDeleteBooking = () =>
    {
        this.props.DeleteBooking(this.props.booking);
    }

    notifyRejectBooking = () =>
    {
        this.props.ApproveOrRejectBooking(false, this.props.booking)
    }

    notifyApproveBooking = () =>
    {
        this.props.ApproveOrRejectBooking(true, this.props.booking)
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
                        {this.props.booking.customer.name} {this.props.booking.customer.surname}
                        </td>
                        :
                        <td>
                        {this.props.booking.room.notes}
                        </td>
                    }
                    <td>
                    &euro; {this.props.booking.totalPrice}
                    </td>
                    {
                        this.props.customer?
                        <td>
                            <span>
                                {
                                    this.props.booking.saved!=null?
                                    <span>
                                        {
                                            this.props.booking.saved?
                                            <span>Approved <i class="bi bi-check-circle"></i></span>
                                            :
                                            <span>Rejected <i class="bi bi-check-circle"></i></span>
                                        }
                                    </span>
                                    :
                                    <span>Processing...</span>
                                }
                            </span>
                        </td>
                        :
                        ""
                    }
                    {
                        this.props.customer?
                        <td><button className="btn btn-danger" onClick={this.notifyDeleteBooking}><i class="bi bi-trash"></i></button></td>
                        :
                        <td>
                        {
                            this.props.employee && this.props.booking.saved==null?
                            <span>
                                <button className="btn btn-danger" onClick={this.notifyRejectBooking}>Reject</button>
                                <span> </span>
                                <button className="btn btn-success" onClick={this.notifyApproveBooking}>Approve</button>
                            </span>
                            :
                            <span>
                                {
                                    this.props.booking.saved?
                                    <span>Approved <i class="bi bi-check-circle"></i></span>
                                    :
                                    <span>Rejected <i class="bi bi-check-circle"></i></span>
    
                                }
                            </span>
                        }
                        </td>    
                    }
                    
                </tr>
        )
    }
}
export default Booking;
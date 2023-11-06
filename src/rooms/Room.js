import React from "react";
import 'bootstrap/dist/css/bootstrap.css';//importare bootstrap

class Room extends React.Component
{
    constructor(props)
    {
        super(props);
       
    }

    notifyNotifyShowRoomForm = () =>
    {
        this.props.notifyShowRoomForm(this.props.room.id);
    }

    notifyNotifyDeleteRoom = () =>
    {
        this.props.notifyDeleteRoom(this.props.room);
    }

    notifyNotifyShowRoomDetails = () =>
    {
        this.props.notifyShowRoomDetails(this.props.room);
    }

    render()
    {
        return(
            <div className="card" style={{width: "18rem", height:"28rem", textAlign:"center"}}>
                <img src={this.props.room.img_url} className="card-img-top" style={{height:200}}/>
                <div className="card-body">
                    <h5 className="card-title">{this.props.room.name}</h5>
                    <p className="card-text">
                        <span>Capacity: {this.props.room.capacity}</span><br/>
                        <span>Base price: &euro; {this.props.room.base_price}</span><br/>
                        <span>Notes: {this.props.room.notes}</span>

                    </p>
                    <button className="btn btn-light" onClick={this.notifyNotifyShowRoomDetails}>Dettagli <i class="bi bi-info-circle"></i></button>
                    <br/>
                    {
                        this.props.adminView?
                        <div>
                        <button className="btn btn-warning" onClick={this.notifyNotifyShowRoomForm}>Modifica <i class="bi bi-pencil"></i></button>                        
                        <button className="btn btn-danger" onClick={this.notifyNotifyDeleteRoom}>Elimina <i class="bi bi-trash"></i></button>
                        </div>
                        :
                        ""
                    }
                </div>
            </div>
        )
    }
}
export default Room;
import React from "react";
import 'bootstrap/dist/css/bootstrap.css';//importare bootstrap
import Room from "./Room";

class AllRooms extends React.Component
{
    constructor(props)
    {
        super(props);
       
    }

    notifyShowRoomForm = (roomId) =>
    {
        if(isNaN(roomId))
        this.props.ShowRoomForm();
        else
        this.props.ShowRoomForm(roomId);
    }

    notifyDeleteRoom = (room) =>
    {
        this.props.DeleteRoom(room);
    }

    notifyShowRoomDetails = (roomD) =>
    {
        this.props.ShowRoomDetails(roomD);

    }

    render()
    {
        return(
                <div className="container">
                    <h2 style={{textAlign:"center"}}>Our Rooms</h2>
                    <br/>
                    <div className=" layoutRooms " style={{textAlign:"center"}}>
                    {this.props.rooms.map(room => <Room room={room} key={room.id} adminView={this.props.adminView} notifyShowRoomForm = {this.notifyShowRoomForm} notifyDeleteRoom = {this.notifyDeleteRoom} notifyShowRoomDetails={this.notifyShowRoomDetails}/>)}   
                    </div>
                    <br/><br/>
                    {
                        this.props.adminView?
                        <div style={{textAlign:"center"}}>
                        <button className="btn btn-primary" onClick={()=>this.notifyShowRoomForm()}>Add Room <i class="bi bi-plus-circle"></i></button>
                        </div>
                        :
                        ""
                    }                 
                </div>
        )
    }
}
export default AllRooms;
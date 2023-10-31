import React from "react";
import 'bootstrap/dist/css/bootstrap.css';//importare bootstrap
import Room from "./Room";

class AllRooms extends React.Component
{
    constructor(props)
    {
        super(props);
       
    }

    render()
    {
        return(
                <section className="layoutRooms">
                    {this.props.rooms.map(room => <Room room={room} key={room.id}/>)}                    
                </section>
        )
    }
}
export default AllRooms;
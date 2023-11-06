import React from "react";
import 'bootstrap/dist/css/bootstrap.css';//importare bootstrap

class RoomDetails extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    notifyShowRooms = () =>
    {
        this.props.ShowRooms();
    }

    notifyShowReserveRoom = () =>
    {
        this.props.ShowReserveRoom(this.props.room)
    }


    render()
    {
        return(
            <div className="container">
                <div>
                    <button className="btn btn-light"><i class="bi bi-arrow-left-circle" style={{fontSize:30}} onClick={this.notifyShowRooms}></i></button>
                </div>
                <div style={{textAlign: "center"}}>
                <h2>{this.props.room.name}</h2>
                <img src={this.props.room.img_url} style={{width: "60%",height: "60%",borderRadius: 7}}/>
                </div>
                <br/>
                    <div class="card" style={{width: "100%", textAlign: "center", paddingLeft:"5%", paddingRight:"5%"}}>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">&euro;{this.props.room.base_price} /night</li>
                        <li class="list-group-item">{this.props.room.capacity} sleeping places</li>
                    </ul>
                </div> 
                <br/>
                <p>
                <h4 style={{textAlign: "center"}}>Description</h4>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi mi tortor, imperdiet eu nunc non, volutpat aliquet nisi. Aliquam convallis mi ut vehicula venenatis. Ut fermentum lobortis nisi nec pellentesque. Duis venenatis, lectus non ornare rhoncus, turpis nisl tincidunt urna, id aliquam eros ipsum id urna. Quisque in augue consequat, viverra magna vehicula, consequat magna. Donec velit lacus, facilisis et ex eget, mattis ornare nisi. In non nulla at neque interdum egestas. Etiam nulla nulla, laoreet nec bibendum at, sagittis vitae turpis. Nam ultricies euismod augue ut ullamcorper. Sed ultricies, nisl eget iaculis congue, nisl ipsum rhoncus lorem, eget sollicitudin neque lectus eget sem. Nunc ex magna, pharetra eget tempor in, ornare vel nibh. Pellentesque et diam feugiat, sagittis est a, egestas elit. Pellentesque vitae felis eu dui ultrices congue at ut elit. Nam molestie egestas efficitur. Morbi aliquam volutpat pretium. Integer at ligula sit amet risus maximus cursus.
                </p>
                <div class="card" style={{width: "18rem;", textAlign: "center"}}>
                <div class="card-header">
                <b>What you will find</b>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item"><i class="bi bi-wifi"></i> Free Wi-Fi</li>
                    <li class="list-group-item"><i class="bi bi-car-front"></i> Free parking on the property</li>
                    <li class="list-group-item"><i class="bi bi-egg-fried"></i> Breakfast included</li>
                </ul>
                </div>  
                <br/>
                {
                    this.props.customer?
                    <div style={{textAlign:"center"}}>
                    <button className="btn btn-success" onClick={this.notifyShowReserveRoom}>Verifica disponibilità</button>
                    </div>
                    :
                    ""
                }
            </div>       
        )
    }
}
export default RoomDetails;
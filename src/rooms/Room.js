import React from "react";
import 'bootstrap/dist/css/bootstrap.css';//importare bootstrap

class Room extends React.Component
{
    constructor(props)
    {
        super(props);
       
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
                    <a href="#" className="btn btn-primary">Dettagli</a>
                </div>
            </div>
        )
    }
}
export default Room;
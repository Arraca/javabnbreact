import React from "react";
import 'bootstrap/dist/css/bootstrap.css';//importare bootstrap

class FormRoom extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={tempFeatures : {}}
    }

    notifySaveRoom = (e) =>
    {
        e.preventDefault();
        this.props.SaveRoom(this.state.tempFeatures);
    }

    notifyUpdateRoom = (e) =>
    {
        e.preventDefault();
        this.props.UpdateRoom(this.props.roomId, this.state.tempFeatures);
    }

    handleChange = (e) =>
    {
        let tempFeatures = this.state.tempFeatures;
        tempFeatures[e.target.name] = e.target.value;
        console.log(tempFeatures);
        this.setState({tempFeatures: tempFeatures});

    }

    render()
    {
//-------------------------------------------NEW ROOM--------------------------------------------------
        if(!this.props.updatingRoom)
        return(
            <div>
                <h2 style={{textAlign:"center"}}>Insert new room</h2>
                <form onSubmit={this.notifySaveRoom}>
                    <div class="mb-3">
                        <label for="name" class="form-label">Name</label>
                        <input name="name" type="text" class="form-control" id="name" aria-describedby="emailHelp" onChange={this.handleChange} required/>
                    </div>
                    <div class="mb-3">
                        <label for="capacity" class="form-label">Capacity</label>
                        <input name="capacity" type="number" class="form-control" id="capacity" onChange={this.handleChange} required/>
                    </div>
                    <div class="mb-3">
                        <label for="base_price" class="form-label">Base Price</label>
                        <input name="base_price" type="number" step={0.01} class="form-control" id="base_price" onChange={this.handleChange} required/>
                    </div>
                    <div class="mb-3">
                        <label for="img_url" class="form-label">Image</label>
                        <input name="img_url" type="text" class="form-control" id="img_url" onChange={this.handleChange} required/>
                    </div>
                    <div class="mb-3">
                        <label for="notes" class="form-label">Notes</label>
                        <input name="notes" type="text" class="form-control" id="notes" onChange={this.handleChange} required/>
                    </div>

                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
        )
//-----------------------------------------UPDATE-----------------------------------------------------
        else{
            return(
                <div>
                    <h2 style={{textAlign:"center"}}>Update existing room</h2>
                    <form onSubmit={this.notifyUpdateRoom}>
                        <div class="mb-3">
                            <label for="name" class="form-label">Name</label>
                            <input name="name" type="text" class="form-control" id="name" aria-describedby="emailHelp" onChange={this.handleChange} required/>
                        </div>
                        <div class="mb-3">
                            <label for="capacity" class="form-label">Capacity</label>
                            <input name="capacity" type="number" class="form-control" id="capacity" onChange={this.handleChange} required/>
                        </div>
                        <div class="mb-3">
                            <label for="base_price" class="form-label">Base Price</label>
                            <input name="base_price" type="number" step={0.01} class="form-control" id="base_price" onChange={this.handleChange} required/>
                        </div>
                        <div class="mb-3">
                            <label for="img_url" class="form-label">Image</label>
                            <input name="img_url" type="text" class="form-control" id="img_url" onChange={this.handleChange} required/>
                        </div>
                        <div class="mb-3">
                            <label for="notes" class="form-label">Notes</label>
                            <input name="notes" type="text" class="form-control" id="notes" onChange={this.handleChange} required/>
                        </div>

                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                </div>
            )
        }
    }
}
export default FormRoom;
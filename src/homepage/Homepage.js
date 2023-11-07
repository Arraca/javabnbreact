import React from "react";
import 'bootstrap/dist/css/bootstrap.css';//importare bootstrap
import HomeCarousel from "./HomeCarousel";

class Homepage extends React.Component
{
    constructor(props)
    {
        super(props);

    }

    render()
    {
        return(
            <div>
              <div 
          style={{
           position:"relative",
            width: "100%",
            height:"550px",
            display: "flex",
            justifyContent: "space-between",
            backgroundImage: 'url("/images/SkylineTorino3Buona.jpg")',
            backgroundRepeat : "no-repeat"
          }}
        >

          <button style={{  backgroundColor: "#D3D3D3", border: "none", height:"100px", width:"200px", left:"20%",bottom:"30px", position:"absolute", border:"border-dark",borderRadius: "15px"}}>
            CIAO
          </button>
          <button style={{  backgroundColor: "#D3D3D3", border: "none", height:"100px", width:"200px", left:"35%", bottom:"30px", position:"absolute",borderRadius: "15px"}}>
            CIAO
          </button>
          <button style={{  backgroundColor:"#D3D3D3", border: "none", height:"100px", width:"200px", left:"50%",bottom:"30px", position:"absolute",borderRadius: "15px" }}>
            CIAO
          </button>
          <button style={{  backgroundColor: "#D3D3D3", border: "none", height:"100px", width:"200px", left:"65%",bottom:"30px", position:"absolute",borderRadius: "15px"}}>
            CIAO
          </button>
        </div>


          </div>


            
        )
    }
}
export default Homepage;
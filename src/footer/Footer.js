import React from "react";
import 'bootstrap/dist/css/bootstrap.css';//importare bootstrap

class Footer extends React.Component
{
    constructor(props)
    {
        super(props);
       
    }

    render()
    {
        return(
            <div className="row gx-5 --bs-dark" style={{textAlign:"center", backgroundColor:"#212529", color:"whitesmoke"}}>
                <div className="col">
                    <div className="p-3">
                            <b>Contacts</b><br/>
                            <b><i class="bi bi-telephone-fill" style={{fontSize:25}}></i> (+39) 011 00 00 000</b><br/>
                            <b><i class="bi bi-whatsapp" style={{fontSize:25}}></i> (+39) 333 33 33 333</b><br/>
                            <b><i class="bi bi-envelope-at-fill" style={{fontSize:25}}></i> javabnb@example.com</b><br/>
                            <b><i class="bi bi-geo-alt-fill" style={{fontSize:25}}></i> Corso Regina Margherita 159/B</b>
                        
                    </div>
                </div>
                <div className="col">
                    <div className="p-3">
                        <ul>
                            <b>Social</b><br/>
                            <b><a href="#" style={{textDecoration:"none", color:"whitesmoke"}}><i class="bi bi-instagram" style={{fontSize:25}}></i> https://www.instagram.com/javabnb.italy/</a></b><br/>
                            <b><a href="#" style={{textDecoration:"none", color:"whitesmoke"}}><i class="bi bi-facebook" style={{fontSize:25}}></i> https://www.facebook.com/profile.javabnb</a></b><br/>
                            <b><a href="#" style={{textDecoration:"none", color:"whitesmoke"}}><i class="bi bi-twitter" style={{fontSize:25}}></i> https://twitter.com/profile.javabnb</a></b>
                        </ul>

                    </div>
                </div>
                <div className="text-center p-4">
                            © 2021 Copyright: GELFsrl.com
                </div>

            </div>
        )
    }
}
export default Footer;
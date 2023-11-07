import 'bootstrap/dist/css/bootstrap.css';
import React, {useState} from "react";
import Carousel from 'react-bootstrap/Carousel';


function HomeCarousel(props) 
{
  const allRooms = props.allRooms;
  const data = allRooms.map(room => room.img_url);

  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
       {data.map((img_url) => {
        return (
          <Carousel.Item interval={5000} pause={"hover"}>        
        <img
          className="d-block m-auto"
          src={img_url}
          alt="slider image"
          width={950}
          height={450}
        />
        <Carousel.Caption>
          <h3></h3>
          <p></p>
        </Carousel.Caption>
      </Carousel.Item>
        )
      })}
      
    </Carousel>
  );
}
export default HomeCarousel;

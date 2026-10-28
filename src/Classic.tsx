
'use client'
 
import  { useEffect, useState } from "react"; 
import { Button, Carousel, Col, Container, Row } from "react-bootstrap";


export default function ClassicPage(this: any) { 

     const [isLoaded, setLoaded ] = useState(false);
     
     let lightMode = localStorage.getItem('lightMode') ?? 'Dark'

     useEffect( () => setLoaded(true));
  
    let litColor = (lightMode === 'Dark') ? 'white' : 'blue';
    let h1color = (lightMode === 'Dark') ? 'navajowhite': "blue";
     
 
      let  h1style = {
        
           fontFamily:"arial", fontSize: "xx-large", color: h1color,
           marginLeft: "30%"
        
        }
    

     
     let   h1style2 = {
        
           fontFamily:"arial", fontSize: "x-large", color: h1color,
           marginLeft: "32%",
           marginTop: '3%'
        
           
        }

    

    
       let  p1 = { fontFamily:"arial", fontSize: "x-large", color: litColor, marginTop: "10%"};

 
   

     
      let  p2 = { fontFamily:"arial", fontSize: "medium", color: litColor};  
    
    


     
      let  b1 = { fontFamily: "arial", fontSize: "large", marginTop: "1%"};
    
 

    let r1 = {

      borderRadius: "5%"

    }

    let btnDown = {
        marginTop: "50%"
    }
 
let welcome = "Welcome to Insurance";   
const whatToShow = "Now is the time to buy insurance";

let divColor = (lightMode === "Dark") ? "black" : "white";
let divStyle = {backgroundColor: divColor};

const interval = 10 * 1000; {/* 10 seconds */}
 
if(!isLoaded) {

    return (<div></div>);
} 
  
// carousel width and height
let width = 1200
let height = 400

return (<div style={divStyle}> 

            
            <Container> 
            <br></br>
            <Row>

            <Col sm={2}>
            <Row className="justify-content-md-center" style={btnDown}>
            <h3 onMouseOver={yellowHover(lightMode)} onMouseLeave={yellowLeave(lightMode)}  style={p1}>New customer?</h3>
            <p style={p2}>
                Please register customer information here.
            </p> 
            <Button style={b1} variant="primary"  href="/register">Register</Button>  
            <h3 onMouseOver={yellowHover(lightMode)} onMouseLeave={yellowLeave(lightMode)} style={p1}>Existing customer?</h3>
            <p style={p2}>
                Update customer and policy info.
            </p>
            <Button style={b1} variant="primary"  href="/signin" >Sign in</Button>   
           </Row>
           </Col>

            <Col sm={1}></Col>
            <Col sm={8}>
            <Row> 
            <h1   onMouseOver={yellowHover(lightMode)} onMouseLeave={yellowLeave(lightMode)}
                  style={h1style} className="welcomeTitle">{welcome}</h1> <br/>  
            </Row>  
            <br/> 

            <Row className="justify-content-md-center">
            <Carousel>
              <Carousel.Item interval={interval}>
                <img style={r1} src="/images/road.jpg" alt="road" width={width} height={height} />
                <Carousel.Caption>
                  <p style={p2}>Now is a good time to buy insurance !</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item interval={interval}> 
                <img style={r1} src="images/sunset.jpg" alt="sunset" width={width} height={height} />   
                <Carousel.Caption> 
                  <p style={p2}>Best Rates here!</p>
                </Carousel.Caption>
              </Carousel.Item>
            <Carousel.Item interval={interval}>
               <img style={r1} src="/images/lake.jpg" alt="lake" width={width} height={height} /> 
               <Carousel.Caption> 
                   <p style={p2}>Wholesale Coverage!</p>
              </Carousel.Caption>
              </Carousel.Item>
              </Carousel>
         </Row>
         <Row>
            <h1  onMouseOver={yellowHover(lightMode)} onMouseLeave={yellowLeave(lightMode)}
                 style={h1style2} className='welcomeTitle'>{whatToShow}</h1>  
          </Row>
         </Col>
           
        </Row>
 
        <br />
        <br /> 
        <br />
        <br />
        
        <br />
        <br /> 
        <br />
        <br />
        
        <br />
        <br /> 
        <br />
        <br />
        
        <br />
        <br /> 
        <br />
        <br />

</Container></div>);

}

  const yellowHover = (lightMode:string) => (e:any) => {
         

        let color = (lightMode === "Dark") ? 'lightgoldenrodyellow' : 'red'
        e.target.style.color = color



  }

  
  const yellowLeave = (lightMode:string)  => (e:any) => {  
       
        let color = (lightMode === "Dark") ? 'navajowhite' : 'blue'
        e.target.style.color = color
  }
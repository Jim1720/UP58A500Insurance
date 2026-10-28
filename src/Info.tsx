
import { useNavigate } from "react-router-dom" 

export default function Info() {

    
    let lightMode = localStorage.getItem('lightMode') ?? 'Dark'

    
    let navigate = useNavigate()

     /* light mode effects */

    /* TODO: fill page with container */ 

    let labelColor = 'dodgerblue'
    let inputColor = 'white'
    let inputBackGroundColor = 'black'
    let messageColor = 'white'
    let paraColor = 'white'
    let titleColor = 'navajowhite'
    let containerBackgroundColor = 'black'
    let bottomTextColor = 'lightgray'
    let lightGoldenRodYellow = 'lightGoldenRodYellow'

    if (lightMode === 'Light') { 
            
         labelColor = 'dodgerblue'
         inputColor = 'blue'
         inputBackGroundColor = 'white'
         messageColor = 'blue'
         paraColor = 'dodgerblue'
         titleColor = 'blue' 
         containerBackgroundColor = 'white'
         bottomTextColor = 'dodgerblue'
         lightGoldenRodYellow = 'dodgerblue'

    }

    let h3Style = {marginLeft: '42%', color: titleColor, fontFamily: 'arial', marginBottom: '1%'}
    let h5style = {color: lightGoldenRodYellow, marginLeft: '42%', marginBottom: '2%', fontStyle: 'italic'} 
    let listyle = {color: lightGoldenRodYellow, fontFamily: 'arial', fontSize: 'large'}
    let divStyle = { marginLeft: '25%'}
    let pstyle = { color: paraColor, fontFamily: 'arial', fontStyle:'italic', fontSize: 'large'}
    let btnStyle = { marginTop: '1%',  marginLeft: '43%', fontSize: 'larger' }
    let pStyle =  {color: 'white'}
    let spaceStyle = { backgroundColor: inputBackGroundColor }
     
   let onCancel = () => {

         navigate('/start')

   }

    return(<>   
 
        <h3  style={h3Style}> A500Insurance </h3>
        <h5  style={h5style}> Information </h5>

        <div id='center' style={divStyle}> 
        <p style={pstyle}>This application allows you to register a customer and submit claims</p>

        <ul>
            <li style={listyle}>Customer Registration </li>
            <p style={pStyle}>  Enter basic customer information</p>
            
            <li style={listyle}>Plan Selection </li>
            <p style={pStyle}>This gives you a choice of services</p>

            <li style={listyle}>Submit Claims</li> 
            <p style={pStyle}>A plan must be selected first</p>

            <li style={listyle}>See Claim History</li>
            <li style={listyle}>Adjust Claim</li>
            <li style={listyle}>Pay Claim</li>
            <li style={listyle}>Copy Claim</li>
        </ul>
        </div>

           &nbsp;&nbsp;
          <button  onClick={onCancel} style={btnStyle} className='btn btn-primary'>Return</button>
       
        <div className="row">
            <p style={spaceStyle}>&nbsp;</p> 
        </div>
           <div className="row">
            <p style={spaceStyle}>&nbsp;</p> 
        </div>
                    
        <div className="row">
            <p style={spaceStyle}>&nbsp;</p> 
        </div>
           <div className="row">
            <p style={spaceStyle}>&nbsp;</p> 
        </div>
            <div className="row">
            <p style={spaceStyle}>&nbsp;</p> 
        </div>

    </>)


}
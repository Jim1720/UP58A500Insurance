import { useNavigate } from "react-router-dom"

 


export default function About() {

    
    let navigate = useNavigate()

      let lightMode = localStorage.getItem('lightMode') ?? 'Dark'

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
   
    let divStyle = { marginLeft: '35%'}
    let pstyle = { marginTop: '14%', color: 'white', fontFamily: 'arial', fontStyle:'italic', fontSize: 'x-large',
         
    } 
    let btnStyle = { marginTop: '14%',  marginLeft: '43%', fontSize: 'larger' }
    let spaceStyle = { backgroundColor: inputBackGroundColor}

     let onCancel = () => {

         navigate('/start')

   }

     

    return(<>
 
        <h3  style={h3Style}> A500Insurance </h3>
        <h5  style={h5style}> About </h5>

        <div id='center' style={divStyle}> 
        <p style={pstyle}>Application is written in React.js</p>

        
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
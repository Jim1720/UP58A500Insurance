import { useNavigate } from "react-router-dom" 
import { useEffect, useState } from "react"
import InterfaceInitialization from "./Interface" 

// change 2.15 - pulling w and i logic by parking  

   
export default function Wait({setStore}:any) {
 
    
      // Developer Note: do not change debug or d tests they are dictated by scope

      let navigate = useNavigate()  

      const [isActive, setIsActive] = useState(true)
      const [seconds, setSeconds] = useState(0) 
      const [message, setMessage] = useState('')

      localStorage.setItem('interfaceRunOneTime','')
   
      let lightMode = localStorage.getItem('lightMode') ?? 'Dark'

     /* light mode effects */
 
    let inputBackGroundColor = 'black' 
    let titleColor = 'navajowhite' 
    let lightGoldenRodYellow = 'lightGoldenRodYellow'  

    if (lightMode === 'Light') { 
             
         inputBackGroundColor = 'white' 
         titleColor = 'blue'  
         lightGoldenRodYellow = 'dodgerblue'  

    }

    let overrideInterval = 0
    let q = '' // store for onStart 
    let debug = false // local scoped use

    let h3Style = {marginLeft: '42%', color: titleColor, fontFamily: 'arial', marginBottom: '1%'}
    let h5style = {color: lightGoldenRodYellow, marginLeft: '42%', marginBottom: '2%', fontStyle: 'italic'}  
    let messageStyle = {color: titleColor, fontFamily: 'arial', marginBottom: '1%'}
   
    let divStyle = { marginLeft: '35%'} 
    let divBoxStyle = { marginLeft: '12%'}

    let pstyle = { marginTop: '14%', color: 'white', fontFamily: 'arial', fontStyle:'italic', fontSize: 'x-large',
         
    } 
    
    let firstBtnStyle = { marginTop: '14%',  marginLeft: '5%', fontSize: 'larger' }
    let btnStyle = { marginTop: '14%',  marginLeft: '15%', fontSize: 'larger' }
    let spaceStyle = { backgroundColor: inputBackGroundColor}
 
    /* a30
      border: 5px solid var(--white);
      border-radius: 5px;
    */
     
    let box1style = { 
        width: '4%',
        height:'16%',
        borderWidth: 'medium',
        borderColor: 'white',
        borderRadius: '5px',
        borderStyle: 'solid',
        display: 'none' }
            
    let box2style = { 
        width: '4%',
        height:'16%', 
        borderWidth: 'medium',
        borderColor: 'white',
        borderRadius: '5px',
        borderStyle: 'solid',
        display: 'none' }
        
    let box3style = { 
        width: '4%',
        height:'16%', 
        borderWidth: 'medium',
        borderColor: 'white',
        borderRadius: '5px',
        borderStyle: 'solid', 
        display : 'none' }
        
    let box4style = {  
        width: '4%',
        height:'16%', 
        borderWidth: 'medium',
        borderColor: 'white',
        borderRadius: '5px',
        borderStyle: 'solid',
        display:'none' 
    }  
 
    let acounterStyle = {color: titleColor, 
                         backgroundColor: inputBackGroundColor, 
                         font: 'xx-large', 
                         marginLeft : '18%'}

    
     
    let showBox = (seconds:number) => { 

    // get spacers
    
    let space1 = document.getElementById("space1") as HTMLElement 
    let space2 = document.getElementById("space1") as HTMLElement 
    let space3 = document.getElementById("space1") as HTMLElement

    // get the fields
    let field1 = document.getElementById("field1") as HTMLElement 
    let field2 = document.getElementById("field2") as HTMLElement
    let field3 = document.getElementById("field3") as HTMLElement 
    let field4 = document.getElementById("field4") as HTMLElement
  
      let selection = 1 + (seconds % 4)  // change 2.4 
        
      switch(selection)
      {
          case 1:  
              space1?.setAttribute("style","display:hidden; background-color:black"); 
              space2?.setAttribute("style","display:hidden; background-color:black");  
              space3?.setAttribute("style","display:hidden; background-color:black");  

              field1?.setAttribute("style","display:flex; background-color:lawngreen"); 
              field2?.setAttribute("style","display:none; background-color:lightgray"); 
              field3?.setAttribute("style","display:none; background-color:lightgray"); 
              field4?.setAttribute("style","display:none; background-color:lightgray");
              break; 

          case 2: 
              space1?.setAttribute("style","display:flex; background-color:black");  
              space2?.setAttribute("style","display:none; background-color:black");  
              space3?.setAttribute("style","display:none; background-color:black");  

              field1?.setAttribute("style","display:none; background-color:lightgray"); 
              field2?.setAttribute("style","display:flex; background-color:yellow"); 
              field3?.setAttribute("style","display:none; background-color:lightgray"); 
              field4?.setAttribute("style","display:none; background-color:lightgray");
            break; 

          case 3: 
              space1?.setAttribute("style","display:flex; background-color:black");  
              space2?.setAttribute("style","display:flex; background-color:black");  
              space3?.setAttribute("style","display:none; background-color:black");  

              field1?.setAttribute("style","display:none; background-color:lightgray"); 
              field2?.setAttribute("style","display:none; background-color:lightgray"); 
              field3?.setAttribute("style","display:flex; background-color:red"); 
              field4?.setAttribute("style","display:none; background-color:lightgray");
            break; 

          case 4: 
              space1?.setAttribute("style","display:flex; background-color:black");  
              space2?.setAttribute("style","display:flex; background-color:black");  
              space3?.setAttribute("style","display:flex; background-color:black");  

              field1?.setAttribute("style","display:none; background-color:lightgray"); 
              field2?.setAttribute("style","display:none; background-color:lightgray"); 
              field3?.setAttribute("style","display:none; background-color:lightgray"); 
              field4?.setAttribute("style","display:flex; background-color:dodgerblue");
            break; 

          default:
            break;
      }
       
     

} 
 
 


    let onStart = () => {

        // when start button clicked
        InterfaceInitialization(q).then( (dest:any) => {
 
            navigate(dest)

          })  
    } 

    const getInterface = async () => { 

               
            // wait screen routine to call the interface
            const params = new URLSearchParams(window.location.search)
            q = params.get('q') ?? '' // user ( q deckared at top for on staret) 
        
            let d = params.get('d') ?? '' // turns on debug mode for console logs
            // 1 stmt and sample on claim 

            // if d used loop through parms and show values

            //TODO: show parms when debug is on
            if( d !== '') for(let item of params) console.log(`parm: ${item[0]} is ${item[1]}`)  

            //FOR TESTING : always show params
            for(let item of params) console.log(`parm: ${item[0]} is ${item[1]}`)  

            //let w = params.get('w') ?? '' // put something in to stay on wait screen 
            // usage:
            // ..m ..s specific time  
            // b until buton pressed 
            //let useSeconds = 0
            //const minutes = 60 
            //let perminantWait = false

            /* parking ---- 

            /* setup wait time after interface is called before proceeding  
            if(w !== '') {

                const type = (w.length > 1) ?  w.substring(w.length - 1) :  ''
                if(type === 'm' || type === 's') {

                    let prefix = w.substring(0,w.length - 1)
                    let number = parseInt(prefix)
                    if(!Number.isNaN(number)) {

                        useSeconds = number  // wait that number of seconds (implied)
                        setMessage(`waiting ${useSeconds} seconds`)

                    } else if(type === 'm') { 

                         useSeconds = number * minutes  
                         setMessage(`waiting ${useSeconds} minutes`)

                    } else if(type === 's') { 

                        useSeconds = number 
                        setMessage(`waiting ${useSeconds} seconds`) 
                    }
                }  
                // if w is number assume seconds
                else if(!Number.isNaN(w)) {
                    
                        useSeconds = parseInt(w) 
                        setMessage(`waiting ${useSeconds} seconds`)  
                }

                if(d !== '')
                   console.log('use seconds: ' + useSeconds)

                if ( w === 'perm') {

                    perminantWait = true
                }
                if(d !== '') { // store not set use d value here
                   console.log(`useSeconds: ${useSeconds} perminantWait: ${perminantWait}`)
                }
            } 

            let i = params.get('i') ?? '' // box interval 
            overrideInterval = (i !== '' && !Number.isNaN(i)) ? parseInt(i) : 0
            
            if(d !== '')
               console.log('override interval' + overrideInterval)
        
            --- end parking */

            if(d !== '') {
                
                setStore({debug:true})
            }
 
            
            //if(perminantWait) {

                // do nothing and wait for user to press a button
               // return
            //}

         
            await InterfaceInitialization(q).then( (r:any) => { 
             
                  //const factor = 1000 // convert to millseconds 
                  // did user ask for wait
                  //setTimeout( () => { console.log("timeout done")} , useSeconds * factor)

                  debugger

                  let value = r;
  
                  navigate(value) 
                   

                  return
          }) 
    }

    
     const s = (value:string) => {

        if(debug) {

            const {shortToday, time} = getCurrentDate()
            const prefix = shortToday + time
            console.log(`${prefix} Claim ${value}`)

        }

    }
    
    // ref:
    // https://www.bing.com/search?pglt=427&q=react+how+to+impliment+timer&cvid=098aefb381c14093b7346364e981e0c6&gs_lcrp=EgRlZGdlKgYIABBFGDkyBggAEEUYOTIGCAEQABhAMgYIAhAAGEAyBggDEAAYQDIGCAQQABhAMgYIBRAAGEAyBggGEAAYQDIGCAcQABhAMgYICBAAGEDSAQg4MTk3ajBqMagCCLACAQ&FORM=ANNTA1&PC=U531
   
   
    useEffect( () => {

        const defaultInterval  = 2000 // 2 seconds
        let boxInteval = (overrideInterval === 0) ? defaultInterval : overrideInterval 
        // fix
        // boxInteval = defaultInterval

        debugger

        s('useEffect') 

        s('calling interface') 
        getInterface() 
        localStorage.setItem('interfaceCalled','yes') 
 
        let interval: any = null   
        if (isActive) {

               interval = setInterval( () => { 
               setSeconds((prev:any) => prev + 1); 
               showBox(seconds); 
             }, boxInteval); 

        } else if (isActive  && seconds!= 0) { 
            
            clearInterval(interval)
        } 

        return () => clearInterval(interval) 

       }, [isActive, seconds]);

    

    const toggle = () => {
  
        setIsActive(!isActive)

    }
    const reset = () => {
 
        setIsActive(true)
        setSeconds(0)

    } 
    
  function getCurrentDate() {

     let d = new Date();
     let yyyy = d.getFullYear();
     let mm = d.getMonth() + 1;
     let dd = d.getDate();
     let hh = d.getHours();
     let mi = d.getMinutes();
     let ss = d.getSeconds();
     let yy = yyyy.toString().substring(2);
     let today = yyyy + '-' + pad2(mm) + '-' + pad2(dd);
     // fit on screen history lines
     let shortToday = yy + '-' + pad2(mm) + '-' + pad2(dd);
     //
     let time = pad2(hh) + ':' + pad2(mi) + ':' + pad2(ss);
     //yy = parseInt(yyyy.toString().substring(2,4));
     yy = yyyy.toString().substring(2,4);

     let obj = {today: today, shortToday: shortToday, time: time}
     return obj

  }
  
        function pad2(value:number) : string { 
                
            var v = value.toString();
            var r = (v.length < 2 ) ? '0' + v : v;
            return r; 

        } 
    
    return(<div className='container'>
 
        <h3  style={h3Style}> A500Insurance </h3>
        <h5  style={h5style}> Starting </h5>

        <div id='center' style={divStyle}> 
        <p style={pstyle}>Application is Starting Up ! </p>  
    
        </div> 
        
        <div id='boxes' style={divBoxStyle}> 
        <div className='row'> 
            
            <div className='col-1'> 
                <label id="space1">&nbsp;</label>
            </div>
             <div className='col-1'> 
                <label id="space2">&nbsp;</label>
            </div>
               <div className='col-1'> 
                <label id="space3">&nbsp;</label>
            </div> 

            <div className='col-1'> 
                 <div style={box1style} id='field1' >&nbsp;</div> 
            </div>
             <div className='col-1'> 
                 <div style={box2style} id="field2">&nbsp;</div> 
            </div>
            <div className='col-1'> 
                 <div style={box3style} id="field3">&nbsp;</div> 
            </div>
             <div className='col-1'> 
                  <div style={box4style} id="field4">&nbsp;</div>
            </div> 
        </div>
        </div>

        <div id='center2' style={divStyle}>

        <br />

         <div>  
                  <span style={acounterStyle}>{seconds}</span> 
        </div>

        <br/>
        <br/>  
          
          <button  onClick={toggle} style={firstBtnStyle} className='btn btn-primary'>Toggle</button> 
          
          <button  onClick={reset} style={btnStyle} className='btn btn-primary'>Reset</button>
         
          <button  onClick={onStart} style={btnStyle} className='btn btn-primary'>Start</button>

          <div id='message' style={messageStyle}>
            {message}
          </div>
       
       </div> {/* end center 2 */}


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
        


    </div>)


}
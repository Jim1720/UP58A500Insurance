import { Link } from "react-router-dom"


export default function Start({store}:any) {
 
    let friendlyDate = setTheDateTime()

    let lightMode = localStorage.getItem('lightMode') ?? 'Dark'

    if(store.debug) {
        console.log("===== start app dest data ")
        let a = localStorage.getItem('baseUrl')
        let b = localStorage.getItem('appsLink')
        let c = localStorage.getItem('startLink')
        console.log(a)
        console.log(b)
        console.log(c)
        console.log('-------')
        console.log("works after app runs once to set local storage with the standard entry intrface")
        console.log("as info stored") 
        console.log('-------')
        }

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
    let messageHilightColor = 'yellow'

    if (lightMode === 'Light') { 
            
         labelColor = 'dodgerblue'
         inputColor = 'blue'
         inputBackGroundColor = 'white'
         messageColor = 'blue'
         paraColor = 'dodgerblue'
         titleColor = 'blue' 
         containerBackgroundColor = 'white'
         bottomTextColor = 'dodgerblue'
         messageHilightColor = 'red'

    }

    // test auth
    //localStorage.setItem('appUser','')

    // set up links
    //let appLink = localStorage.getItem('appsLink') ?? ''
    //let startLink = localStorage.getItem('startLink') ?? ''

    // sign out admin when going to start 
    store.adminSignedIn = false // this is not used in the link test in application.tsx
    localStorage.setItem("adminSignedIn",'no') 

    
    let message = localStorage.getItem('startMessage') ?? '' 
    let submessage = '' 
    
    // these may contain alert info from interfcec:
    // setupMessage
    // setupMesageText
    // if they there:

    let setupMessage = localStorage.getItem('setupMessage') ?? ''
    let setupMessageText = localStorage.getItem('setupMessageText') ?? ''
    let messageStyle = { marginLeft: '38%', color: messageColor, fontFamily: 'arial', fontSize: 'large'} 
    let hilightStyle = { marginLeft: '38%', color: messageHilightColor , fontFamily: 'arial', fontSize: 'large'} 
 

    let interfaceHasMessages = (setupMessage !== '')
    if (interfaceHasMessages) {
        message = setupMessage
        submessage = setupMessageText
        // hilight the messages ! 
        messageStyle = hilightStyle
    }

    if(message === '') message = 'Good Morning !' 



    let h3Style = {marginLeft: '42%', color: titleColor, fontFamily: 'arial', 
        marginTop: '2%',
        marginBottom: '2%'}
    let h5style = {color: paraColor, marginLeft: '42%', marginBottom: '2%'}
    let picStyle = { marginLeft: '25%', borderRadius: '5%', marginBottom: '8%'}
    let spanStyle1 = { marginLeft: '10%', color: titleColor, fontFamily: 'arial', fontSize: 'large'} 
    let spanStyle = { marginLeft: '5px', color: bottomTextColor, fontFamily: 'arial', fontSize: 'large'} 
    let linkStyle = { marginLeft: '5px', color: titleColor, fontFamily: 'arial', fontSize: 'large',
                      textDecoration: 'none',
                      fontStyle: 'italic'
    }
    let containerStyle = { width: '100%', height: '100%'} 
    let spaceStyle = {backgroundColor: inputBackGroundColor}
     
    localStorage.setItem('selectedCustId','')  
    localStorage.setItem('signedIn','no')

    return(<div className='container' style={containerStyle}>
 
        <h3 onMouseOver={yellowHover(lightMode)} onMouseLeave={yellowLeave(lightMode)} style={h3Style}> A500Insurance </h3>
        <h5 onMouseOver={goldHover(lightMode)} onMouseLeave={goldLeave(lightMode)}  style={h5style}> You will succeed Praise God </h5>

        <img style={picStyle} src='./images/rock.jpg' 
             width='50%' 
        /> 

        <div id='bottom'>

            <span onMouseOver={yellowHover(lightMode)} onMouseLeave={yellowLeave(lightMode)} style={spanStyle1}>A500Insurance - React</span>  
            <span onMouseOver={whiteHover(lightMode)} onMouseLeave={whiteLeave(lightMode)} style={spanStyle}>Find out info here</span>  
            <Link onMouseOver={yellowHover(lightMode)} onMouseLeave={yellowLeave(lightMode)} style={linkStyle} to="/info">Info</Link>
            <span onMouseOver={whiteHover(lightMode)} onMouseLeave={whiteLeave(lightMode)}  style={spanStyle}>About</span>   
            <Link onMouseOver={yellowHover(lightMode)} onMouseLeave={yellowLeave(lightMode)}  style={linkStyle} to="/about">About</Link>
            <span onMouseOver={whiteHover(lightMode)} onMouseLeave={whiteLeave(lightMode)}  style={spanStyle}>Time to buy</span> 
            <Link onMouseOver={yellowHover(lightMode)} onMouseLeave={yellowLeave(lightMode)} style={linkStyle} to="/register">{friendlyDate}</Link>
            <span onMouseOver={whiteHover(lightMode)} onMouseLeave={whiteLeave(lightMode)}  style={spanStyle}>See More</span>  
            <Link onMouseOver={yellowHover(lightMode)} onMouseLeave={yellowLeave(lightMode)}  style={linkStyle} to="{appLink">Apps</Link>
            <span onMouseOver={whiteHover(lightMode)} onMouseLeave={whiteLeave(lightMode)}  style={spanStyle}>Return to</span>  
            <Link onMouseOver={yellowHover(lightMode)} onMouseLeave={yellowLeave(lightMode)}  style={linkStyle} to="{startLink">Start</Link>


        </div>

                
        <div className="row">
            <p style={spaceStyle}>&nbsp;</p> 
        </div>

        {/* Messages */}
        <div className="row">
            <label onMouseOver={msgHover(lightMode)} onMouseLeave={msgLeave(lightMode)}  style={messageStyle} className='control-label'>{message}</label>   
        </div> 

        <div className="row">
            <label onMouseOver={msgHover(lightMode)} onMouseLeave={msgLeave(lightMode)}  style={messageStyle} className='control-label'>{submessage}</label>   
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

   const setTheDateTime = () : string => { 

          var now = new Date(); 
          
          let d = now;
          let yyyy = d.getFullYear(); 
          let dd = d.getDate(); 
          let hh = now.getHours();
          let mi = d.getMinutes(); 
          let md = mi.toString();
          if (mi < 10) {
            md = "0" + md;
          }
          let ampm = "a.m."; 
          let monthLiteral = findMonth(now.getMonth());
          if (hh === 0) {
              hh = 12;
          }
          if (hh > 12) {
              hh = hh - 12;
              ampm = "p.m.";
          } 
          
          let date =  monthLiteral + ' '  + dd + ' ' + yyyy + ' ' + hh + ':' + md + ' ' + ampm;
          return date
    }


  const findMonth = (value:number) => { 

    var months = ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September','October','November','December'];
    return months[value];

  } 

  const yellowHover = (lightMode:string) => (e:any) => {
         

        let color = (lightMode === "Dark") ? 'lightgoldenrodyellow' : 'red'
        e.target.style.color = color



  }

  
  const yellowLeave = (lightMode:string)  => (e:any) => {  
       
        let color = (lightMode === "Dark") ? 'navajowhite' : 'blue'
        e.target.style.color = color
  }

  
  const goldHover = (lightMode:string) => (e:any) => {
         

        let color = (lightMode === "Dark") ? 'yellow' : 'green'
        e.target.style.color = color



  }

  
  const goldLeave = (lightMode:string)  => (e:any) => {  
       
        let color = (lightMode === "Dark") ? 'white' : 'blue'
        e.target.style.color = color
  }

  
  const whiteHover = (lightMode:string) => (e:any) => {
         

        let color = (lightMode === "Dark") ? 'white' : 'red'
        e.target.style.color = color



  }

  
  const whiteLeave = (lightMode:string)  => (e:any) => {  
       
        let color = (lightMode === "Dark") ? 'lightgray' : 'blue'
        e.target.style.color = color
  }

  
  const msgHover = (lightMode:string) => (e:any) => {
         

        let color = (lightMode === "Dark") ? 'lawngreen' : 'red'
        e.target.style.color = color



  }

  
  const msgLeave = (lightMode:string)  => (e:any) => {  
       
        let color = (lightMode === "Dark") ? 'yellow' : 'blue'
        e.target.style.color = color
  }

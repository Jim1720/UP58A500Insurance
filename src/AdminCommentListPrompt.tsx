import   {  useEffect, useState } from "react"
import { useNavigate } from "react-router-dom" 
 

export default function AdminCommentListPrompt() {

    const [userId, setUserId ] = useState('')  
    const [message, setMessage ] = useState('')

    let navigate = useNavigate() 

    debugger 

    // auth check  
    // navigate is in use effect
    let authCheckPassed = true
    let testMode = localStorage.getItem('testMode') ?? ''
    let appUser = localStorage.getItem('appUser') ?? ''
    let currentMode = (testMode === '') ? 'test' : 'prod'
    //console.log("sign in screen auth check ")
    //console.log(`current Mode: ${currentMode} appUser: ${appUser}`)
    if(currentMode === 'prod' && appUser === '') {

        // production mode
        // app user not set means did not use prescribed login screen
        let message = 'Unauthorized Access'
        let text = 'Please use Application Entry screen to sign in - thank you'
        localStorage.setItem('setupMessage', message) 
        localStorage.setItem('setupMessageText', text)
        // react wants the navigagte call in use effect 
        authCheckPassed = false
        

    }
    // end auth check
    
     // tell the user comment list screen to load 
     localStorage.setItem('userCommentDataLoaded','') 
 
     localStorage.setItem('signedIn','no') 

    
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

    if (lightMode === 'Light') { 
            
         labelColor = 'dodgerblue'
         inputColor = 'blue'
         inputBackGroundColor = 'white'
         messageColor = 'blue'
         paraColor = 'dodgerblue'
         titleColor = 'blue' 
         containerBackgroundColor = 'white' 

    }

    /* form updates : 

            useState
            onChange
            value=


    */ 

    let containerStyle = {backgroundColor: containerBackgroundColor}

    let h3Style = {marginTop: '3%', marginLeft: '38%', color: titleColor, fontFamily: 'arial', marginBottom: '1%'}
    
    let divStyle = {  marginLeft: '38%'}
    
    let pstyle = { color: paraColor , fontFamily: 'arial', fontStyle:'italic', fontSize: 'large',
        marginTop: '8%'
    }
    let labelStyle = {marginTop: '1%', color: labelColor, fontFamily: 'arial', fontSize:'larger'}
    
    let inputStyle = { marginTop: '1%', color: inputColor, backgroundColor: inputBackGroundColor , fontFamily: 'arial', fontSize:'larger'}
          
    let b1first =  { marginLeft: '28%',  fontFamily: 'arial', fontSize: 'large'}

    let b1 = {marginLeft : '2%', fontFamily: 'arial', fontSize: 'large'}

    let spaceStyle = { backgroundColor: inputBackGroundColor}

    let btnRow = { marginTop: '14%'}

    
    let messageStyle = {marginLeft: '35%', marginTop: '4%', color: messageColor , fontFamily: 'arial', fontSize:'larger'}
 
   

    useEffect( () => {

           // react prevents navigation in the auth check above
           if(authCheckPassed === false) {
              let startDest = localStorage.getItem('startDest') ?? '/start'
              navigate(startDest)
              return
           }

           let appUser = sessionStorage.getItem('appUser') ?? ''
           let testMode = sessionStorage.getItem('testMode') ?? ''
           const usingTestMode = ''
           if(appUser === '' && testMode != usingTestMode) { 

            // unauthorized access detected 

            let message = 'Unauthorized Access'
            let text = 'Please sign in using the main application screen'

            //setStore({ setupMessage: message})
            //setStore({ setUpMessageText: text })

            localStorage.setItem('setupMessage', message) 
            localStorage.setItem('setupMessageText', text)
            let startDest = localStorage.getItem('startDest') ?? '/unauthorized'
            navigate(startDest)
            return
        }

       
         

    }) 

    const handleChange = (event:any) => {

        debugger

        let t = event.target 
        let id : string | null = t.getAttribute('id')  
        switch(id) {

            case 'userId' : setUserId(event?.target.value); break; 

        }

    }

    const onSearch = (event:any) => {

           event.preventDefault() 

           if(userId.trim() === '') {

            setMessage("User Id is blank please enter one")
            return;

         }

         const pattern = /^[ A-Za-z0-9]*$/
         if (pattern.test(userId) === false) { 
             setMessage(`User id is invalid: ${userId}`) 
             return
         } 

            let formattedUserId = userId.toString().trim()

            localStorage.setItem('userCommentSearchLoaded',formattedUserId) 

            //setMessage("screen in development")

           navigate('/admincommentlist')  

    }

    
    const onSearchAll = () => {

            localStorage.setItem('userCommentSearchLoaded','')  
            
            //setMessage("screen in development")

            navigate('/admincommentlist')  

    }

    
    const onListsMenu = () => {
 
           // useNavigate
            navigate('/adminlistsmenu')  

    }

    
    const onMainMenu = () => {
 
           // useNavigate
            navigate('/adminmenu')  

    }
 
 
      

      
  
    
  const whiteHover = (lightMode:string) => (e:any) => {
         

        let color = (lightMode === "Dark") ? 'white' : 'green'
        e.target.style.color = color 
  }

  
  const whiteLeave = (lightMode:string)  => (e:any) => {  
       
        let color = (lightMode === "Dark") ? 'dodgerblue' : 'blue'
        e.target.style.color = color
  }

  const yellowHover = (lightMode:string) => (e:any) => {
         

        let color = (lightMode === "Dark") ? 'lightgoldenrodyellow' : 'red'
        e.target.style.color = color



  }

  
  const yellowLeave = (lightMode:string)  => (e:any) => {  
       
        let color = (lightMode === "Dark") ? 'navajowhite' : 'blue'
        e.target.style.color = color
  }
    return(<div style={containerStyle}  className='container'>
 
        <h3 onMouseOver={yellowHover(lightMode)}
             onMouseLeave={yellowLeave(lightMode)} 
             style={h3Style}> User Comment List Search  </h3> 

        <div id='center' style={divStyle}> 
        <p style={pstyle}>Enter your user id or leave blank for all users</p>

        <div className="Row">

            <div className="col-4">

            <label onMouseOver={whiteHover(lightMode)} onMouseLeave={whiteLeave(lightMode)}  style={labelStyle} className='control-label'>User Identification</label>  
            <input value={userId} id='userId' onChange={handleChange} style={inputStyle} type='text' className='form-control'/>
           
            </div>
        </div> 
    </div>  

    
     <div style={btnRow} className='Row'>

          <button onClick={onSearch}  style={b1first} className='btn btn-primary'>Select User</button> 

          <button onClick={onSearchAll}  style={b1} className='btn btn-primary'>All Users</button>  

          <button onClick={onListsMenu}  style={b1} className='btn btn-primary'>Lists Menu</button> 

          <button onClick={onMainMenu}  style={b1} className='btn btn-primary'>Main Menu</button>

     </div>

       <div className="Row"> 

            <label style={messageStyle} className='control-label'>{message}</label>   

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
 
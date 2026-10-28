import   {  useEffect, useState } from "react"
import { useNavigate } from "react-router-dom" 
import { resetPassword } from "./Database"
 

export default function AdminPasswordReset() {

    const [customerId, setCustomerId ] = useState('')  
    const [password, setPassword ] = useState('')  
    const [confirm, setConfirm] = useState('')   
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
    let containerStyle = {backgroundColor: containerBackgroundColor}

    let h3Style = {marginTop: '3%', marginLeft: '42%', color: titleColor, fontFamily: 'arial', marginBottom: '1%'}
    
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

            case 'customerId' : setCustomerId(event?.target.value); break;  
            case 'password' : setPassword(event?.target.value); break;  
            case 'confirm' : setConfirm(event?.target.value); break; 

        }

    }

    const onSearch = (event:any) => {

           event.preventDefault() 

           if(customerId.trim() === '') {

            setMessage("Customer Id is blank please enter one")
            return;

         }

         const pattern = /^[ A-Za-z0-9]*$/
         if (pattern.test(customerId) === false) { 
             setMessage(`Customer id is invalid: ${customerId}`) 
             return
         } 

             if(password.trim() === '') {

            setMessage("Password is blank please enter one")
            return;

         }
 
         if (pattern.test(password) === false) { 
             setMessage(`Password is invalid: ${password}`) 
             return
         } 

         if(confirm.trim() === '') {

            setMessage("Confirm is blank please enter one")
            return;

         }
 
         if (pattern.test(confirm) === false) { 
             setMessage(`Confirm is invalid: ${confirm}`) 
             return
         } 
 
        
          if(password !== confirm) {
             setMessage("Confirm must match pasword") 
             return 
          }
 

           resetPassword(customerId, password).then( (r:any) => {

                debugger
                let statusText = r['statusText']
                let message =(statusText === 'OK') ?
                    "Password Reset Successfully" :
                    "Password Reset not successful"
                setMessage(message)
                return

    })
    
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
             style={h3Style}> Password Reset</h3> 

        <div id='center' style={divStyle}> 
        <p style={pstyle}>Enter customer id , password and confirmation password</p>

        <div className="Row">

            <div className="col-4">

            <label onMouseOver={whiteHover(lightMode)} onMouseLeave={whiteLeave(lightMode)}  style={labelStyle} className='control-label'>Customer Id</label>  
            <input value={customerId} id='customerId' onChange={handleChange} style={inputStyle} type='text' className='form-control'/>
           
            </div>

              <div className="col-4">

            <label onMouseOver={whiteHover(lightMode)} onMouseLeave={whiteLeave(lightMode)}  style={labelStyle} className='control-label'>New Password</label>  
            <input value={password} id='password' onChange={handleChange} style={inputStyle} type='text' className='form-control'/>
           
            </div>

            
              <div className="col-4">

            <label onMouseOver={whiteHover(lightMode)} onMouseLeave={whiteLeave(lightMode)}  style={labelStyle} className='control-label'>Confrim Password</label>  
            <input value={confirm} id='confirm' onChange={handleChange} style={inputStyle} type='text' className='form-control'/>
           
            </div>
        </div> 
    </div>  

    
     <div style={btnRow} className='Row'>

          <button onClick={onSearch}  style={b1first} className='btn btn-primary'>Reset Password</button>  

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
 
import   {  useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { signInCustomer } from "./Database"
 

export default function SignIn({setSignedIn,store,setStore}:any) {

    const [customerId, setCustomerId ] = useState('')
    const [password,   setPassword] = useState('')
    const [message, setMessage] = useState('')

    
     const s = (value:string) => {

        if(store.debug) {

            const {shortToday, time} = getCurrentDate()
            const prefix = shortToday + time
            console.log(`${prefix} Claim ${value}`)

        }

    }

    let navigate = useNavigate()
    let message2 = '' 

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

    let h3Style = {marginLeft: '42%', color: titleColor, fontFamily: 'arial', marginBottom: '1%'}
    
    let divStyle = {  marginLeft: '38%'}
    let pstyle = { color: paraColor , fontFamily: 'arial', fontStyle:'italic', fontSize: 'large',
        marginTop: '8%'
    }
    let labelStyle = {marginTop: '1%', color: labelColor, fontFamily: 'arial', fontSize:'larger'}
    
    let inputStyle = { marginTop: '1%', color: inputColor, backgroundColor: inputBackGroundColor , fontFamily: 'arial', fontSize:'larger'}
      
    let messageStyle = {marginTop: '1%', color: messageColor , fontFamily: 'arial', fontSize:'larger'}
 
    let btnStyle = { fontSize: 'larger' }

    let spaceStyle = { backgroundColor: inputBackGroundColor}

   

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

        // search customer return logic
        let selectedCustId = localStorage.getItem('selectedCustId') ?? '' 
        if(selectedCustId !== '') {

            // I do not think using state is permitted so use message2 for this purpose:
            // and customerId is a controlled field 
            let name = localStorage.getItem('selectedName')
            message2 = `Customer ${selectedCustId} is ${name}`
            setMessage(message2)
            setCustomerId(selectedCustId)
        }

         

    }) 

    const handleChange = (event:any) => {

        debugger

        let t = event.target 
        let id : string | null = t.getAttribute('id')  
        switch(id) {

            case 'customerId' : setCustomerId(event?.target.value); break;
            case 'password'   : setPassword(event?.target.value);   break;

        }

    }

    const handleCustomerSearch = () => {

            localStorage.setItem('customerSearchLoaded','')
           // useNavigate
            navigate('/customersearch')  

    }
 
     
    const   handleSignin = async (event:any) => {

        setStore({hello: 'hello'})

         event.preventDefault() 

         if(customerId.trim() === '') {

            setMessage("Customer Id is blank please enter one")
            return;

         }

          if(password.trim() === '') {

            setMessage("Password is blank please enter one")
            return;

         } 
         
         const pattern = /^[ A-Za-z0-9]*$/
         if (pattern.test(password) === false) { 
             setMessage(`Password is invalid: ${customerId}`) 
             return
         } 

         // set up react env var for baseUrl:

         interface ReturnObject {
            Status: string
            Customer: Customer,
            Token: string,
            Message: string
         }
          interface Customer {
            custFirst: string,
            custLast: string,
            custId: string,
            custPlan: string
         }

         await signInCustomer(customerId, password).then( (returnObject:ReturnObject) => { 

                
            //TODO: handle routing
            //TODO: handle state between routes wrap/zend
            //  e.x.  top right  id + name fields to test first
            // assume cust 1 is valid for now and add db later after first two above

            if (returnObject.Status !== "Successful") {

                // show message
                setMessage(returnObject.Message)
                return
            }

            let first = returnObject.Customer.custFirst
            let last = returnObject.Customer.custLast
            let name = first + ' ' + last   
            let token = returnObject.Token 
            localStorage.setItem('Token',token) 

            // try using localstorage to handle state
            localStorage.setItem('customerId',customerId)
            localStorage.setItem('customerName',name)
            localStorage.setItem('signedIn','yes')
 
            // update links
            setSignedIn(true) 
 
             // store customer for update screen usage  
            localStorage.setItem('storedCustomerType','signin')
            let json = JSON.stringify(returnObject.Customer)
           s("signin stored customer json debug gender")
           s(json)
            localStorage.setItem('storedCustomer',json) 

            let thePlan = returnObject.Customer.custPlan
            localStorage.setItem('custPlan',thePlan)

            // set main menu message
            //localStorage.setItem('mainMenuMessage',`Customer ${name} signed in`)

            /* json was empty in update - stored customer did not persist 
               however there were error messages talking about can not
               update diff component while rendering this component ref to main menu
               could not find stack trace */
               
            setStore({
                customerId: customerId,
                customerName: name,
                signedIn: 'yes',
                mainMenuMessage: `Customer ${name} signed in`,
                storedCustomerType: 'signin',
                storedCustomer: json,
                custPlan: thePlan,
                mainMenuMesssage: `Customer ${name} signed in`
            })

            s('signin stored json')
            s(json)

            // useNavigate
            navigate('/mainmenu') 

         })



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
 
        <h3 onMouseOver={yellowHover(lightMode)} onMouseLeave={yellowLeave(lightMode)}  style={h3Style}> Customer Sign In </h3> 

        <div id='center' style={divStyle}> 
        <p style={pstyle}>Enter your customer id and password to sign in</p>

        <div className="Row">

            <div className="col-4">

            <label onMouseOver={whiteHover(lightMode)} onMouseLeave={whiteLeave(lightMode)}  style={labelStyle} className='control-label'>Customer Identification</label>  
            <input value={customerId} id='customerId' onChange={handleChange} style={inputStyle} type='text' className='form-control'/>
           
            </div>
        </div>

        <div className='Row'>&nbsp;</div>

          <div className="Row">

            <div className="col-4">

            <label onMouseOver={whiteHover(lightMode)} onMouseLeave={whiteLeave(lightMode)} style={labelStyle} className='control-label'>Customer Password</label>  
            <input value={password} id='password' onChange={handleChange} style={inputStyle} type='text' className='form-control'/>
           
            </div>
        </div>

          <div className='Row'>&nbsp;</div>

          <button onClick={handleSignin}  style={btnStyle} className='btn btn-primary'>Sign In</button> 
          &nbsp; &nbsp;
          <button onClick={handleCustomerSearch}  style={btnStyle} className='btn btn-primary'>Customer Search</button>
          
          <div className='Row'>&nbsp;</div>

          <div className="Row">

            <div className="col-4">

            <label style={messageStyle} className='control-label'>{message}</label>   
           
            </div>
        </div>

        
          <div className="Row">

            <div className="col-4">

            <label style={messageStyle} className='control-label'>{message2}</label>   
           
            </div>
        </div>


        
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
 
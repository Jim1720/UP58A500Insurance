import   {  useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { signInAdministrator } from "./Database"
 

export default function AdminSignIn({setStore}:any) {

    const [adminId,  setAdminId ] = useState('')
    const [password, setPassword] = useState('')
    const [message,  setMessage]  = useState('')

     

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
    



interface UserAuthLevel {

   Status:string,
   Message:string,
   UserId:string,
   Password:string,
   AuthType:string,
   Customer:string, /* auth level */
   Level:string,
   Token:string,
   AllowAdmin:string,
   ShowUsers:string,
   ShowCustomers:string,
   ShowComments:string,
   MaintainPlans:string,
   MaintainServices:string,
   ResetLimited:string,
   ResetFull:string

}
  
 
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

      

    }) 

    const handleChange = (event:any) => {

        debugger

        let t = event.target 
        let id : string | null = t.getAttribute('id')  
        switch(id) {

            case 'adminId'    : setAdminId(event?.target.value); break;
            case 'password'   : setPassword(event?.target.value);   break;

        }

    } 

    
    const  handleAdminSignin = async (event:any) => { 

         event.preventDefault() 

         if(adminId.trim() === '') {

            setMessage("Admin Id is blank please enter one")
            return;

         }

           const pattern = /^[ A-Za-z0-9]*$/
         if (pattern.test(adminId) === false) { 
             setMessage(`Admin id is invalid: ${password}`) 
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
 
     
   await signInAdministrator(adminId,password).then( (d:any) => {

           debugger

           if(d === null || d === undefined) {

                setMessage('Unsuccessful operation')
                return
           }
 
           let r:UserAuthLevel = d['data']

           if(r.Status !== "Successful") {
                 setMessage(r.Message)
                 return
           }

           //store.AuthType = r.AuthType
           setStore({authType: r.AuthType})

           if (r.AuthType === "Indiv") {

               let allowAdmin = r.AllowAdmin
               if(allowAdmin === "N") {
                  setMessage("User does not have admnistration access")
                   return
               }

               // make sure user has permisison to do something !
               if( r.ShowUsers === "N" &&
                   r.ShowCustomers === "N" &&
                   r.ShowComments === "N" &&
                   r.MaintainPlans === "N" &&
                   r.MaintainServices === "N" &&
                   r.ResetFull === "N" &&
                   r.ResetLimited === "N"
               ) {

                   setMessage("User does not have a specific access role assigned");
                   return
               }

               // ready to go set store values

               setStore({

                 AdminToken: r.Token,
                 Showusers: r.ShowUsers,
                 ShowCustomers: r.ShowCustomers,
                 ShowComments: r.ShowComments,
                 MaintainPlans: r.MaintainPlans,
                 MaintainServices: r.MaintainServices,
                 ResetFull: r.ResetFull,
                 ResetLimited: r.ResetLimited

               })

                /*store.AdminToken = r.Token

               store.ShowUsers = r.ShowUsers
               store.ShowCustomers = r.ShowCustomers
               store.ShowComments = r.ShowComments
               store.MaintainPlans = r.MaintainPlans
               store.MaintainServices = r.MaintainServices
               store.ResetFull = r.ResetFull
               store.ResetLimited = r.ResetLimited */

               if(r.ResetFull === "Y" || r.ResetLimited === "Y") {
                   //store.DoReset = "Y"
                   setStore({DoReset: "Y"})
               }

               if(r.ResetFull === "Y") {
                  //store.AllowCustReset = "Y"
                  setStore({AllowCustReset: "Y"})
               }

              /* store.adminSignedIn = true
              store.signedIn = false
              store.signedOut = false */

              setStore({adminSignedIn: true,
                        signedIn: false,
                        siengedOut: false
              })
              
               localStorage.setItem('adminSignedIn','yes') 
               navigate('/adminmenu')
               return


           }


           if(r.AuthType == "Admin") {

                let limitedUse = r.Customer.toString().trim() /* auth level */
                // TODO: or changed to and - bug --
                if(limitedUse !== null && limitedUse !== undefined) {

                    setStore({LimitedUse: limitedUse})
                    //store.LimitedUse = limitedUse
                }

               // ready to go set store values

               //store.AuthLevel = limitedUse /* redundant */
               setStore({AuthLevel: limitedUse})
               let authLevel = limitedUse /* readability */

               //

              /*store.AdminToken = r.Token

              store.adminSignedIn = true
              store.signedIn = false
              store.signedOut = false */

              setStore({AdminToken: r.Token,
                        adminSignedIn: true,
                        signedIn: false,
                        signedOut: false
              })

              const yes = 'Y'
              const no = 'N'

               switch(authLevel) {

                  case 'super' :

                    /*store.ShowComments = yes
                    store.ShowUsers = yes
                    store.ShowCustomers = yes
                    store.MaintainPlans = yes
                    store.MaintainServices = yes
                    store.ResetFull = yes
                    store.ResetLimited = no
                    store.DoReset = yes*/
                    

                        setStore({
 
                            
                            ShowComments: yes,
                            ShowUsers: yes,
                            ShowCustomers: yes,
                            MaintainPlans: yes,
                            MaintainServices: yes,
                            ResetFull: yes,
                            ResetLimited: yes,
                            DoReset: yes 

                        })

                        break

                  case 'complete' :

                    /*store.ShowComments = no
                    store.ShowUsers = yes
                    store.ShowCustomers = yes
                    store.MaintainPlans = yes
                    store.MaintainServices = yes
                    store.ResetFull = yes
                    store.ResetLimited = no
                    store.DoReset = yes*/

                    
                        setStore({
 
                            
                            ShowComments: no,
                            ShowUsers: yes,
                            ShowCustomers: yes,
                            MaintainPlans: yes,
                            MaintainServices: yes,
                            ResetFull: yes,
                            ResetLimited: no,
                            DoReset: yes 

                        })


                    break

                   case 'limited' :

                    /*store.ShowComments = no
                    store.ShowUsers = no
                    store.ShowCustomers = yes
                    store.MaintainPlans = yes
                    store.MaintainServices = yes
                    store.ResetFull = no
                    store.ResetLimited = yes
                    store.DoReset = yes*/

                        
                        setStore({
 
                            
                            ShowComments: no,
                            ShowUsers: no,
                            ShowCustomers: yes,
                            MaintainPlans: yes,
                            MaintainServices: yes,
                            ResetFull: no,
                            ResetLimited: yes,
                            DoReset: yes 

                        }) 

                    break

                   default:

                      break


               } 

               localStorage.setItem('adminSignedIn','yes')
               navigate('/adminmenu')
               return

           }

    })

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
 
        <h3 onMouseOver={yellowHover(lightMode)} onMouseLeave={yellowLeave(lightMode)}  style={h3Style}> Administration Sign In </h3> 

        <div id='center' style={divStyle}> 
        <p style={pstyle}>Enter your administration id and password to sign in</p>

        <div className="Row">

            <div className="col-4">

            <label onMouseOver={whiteHover(lightMode)} onMouseLeave={whiteLeave(lightMode)}  style={labelStyle} className='control-label'>Administration Identification</label>  
            <input value={adminId} id='adminId' onChange={handleChange} style={inputStyle} type='text' className='form-control'/>
           
            </div>
        </div>

        <div className='Row'>&nbsp;</div>

          <div className="Row">

            <div className="col-4">

            <label onMouseOver={whiteHover(lightMode)} onMouseLeave={whiteLeave(lightMode)} style={labelStyle} className='control-label'>Administration Password</label>  
            <input value={password} id='password' onChange={handleChange} style={inputStyle} type='text' className='form-control'/>
           
            </div>
        </div>

          <div className='Row'>&nbsp;</div>

          <button onClick={handleAdminSignin}  style={btnStyle} className='btn btn-primary'>Sign In</button> 
            
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
 
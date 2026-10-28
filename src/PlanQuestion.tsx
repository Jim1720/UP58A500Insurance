
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"


    const handlePlanSelect = (navigate:any) => (event:any) => {

         navigate('/plan')  // until plan screen gets written 

    }

     const handleSkip = (navigate:any) => (event:any) =>  {
        
          navigate('/mainmenu')
    }

export default function PlanQuestion() {

    
     let navigate = useNavigate()

     // auth check  
             // navigate is in use effect
             let authCheckPassed = true
             let testMode = localStorage.getItem('testMode') ?? ''
             let appUser = localStorage.getItem('appUser') ?? ''
             let currentMode = (testMode === '') ? 'test' : 'prod'
            // console.log("plan question screen auth check ")
            // console.log(`current Mode: ${currentMode} appUser: ${appUser}`)
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
          
             useEffect( () => {
     
                // react prevents navigation in the auth check above
                if(authCheckPassed === false) {
                   let startDest = localStorage.getItem('startDest') ?? '/start'
                   navigate(startDest)
                   return
                } 
             })
   
    let h3Style = {marginLeft: '42%', color: 'navajowhite', fontFamily: 'arial', marginBottom: '1%'}
    
   
    let divStyle = { marginLeft: '38%'}
    let pstyle = { color: 'white', fontFamily: 'arial', fontStyle:'italic', fontSize: 'large',
        marginTop: '8%'
    }
  
    let btnStyle = { fontSize: 'larger' }

    //console.log('question screen stored customer is:')
    //let json = store.storedCustomer
    //console.log(json)
    //console.log('---')



    return(<>
 
        <h3  style={h3Style}> Plan Question  </h3> 

        <div id='center' style={divStyle}> 

        <p style={pstyle}>You must select a plan before claims can be created !</p> 

         <div className='Row'>&nbsp;</div>
     
              <button onClick={handlePlanSelect(navigate)}  style={btnStyle} className='btn btn-primary'>
                      Select Plan
              </button> 
              &nbsp;&nbsp;
              <button onClick={handleSkip(navigate)}  style={btnStyle} className='btn btn-primary'>
                      Skip and select Later
              </button>
      

        
        </div>


    </>)


} 
 import { useEffect } from "react"
import { useNavigate } from "react-router-dom"


const signOut = (setSignedIn:any, navigate:any) => () => {
 
      setSignedIn(false) 
      navigate('/')

}


export default function MainMenu({setSignedIn,store,setStore}:any) { 
 
        debugger 
    
        // auth check  
        // navigate is in use effect
        let authCheckPassed = true
        let testMode = localStorage.getItem('testMode') ?? ''
        let appUser = localStorage.getItem('appUser') ?? ''
        let currentMode = (testMode === '') ? 'test' : 'prod'
        //console.log("menu screen auth check ")
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
     
        useEffect( () => {

           // react prevents navigation in the auth check above
           if(authCheckPassed === false) {
              let startDest = localStorage.getItem('startDest') ?? '/start'
              navigate(startDest)
              return
           } 
        })

    // TODO: fix this logic 
    // Refactor: one common module from each screen
     localStorage.setItem("updateScreenIsLoaded",'')
     localStorage.setItem("claimScreenIsLoaded","") 
     localStorage.setItem('historyScreenIsLoaded','')
     localStorage.setItem('planScreenIsLoaded','')
     localStorage.setItem('payHistoryLoaded','')
     localStorage.setItem('claimScreenLoaded','')
     localStorage.setItem('customerSearchLoaded','')

     localStorage.setItem('claimServiceSetup','')
     localStorage.setItem('comboLoaded','')

    //let hello = store.hello 
    //console.log('main menu hello ?', hello)

    //let json = store.storedCustomer 
    //console.log("main menu")
    //console.log(json)

     /*
     setStore({
        updateScreenIsLoaded: '',
        claimScreenIsLoaded: '',
        historyScreenIsLoaded: '',
        claimServiceSetup: '',
        comboLoaded: ''
     }) */
 
     //setStore({historyScreenIsLoaded:'no'})
     //setStore({updateScreenIsLoaded: 'no'})
     
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

    if (lightMode === 'Light') { 
            
         labelColor = 'dodgerblue'
         inputColor = 'blue'
         inputBackGroundColor = 'white'
         messageColor = 'blue'
         paraColor = 'dodgerblue'
         titleColor = 'blue' 
         containerBackgroundColor = 'white'
         bottomTextColor = 'dodgerblue'

    }

    
    let h3Style = {marginLeft: '42%', color: titleColor, fontFamily: 'arial', marginBottom: '1%'}
    let h5style = {color: messageColor, marginLeft: '42%', marginBottom: '2%'}
    let picStyle = { marginLeft: '25%', borderRadius: '5%', marginBottom: '4%'}
    let spanStyle1 = { marginLeft: '20%', color: 'navajowhite', fontFamily: 'arial', fontSize: 'large'} 
    let spanStyle = { marginLeft: '5px', color: 'lightgray', fontFamily: 'arial', fontSize: 'large'} 
    let linkStyle = { marginLeft: '5px', color: 'navajowhite', fontFamily: 'arial', fontSize: 'large',
                      textDecoration: 'none',
                      fontStyle: 'italic'
    }
    let bottomStyle = { marginLeft: '25%', display: 'inline'}
    let btnStyle = {marginLeft: '4%', fontSize: 'larger '}

    // let mainMenuMessage = localStorage.getItem("mainMenuMessage") ?? ''
    
    let mainMenuMessage = store.mainMenuMessage ?? ''

    let mainMenuMessageStyle = { marginLeft: '35%', marginTop: '2%', 
                                fontSize: 'larger',
                                fontFamily: 'arial', color: inputColor}

    let spaceStyle = { backgroundColor: inputBackGroundColor }

    const onPlan = () => {

        navigate('/plan')
        return

    }

    const onUpdate = () => {

        navigate('/update')
        return

    }

    
    const onClaim = () => {

        navigate('/claim')
        return

    }

    
    const onHistory = () => {

        navigate('/history')
        return

    }
 

    return(<>
 
        <h3  style={h3Style}> A500Insurance </h3>
        <h5  style={h5style}>Application Main Menu </h5>

        <img style={picStyle} src='./images/rock.jpg' 
             width='50%' 
        /> 

        <div id='bottom' style={bottomStyle}>


             <button onClick={onUpdate} style={btnStyle} className='btn btn-primary'>
                Update
            </button>

            <button onClick={onClaim} style={btnStyle} className='btn btn-primary'>
                Claim
            </button> 

            <button onClick={onHistory}  style={btnStyle} className='btn btn-primary'>
                History
            </button> 
            
            
            <button onClick={onPlan} style={btnStyle} className='btn btn-primary'>
                Plan
            </button>

            <button style={btnStyle} onClick={signOut(setSignedIn, navigate)} className='btn btn-primary'>
                Sign Out
            </button>
    

        </div>

        <div style={mainMenuMessageStyle} id='mainMenuMessage'>
                {mainMenuMessage}
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

    </>)


}
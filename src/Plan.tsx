 
import { useNavigate } from "react-router-dom"
import { readPlans, updatePlan } from "./Database" 
import { useEffect, useState } from "react"
   


export default function Plan({setPlanArray, store, setStore}:any) { 
 
    // forces reload after screen lines populated
    const [titleMessage,setTitleMessage] = useState('')
    const lineTemplate : any [] = []
    const [screenLines,setScreenLines] = useState(lineTemplate)

    
      
     const s = (value:string) => {

        if(store.debug) {

            const {shortToday, time} = getCurrentDate()
            const prefix = shortToday + time
            console.log(`${prefix} Claim ${value}`)

        }
    }
    
  // auth check  
        // navigate is in use effect
        let authCheckPassed = true
        let testMode = localStorage.getItem('testMode') ?? ''
        let appUser = localStorage.getItem('appUser') ?? ''
        let currentMode = (testMode === '') ? 'test' : 'prod'
        s("plan screen auth check ")
        s(`current Mode: ${currentMode} appUser: ${appUser}`)
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
    let plans: any [] = [] // has plan and literal info
    let array: any [] = [] // for claim screen passed up to state
    let lines: any [] = [] // screen lines
 

       localStorage.setItem('historyScreenIsLoaded','no')
       //setStore({historyScreenIsLoaded:'no'})
    
      let navigate = useNavigate()   
 

     localStorage.setItem("claimScreenIsLoaded","") 

      // plan data gets stored in application state to 
      // avoid extra database reads
      
     // setPlanArray(plans) movdd to 130

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
    
    let pstyle = { color: 'white', fontFamily: 'arial', fontStyle:'italic', fontSize: 'large',
        marginTop: '8%'
    }


    let btnStyle = {fontSize: 'larger', fontFamily: 'arial'}  
    let bottomBtnStyle = {marginTop: '10%', fontSize: 'larger', fontFamily: 'arial'}    
    let planLiteralStyle = {color: 'white', fontSize: 'larger', fontFamily: 'arial'}
    let divStyle = {marginLeft: '35%', marginTop: '1%'}
    let lineStyle = {marginTop: '2%'}
    let spaceStyle = {backgroundColor: inputBackGroundColor}


    const getPlans = async () => { 
        
        await readPlans().then( (list: any) => { 
                    
                    // Id PlanName PlanLiteral Percent 
                    for(var {Id, PlanName, PlanLiteral, Percent} of list) { 
        
                        let item = {Id: Id, PlanName: PlanName, PlanLiteral: PlanLiteral, Percent: Percent} 
                        s(`read: ${PlanName}`)
                        plans.push(item) 

                        // set up plan array to hold plan / percents

                        let planArrayObject = {PlanName: PlanName, Percent: Percent}
                        array.push(planArrayObject)
        
                    }  
                    debugger

                    buildScreen()
                    
                    
        })   
    }

       const buildScreen = () => {

            let key = 1
            for(var plan of plans) { 

                debugger 
                let name = plan['PlanName']
                let lit = plan['PlanLiteral']

                // put this in state to force reload after the screen data is set 
                s(`[plan] loading screen line for plan ${name} literal ${lit}`)
            
                let line = <div key={key} className='row' style={lineStyle}>
        
                        <div className='col-3'> 
                        <button  onClick={selectPlan(name)}
                                    className='btn btn-primary'
                                    style={btnStyle}>

                                {name}

                        </button>
                        </div>
                        <div className='col-5'> 
                        <span style={planLiteralStyle}>{lit}</span>
                        </div>

                </div>

                lines.push(line)
                key++

            }  

            let count = lines.length 

            // ah ha - set title message with plan count to force population of screen lines
            // looks like useeffect runs after screen render

            setScreenLines(lines) // need this too ! :)
            setTitleMessage(count + ' plan(s) loaded')
       }

       const selectPlan = (selectedPlan:string) => async () => {
    
             // update customer plan data
             debugger
             let customerId = localStorage.getItem('customerId') ?? ''
             let token = localStorage.getItem('Token') ?? ''
             let thePlan = selectedPlan.trim()
    
             await updatePlan(customerId, thePlan, token).then( (result:any) => {
    
                    let data = result['data']
                    if (data !== 'OK') {
                        let message = "Error Updating Customer Plan"
                        //localStorage.setItem('mainMenuMessage', message)
                        setStore({mainMenuMessage: message})
                    }
    
    
             })

             // put plan in local storage for update screen display
             let customerStorage = localStorage.getItem('storedCustomer') ?? ''
             s('plan screen')
             //let ProposedCustomerStorage = store.storedCustomer
             s('customer storage')
           //  s(customerStorage)
             s("proposed cust storage")
            // s(ProposedCustomerStorage)
             let customer = JSON.parse(customerStorage)
             customer['custPlan'] = thePlan
             let json = JSON.stringify(customer)
             localStorage.setItem('storedCustomer',json)
             localStorage.setItem('custPlan',thePlan)

             // from signin
              setStore({

                storedCustomerType: 'plan',
                storedCustomer: json,
                custPlan: thePlan,
                mainMenuMesssage: `Plan changed to ${thePlan}`
            })

             //localStorage.setItem('mainMenuMessage',`Plan successfully updated to : ${thePlan}`)
             setStore({mainMenuMessage: `Plan successfully updated to : ${thePlan}` })

             navigate('/mainmenu') 
             
        } 
  

    const onMenu = () => {

        navigate('/mainmenu')

    }

        function pad2(value:number) : string { 
                
            var v = value.toString();
            var r = (v.length < 2 ) ? '0' + v : v;
            return r; 

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

    useEffect( () => {

        // hist build screen is in the claw ! 

        s('useeffect')
        let planScreenIsLoaded = localStorage.getItem('planScreenIsLoaded')
        s(`planscreen is loaded ${planScreenIsLoaded}`)
        if( planScreenIsLoaded === '') {
        
            s('getting plans')
            getPlans()
            localStorage.setItem('planScreenIsLoaded','yes')
        
        }

    })
 

    return(<>
 
        <h3  style={h3Style}> A500Insurance </h3>
        <h5  style={h5style}> {titleMessage} </h5>

        <div id='center' style={divStyle}> 
        <p style={pstyle}>Select a plan for the customer:</p>

            {screenLines} 

            <button onClick={onMenu} style={bottomBtnStyle} className='btn btn-primary'>Cancel</button>
        
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
import { useNavigate } from "react-router-dom"
import { readCustomersForUser } from "./Database"
import { useEffect, useState } from "react" 

export default  function CustomerSearch({store}:any) {  

     let navigate = useNavigate() 

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
        //console.log("cust search screen auth check ")
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

           // react prevents navigation in the auth check above
           if(authCheckPassed === false) {
              let startDest = localStorage.getItem('startDest') ?? '/start'
              navigate(startDest)
              return
           } 
        })
 
      
     let rows: any [] = []  // hold customers

     let lightMode = localStorage.getItem('lightMode') ?? 'Dark'

     /* light mode effects */

    /* TODO: fill page with container */ 
 
    let inputColor = 'white'
    let inputBackGroundColor = 'black'
    let messageColor = 'white'
    let paraColor = 'white'
    let titleColor = 'navajowhite'
    let containerBackgroundColor = 'black'
    let bottomTextColor = 'lightgray' 
    let lightGoldenRodYellow = 'lightGoldenRodYellow'

    if (lightMode === 'Light') { 
             
         inputColor = 'blue'
         inputBackGroundColor = 'white'
         messageColor = 'blue'
         paraColor = 'dodgerblue'
         titleColor = 'blue' 
         containerBackgroundColor = 'white'
         bottomTextColor = 'dodgerblue' 
         lightGoldenRodYellow = 'dodgerblue'

    }

    let h3Style = {marginTop: '2%', fontStyle: 'italic', marginLeft: '38%', color: titleColor, fontFamily: 'arial', marginBottom: '1%'}
    let h5style = {marginTop: '2%', color: lightGoldenRodYellow, marginLeft: '34%', marginBottom: '2%', fontStyle: 'italic'} 
   
    let divStyle = { marginLeft: '35%'}

   
    let spanStyle = { color: titleColor}
    let spaceStyle = { backgroundColor: inputBackGroundColor}

    
    let selectCustomer = (custId:string) => (e:any) => {
 
        let first = e.target.dataset.first 
        let last = e.target.dataset.last  
        localStorage.setItem("selectedCustId", custId)
        localStorage.setItem('selectedName',first + ' ' + last)

        navigate('/signin')
        
    }

    let readCustomers = async (appUser:string) => {

        s('appUser:' + appUser + '.')
        await readCustomersForUser(appUser).then( (r: any) => { 

         // note: last 'roof' screen remove this check when useEffect fixed
         // to load screen in conjunction with state: see claim,plan, screens etc.

          if(r === undefined) {

                  // missing a4server check

                  s('---------------------------------')
                  s("[startup A4Server is not running]") 
                  s('---------------------------------')

                  //localStorage.setItem('setupRoute','/start')
                  localStorage.setItem('setupMessage', '25 A4Server not started') 
                  localStorage.setItem('setupMessageText', 'Start up A4server')  
                  localStorage.setItem("A4Server",'noserver')
                  return

            }


            // check valid result 

            debugger
            let status = r['status'] 
            
            s(status)
            if(status === 'Successful') {
            
                let customerList = r['customerList']   
                for(var {custId, custFirst, custLast} of customerList) { 
    
                    let item = {custId: custId, custFirst: custFirst, custLast: custLast}  
                    rows.push(item) 

                }   
                s(rows.length + ' items pushed')
                buildScreen()
            }  
    })  

    }

const buildScreen = () => {
 
    let btnStyle = { fontSize: 'larger', fontFamily: 'arial'}
    let rowStyle = { marginTop: '4%'}
    let nameStyle = {color: inputColor, fontSize: 'larger', fontFamily: 'arial'} 
    let lines : any [] = []


    let key = 0
    for (var customer of rows) {

        debugger

        let first = customer['custFirst']
        let last  = customer['custLast']
        let custId = customer['custId']
        let name = first + ' ' + last

        let line = <div style={rowStyle}>

            <button key={key} onClick={selectCustomer(custId)} 
            data-first={first}
            data-last={last}
            style={btnStyle} className='btn btn-primary'>Select</button> 
            &nbsp; &nbsp;
            <span style={nameStyle}>{custId} &nbsp; &nbsp; {name} </span>  
        </div>

        lines.push(line)
        key++


    }
    s(lines.length +  ' lines pushed')

     setScreenLines(lines) // need this too ! :)
     setTitleMessage(key + ' customers(s) found')
} 

    useEffect( () => {

        debugger

        let customerSearchLoaded = localStorage.getItem('customerSearchLoaded') ?? ''
        if(customerSearchLoaded === '') { 
            
            let appUser = localStorage.getItem('appUser') ?? ''
            // until fix
            appUser = 'andrew'
            readCustomers(appUser)
         

            localStorage.setItem('customerSearchLoaded','done')

        }

        
    })
     

    return(<>
 
        <h3  style={h3Style}> Customer Search </h3> 
        <h5  style={h5style}> Customer Search for user: <span style={spanStyle}> {appUser} </span>  </h5> 
        <h5  style={h5style}> <span style={spanStyle}> {titleMessage} </span>  </h5>

        <div id='center' style={divStyle}>  

            {screenLines}
        
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



    </>)




}
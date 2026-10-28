   
/*
   Interface.tsx

*/


/* this routine acquires the app destination data
   decrypts input q
   looks auth record data to confirm user* /

/* inputs :

   q - q= parameter data
   env dest mode = unauth screen or start screen / message 
   env test mode allows appUser = testUser to be set and by pass checks

*/

/*                

   status

   no app dest - works to unauth screen
   bad use works to unauth screen

   todo: allow start/message option for above 2
   todo: code auth lookup
   todo: code auth level noting of auth level for user

   end status */
 
 
import { findParm, getAppDestinationData, getAuthRecord, resetCustomer } from "./Database"

/* outputs :

   local storage appUser
   local storage app dest locations
   local storage 


*/

let debug = false
   

export default async function InterfaceInitialization(q:any) : Promise<string | undefined> {

     // change: 2.4 - removed navigation over react hook objections 
     // change: 2.4 - set app user in localstorage
     // change  2.15 - pulling w and i logic - comment out
     // change: 2.15 - d left in for debug across screens
  
     
 
    let start = '/start'

    // this is workikng for -- no app dest situation
    let setUpDestination = start // use a500parm for this 

    debugger 

    //let appUser = localStorage.getItem('appUser') ?? ''  
    //let appUser = store.appUser

    
   s('[interface 0] read exactly one parm record to set ') 
   s('[interface 0] startDest = unauth or start ') 
   s('[interface 0] and test mode ')

   // defaults are production mode and unauthorized
   let mode = 'prod' 
   let startDest = '/unauthorized'
   let A500Parm = "A500Parm" 
   //let portNumber = ''
   let destUrl = 'notset' 


   
   //setStore({ testMode: mode })
   //setStore({ startDest: startDest})
   
   s(`[interface 0] destUrl for app dest is: ->  ${destUrl}  `)
   
   s(`[interface 0] effective -> mode is: ${mode} startDest: ${startDest} `)

   // communicate with useEffect on wait screen to immediately goto start if
   // in test mode
   localStorage.setItem('testMode', mode)
   localStorage.setItem('startDest', startDest) // added 
   
   // first, read app dest interface data

   // testMode coded as '' so auth logic will work
   const testMode = ''
   s(`[interface 0] effective mode is: ${mode} proceeding accordingly`)
   if(mode === testMode) {

       s(`[interface 0] Test Mode `)
       let start = '/start' 
       setResult(start,  "Application Test Mode",
                         "")
       //navigate(start)  // allow start option
       return start


   } 
    
   /* parking
   if(destUrl === 'notset') {

           s('[interface 1b] prod mode and destUrl is not read from parameter datdabase') 
            setResult(startDest,  "Missing destUrl Information",
                              "Unable to read parm called destUrl check parm coding ") 
            return startDest

   } 
   end park */

   let appDestFound = false
 
   debugger

   /*--------------------------------------------------------------*/
   /* initial location of the application destination link         *
   /* set manually                                                 *
   /*--------------------------------------------------------------*/

      // appdest --> set parms here
      let useTest = 'https://localhost:7251'
      let useProd = "https://project20a130insurance092526jsb00a00.azurewebsites.net"

        // put t or p here 

      let environment = 'p'
      let reference = (environment === 'p') ? useProd : useTest 
      let appDestUrl = reference;

      
       s(`[interface 0] environment setting: ${environment} `)

       s(`[interface 0] Initial App Dest url is: ${appDestUrl} `)

   await getAppDestinationData(appDestUrl).then( (r:any) => { 
   
         debugger
          if(r === undefined || r === false) { 
               
                return
         } 
         if(r === true) {

               appDestFound = true 
               return
         } 
   }) 

   // this code works
   if(appDestFound === false) {

           // allow repeated tests in test mode once the A130Insurance
           // is used one time to prmime/set up the 'priorBaseUrl'
           
           let priorBase = (localStorage.getItem('priorBaseUrl') ?? '').toString().trim()
           //console.log("prior base " + priorBase) 
           alert("prior base " + priorBase)
           let haveBaseFromPriorTest = priorBase !== ''
           let testMode = (environment === 't') ? true : false
           //console.log('testMode' + testMode)
           debug
           if(testMode && haveBaseFromPriorTest) {
               s(`[interface 0] test mode without A130 using prior base url of -> ${priorBase}`)
               //console.log(`[interface 0] test mode without A130 using prior base url of -> ${priorBase}`) 
               alert(`[interface 0] test mode without A130 using prior base url of -> ${priorBase}`)
               localStorage.setItem('baseUrl',priorBase)
           } else { 

            s('[interface 1a] read app dest information') 
            //console.log('[interface 1a] read app dest information') 
            setResult(startDest,  "Application Destination Missing",
                              "Unable to find Application Destination Interface")
            //navigate(startDest)  // allow start option
            return startDest

            }
   }

   
  
   s(`[interface 0] app dest found -> `)
   s(`[interface 0] ready to find parm -> `)

   try {

   await findParm(A500Parm).then(  (r:any) => {

          s(`[interface 0] find parm result -> ${r} `)

         // first call to A45 server 
         if(r === 'error' || r === undefined) {  

            s('error1')
            localStorage.setItem('setupMessage', '3 A4Server not started') 
            localStorage.setItem('setupMessageText', 'Start up A4server')  
            localStorage.setItem("A4Server",'noserver')
            return '/start'  
            
         } 

         if(r === null) {
            s('[interface 0] A500 parameter record was not found - using defaults ') 
            return
         }

         let statusText = r['statusText']
         
         s(`[interface 0] find parm status text -> ${statusText} `)
         if( statusText !== 'OK') {
            return
         }

         debugger
         let data = r['data']
         if(data.length === 0) {
            return // empty array
         }
         let info = data[0]['Value'].toString()

         
          s('')
          s('[interface 0] A500 parameter record is: ')  
          s('')
          s('****************************************')
          s(info) 
          s('****************************************')
          s('') 

         // depricateed port 
         // using destUrl now
         //if(info.indexOf('(destUrl:') > -1)  destUrl = findDestUrl(info)

         // look for keywords of 'test' or 'start' and reset defaults
         if(info.indexOf('test') > -1) mode = '' 
         if(info.indexOf('prod') > -1) mode = 'prod'
         if(info.indexOf('start') > -1) startDest = '/start'   
         if(info.indexOf('unauth') > -1) startDest = '/unauthorized'   
         if(info.indexOf('debug') > -1) debug = true  
         //if(info.indexOf('(port:') > -1)  portNumber = findPort(info)

   }).catch( () => {

            localStorage.setItem('setupMessage', '1 A4Server not started') 
            localStorage.setItem('setupMessageText', 'Start up A4server')  
            localStorage.setItem("A4Server",'noserver')
            return '/start'   

   })

} catch (error: any) {


         localStorage.setItem('setupMessage', '2 A4Server not started') 
         localStorage.setItem('setupMessageText', 'Start up A4server')  
         localStorage.setItem("A4Server",'noserver')
         return '/start'   


}

   debugger 

    // when no q parm, make sure appUser is set if not this
    // is an invalid attempt
    // note: code also to handle refreshes
 

    const qNotEntered = (q === undefined || q.trim() == '')

    // TODO: test his part untested
    if(qNotEntered) {

        debugger
       
         s('[interface 2] check on q pameter') 

        let appUser = localStorage.getItem('appUser') ?? ''
        if(appUser === '') {

            
            s('[interface 2a] missing q parameter and no app user -> unauthorized') 
            // invalid attempt not in test mode 
            let route = startDest
            setResult(route, "Unauthorized Access","Please use main application entry screen") 
            // return to wait screen that will dispatch to set destinaton with the messages
            return route

        }

        s('[interface 2b] refresh logic ') 
        // have app user already this may be a refresh 
        let route = start
        localStorage.setItem('setupRoute',route)
        return route
    } 

   s('[interface 3] decrypting q input')

   localStorage.setItem('appUser','')
 

    // q entered process it !
 
    
    s('[interface 3a] decrypting q input that is: ' + q)
    const data = decrypt(q) ?? '' 
    s('[interface 3b] revealed: ' + data)

    // user and get date time
    let tokenUser = getUser(data)
    const tokenTime = getDateTime(data)   
    
     s(`[interface 4] token user is: ${tokenUser} parm time is: ${tokenTime}`)
     
     
    debugger

    s("[interface 5a]* getting auth record")

    // note getAuthRecord does not run so check here for testing:

    /* park
     if(tokenUser === 'andrew') {
         localStorage.setItem('appUser',tokenUser)
         // authorization level setting 
         s("time stamp match") 
         localStorage.setItem('authLevel','')
         // setResult start unused
         setResult('/start','','')
         //navigate(start)
         return start
     } * end park */

   var destination = await getAuthRecord(tokenUser).then( (r:any) => {

      s('[interface 5b]* get auth record *') 

      debugger

      let status = r['status']
      if (status === 'NotFound') {
 
            setResult(startDest, "Unauthorized User", "User is not authorized to use this application") 
            // return to wait screen that will dispatch to set destinaton with the messages
            return startDest
      }

      var authDateTime = r['dateTime'];
      var at = authDateTime.toString(); 
      // compare date and time.
      var authTime = at.substring(0,4) + at.substring(5,7) + at.substring(8,10) +
                     at.substring(11,13) + at.substring(14,16) + at.substring(17,19);

      debugger;
 

      if(tokenTime === authTime) {

         debugger
         localStorage.setItem('appUser',tokenUser)
         // authorization level setting 
         s("time stamp match")
         let level = r['level'] ?? '' 
         localStorage.setItem('authLevel',level)
         // setResult start unused
         setResult('/start','','')
         //navigate(start)
         return start

      } else {

          localStorage.setItem('appUser',tokenUser)
          s("time stamps do not match") 
          // show error message on start or unauthorized pages
          // setResult start unused  
          setResult(startDest,"Unauthorized User","Timestamp discrepency")
          //navigate(setUpDestination)
          return setUpDestination
      }
    }) 

    // return destination to caller
    return destination
    //
} 

let setResult = (dest:string, message:string, text:string) => {

      localStorage.setItem('setupRoute',dest)
      localStorage.setItem('setupMessage', message) 
      localStorage.setItem('setupMessageText', text)

}



function decrypt(rawInput:string) {

  debugger;

  var offsetValue = rawInput.substring(0,1); // get off set
  var offset = Number(offsetValue);
  var input = rawInput.substring(1);


  var table = "abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJK";
  var useLength = table.indexOf('0');
  var output = "";
  debugger;
  for(var i = 0; i < input.length; i++)
  {
      var c = input.substring(i, i + 1);
      var position = table.indexOf(c) - offset;
      var out_position = useLength - position - 1;
      var d = table.substring(out_position, out_position + 1);
      output = output + d;
  }

  return output;

}

function getUser(input:string) {

  var user = input.substring(14);
  return user;
}

function getDateTime(input:string) {
   var time = input.substring(0,14);
   return time;
} 

function findDestUrl(info:string) : string {

   debugger 

   s('findDestUrl: input is ' + info)
 

let output = 'notset'
let check = info.indexOf('(destUrl:')  
if(check === -1) {
   console.log('can not find destUrl syntax')
   return output
}
let indexColon = info.indexOf(':')
if(indexColon === -1) {
   console.log('syntax missing colon')
   return output
} 
let rightParen = info.indexOf(')') 
if(rightParen === -1) {
   console.log('syntax missing right paren')
   return output
}
let good = (rightParen - indexColon) > 1
if(rightParen === -1) {
   console.log('check syntax')
   return output
}

let destUrl = info.substring(indexColon + 1, rightParen)  
s('findDestUrl: output is ' + destUrl) 

return destUrl

}

let s = (value:string) => {

   if(debug === false) return

   console.log(value)

}
 
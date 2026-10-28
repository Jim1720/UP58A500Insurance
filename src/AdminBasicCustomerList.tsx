import   {  useEffect, useState } from "react"
import { useNavigate } from "react-router-dom" 
import { readClaimDataForCustomer, readCustomers } from "./Database"
 

export default function AdminBasicCustomerList() {

    
    
    let displayLineHolder : any [] = [] 

    const [displayLines, setDisplayLines] = useState(displayLineHolder) 
  
    let navigate = useNavigate() 

 let lines: any [] = []
 

 let summaryLiteral = ((localStorage.getItem("claimLoadCustId") ?? '') === '') ? 'Summary Off' : 'Summary On'
 let detailLiteral =  ((localStorage.getItem("claimShowDetail") ?? '') === '' ) ? 'Detail Off' : 'Detail On'
 let stampsLiteral =  (localStorage.getItem("showStamps") ?? 'no') === 'yes'  ? 'Stamps On' : 'Stamps'
 let pinLiteral =     ((localStorage.getItem("pinCustId") ?? '') === '') ? 'Pin' : 'Pinned'
    
 interface Customer {

    custId : string,
    custFirst: string,
    custMiddle: string,
    custLast: string,
    appId: string,
    custEmail: string,
    custPhone: string,
    custPassword: string,
    custAddr1: string,
    custAddr2: string,
    custCity: string,
    custState: string,
    custZip: string,
    custGender: string,
    custBirthDate: string,
    adduser: string,
    addusertime: string,
    updateuser: string,
    updateusertime: string,
    addapp: string,
    updateapp: string


 }

 
 interface Claim {

    customerId: string,
    ClaimIdNumber: string,
    PatientFirst: string,
    PatientLast: string,
    ClaimDescription: string,
    ClaimType: string,
    ClaimStatus: string,
    Service: string,
    PlanId: string,
    cadduser: string,
    caddusertime: string,
    caddapp: string,
    cupdateuser: string,
    cupdateusertime: string,
    cupdateapp: string

 } 

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

    let lightMode = localStorage.getItem('lightMode') ?? 'Dark'

     /* light mode effects */
 
    let divColor = 'black'  
    let titleColor = 'navajowhite'   
    let headerColor = 'white'
    let detailColor = 'dodgerblue'


    if (lightMode === 'Light') { 
             
         divColor = 'white'  
         titleColor = 'blue'   
         headerColor = 'blue'
         detailColor = 'black'

    } 
     
 
    let divStyle = { marginLeft: '4%', backgroundColor: divColor}

    let h3Style = {marginTop: '3%', marginLeft: '42%', color: titleColor, fontFamily: 'arial', marginBottom: '1%'} 

    let headerStyle = {marginTop: '1%', color: headerColor, fontFamily: 'arial', fontSize:'larger'} 
    
    let detailStyle = {marginTop: '1%', color: detailColor, fontFamily: 'arial', fontSize:'larger'}
           
    let b1first =  {  fontFamily: 'arial', fontSize: 'large'}

    let b1 = {marginLeft : '5%', fontFamily: 'arial', fontSize: 'large'}
  
    
    let btnLineStyle = { marginTop: '25px'}

    let customers: any = []  

    let filter = localStorage.getItem('customerSearchLoaded') ?? '' 
    if(filter === '') filter = 'All'
    
   let claimLoadCustId = localStorage.getItem('claimLoadCustId') ?? '' 
   let showStamps = localStorage.getItem('showStamps') ?? ''
   let showClaimDetail = localStorage.getItem('showClaimDetail') ?? 'no'
 
   
   //alert("pin in use : " + pinInUse)

   let claims: any = []

   let loadCustomerData = async () => {

    console.log('load cust data')
 

    // get current pin values
    
   let pinInUse = localStorage.getItem('pinCustId') ?? '' 
   
   pinLiteral =     ((localStorage.getItem("pinCustId") ?? '') === '') ? 'Pin' : 'Pinned'

   // get current summary value  
   claimLoadCustId = localStorage.getItem('claimLoadCustId') ?? '' 
   summaryLiteral = ((localStorage.getItem("claimLoadCustId") ?? '') === '') ? 'Summary Off' : 'Summary On'  
   
 
   await readCustomers().then( (r:any) => {
 

    let id = 1 

    if(r === undefined) return null

    let data = r['data']  
 
    customers = [] 

    for(var i = 0; i < data.length; i++) { 

        let cust: Customer = data[i]
        if (cust === undefined ) continue 
        let custId = cust.custId.trim()

        let cid = custId.toString().trim() 

        //console.log(`1 cus /${cid}/ filter /${filter}/`)

        // only show filered claim
        if(cid !== filter && filter !== 'All') continue 
       
        
        //console.log(`2 pinId /${pinInUse}/ cid /${cid}/`)

        // only show pinned claim
        if(pinInUse !== '' && cid !== pinInUse) continue

        //console.log("adding custId " + custId + ' to display')

        let firstName = cust.custFirst.trim()
        let middleName = cust.custMiddle.trim()
        let lastName = cust.custLast.trim()
        let appId = cust.appId   // fix
        let email = cust.custEmail.trim()
        let phone = cust.custPhone.trim()
        let password = cust.custPassword
        let addr1 = cust.custAddr1.trim()
        let addr2 = cust.custAddr2.trim()
        let city = cust.custCity
        let state = cust.custState
        let zip = cust.custZip
        let gender = cust.custGender
        let _birth = cust.custBirthDate
        let birth = formatDate(_birth)
        let adduser = cust.adduser
        let _addusertime = cust.addusertime
        let addusertime = formatDate(_addusertime)
        let updateuser = cust.updateuser
        // do not show line if n/a
        let _updateuser = updateuser.toString().trim()
        if(_updateuser === 'n/a' || _updateuser === 'TBD') {
            updateuser = '.'
        }
        let _updateusertime = cust.updateusertime
        let updateusertime = formatDate(_updateusertime)
        let addapp = cust.addapp
        let updateapp = cust.updateapp
        
        let claimLoadCustId = localStorage.getItem('claimLoadCustId') ?? ''
        let loadClaims = (claimLoadCustId !== '')
        let match = (loadClaims === true && claimLoadCustId === custId) ? 'yes' : 'no' 
     
        let obj = {id: id, 
                   custId: custId, 
                   firstName: firstName,
                   middleName: middleName,
                   lastName: lastName, 
                   match: match, // triggers claim display when looping through customers
                   appId: appId,
                   email:email,
                   phone: phone,
                   password: password,
                   addr1: addr1,
                   addr2: addr2,
                   city: city,
                   state: state,
                   zip: zip,
                   gender: gender,
                   birth: birth,
                   adduser: adduser,
                   addusertime: addusertime,
                   updateuser: updateuser,
                   updateusertime: updateusertime,
                   addapp: addapp,
                   updateapp: updateapp}
 

        customers.push(obj)
        id++ 
        } 
        
        if(claimLoadCustId !== '') 
           LoadClaims(claimLoadCustId) 
        else
           BuildScreen(customers)

        console.log('1c done')

 
 }) 
} /* end of load customer data */

let LoadClaims = async (claimLoadCustId:string) => {

    debugger 
 
 await readClaimDataForCustomer(claimLoadCustId).then( (r:any) => {
 

          let id = 1

          claims = []

          debugger

          if(r === undefined) return null

          let data = r['data']


          for(var i = 0; i < data.length; i++) {

              /* dev note: where to use "Encrypted" to filter */
              /* pre selected [ not in a30 ] */
              /* pinned */

              debugger 

              let claim: Claim = data[i]

              let claimIdNumber = claim.ClaimIdNumber

              if(claimIdNumber === null) continue // no claims found

              let patientFirst = claim.PatientFirst
              let patientLast = claim.PatientLast
              let description = claim.ClaimDescription
              let claimType = claim.ClaimType
              let claimStatus = claim.ClaimStatus
              let claimService = claim.Service
              let planId = claim.PlanId
              let cadduser = claim.cadduser
              let _caddusertime = claim.caddusertime
              let caddusertime = formatDate(_caddusertime)
              let caddapp = claim.caddapp
              let cupdateuser = claim.cupdateuser
              let _cupdateusertime = claim.cupdateusertime
              let cupdateusertime = formatDate(_cupdateusertime)
              let cupdateapp = claim.cupdateapp

              let claimTypeLit = 'u'
              switch(claimType) {
                 case 'm' : claimTypeLit = 'Medical';break;
                 case 'd' : claimTypeLit = 'Dental'; break;
                 case 'v' : claimTypeLit = 'Vision'; break;
                 case 'x' : claimTypeLit = 'Drug' ; break;
                 default: break;
              }

              let obj = {id:id,
                  claimIdNumber: claimIdNumber,
                  patientFirst: patientFirst,
                  patientLast: patientLast,
                  description: description,
                  claimType: claimType,
                  claimTypeLit: claimTypeLit,
                  claimStatus: claimStatus,
                  claimService: claimService,
                  planId: planId,
                  cadduser: cadduser,
                  caddusertime: caddusertime,
                  caddapp: caddapp,
                  cupdateuser: cupdateuser,
                  cupdateusertime: cupdateusertime,
                  cupdateapp: cupdateapp
              }

              console.log('loading claim ' + claimIdNumber)
              claims.push(obj)
              id++
          } 
  

        //if(claims.length === 0) alert('This customer has no claims')
        //else alert(claims.length + 'claims found')
          
        BuildScreen(customers)
}) 

} /* end of load claims function */
 

 let onReturn = () => { 

    
    navigate('/adminbasiccustomerlistprompt')

 }  

const reloadScreen = async () => {

    //window.location.reload()
    loadCustomerData() 


}

 
const onPin = async (event:any) => {  
 

   // toggle pin
   let pinInUse = localStorage.getItem('pinCustId') ?? ''
   if(pinInUse !== '') {
       // turn off  
       //alert('turn pin off')
       localStorage.setItem('pinCustId','')  
       reloadScreen()
       return

   }

   // turn on 
   let custId = event.target.dataset.custid ?? ''
   let cid = custId.toString().trim()   
   localStorage.setItem('pinCustId',cid)  
   //alert('turn pin on' + cid)
   reloadScreen()
   return


} 

const onSummary = async (event:any) => {  
 
    debugger
    let custId = event.target.dataset.custid ?? ''
    let cid = custId.toString().trim() 
    let isSummaryOn = (localStorage.getItem('claimLoadCustId') ?? '') != ''
    if(isSummaryOn) 
       localStorage.setItem('claimLoadCustId', '')  // off
    else
       localStorage.setItem('claimLoadCustId', cid) // on
    //
    localStorage.setItem('showClaimDetail','no')  
    reloadScreen() 
    return
 
}



const onDetail = async (event:any) => {  
    
    debugger
    let custId = event.target.dataset.custid ?? '' 
    let cid = custId.toString().trim()
    let isDetailOn = (localStorage.getItem('showClaimDetail') ?? '') == 'yes'

    if(isDetailOn) { // if its on turn both off
       localStorage.setItem('showClaimDetail', 'no') // off 
       localStorage.setItem('claimLoadCustId', '') // turn summary on as well
     
    } else {  // if off turn both on
       localStorage.setItem("claimLoadCustId", cid) // summary on 
       localStorage.setItem('showClaimDetail','yes') // detao; pm
    } 
    
    reloadScreen()
    return
      
 
}


const onNone = async () => {  

    
   localStorage.setItem('claimLoadCustId','') 
   localStorage.setItem('showClaimDetail','no') 

    reloadScreen()
    return
}


const onStamps = async () => { 
 
 
    // toggle stamps

    let showStamps = localStorage.getItem('showStamps') ?? 'no'
    let value = (showStamps === 'yes') ? 'no' : 'yes' 
    localStorage.setItem('showStamps', value)
    
    reloadScreen()
    return
}

 

 let BuildScreen = (customers:any) => {

    
       stampsLiteral =  (localStorage.getItem("showStamps") ?? 'no') === 'yes'  ? 'Stamps On' : 'Stamps'

       let key = 1 

       lines = []
 
       /* customer loop */

       debugger
  
       for(var {custId, firstName, middleName,lastName, appId, email, phone, password,
                addr1, addr2, city, state, zip,
                birth, gender,
                adduser, addusertime,
                updateuser,updateusertime,
                addapp, updateapp,
                match
       } of customers) {
 

       let header1 = 

            <div className="row" key={key+10}>
                <div style={headerStyle} className="col-md-4">Customer</div>
                <div style={headerStyle} className="col-md-4">Name</div>
                <div style={headerStyle} className="col-md-4">App</div>
            </div>;

        
        let detail1 = 

            <div className="row" key={key+15}> 
                <div style={detailStyle} className="col-md-4">{custId}</div>
                <div style={detailStyle} className="col-md-4">{firstName} {middleName} {lastName}</div>
                <div style={detailStyle} className="col-md-4">{appId}</div>
            </div>;

         lines.push(header1)
         lines.push(detail1)

         let header2 = 

            <div className="row" key={key+20}>
                <div style={headerStyle}  className="col-md-4">Email</div>
                <div style={headerStyle}  className="col-md-4">Phone</div>
                <div style={headerStyle}  className="col-md-4">Password</div>
            </div>;

        let detail2 = 

            <div className="row" key={key+24}> 
                <div style={detailStyle}  className="col-md-4">{ email }</div>
                <div style={detailStyle}  className="col-md-4">{ phone }</div>
                <div style={detailStyle}  className="col-md-4">{ password }</div>
            </div>;

        lines.push(header2)
        lines.push(detail2)


        let header3 = 
            <div className="row" key={key+30}>
                <div style={headerStyle} className="col-md-4">Address</div>
            </div>;

        let detail3 = 
            <div className="row" key={key+32}> 
                <div style={detailStyle}  className="col-md-4">{ addr1 } { addr2 } { city }
                    { state } { zip }
                </div>
            </div>;

            
        lines.push(header3)
        lines.push(detail3)


          let header4 = 
            <div className="row" key={key+40}>
                <div style={headerStyle}  className="col-md-4">Birth Date</div>
                <div style={headerStyle}  className="col-md-4">Gender</div>
            </div>;

        let detail4 =
            <div className="row" key={key+42}>

                <div style={detailStyle} className="col-md-4">{ birth }</div>
                <div style={detailStyle} className="col-md-4">{ gender }</div>
            </div>; 
            
        lines.push(header4)
        lines.push(detail4)

        let showStamps = localStorage.getItem('showStamps') ?? 'no'
        if(showStamps === 'yes') {

        
          let header5 = 
            <div className="row" key={key+50}>
                <div style={headerStyle}  className="col-md-4">Add User</div>
                <div style={headerStyle}  className="col-md-4">Add Time</div> 
                <div style={headerStyle}  className="col-md-4">Add App</div>
            </div>;

        let detail5 =
            <div className="row" key={key+52}>

                <div style={detailStyle} className="col-md-4">{ adduser }</div>
                <div style={detailStyle} className="col-md-4">{ addusertime }</div> 
                <div style={detailStyle} className="col-md-4">{ addapp }</div>
            </div>; 
            
        lines.push(header5)
        lines.push(detail5)


        
          let header6 = 
            <div className="row" key={key+54}>
                <div style={headerStyle}  className="col-md-4">Update User</div>
                <div style={headerStyle}  className="col-md-4">Update Time</div> 
                <div style={headerStyle}  className="col-md-4">Update App</div>
            </div>;

        let detail6 =
            <div className="row" key={key+56}>

                <div style={detailStyle} className="col-md-4">{ updateuser }</div>
                <div style={detailStyle} className="col-md-4">{ updateusertime }</div> 
                <div style={detailStyle} className="col-md-4">{ updateapp }</div>
            </div>; 
            
        lines.push(header6)
        lines.push(detail6) 

        }
        

        debugger
        if (match === 'yes' && claims.length > 0) { 

                showClaimDetail = localStorage.getItem('showClaimDetail') ?? 'no'

                for(var {
                id,
                claimIdNumber,
                patientFirst,
                patientLast,
                description,
                claimTypeLit,
                claimStatus,
                claimService,
                planId,
                cadduser,
                caddusertime,
                caddapp,
                cupdateuser,
                cupdateusertime,
                cupdateapp} of claims)

         {

        debugger 

       

         let header7 =
         <div  className="row" key={key+60}>
            <div style={headerStyle} className="lit s col-md-4">Claim&nbsp;{ id }</div>
            <div style={headerStyle} className="lit s col-md-4">Patient</div>
            <div style={headerStyle} className="lit s col-md-4">Description</div>
        </div>;

         let detail7 =
         <div  className="row" key={key+62}>
               <div style={detailStyle} className="data s col-md-4">{ claimIdNumber }</div>
               <div style={detailStyle} className="data s col-md-4">{ patientFirst } { patientLast } </div>
               <div style={detailStyle} className="data s col-md-4">{ description }</div>
          </div>;

        lines.push(header7)
        lines.push(detail7)

        let showStamps = localStorage.getItem('showStamps') ?? 'no'
        if(showStamps === 'yes') {

          let header8 =  
           <div  className="row" key={key+64}>
            <div style={headerStyle} className="lit s col-md-4">Added By</div>
            <div style={headerStyle} className="lit s col-md-4">Time</div>
            <div style={headerStyle} className="lit s col-md-4">App</div>
        </div>;

         let detail8 = 
         <div className="row" key={key+68}>
               <div style={detailStyle} className="data s col-md-4">{cadduser }</div>
               <div style={detailStyle} className="data s col-md-4">{ caddusertime }</div>
               <div style={detailStyle} className="data s col-md-4">{ caddapp }</div>
          </div>;

        lines.push(header8)
        lines.push(detail8)

        let header9 =
        <div className="row" key={key+70}>
            <div style={headerStyle} className="lit s col-md-4">Updated By</div>
            <div style={headerStyle} className="lit s col-md-4">Time</div>
            <div style={headerStyle} className="lit s col-md-4">App</div>
        </div>;

         let detail9 =
         <div  className="row" key={key+72}>
               <div style={detailStyle} className="data s col-md-4">{ cupdateuser }</div>
               <div style={detailStyle} className="data s col-md-4">{ cupdateusertime } </div>
               <div style={detailStyle} className="data s col-md-4">{ cupdateapp }</div>
          </div>;

           lines.push(header9)
           lines.push(detail9)

        }

           if(showClaimDetail === 'yes') {

                let header10 =
                <div  className="row" key={key+74}>
                    <div style={headerStyle} className="lit s col-md-4">Status Type</div>
                    <div style={headerStyle} className="lit s col-md-4">Service</div>
                    <div style={headerStyle} className="lit s col-md-4">Plan</div>
                </div>;

                let detail10 = 
                <div  className="row" key={key+76}>
                    <div style={detailStyle} className="data s col-md-4">{claimStatus}&nbsp;{ claimTypeLit } </div>
                    <div style={detailStyle} className="data s col-md-4">{ claimService }</div>
                    <div style={detailStyle} className="data s col-md-4">{ planId }</div>
                </div>;

                lines.push(header10)
                lines.push(detail10)

           }

           key = key + 100
 
         }

        } /* end of load claims loop  inside of customer loop */

         let buttonLine = <div key={key+80} style={btnLineStyle}>

             <button type='button' style={b1first}  onClick={onSummary}  data-custid={custId} className="btn btn-primary">{summaryLiteral}</button> 

             <button type='button' style={b1} onClick={onDetail} data-custid={custId}   className="btn btn-primary">{detailLiteral}</button>  

             <button type='button' style={b1} onClick={onNone} className="btn btn-primary">None</button>  
             
             <button type='button' style={b1} onClick={onReturn} className="btn btn-primary">Return</button>  
        
             <button type='button' style={b1} onClick={onStamps} className="btn btn-primary">{stampsLiteral}</button>  
      
             <button type='button' style={b1} onClick={onPin} data-custid={custId} className="btn btn-primary">{pinLiteral}</button>  
             
             <button type='button' style={b1} onClick={onListsMenu} className="btn btn-primary">Lists</button> 

             <button type='button' style={b1} onClick={onMainMenu} className="btn btn-primary">Menu</button> 


         </div>

         lines.push(buttonLine)

         key = key + 100


    } /* end customer loop */ 

    debugger

    setDisplayLines(lines)

 }
 

  function formatDate(value:string) {

      if(value === undefined) {

        return ''

      }


      // changes yyyy/mm/dd to mm/dd/yyyy show yyyy for dob
      if(value === null || value === '') {
         return '';
      }
      var year = value.substring(0,4);

      if(year === '1900' || year === '1753') {
        return ''
      }

      var day = value.substring(8,10);
      var month = value.substring(5,7);
      // ie 11 var result = `${month}/${day}/${year}`
      var result = month + '/' + day + '/' + year;
      return result;

  }

    
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

        // screen logic 
        let customerDataLoaded = localStorage.getItem('customerDataLoaded') ?? ''
        if(customerDataLoaded !== 'yes') { 
            console.log('[use effect] customer data loading')
            initialize()
            loadCustomerData()  
            localStorage.setItem('customerDataLoaded','yes')
        }
    }) 

    const initialize = () => {

                
        localStorage.setItem('claimLoadCustId','') 
        localStorage.setItem('showClaimDetail','no') 
        localStorage.setItem('showStamps','no')


    }
  
    
    const onListsMenu = () => {
 
           // useNavigate
            navigate('/adminlistsmenu')  

    }

    
    const onMainMenu = () => {
 
           // useNavigate
            navigate('/adminmenu')  

    }

    return(<><div style={divStyle} className='container'>

      
    
        <h3 style={h3Style}> Customer List </h3>  
            
        <div id='center' style={divStyle}> 

            {displayLines}
             
        </div> 

    </div></>) 
}
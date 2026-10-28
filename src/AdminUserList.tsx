import   {  useEffect, useState } from "react"
import { useNavigate } from "react-router-dom" 
import { readClaimDataForCustomer, readCustomersForUser, readUsers} from "./Database"
 

export default function AdminUserList() {

    /* sort user ids and
       show buttons on new or last entry */

    /* format:

        user : andrew

        date  comment
        xxxx  xxxx
        xxxx  xxxx

    */

    
    let displayLineHolder : any [] = [] 

    const [displayLines, setDisplayLines] = useState(displayLineHolder) 
    //const [reload, setReload] = useState(false)
 
    let navigate = useNavigate() 

 let lines: any [] = [] 
 
 let claims : any = []
 
 let summaryLiteral = ((localStorage.getItem('custLoadUserId') ?? '') !== '') ? 'Summary on' : 'Summary'
 
 let detailLiteral = ((localStorage.getItem('showCustomerDetail') ?? '') !== '') ? 'Detail on' : 'Detail'
   
 let customerStampLiteral  = ((localStorage.getItem('showCustomerStamps') ?? '') !== '') ? 'Stamps on' : 'Stamps' 
 
 let claimSummaryLiteral  = ((localStorage.getItem('claimSummary') ?? '') !== '') ? 'Claim Summary on' : 'Claim Summary' 
    
 let claimDetailLiteral  = ((localStorage.getItem('claimDetail') ?? '') !== '') ? 'Claim Detail on' : 'Claim Detail' 

 let claimStampLiteral  = ((localStorage.getItem('claimStamps') ?? '') !== '') ? 'Claim Stamps on' : 'Claim Stamps'

 let key = 1
    
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

    /* TODO: fill page with container */ 
 
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

    let passCheck = sessionStorage.getItem('userDataLoaded') ?? ''
    if(passCheck === 'yes') {
        console.log('already loaded')
        return
    }
     
 
    let divStyle = { marginLeft: '4%', backgroundColor: divColor}

    let h3Style = {marginTop: '3%', marginLeft: '42%', color: titleColor, fontFamily: 'arial', marginBottom: '1%'} 

    let headerStyle = {marginTop: '1%', color: headerColor, fontFamily: 'arial', fontSize:'larger'} 
    
    let detailStyle = {marginTop: '1%', color: detailColor, fontFamily: 'arial', fontSize:'larger'}
           
    let b1first =  {  fontFamily: 'arial', fontSize: 'large'}

    let b1 = {marginLeft : '5%', fontFamily: 'arial', fontSize: 'large'} 
       
    let btnLineStyle = { marginTop: '25px'}

    let customers: any = []  
 

    let filter = localStorage.getItem('userSearchSearchParm') ?? '' 
    if(filter === '') filter = 'All'
    
   let claimLoadCustId = localStorage.getItem('claimLoadCustId') ?? ''

   console.log('[claimLoadCustId] ' + claimLoadCustId)
  
   let pinInUse = localStorage.getItem('pinUserId') ?? '' 
   
   console.log('[pinInUse] ' + pinInUse) 
   
   let pinLiteral = (pinInUse != '') ? "Pinned" : "Pin"

   
let userFilter = localStorage.getItem('userSearchLoaded') ?? '' 
if(userFilter == '') userFilter = 'All'

console.log('[userFilter] ' + userFilter)

// display only
let showCustomerDetail = localStorage.getItem('showCustomerDetail') ?? '' 

let showCustomerStamps = localStorage.getItem('showCustomerStamps') ?? ''

let users : any = [] 

 let onReturn = () => { 

    
    navigate('/adminuserlistprompt')

 }  

 
 let onAdminLists = () => { 

    
    navigate('/adminlistsmenu')

 }  

 let Reload = () => {

    
    localStorage.setItem('process','requested')
    localStorage.setItem("userDataLoaded",'') 
    //setReload(true)
    // clear screen
    lines = []
    setDisplayLines(displayLineHolder)
    loadData()


 }
 
 let onUserPin = async (event:any) => { 
 
 
     let userId = event.target.dataset.userid 
     let uid = userId.toString().trim() 

      // toggle pin
    let pinInUse = localStorage.getItem('pinUserId') ?? ''
    if(pinInUse !== '') {
        // turn off 
        localStorage.setItem('pinUserId','')   
        Reload()
        return
    }

   // trun on 
   localStorage.setItem('pinUserId',uid)   
   Reload() 
   return

 }  

 
const onNone = async () => {

       localStorage.setItem('custLoadUserId', '')  // off
       localStorage.setItem('showCustomerDetail', '') // off  
       localStorage.setItem('showCustomerStamps','')
       
       localStorage.setItem('claimSummary', '')  // off
       localStorage.setItem('claimDetail', '') // off  
       localStorage.setItem('claimStamps', '') // off  

       Reload()
       return

}

 
const onCustomerSummary = async (event:any) => {   
  
    let userId = event.target.dataset.userid ?? '' 
    let uid = userId.toString().trim() 
    let custInUse = localStorage.getItem('custLoadUserId') ?? ''
    if(custInUse !== '') 
       localStorage.setItem('custLoadUserId', '')  // off
    else
       localStorage.setItem('custLoadUserId', uid) // on
    //
    localStorage.setItem('showCustomerDetail','')   

    //let check = localStorage.getItem('custLoadUserId') ?? ''
    //alert(check)

     Reload()
     return
 
}



const onCustomerDetail = async (event:any) => {  
     
    let userId = event.target.dataset.userid ?? '' 
    let uid = userId.toString().trim()
    let detailInUse = localStorage.getItem('showCustomerDetail') ?? ''

    if(detailInUse !== '') { // if its on turn both off
       localStorage.setItem('showCustomerDetail', '') // off  
     
    } else {  // if off turn both on
       localStorage.setItem("showCustomerDetail", uid) // summary on  
    } 
    
   
     Reload()
     return
      
 
}


const onCustomerStamps = async () => {  
      
    let showCustomerStamps = localStorage.getItem('showCustomerStamps') ?? ''

    if(showCustomerStamps !== '') { // if its on turn both off
       localStorage.setItem('showCustomerStamps', '') // off  
     
    } else {  // if off turn both on
       localStorage.setItem("showCustomerStamps", 'yes') // yes
    } 
    
   
     Reload()
     return
      
 
}


 
const onClaimSummary = async (event:any) => {  
   
    
    let custId = event.target.dataset.custid ?? '' 
    let cusid = custId.toString().trim() 

    let isSummaryOn = (localStorage.getItem('claimSummary') ?? '') != ''
    if(isSummaryOn) 
       localStorage.setItem('claimSummary', '')  // off
    else {
       localStorage.setItem('claimSummary', cusid) // on
       localStorage.setItem('selectedCustomerId', cusid) // since both routines can select a customer id do this for now
    }
    //
    localStorage.setItem('claimDetail','')   

     Reload()
     return
 
} 

const onClaimDetail = async (event:any) => {   
    
    let custId = event.target.dataset.custid ?? '' 
    let cusid = custId.toString().trim() 

    let isDetailOn = (localStorage.getItem('claimDetail') ?? '') == 'yes'

    if(isDetailOn) { // if its on turn both off
       localStorage.setItem('claimDetail', '') // off  
     
    } else {  // if off turn both on
       localStorage.setItem("claimDetail", cusid) // summary on  
       localStorage.setItem('selectedCustomerId', cusid) // since both routines can select a customer id do this for now 
    } 
    
   
     Reload()
     return
      
 
}



const onClaimStamps = async () => {  
       
    let claimStamps = localStorage.getItem('claimStamps') ?? ''

    if(claimStamps !== '') { // if its on turn both off
       localStorage.setItem('claimStamps', '') // off  
     
    } else {  // if off turn both on
       localStorage.setItem("claimStamps", 'yes') // yes
    } 
    
   
     Reload()
     return
      
 
}

let onClaimNone = async () => {

        localStorage.setItem('claimSummary', '')  // off
        localStorage.setItem('claimDetail', '') // off  
        localStorage.setItem('claimStamps', '') // off  
}
 

let loadData = async () => {

    console.log("loadData request")

    lines = []
    setDisplayLines(displayLineHolder) // note: key 21 was duplicatged

    
    summaryLiteral = ((localStorage.getItem('custLoadUserId') ?? '') !== '') ? 'Summary on' : 'Summary'
    
    detailLiteral = ((localStorage.getItem('showCustomerDetail') ?? '') !== '') ? 'Detail on' : 'Detail' 
     
    customerStampLiteral  = ((localStorage.getItem('showCustomerStamps') ?? '') !== '') ? 'Stamps on' : 'Stamps'  
     
    claimSummaryLiteral  = ((localStorage.getItem('claimSummary') ?? '') !== '') ? 'Claim Summary on' : 'Claim Summary' 
    
    claimDetailLiteral  = ((localStorage.getItem('claimDetail') ?? '') !== '') ? 'Claim Detail on' : 'Claim Detail' 
    
    claimStampLiteral  = ((localStorage.getItem('claimStamps') ?? '') !== '') ? 'Claim Stamps on' : 'Claim Stamps'


    // each call must code
    // localStorage.setItem('process','requested')
    let process = localStorage.getItem('process') ?? ''
    if(process !== 'requested') return 

    console.log("proceeding...")
     
    key = 1 

    users = [] 

    lines = []
   
    await readUsers(userFilter).then ( (r:any) => { 
 
    
        if(r === undefined) return null 
        
        let data = r['data'] 

        let id = 1 
    
        pinInUse = localStorage.getItem('pinUserId') ?? ''
        let pin = pinInUse.toString().trim() 

        let custLoadUserId = ''

        // clear display lines 

        users = []

        let match = false 

        let count = 0

        localStorage.setItem('selectedUserId','')
    
        for(const {UserId, First, Last} of data) { 

            count = count + 1

            let uid = UserId.toString().trim()  
 
    
            console.log(`1 user /${uid}/ filter /${filter}/`)

            // only show filered claim
            if(uid !== filter && filter !== 'All') continue  
            
            console.log(`2 pinId /${pin}/ uid /${uid}/`)

            // only show pinned claim
            if(pin !== '' && uid !== pin) continue  

            console.log("selected")
 
            custLoadUserId = localStorage.getItem('custLoadUserId') ?? ''
            if(custLoadUserId === UserId) {

                match = true
                localStorage.setItem('selectedUserId',custLoadUserId)
            }

            let entry = {UserId, First, Last, id,  match}
            console.log(`UserId .${UserId}. match ${match} custLoadUserId .${custLoadUserId}.`)
            users.push(entry)
            id++  
 
    }  

    console.log('a. users loaded count is ' + users.length) 

    console.log(`custLoadUserId: ${custLoadUserId} match: ${match}`)

    if(match)  
        readCustomers(custLoadUserId)
    else
        BuildScreen()  

    localStorage.setItem('process','done')

})  
 
    

} /* end load data */ 

const BuildScreen = async () => {

       /* add user detail option when signed in etc */
       const startAtFirst = ''
       // customer loop starts at first customer 
       // if claims are loaded the loop resumes for any 
       // ramining customers after claims loaded 
       // to keep screen in order
       localStorage.setItem('resumeCustomerId', startAtFirst)
       key = 1
 
       /* user loop */

       console.log('build user screen - clear display lines')
       lines = [] 
       
       for(var {UserId, First, Last, match} of users) { 
       

         let header1 = 

            <div className="row" key={key+10}>
            
                <div style={headerStyle} className="col-md-2">User</div>
                <div style={headerStyle} className="col-md-2">First Name</div>
                <div style={headerStyle} className="col-md-2">Last Name</div>
            </div>;

        let detail1 = 

            <div className="row" key={key+13}> 
                
                <div style={detailStyle} className="col-md-2">{ UserId }</div>  
                <div style={detailStyle} className="col-md-2">{ First }</div>  
                <div style={detailStyle} className="col-md-2">{ Last }</div> 
            </div>;  

          lines.push(header1)
          lines.push(detail1)   

        let userButtonLine = <div key={key+14} style={btnLineStyle}>

            <button type='button' style={b1first} data-userid={UserId} onClick={onCustomerSummary} className="btn btn-primary">{summaryLiteral}</button> 

            <button type='button' style={b1} data-userid={UserId} onClick={onCustomerDetail} className="btn btn-primary">{detailLiteral}</button>  

            <button type='button' style={b1} onClick={onNone} className="btn btn-primary">None</button>  
            
            <button type='button' style={b1} onClick={onCustomerStamps} className="btn btn-primary">{customerStampLiteral}</button>   
            
            <button type='button' style={b1} onClick={onUserPin} data-userid={UserId} className="btn btn-primary">{pinLiteral}</button>  
            
            <button type='button' style={b1} onClick={onReturn} className="btn btn-primary">Select</button> 
            
            <button type='button' style={b1} onClick={onAdminLists} className="btn btn-primary">Menu</button> 


        </div>;

        lines.push(userButtonLine)  
 

         // did we load custoemrs at user request ? and were some found ?
         let uid = UserId.toString().trim()
         let selected = localStorage.getItem('selectedUserId')?.toString().trim()
         // show customers for this user 
         if(customers.length > 0 && uid === selected) {
 
              BuildCustomerScreen() 

         }


        key = key + 10000

       } /* end user loop */   

       setDisplayLines(lines)

       return true
}

 

let readCustomers = async (userId:string) => {
 
    debugger 

   let customersFound = false
 

   await readCustomersForUser(userId).then( (r:any) => {

    let id = 1
 
    debugger

    if(r === undefined || r === null) return null

    let customerList = r['customerList']  

    console.log('c2. incoming customer list') 
 
    customers = []

    for(var i = 0; i < customerList.length; i++) { 

        let cust: Customer = customerList[i]
        if (cust === undefined ) continue 
        let custId = cust.custId.trim()
 
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

        let obj = {id: id, 
                   custId: custId, 
                   firstName: firstName,
                   middleName: middleName,
                   lastName: lastName,  
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
           customersFound = true 

           debugger

        } /* end of read customer loop */ 

        
        console.log('b. customers loaded count is ' + customers.length) 
        console.log('b. user id is: ' + userId)

        /* ------------------------------------------------------------ */
        /* read claims if requested                                     */
        /* ------------------------------------------------------------ */
        const off = ''
        let loadClaims = (localStorage.getItem('claimSummary') ?? '') !== off
        let customerId = localStorage.getItem('claimSummary') ?? ''

        // set resumeCustomerId 
        let cid = customerId.toString().trim()
        localStorage.setItem('resumeCustomerId', cid)

        if(customersFound && loadClaims) 
            readClaims(customerId)
        else
            BuildScreen() 
         
    })
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

 let readClaims = async (customerId:string) => {


     claims = []
 
 await readClaimDataForCustomer(customerId).then( (r:any) => {

         console.log('loading claims for ' + customerId)

          let id = 1

          debugger

          if(r === undefined) return null

          let data = r['data']


          for(var i = 0; i < data.length; i++) {

              /* dev note: where to use "Encrypted" to filter */
              /* pre selected [ not in a30 ] */
              /* pinned */

              let claim: Claim = data[i]

              let customerId = claim.customerId
              let claimIdNumber = claim.ClaimIdNumber
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
                  customerId: customerId,
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

              claims.push(obj)
              id++
          }  
          
         console.log('c. claims loaded count is ' + claims.length) 
         console.log('c. custimerId is: ' + customerId)
 

         BuildScreen()

})  

 }

let BuildClaims = () => {
 

      console.log('c10a. build  - building claims screen')
 
       let claimDetail = localStorage.getItem('claimDetail') ?? ''
       let claimStamps = localStorage.getItem('claimStamps') ?? '' 
       let detail = (claimDetail !== '')
       let stamps = (claimStamps !== '')
 
    for(   var {id,
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
            cupdateapp} of claims) {

        console.log(`c10aa. building lines for claim id: ${claimIdNumber}`)

        let header1 = <div  className="row" key={key+60}>
            <div style={headerStyle}  className="lit s col-md-4">Claim&nbsp;{ id }</div>
            <div style={headerStyle}  className="lit s col-md-4">Patient</div>
            <div style={headerStyle}  className="lit s col-md-4">Description</div>
        </div>;

         let detail1 =
         <div  className="row" key={key+62}>
               <div style={detailStyle} className="data s col-md-4">{ claimIdNumber }</div>
               <div style={detailStyle} className="data s col-md-4">{ patientFirst } { patientLast } </div>
               <div style={detailStyle} className="data s col-md-4">{ description }</div>
          </div>;

         lines.push(header1)
         lines.push(detail1) 
      
         if(detail) {

           let header2 = 
            <div   className="row" key={key+64}>
                <div style={headerStyle} className="lit s col-md-4">Status Type</div>
                <div style={headerStyle} className="lit s col-md-4">Service</div>
                <div style={headerStyle} className="lit s col-md-4">Plan</div>
            </div>;

         let detail2 = 
            <div   className="row" key={key+66}>
                <div style={detailStyle} className="data s col-md-4">{claimStatus}&nbsp;{ claimTypeLit } </div>
                <div style={detailStyle} className="data s col-md-4">{ claimService }</div>
                <div style={detailStyle} className="data s col-md-4">{ planId }</div>
            </div>;

           lines.push(header2)
           lines.push(detail2) 
           
         }

         if(stamps) {

           
          let header3 = 
            <div  className="row" key={key+68}>
                <div style={headerStyle} className="lit s col-md-4">Added By</div>
                <div style={headerStyle} className="lit s col-md-4">Time</div>
                <div style={headerStyle} className="lit s col-md-4">App</div>
            </div>;

        let detail3 = 
            <div    className="row" key={key+70}>
                <div style={detailStyle} className="data s col-md-4">{ cadduser }</div>
                <div style={detailStyle} className="data s col-md-4">{ caddusertime }</div>
                <div style={detailStyle} className="data s col-md-4">{ caddapp }</div>
            </div>;

         lines.push(header3)
         lines.push(detail3)

           let header4 = 
            <div    className="row" key={key+72}>
                <div style={headerStyle} className="lit s col-md-4">Updated By</div>
                <div style={headerStyle} className="lit s col-md-4">Time</div>
                <div style={headerStyle} className="lit s col-md-4">App</div>
            </div>;

         let detail4 =  
            <div   className="row" key={key+74}>
                <div style={detailStyle} className="data s col-md-4">{ cupdateuser }</div>
                <div style={detailStyle} className="data s col-md-4">{ cupdateusertime } </div>
                <div style={detailStyle} className="data s col-md-4">{ cupdateapp }</div>
            </div>;

         lines.push(header4)
         lines.push(detail4)

         }

        key = key + 100 
          
   } 

   
      console.log('c10b. build  - building claims screen finished')
      console.log('c10c. finish customer reading and loading')

      BuildCustomerScreen()
}


 

 let BuildCustomerScreen = () => {
 
        debugger
       
       console.log('e. build customer screen')  
       let showCustomerDetail = localStorage.getItem('showCustomerDetail') ?? ''
       console.log('showCustomerDetail is: ' + showCustomerDetail)

       let showCustomerStamps = localStorage.getItem('showCustomerStamps') ?? ''

       let showCustomerSummaryValue = localStorage.getItem('custLoadUserId') ?? '' // custId or ''
       let showCustomerDetailValue = localStorage.getItem('showCustomerDetail') ?? ''
       let showCustomerStampsValue = localStorage.getItem('showCustomerStamps') ?? ''
       let summary = (showCustomerSummaryValue !== '')
       let detail = (showCustomerDetailValue !== '')
       let stamps = (showCustomerStampsValue !== '')
       let showClaimButtonLIne = (summary || detail || stamps)
  
       
       for(var {custId, firstName, middleName,lastName, appId, email, phone, password,
                addr1, addr2, city, state, zip,
                birth, gender,
                adduser,
                addusertime,
                updateuser,
                updateusertime,
                addapp,
                updateapp
       } of customers) {

        console.log("bs2a: processing customer screen for customer " + custId)
 
 
       // claim summary 
       let header1 = 

            <div className="row" key={key+20}>
                <div style={headerStyle} className="col-md-4">Customer</div>
                <div style={headerStyle} className="col-md-4">Name</div>
                <div style={headerStyle} className="col-md-4">App</div>
            </div>;

        
        let detail1 = 

            <div className="row" key={key+22}> 
                <div style={detailStyle} className="col-md-4">{custId}</div>
                <div style={detailStyle} className="col-md-4">{firstName} {middleName} {lastName}</div>
                <div style={detailStyle} className="col-md-4">{appId}</div>
            </div>;

         lines.push(header1)
         lines.push(detail1)

        // claim detail
        if(showCustomerDetail !== '') {

         let header2 = 

            <div className="row" key={key+24}>
                <div style={headerStyle}  className="col-md-4">Email</div>
                <div style={headerStyle}  className="col-md-4">Phone</div>
                <div style={headerStyle}  className="col-md-4">Password</div>
            </div>;

        let detail2 = 

            <div className="row" key={key+26}> 
                <div style={detailStyle}  className="col-md-4">{ email }</div>
                <div style={detailStyle}  className="col-md-4">{ phone }</div>
                <div style={detailStyle}  className="col-md-4">{ password }</div>
            </div>;

        lines.push(header2)
        lines.push(detail2)


        let header3 = 
            <div className="row" key={key+28}>
                <div style={headerStyle} className="col-md-4">Address</div>
            </div>;

        let detail3 = 
            <div className="row" key={key+30}> 
                <div style={detailStyle}  className="col-md-4">{ addr1 } { addr2 } { city }
                    { state } { zip }
                </div>
            </div>;

            
        lines.push(header3)
        lines.push(detail3)


          let header4 = 
            <div className="row" key={key+32}>
                <div style={headerStyle}  className="col-md-4">Birth Date</div>
                <div style={headerStyle}  className="col-md-4">Gender</div>
            </div>;

        let detail4 =
            <div className="row" key={key+34}>

                <div style={detailStyle} className="col-md-4">{ birth }</div>
                <div style={detailStyle} className="col-md-4">{ gender }</div>
            </div>; 
            
        lines.push(header4)
        lines.push(detail4)

        } /* end of claim detail */

        /* claims stamps */ 

        if(showCustomerStamps !== '') {

            let header5 =  <div key={key+36} className="row">

                <div style={headerStyle} className="lit s col-md-4">Added by</div>
                <div style={headerStyle} className="lit s col-md-4">Date</div>
                <div style={headerStyle} className="lit s col-md-4">App</div>
            </div>;

            let detail5 = 
            <div key={key+38} className="row">

                <div style={detailStyle} className="data s col-md-4">{ adduser }</div>
                <div style={detailStyle} className="data s col-md-4">{ addusertime }</div>
                <div style={detailStyle} className="data s col-md-4">{ addapp }</div>
            </div>;

            lines.push(header5)
            lines.push(detail5)

            let header6 = 
            <div key={key+40} className="row">

                <div style={headerStyle} className="lit s col-md-4">Updated By</div>
                <div style={headerStyle} className="lit s col-md-4">Date</div>
                <div style={headerStyle} className="lit s col-md-4">App</div>
            </div>;

        let detail6 = 
            <div  key = {key+42} className="row">

                <div style={detailStyle}  className="data s col-md-4">{ updateuser }</div>
                <div style={detailStyle}  className="data s col-md-4">{ updateusertime }</div>
                <div style={detailStyle}  className="data s col-md-4">{ updateapp }</div>
            </div>;
    
            lines.push(header6)
            lines.push(detail6)

        } /* end stamps */

        if(showClaimButtonLIne) {

            let claimButtonLine = <div key={key+44} style={btnLineStyle}>

                <button type='button' style={b1first} data-claimid={custId} onClick={onClaimSummary} data-custid = {custId} className="btn btn-success">{claimSummaryLiteral}</button> 

                <button type='button' style={b1} data-claimid={custId} onClick={onClaimDetail} data-custid = {custId} className="btn btn-success">{claimDetailLiteral}</button>  

                <button type='button' style={b1} onClick={onClaimNone} className="btn btn-success">None</button>  
                
                <button type='button' style={b1} onClick={onClaimStamps} className="btn btn-success">{claimStampLiteral}</button>   
        
            </div>;

            lines.push(claimButtonLine)  

        }

        // if claims are signaled to be loaded load the claim lines now

        let claimSummary = localStorage.getItem('claimSummary') ?? '' // customer id for claim summary
        let showClaimsForThisCustomer = (claimSummary === custId) ? true : false
   
        console.log(`c8a. custId: ${custId}`)
        console.log(`c8. claims? claimSummary: ${claimSummary} showClaimsForThisCustome: ${showClaimsForThisCustomer}`)
        if(showClaimsForThisCustomer) {  

             console.log('c4. loading claim data - not screen yet ')
             console.log('c4a - due to await restrictions the cust screen load will complete after')
             console.log('c4b - claim data is read and loaded')
             
               /*-----------------------------------------------------------------------------------*/
               /* build claims                                                                      */
               /*-----------------------------------------------------------------------------------*/

               console.log('c10a. build  - building claims screen')
 
                let claimDetail = localStorage.getItem('claimDetail') ?? ''
                let claimStamps = localStorage.getItem('claimStamps') ?? '' 
                let detail = (claimDetail !== '')
                let stamps = (claimStamps !== '')
            
                for(   var {id,
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
                        cupdateapp} of claims) {

                console.log(`c10aa. building lines for claim id: ${claimIdNumber}`)

                let header1 = <div  className="row" key={key+60}>
                    <div style={headerStyle}  className="lit s col-md-4">Claim&nbsp;{ id }</div>
                    <div style={headerStyle}  className="lit s col-md-4">Patient</div>
                    <div style={headerStyle}  className="lit s col-md-4">Description</div>
                </div>;

                let detail1 =
                <div  className="row" key={key+62}>
                    <div style={detailStyle} className="data s col-md-4">{ claimIdNumber }</div>
                    <div style={detailStyle} className="data s col-md-4">{ patientFirst } { patientLast } </div>
                    <div style={detailStyle} className="data s col-md-4">{ description }</div>
                </div>;

                lines.push(header1)
                lines.push(detail1) 
            
                if(detail) {

                let header2 = 
                    <div   className="row" key={key+64}>
                        <div style={headerStyle} className="lit s col-md-4">Status Type</div>
                        <div style={headerStyle} className="lit s col-md-4">Service</div>
                        <div style={headerStyle} className="lit s col-md-4">Plan</div>
                    </div>;

                let detail2 = 
                    <div   className="row" key={key+66}>
                        <div style={detailStyle} className="data s col-md-4">{claimStatus}&nbsp;{ claimTypeLit } </div>
                        <div style={detailStyle} className="data s col-md-4">{ claimService }</div>
                        <div style={detailStyle} className="data s col-md-4">{ planId }</div>
                    </div>;

                lines.push(header2)
                lines.push(detail2) 
                
                } /* end claim details */

                if(stamps) {

                
                let header3 = 
                    <div  className="row" key={key+68}>
                        <div style={headerStyle} className="lit s col-md-4">Added By</div>
                        <div style={headerStyle} className="lit s col-md-4">Time</div>
                        <div style={headerStyle} className="lit s col-md-4">App</div>
                    </div>;

                let detail3 = 
                    <div    className="row" key={key+70}>
                        <div style={detailStyle} className="data s col-md-4">{ cadduser }</div>
                        <div style={detailStyle} className="data s col-md-4">{ caddusertime }</div>
                        <div style={detailStyle} className="data s col-md-4">{ caddapp }</div>
                    </div>;

                lines.push(header3)
                lines.push(detail3)

                let header4 = 
                    <div    className="row" key={key+72}>
                        <div style={headerStyle} className="lit s col-md-4">Updated By</div>
                        <div style={headerStyle} className="lit s col-md-4">Time</div>
                        <div style={headerStyle} className="lit s col-md-4">App</div>
                    </div>;

                let detail4 =  
                    <div   className="row" key={key+74}>
                        <div style={detailStyle} className="data s col-md-4">{ cupdateuser }</div>
                        <div style={detailStyle} className="data s col-md-4">{ cupdateusertime } </div>
                        <div style={detailStyle} className="data s col-md-4">{ cupdateapp }</div>
                    </div>;

                lines.push(header4)
                lines.push(detail4)

                } /* end stamps */

                key = key + 100 
                
            } /* end claim loop */
        
        } /* end if statement to build claims */
      
    } /* end customer loop */

    setDisplayLines(lines)
 
 } /* end fbuild customer screen function */
   
 

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

    
    useEffect( ()  => {

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

        let userDataLoaded = localStorage.getItem('userDataLoaded') ?? ''
        if(userDataLoaded !== 'yes') { 

            localStorage.setItem('process','requested')

            setup()
            loadData() 

            localStorage.setItem('userDataLoaded','yes')

        }
    }) 

    const setup = () => {
 
       //localStorage.setItem('custLoadUserId', '')  // off
       //localStorage.setItem('showCustomerDetail', '') // off  
       //localStorage.setItem('showCustomerStamps','')
       
       //localStorage.setItem('claimSummary', '')  // off
       //localStorage.setItem('claimDetail', '') // off  
       //localStorage.setItem('claimStamps', '') // off  


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
      
    
        <h3 style={h3Style}> User List </h3>  
            
        <div id='center' style={divStyle}> 

            {displayLines}
             
        </div> 

    </div></>) 
}
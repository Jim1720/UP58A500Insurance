import { NavLink, Route, Routes, useNavigate } from "react-router-dom";


import Start from './Start.tsx' 
import Classic from './Classic.tsx'
import Info from './Info.tsx'
import About from './About.tsx'
import SignIn from './Signin.tsx'
import Register  from './Register.tsx'
import PlanQuestion from './PlanQuestion.tsx'
import MainMenu from './MainMenu.tsx'
import Plan from './Plan.tsx'
import Update from './Update.tsx'   
import Claim from './Claim.tsx'
import History from './History.tsx'
import PaymentHistory from './PaymentHistory'
import CustomerSearch from './CustomerSearch.tsx' 
import Wait from './Wait.tsx'
import Unauthorized from "./Unauthorized.tsx";
import AdminSignin from "./AdminSignin"
import AdminMenu from "./AdminMenu.tsx"

 
import AdminListsMenu from './AdminListsMenu.tsx' 
import AdminBasicCustomerListPrompt from './AdminBasicCustomerListPrompt.tsx' 
import AdminBasicCustomerList from './AdminBasicCustomerList.tsx'

import AdminUserListPrompt from './AdminUserListPrompt.tsx'
import AdminCommentListPrompt from './AdminCommentListPrompt' 

import AdminUserList from './AdminUserList.tsx'
import AdminCommentList from './AdminCommentList.tsx'
 
import AdminPasswordReset from './AdminPasswordReset.tsx' 
import AdminCustomerReset from './AdminCustomerReset.tsx'

import { useState } from "react"; 

export default function Application() { 

let navigator = useNavigate() 

const [signedIn, setSignedIn] = useState(false) 
const [lightMode, setLightMode] = useState('Dark')   
const [planArray, setPlanArray] = useState([])  

const [newClaimIdNumber, setNewClaimIdNumber] = useState()
const [claimOperation, setClaimOperation] = useState({ 

      // used for adjustments and copies to set service dropdown control
      // pass to claim and to history
      what: '',
      claimIdNumber: '',
      selectedClaimService: '',
      claimType: '' 
})

const [store, setStore] = useState({

      waitCounter: 0,
      // features
      debug: false,
      stayOnWait: false,
      // 
      signedIn: false,
      adminSignedIn: false,
      lightMode: 'Dark',
      // adjust and copy variables
      what: '',
      claimIdNumber: '',
      selectedClaimService: '',
      claimType: '', 
      // hist
      histTotalCharge: '',
      histBalanceOwed: '',
      appUser: '',
      testMode: '',
      startDest: '',
      setUpMessage: '',
      setUpMessageText: '',
      mainMenuMessage: '',
      interfaceRunOneTime: '',
      Token: '',
      customerId: '',
      customerName: '',
      custPlan: '', 
      // planArray not sure how to store
      storedCustomerType: '',
      storedCustomer: '', 
      priorPassword: '',
      updateScreenIsLoaded: '',
      claimScreenIsLoaded: '',
      historyScreenIsLoaded: '',
      claimServiceSetup: '',
      // actionButtons not sure how to store
      comboIsLoaded: '',
      focusClaimId: '',
      focus: '',
      stay: '',
      claimService: '',
      newClaimIdNumber: '',
      payHistoryClaimIdNumber : '',
      hello: '',
      // administrative settings
      userAuthLevel: '',
      showUers: '',
      showCustomers: '',
      showComments: '',
      MaintainPlans: '',
      MaintainServices: '',
      ResestFull: '',
      ResetLimited: ''
})

// history action buttons
let actionButtonSetup = {
 
      array  : []

}
const [actionButtons, setActionButtons] = useState(actionButtonSetup)
// history = parm actionButtons only - to show
// claim = actionButtons to read and setActionButtons to set on adjust, copy or print

const [focusClaimId, setFocusClaimId] = useState('')
// pass all the 3 above to claim and history

const defaultLightMode = 'Dark'
let currentLightMode = localStorage.getItem('lightMode') ?? '' 
let lightLiteral = currentLightMode

let notSetFirstTime = (currentLightMode !== 'Dark' && currentLightMode !== 'Light')
if (notSetFirstTime) {

      setLightMode(defaultLightMode)
      localStorage.setItem('lightMode', defaultLightMode)
      lightLiteral = defaultLightMode

}
 

let signOut = () => {

      setSignedIn(false)
      navigator('/')

}

let resetLoadStatus = () => {

      //store.updateScreenIsLoaded = 'no'
      localStorage.setItem("updateScreenIsLoaded",'') 
      navigator('/update')
}

let flipLightMode = () => {
 
      let newLightMode = (lightMode === "Dark") ? 'Light' : "Dark"
      setLightMode(newLightMode)
      localStorage.setItem("lightMode",newLightMode)
      lightLiteral = newLightMode

      let root = document.getElementById('body')
      let backgroundColor = (newLightMode === 'Dark') ? 'black' : 'white'
      root?.setAttribute('backgroundColor',backgroundColor)

}
 

 let lightModeBackgroundColor = (lightMode === 'Dark') ? 'black' : 'white'
 let lightModeLogoLinkColor = (lightMode === 'Dark') ? 'navajowhite' : 'blue' 
 let lightModeLinkColor = (lightMode === 'Dark') ? 'white' : 'blue'

 let lightStyle = { backgroundColor: lightModeBackgroundColor,
                    width: '100%',
                    height: '100%'
 }
 
  
const navLinkStyleFirst = {
    
      color: lightModeLogoLinkColor,
      fontSize: 'larger',
      fontFamily: 'arial',
      marginLeft: '22%',
      textDecoration: 'none', 
      marginBottom: '1%'

}


const navLinkStyleFirstSignedIn = {
    
      color: lightModeLogoLinkColor,
      fontSize: 'larger',
      fontFamily: 'arial',
      marginLeft: '15%',
      textDecoration: 'none', 
      marginBottom: '1%'

}



const navLinkStyleFirstSignedInAdmin = {
    
      color: lightModeLogoLinkColor,
      fontSize: 'larger',
      fontFamily: 'arial',
      marginLeft: '1%',
      textDecoration: 'none', 
      marginBottom: '1%'

}


 
 
 let Active = (lightMode === 'Dark') ? 'navajowhite' : 'blue' 
 let Inactive = (lightMode === 'Dark') ? 'white' : 'green'
 
const navLinkStyle = ({isActive}:any) => ({
    
      color: isActive ? Active : Inactive,
      fontSize: 'larger',
      fontFamily: 'arial',
      marginLeft: '4%',
      textDecoration: 'none',
      marginBottom: '5px'

})

 



 let Active3 = (lightMode === 'Dark') ? 'lightgoldenrodyellow' : 'blue' 
 let Inactive3 = (lightMode === 'Dark') ? 'navajowhite' : 'blue' 
const navLinkStyle2customer = ({isActive}:any) => ({
    
      color: isActive ? Active3 : Inactive3,  
      fontSize: 'larger',
      fontFamily: 'arial',
      marginLeft: '4%',
      textDecoration: 'none',
      marginBottom: '5px'

})


const btnLinkStyle = {

      color: lightModeLinkColor,
      backgroundColor: lightModeBackgroundColor,
      fontSize: 'larger',
      fontFamily: 'arial',
      marginLeft: '4%',
      textDecoration: 'none',
      marginBottom: '5px',
      boxShadow: 'none',
      outline: 'none',
      appearence: 'none',
      border: 'none'

}



const navStyle = {

     marginTop: '2%',
     marginBottom: '5px', 
     paddingBottom: '5px',
     backgroundColor: lightModeBackgroundColor

} 
 
let customerId = localStorage.getItem('customerId')
//let customerId = store.customerId
let customerName = localStorage.getItem('customerName')
//let customerName = store.customerName

let whiteLineStyle = { borderBottom: 'solid 1px white'} 


let navOut =    <nav style={navStyle}> 
                  <NavLink style={navLinkStyleFirst} to="/start">A500Insurance</NavLink>    
                  <NavLink style={navLinkStyle} to="/start">Start</NavLink>    
                  <NavLink style={navLinkStyle} to="/classic">Classic</NavLink>   
                  <NavLink style={navLinkStyle} to="/register">Register</NavLink>  
                  <NavLink style={navLinkStyle} to="/signin">Sign In</NavLink>  
                  <NavLink style={navLinkStyle} to="/info">Info</NavLink>  
                  <NavLink style={navLinkStyle} to="/about">About</NavLink>
                  <button onClick={flipLightMode} style={btnLinkStyle}>Light</button>    
                  <NavLink style={navLinkStyle} to="/adminsignin">Admin</NavLink> 
              </nav>

let navIn =    <nav style={navStyle}>  
                  <NavLink style={navLinkStyleFirstSignedIn} to="/mainmenu">A500Insurance</NavLink>   
                  <NavLink style={navLinkStyle} to="/mainmenu">Menu</NavLink>  
                  <NavLink onClick={resetLoadStatus} style={navLinkStyle} to="/update">Update</NavLink>  
                  <NavLink style={navLinkStyle} to="/claim">Claim</NavLink>  
                  <NavLink style={navLinkStyle} to="/plan">Plan</NavLink>   
                  <NavLink style={navLinkStyle} to="/history">History</NavLink>   
                  <button onClick={signOut}  style={btnLinkStyle}>Sign Out</button>       
                  <NavLink style={navLinkStyle2customer} to="/about">{customerId}&nbsp;{customerName}</NavLink>  
                  <button onClick={flipLightMode} style={btnLinkStyle}>Light</button>       
              </nav>

/* note put codde in start to reset the link control  -- no specific sign out */
/* ( ) compare links with 600 links */

let adminNavInLinks =    <nav style={navStyle}>  
                  <NavLink style={navLinkStyleFirstSignedInAdmin} to="/adminmenu">A500Administration</NavLink>   
                  <NavLink style={navLinkStyle} to="/adminmenu">Menu</NavLink>  
                  <NavLink style={navLinkStyle} to="/adminpasswordreset">Reset Password</NavLink>  
                  <NavLink style={navLinkStyle} to="/admincustomerreset">Reset Customer</NavLink>  
                  <NavLink style={navLinkStyle} to="/adminbasiccustomerlistprompt">Customers</NavLink>   
                  <NavLink style={navLinkStyle} to="/adminuserlistprompt">Users</NavLink>   
                  <NavLink style={navLinkStyle} to="/admincommentlistprompt">Comments</NavLink>  
                  <NavLink style={navLinkStyle} to="/">Sign Out</NavLink>        
                  <button onClick={flipLightMode} style={btnLinkStyle}>Light</button>       
              </nav>


// note: going to start signes out the admin
let navLinks = (signedIn) ? navIn : navOut 
const adminSignedIn = localStorage.getItem("adminSignedIn") ?? ''
if(adminSignedIn === 'yes') {
      navLinks = adminNavInLinks
}

// put this in app+= state=signed in, customerName, customerId
// pass setSignedIn to sign in screen
// pass custName customerId to main menu from the app 

 let whiteLine = <div style={whiteLineStyle}></div>

  let topDivStyle = { backgroundColor: lightModeBackgroundColor }

  return(<div style={topDivStyle}> 

        <nav style={navStyle}>
         
           {navLinks}
           {whiteLine}

        </nav>
 
        <div style={lightStyle} className='container' > 
        <Routes>

           <Route path="/" element={<Wait store={store} setStore={setStore} />}  />  
           <Route path="/wait" element={<Wait store={store} setStore={setStore} />}  /> 
           <Route path="/start" element={<Start
                  store={store} setStore={setStore}
           />} />   
           <Route path="/classic" element={<Classic/>} />
           <Route path="/info" element={<Info/>} />
           <Route path="/about" element={<About/>} />
           <Route path="/signin" element={<SignIn setSignedIn={setSignedIn}
                  store={store} setStore={setStore} />} /> 
           <Route path="/customersearch" element={<CustomerSearch
                    store={store} setStore={setStore}
           />} /> 
           <Route path="/register" element={<Register setSignedIn={setSignedIn}
                  store={store} setStore={setStore}
           />} /> 
           

           <Route path="/planquestion" element={<PlanQuestion  
           />} />   
           <Route path="/mainmenu" element={<MainMenu setSignedIn={setSignedIn}
                   store={store} setStore={setStore}
           />} /> 
           <Route path="/update" element={<Update 
                  store={store} setStore={setStore}
                  />} /> 

           <Route path="/claim" element={<Claim 
                                claimOperation={claimOperation}
                                newClaimIdNumber={newClaimIdNumber}
                                setNewClaimIdNumber={setNewClaimIdNumber} 
                                actionButtons={actionButtons}
                                setActionButtons={setActionButtons}  
                                focusClaimId={focusClaimId}
                                setFocusClaimId={setFocusClaimId}
                                store={store} setStore={setStore}
                                />} />  

           <Route path="/history" element={<History  
                                  setClaimOperation={setClaimOperation}
                                  actionButtons={actionButtons} 
                                  focusClaimId={focusClaimId}
                                  setFocusClaimId={setFocusClaimId} 
                                  store={store} setStore={setStore}
                                  />}  />  

      
           <Route path="/paymenthistory" element={<PaymentHistory
                                         store={store} setStore={setStore}
              />} />  
                                  
           <Route path="/plan" element={<Plan setPlanArray={setPlanArray} 
                  store={store} setStore={setStore}/>} />  
            
            
           <Route path="/wait" element={<Wait store={store}  setStore={setStore} />} /> 
           <Route path="/unauthorized" element={<Unauthorized/>} /> 


           
           <Route path="*" element={<Unauthorized/>} /> 

           
           <Route path="/adminsignin" element={<AdminSignin setSignedIn={setSignedIn}
                  store={store} setStore={setStore} />} /> 

            
           <Route path="/adminmenu" element={<AdminMenu  
                   />} /> 

            
           <Route path="/adminlistsmenu" element={<AdminListsMenu  
                  />} /> 

            
           <Route path="/adminbasiccustomerlistprompt" element={<AdminBasicCustomerListPrompt  
                  />} /> 

            
           <Route path="/adminbasiccustomerlist" element={<AdminBasicCustomerList  
                  />} /> 

                   
           <Route path="/adminuserlistprompt" element={<AdminUserListPrompt  
                  />} /> 


            <Route path="/admincommentlistprompt" element={<AdminCommentListPrompt  
            />} />  

    
           <Route path="/adminuserlist" element={<AdminUserList  
                  />} /> 

            
           <Route path="/admincommentlist" element={<AdminCommentList  
                  />} /> 

            <Route path="/adminpasswordreset" element={<AdminPasswordReset  
            />} /> 

            <Route path="/admincustomerreset" element={<AdminCustomerReset  
            />} /> 

        </Routes>
        </div>

 </div>)

}
import {  useEffect, useState } from "react" 
import { readCustomer, registerCustomer } from './Database'
import { useNavigate } from "react-router-dom"
import { editDate } from "./DateEdit"

export default function Register({setSignedIn,store,setStore}:any) { 


    const [customerId, setCustomerId ] = useState('')
    const [password,   setPassword] = useState('') 
    const [confirm,   setConfirm] = useState('')
    const [firstname, setFirstName] = useState('')
    const [middle, setMiddleName] = useState('')
    const [lastname, setLastName] = useState('')
    
    const [birthdate, setBirthDate] = useState('')  
    const [screenbirthdate, setScreenbirthdate] = useState('')
    const [gender, setGender] = useState('M') 
    const [email, setEmail] = useState('') 
    const [phone, setPhone] = useState('') 
    
    const [address1, setAddress1] = useState('') 
    const [address2, setAddress2] = useState('') 
    const [promotioncode, setPromotionCode] = useState('')

    
    const [city, setCity] = useState('')  
    const [state, setState] = useState('WA') 
    const [zip, setZip] = useState('')  

    // state gender from combo boxes 

    const [message, setMessage] = useState('') 

    
    let navigate = useNavigate()

    
    debugger 

    // auth check  
    // navigate is in use effect
    let authCheckPassed = true
    let testMode = localStorage.getItem('testMode') ?? ''
    let appUser = localStorage.getItem('appUser') ?? ''
    let currentMode = (testMode === '') ? 'test' : 'prod'
    //console.log("regiser screen auth check ")
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

    let h3Style = {marginTop: '2%', marginLeft: '42%', color: titleColor, fontFamily: 'arial', marginBottom: '2%',
                   fontStyle: 'italic'
    }
    let h5style = {color: 'lightgoldenrodyellow', marginLeft: '42%', marginBottom: '2%', fontStyle: 'italic'} 
   
    let divStyle = { marginLeft: '15%'}
    let pstyle = { color: 'white', fontFamily: 'arial', fontStyle:'italic', fontSize: 'large',
        marginTop: '8%'
    }
    let labelStyle = {marginTop: '1%', color: labelColor, fontFamily: 'arial', fontSize:'larger'}
    
    let inputStyle = { marginTop: '1%', color: inputColor, backgroundColor: inputBackGroundColor, fontFamily: 'arial', fontSize:'larger'}
      
    let messageStyle = {marginTop: '1%', color: messageColor , fontFamily: 'arial', fontSize:'larger'}
 
    let btnStyle = { fontSize: 'larger' }

    let dropStyle = { marginTop: '8px'}

    let optStyle = { color: inputColor, backgroundColor: inputBackGroundColor}

    let spaceStyle = {backgroundColor: inputBackGroundColor}

      

    
    const handleChange = (event:any) => {
 

        let t = event.target 
        let id : string | null = t.getAttribute('id')  
        switch(id) {

            case 'customerId' : setCustomerId(event?.target.value); break;
            case 'password'   : setPassword(event?.target.value);   break;
            case 'confirm'    : setConfirm(event?.target.value); break;
            case 'firstname'  : setFirstName(event?.target.value); break; 
            case 'middlename' : setMiddleName(event?.target.value); break;
            case 'lastname'  : setLastName(event?.target.value); break; 
            case 'screenbirthdate' : setScreenbirthdate(event?.target.value); break; 
            case 'email'  : setEmail(event?.target.value); break; 
            case 'phone'  : setPhone(event?.target.value); break;
            case 'address1' : setAddress1(event?.target.value); break; 
            case 'address2' : setAddress2(event?.target.value); break; 
            case 'promotioncode' : setPromotionCode(event?.target.value); break; 
            case 'city' : setCity(event?.target.value); break;  
            case 'zip' : setZip(event?.target.value); break; 
            // gender
            // state

        }

    }
  

 const onState = (e:any) => {
 
      let value = e.target.dataset.state
      setState(value) 
   }

   const onGender = (e:any) => {
 
      let value = e.target.dataset.gender
      setGender(value) 
   }
    
   
   const onCancel = () => {

        navigate('/start')
        return

   }
    
   const getTheDateTime = () : string => { 

          var now = new Date(); 
          
          let d = now;
          let yyyy = d.getFullYear(); 
          let dd = d.getDate(); 
          let hh = now.getHours();
          let mi = d.getMinutes(); 
          let md = mi.toString();
          if (mi < 10) {
            md = "0" + md;
          }
          let ampm = "a.m."; 
          let monthLiteral = findMonth(now.getMonth());
          if (hh === 0) {
              hh = 12;
          }
          if (hh > 12) {
              hh = hh - 12;
              ampm = "p.m.";
          } 
          
          let date =  monthLiteral + ' '  + dd + ' ' + yyyy + ' ' + hh + ':' + md + ' ' + ampm;
          return date
    }


  const findMonth = (value:number) => { 

    var months = ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September','October','November','December'];
    return months[value];

  } 

  
  const goldHover = (lightMode:string) => (e:any) => {
         

        let color = (lightMode === "Dark") ? 'gold' : 'green'
        e.target.style.color = color 
  }

  
  const goldLeave = (lightMode:string)  => (e:any) => {  
       
        let color = (lightMode === "Dark") ? 'white' : 'blue'
        e.target.style.color = color
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
    

const onRegister = async (event:any) => {

        event.preventDefault() 

        if(customerId.trim() === '') {

        setMessage("Customer Id is blank please enter one")
        return;

        }

        if(password.trim() === '') {

        setMessage("Password is blank please enter one")
        return;

        } 

        if(confirm.trim() === '') {

        setMessage("Confirm is blank please enter one")
        return;

        } 

        if(firstname.trim() === '') {

            setMessage("First Name is blank please enter one")
            return;

            } 

        if(lastname.trim() === '') {

        setMessage("Last Name is blank please enter one")
        return;

        } 
         
         const pattern = /^[ A-Za-z0-9]*$/
         if (pattern.test(customerId) === false) { 
             setMessage(`Customer Id is invalid: ${customerId}`) 
             return
         } 
 
          
         if (pattern.test(password) === false) { 
             setMessage(`Password is invalid: ${password}`) 
             return
         } 

        if (pattern.test(confirm) === false) { 
             setMessage(`Confirm is invalid: ${confirm}`) 
             return
         } 

         if (password !== confirm) {

             setMessage('Password and confirmation password must match') 
             return

         }

         // fields blank check
         const blank = ''
         let blankFieldError = false
         let fieldInError = ''
         let fields = ['birthdate','email','phone','address1','city','zip'] 

         for(var field of fields) {

            let element = document.getElementById(field)
            let value = element?.getAttribute('value')

            if(value?.trim() === blank) {

                   blankFieldError = true
                   fieldInError = field
                   break
            } 
         }

         if(blankFieldError) {

            let blankMessage = fieldInError + ' is blank please enter something'
            setMessage(blankMessage)
            return

         }

        if (pattern.test(firstname) === false) { 
             setMessage(`First Name is invalid: ${firstname}`) 
             return
         } 

        if (pattern.test(lastname) === false) { 
             setMessage(`Last Name is invalid: ${lastname}`) 
             return
         } 
        
         // edit birth date
         interface DateParm 
         {
            valid: string,
            formatted: string,
            message: string
         }
         var dateParm = { input: screenbirthdate , screen: "register", valid: false, formatted: "", message: ""}
         let editResult = editDate(dateParm)
         if (editResult.valid === false) {
            setMessage(editResult.message)
            return

         } else { 
             
            setBirthDate(editResult.formatted)

         }
 

         // chars at-sign chars
         const emailPattern = /^[A-Za-z0-9]+@[A-Za-z0-9.]+$/ 
          if (emailPattern.test(email) === false) { 
             setMessage(`Email is invalid: ${email}`) 
             return
         }

          // 10 digits
          const phonePattern = /^[0-9]{10}$/ 
          if (phonePattern.test(phone) === false) { 
             setMessage(`Phone Number is invalid: ${phone}`) 
             return
         }
           
         

         if (pattern.test(address1) === false) { 
             setMessage(`Address1 is invalid: ${address1}`) 
             return
         } 

        if (pattern.test(address2) === false) { 
             setMessage(`Address2 is invalid: ${address2}`) 
             return
         } 

         
        if (pattern.test(city) === false) { 
             setMessage(`City is invalid: ${city}`) 
             return
         } 
         

        if (pattern.test(zip) === false) { 
             setMessage(`Zip is invalid: ${zip}`) 
             return
         } 

        // A4Server checks the Promotion Code

         interface ReturnObject {
            Status: string
            Customer: Customer,
            Token: string,
            Message: string
         }
            interface Customer {
            custId: string,
            custPassword: string,
            Encrypted: string,
            custFirst: string,
            custMiddle: string, 
            custLast: string,
            custEmail: string,
            custBirthDate: string, 
            custGender: string,
            custPhone: string, 
            custAddr1: string,
            custAddr2: string,
            custCity: string,
            custState: string,
            custZip: string,
            custPlan: string,
            PromotionCode: string,
            appid: string,
            extendColors: string,
            claimCount: string,
            adduser: string,
            addusertime: string, 
            addapp: string, 
            updateuser: string,
            updateusertime: string,
            updateapp: string 
         }  

         let defaultDate = '1900/01/01';
         let currentDateTime = getTheDateTime()

         const appId = 'A500'
         const defaultSpace = ''
         const addUser = localStorage.getItem('appUser') ?? ''

         debugger

         let customer   = {

             custId: customerId,
             custPass: password, // not custPassword fixed 
             custFirst: firstname,
             custMiddle: middle,
             custLast: lastname,  
             custBirthDate: birthdate,
             custGender: gender,
             custEmail: email,
             custPhone: phone,
             custAddr1: address1,
             custAddr2: address2,
             PromotionCode: promotioncode,
             custCity: city,
             custState: state,
             custZip: zip,
             custPlan: defaultSpace,
             Encrypted: '',
             extendColors: '',
             claimCount: '0',
             adduser: addUser,
             addusertime: currentDateTime,
             appId: appId,
             updateuser: defaultSpace,
             updateusertime: defaultDate,
             updateapp: 'n/a' 
         }

         // existenc 

         let customerAlreadyExists = false

         await readCustomer(customerId).then( (returnObject: ReturnObject) => {

             if (returnObject.Status === "Successful") {

                // show message
                setMessage("Customer already exists")
                customerAlreadyExists = true
                return
            }


         })

         if (customerAlreadyExists) {
            return
         }

         // confirmation 

            
        // register status alert user all is good before confirming
        const registerStatus = 'registerStatus'
        let registerStatusValue = localStorage.getItem(registerStatus) ?? ''
        if(registerStatusValue !== 'confirmed') {
            localStorage.setItem(registerStatus,'confirmed')
            setMessage('All looks good press register to process registration')
            return
        }
        localStorage.setItem('registerStatus','')

        
        // store customer for update screen usage 
        localStorage.setItem('storedCustomerType','register')
        let json = JSON.stringify(customer)
        localStorage.setItem('storedCustomer',json)

          let thePlan = '' 
          localStorage.setItem('custPlan',thePlan) 

          setStore({

            storedCustomer: json,
            custPlan: thePlan

          })
          

            //console.log('register store store json')
            //console.log(store.storedCustomer)

         await registerCustomer(customer).then( (returnObject: ReturnObject) => {

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

            // set main menu message
           // localStorage.setItem('mainMenuMessage',`Customer ${name} registered`)

              setStore({

                mainMenuMessage: `Customer ${name} registered`,
                Token: token,
                storedCustomerType: 'register',
                customerId: customerId,
                customerName: name,
                signedIn: true,
                mainMenuMesssage: `Customer ${name} registered`
            })


            // useNavigate
            navigate('/planquestion')  

         }) 
}

    return(<>
 
        <h3 onMouseOver={yellowHover(lightMode)} onMouseLeave={yellowLeave(lightMode)} style={h3Style}> Register Customer </h3> 

        <div id='center' style={divStyle}>  

        <div className="row">

            <div className="col-3">

            <label onMouseOver={whiteHover(lightMode)} onMouseLeave={whiteLeave(lightMode)}   style={labelStyle} className='control-label'>Customer Identification</label>  
            <input onMouseOver={goldHover(lightMode)} onMouseLeave={goldLeave(lightMode)}  defaultValue={customerId} value={customerId} id='customerId' onChange={handleChange} style={inputStyle} type='text' className='form-control'/>
           
            </div>

             <div className="col-3">

            <label  onMouseOver={whiteHover(lightMode)} onMouseLeave={whiteLeave(lightMode)}  style={labelStyle} className='control-label'>Customer Password</label>  
            <input onMouseOver={goldHover(lightMode)} onMouseLeave={goldLeave(lightMode)}   defaultValue={password} value={password} id='password' onChange={handleChange} style={inputStyle} type='text' className='form-control'/>
           
            </div>

             <div className="col-3">

            <label onMouseOver={whiteHover(lightMode)} onMouseLeave={whiteLeave(lightMode)}  style={labelStyle} className='control-label'>Confirm Password</label>  
            <input  onMouseOver={goldHover(lightMode)} onMouseLeave={goldLeave(lightMode)} defaultValue={confirm} value={confirm} id='confirm' onChange={handleChange}  style={inputStyle} type='text' className='form-control'/>
           
            </div>
        </div>

        
        <div className="row">

            <div className="col-3">

            <label onMouseOver={whiteHover(lightMode)} onMouseLeave={whiteLeave(lightMode)}  style={labelStyle} className='control-label'>First Name</label>  
            <input onMouseOver={goldHover(lightMode)} onMouseLeave={goldLeave(lightMode)} defaultValue={firstname} value={firstname} id='firstname' onChange={handleChange}  style={inputStyle} type='text' className='form-control'/>
           
            </div>

             <div className="col-3">

            <label onMouseOver={whiteHover(lightMode)} onMouseLeave={whiteLeave(lightMode)}  style={labelStyle} className='control-label'>Middle Name</label>  
            <input onMouseOver={goldHover(lightMode)} onMouseLeave={goldLeave(lightMode)}  defaultValue={middle} value={middle} id='middlename' onChange={handleChange} style={inputStyle} type='text' className='form-control'/>
           
            </div>

             <div className="col-3">

            <label onMouseOver={whiteHover(lightMode)} onMouseLeave={whiteLeave(lightMode)}  style={labelStyle} className='control-label'>Last Name</label>  
            <input onMouseOver={goldHover(lightMode)} onMouseLeave={goldLeave(lightMode)} defaultValue={lastname} value={lastname} id='lastname' onChange={handleChange} style={inputStyle} type='text' className='form-control'/>
           
            </div>

            <div className="col-3 dropdown">
                
                
               <label style={labelStyle} className='control-label'>Gender</label>  <br />
                <button  style={dropStyle} className="btn btn-secondary dropdown-toggle"
                         type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {gender}
                </button>
                <ul  className="dropdown-menu">
                    <li><a onClick={onGender} style={optStyle} className="dropdown-item"  data-gender="M" href="#">Male</a></li>
                    <li><a onClick={onGender} style={optStyle} className="dropdown-item"  data-gender="F" href="#">Female</a></li> 
                </ul>
                </div>
            </div>

        
        <div className="row">

            <div className="col-3">

            <label onMouseOver={whiteHover(lightMode)} onMouseLeave={whiteLeave(lightMode)}  style={labelStyle} className='control-label'>Birth Date</label>  
            <input onMouseOver={goldHover(lightMode)} onMouseLeave={goldLeave(lightMode)} defaultValue={screenbirthdate} value={screenbirthdate} id='screenbirthdate' onChange={handleChange} style={inputStyle} type='text' className='form-control'/>
           
            </div>

             <div className="col-3">

            <label onMouseOver={whiteHover(lightMode)} onMouseLeave={whiteLeave(lightMode)}  style={labelStyle} className='control-label'>Email</label>  
            <input onMouseOver={goldHover(lightMode)} onMouseLeave={goldLeave(lightMode)} defaultValue={email} value={email} id='email' onChange={handleChange} style={inputStyle} type='text' className='form-control'/>
           
            </div>

             <div className="col-3">

            <label onMouseOver={whiteHover(lightMode)} onMouseLeave={whiteLeave(lightMode)}  style={labelStyle} className='control-label'>Phone</label>  
            <input onMouseOver={goldHover(lightMode)} onMouseLeave={goldLeave(lightMode)} defaultValue={phone} value={phone} id='phone' onChange={handleChange} style={inputStyle} type='text' className='form-control'/>
           
            </div>
        </div>


        <div className="row">

            <div className="col-3">

            <label onMouseOver={whiteHover(lightMode)} onMouseLeave={whiteLeave(lightMode)}  style={labelStyle} className='control-label'>Address 1</label>  
            <input onMouseOver={goldHover(lightMode)} onMouseLeave={goldLeave(lightMode)} defaultValue={address1} value={address1} id='address1'  onChange={handleChange} style={inputStyle} type='text' className='form-control'/>
           
            </div>

             <div className="col-3">

            <label onMouseOver={whiteHover(lightMode)} onMouseLeave={whiteLeave(lightMode)}  style={labelStyle} className='control-label'>Address 2</label>  
            <input onMouseOver={goldHover(lightMode)} onMouseLeave={goldLeave(lightMode)}  defaultValue={address2} value={address2} id='address2' onChange={handleChange} style={inputStyle} type='text' className='form-control'/>
           
            </div>

             <div className="col-3">

            <label onMouseOver={whiteHover(lightMode)} onMouseLeave={whiteLeave(lightMode)}  style={labelStyle} className='control-label'>Promotion Code</label>  
            <input onMouseOver={goldHover(lightMode)} onMouseLeave={goldLeave(lightMode)}  defaultValue={promotioncode} value={promotioncode} id='promotioncode' onChange={handleChange}  style={inputStyle} type='text' className='form-control'/>
           
            </div>
        </div>


 <div className="row">

            <div className="col-3">

            <label onMouseOver={whiteHover(lightMode)} onMouseLeave={whiteLeave(lightMode)}   style={labelStyle} className='control-label'>City</label>  
            <input onMouseOver={goldHover(lightMode)} onMouseLeave={goldLeave(lightMode)}  defaultValue={city} value={city} id='city'  onChange={handleChange}style={inputStyle} type='text' className='form-control'/>
           
            </div>

          
            <div className="col-3 dropdown">
                
                
            <label onMouseOver={whiteHover(lightMode)} onMouseLeave={whiteLeave(lightMode)}  style={labelStyle} className='control-label'>State</label>  <br />
                <button style={dropStyle}  className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {state}
                </button>
                <ul id='stateDropdown' className="dropdown-menu">
                    <li><a onClick={onState} style={optStyle} className="dropdown-item" data-state="WA" href="#">Washington</a></li>
                    <li><a onClick={onState} style={optStyle} className="dropdown-item" data-state="CA" href="#">California</a></li> 
                </ul>
                 
            </div>

             <div className="col-3">

            <label onMouseOver={whiteHover(lightMode)} onMouseLeave={whiteLeave(lightMode)}  style={labelStyle} className='control-label'>Zip</label>  
            <input onMouseOver={goldHover(lightMode)} onMouseLeave={goldLeave(lightMode)} defaultValue={zip} value={zip} id='zip' onChange={handleChange} style={inputStyle} type='text' className='form-control'/>
           
            </div>
        </div>


        <div className='Row'>&nbsp;</div>
 
 

          <button  onClick={onRegister} style={btnStyle} className='btn btn-primary'>Register</button>
          &nbsp;&nbsp;
          <button  onClick={onCancel} style={btnStyle} className='btn btn-primary'>Cancel</button>
          
          <div className='Row'>&nbsp;</div>

          <div className="Row">

            <div className="col-4">

            <label style={messageStyle} className='control-label'>{message}</label>   
           
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
        
        </div>


    </>)


}
import { useEffect, useState } from "react"  
import { useNavigate } from "react-router-dom"  
import { updateCustomer } from "./Database"

import { editDate } from "./DateEdit"
 

export default function Update({store,setStore}:any) { 
 
    // from up5  
    localStorage.setItem('historyScreenIsLoaded','no')
    //setStore({historyScreenIsLoaded: 'no'})

    const [customerId, setCustomerId ] = useState('')
    const [password,   setPassword] = useState('') 
    const [confirm,   setConfirm] = useState('')
    const [firstname, setFirstName] = useState('')
    const [middlename, setMiddleName] = useState('')
    const [lastname, setLastName] = useState('')
    
    const [birthdate, setBirthDate] = useState('')  
    const [screenbirthdate, setScreenbirthdate] = useState('')
    const [gender, setGender] = useState('') 
    const [email, setEmail] = useState('') 
    const [phone, setPhone] = useState('') 
    
    const [address1, setAddress1] = useState('') 
    const [address2, setAddress2] = useState('') 
    const [promotioncode, setPromotionCode] = useState('')

    
    const [city, setCity] = useState('')  
    const [state, setState] = useState('') 
    const [zip, setZip] = useState('')  

    const [plan, setPlan] = useState('')

    // state gender from combo boxes 

    const [message, setMessage] = useState('')  

     const s = (value:string) => {

        if(store.debug) {

            const {shortToday, time} = getCurrentDate()
            const prefix = shortToday + time
            console.log(`${prefix} Claim ${value}`)

        }

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
  
        function pad2(value:number) : string { 
                
            var v = value.toString();
            var r = (v.length < 2 ) ? '0' + v : v;
            return r; 

        } 
    
    debugger 

    // auth check  
    // navigate is in use effect
    let authCheckPassed = true
    let testMode = localStorage.getItem('testMode') ?? ''
    let appUser = localStorage.getItem('appUser') ?? ''
    let currentMode = (testMode === '') ? 'test' : 'prod'
    s("sign in screen auth check ")
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

    let navigate = useNavigate()   

     localStorage.setItem("claimScreenIsLoaded","")  
     //setStore({claimScreenIsLoaded:''})

    let lightMode = localStorage.getItem('lightMode') ?? 'Dark'

     /* light mode effects */

    /* TODO: fill page with container */ 

    let labelColor = 'dodgerblue'
    let inputColor = 'white'
    let inputBackGroundColor = 'black'
    let messageColor = 'white' 
    let titleColor = 'navajowhite' 

    if (lightMode === 'Light') { 
            
         labelColor = 'dodgerblue'
         inputColor = 'blue'
         inputBackGroundColor = 'white'
         messageColor = 'blue' 
         titleColor = 'blue'  

    }

    let h3Style = {marginTop: '2%', marginLeft: '42%', color: titleColor, fontFamily: 'arial', marginBottom: '2%',
                   fontStyle: 'italic'
    } 
   
    let divStyle = { marginLeft: '15%'} 

    let labelStyle = {marginTop: '1%', color: labelColor, fontFamily: 'arial', fontSize:'larger'}
    
    let inputStyle = { marginTop: '1%', color: inputColor, backgroundColor: inputBackGroundColor, fontFamily: 'arial', fontSize:'larger'}
      
    let messageStyle = {marginTop: '1%', color: messageColor , fontFamily: 'arial', fontSize:'larger'}
 
    let btnStyle = { fontSize: 'larger' }

    let dropStyle = { marginTop: '8px'}

    let optStyle = { color: inputColor, backgroundColor: inputBackGroundColor} 

    let spaceStyle = { backgroundColor: inputBackGroundColor}
    
    // register or signin has places customer data to be read here and placed on the update screen

    const findDatabaseName = (id:string) : string => {

        let databaseName = '';

        switch(id) {

            
            case 'customerId' : databaseName = 'custId'; break;
            case 'firstname' : databaseName = 'custFirst'; break;
            case 'middlename' : databaseName = 'custMiddle'; break;
            case 'lastname'  : databaseName = 'custLast'; break; 
            case 'screenbirthdate' : databaseName = 'custBirthDate'; break;
            case 'gender' : databaseName = 'custGender'; break;
            case 'email'  : databaseName = 'custEmail'; break; 
            case 'phone'  : databaseName = 'custPhone'; break; 
            case 'address1'  : databaseName = 'custAddr1'; break; 
            case 'address2'  : databaseName = 'custAddr2'; break; 
            case 'city'  : databaseName = 'custCity'; break; 
            case 'state' : databaseName = 'custState'; break;
            case 'zip'  : databaseName = 'custZip'; break;


            default: break;

        }
        return databaseName 
    }
 
            
        const loadScreen = () => {

            let storedCustomerType = localStorage.getItem('storedCustomerType') ?? ''
            
            debugger
            let json = ''
            //  if(store.storedCustomerType === 'register')

            json = store.storedCustomer ?? ''
            if (json === '') {
                
                json = localStorage.getItem('storedCustomer') ?? ''
                
                //alert('Update: using local storage')
                //setMessage('Dev Note: local storage used to read customer informatin')
            } 
            
            s('update stored json')
            s(json) 

            if(json == '') {
                s('Update Screen - Can not read this json')
                s(json)
                //setStore({mainMenuMessage: 'Update error reading json'})
                //navigate('/mainmenu')
                // infinite loop
                setMessage("unable to parse json screen will be blank ")
                return
            }
            s("json:" + json)
            let customer = JSON.parse(json)

            let priorPassword = customer['custPassword'] 
            s('loading prior password is' + priorPassword)
            localStorage.setItem('priorPassword',priorPassword)
            //setStore({priorPassword: priorPassword})


            let customerProperties = []

            for(var prop in customer) {
                //let value = customer[prop]
                //console.log('[prop]: ' + prop + ' value: ' + value)
                customerProperties.push(prop)
            }
        
                // loop thorugh html collection and if name = customer property put data in the field 
                // 

            debugger
 

        // load plan from customer storage 
        let thePlan = customer['custPlan'] ?? '' 
        setPlan(thePlan)
        s("update plan is: " + plan)
        // end plan set logic 

        document.querySelectorAll("input").forEach( (element:any) => {

              s("query select all ")

                debugger
                    
                // if it has a name lookup via -> find in customer and load data
                let id = element.getAttribute('id') ?? '' 
                
                if(id !== '') { 

                let databaseName = findDatabaseName(id)


                debugger

                // ok so it's an id field - hurray - look up customer data  
                let customerFieldName = customerProperties
                    .find( (property:string) =>  property == databaseName )
            

                debugger

                
                 s(` [loader] id: ${id} databaseName: ${databaseName} fieldName: ${customerFieldName}`)
                
                // found set it
                if(customerFieldName !== undefined) 
                {  

                    let value = customer[customerFieldName].trim()
                    s(`value: ${value}`)
                    //if(id === 'birthdate') alert('birthdate') 
                    //if(id === 'password') alert('password')
                    switch(id) {

                            case 'customerId' : setCustomerId(value); break;
                            case 'password'   : setPassword(value);   break;
                            case 'confirm'    : setConfirm(value); break;
                            case 'firstname'  : setFirstName(value); break; 
                            case 'middlename' : setMiddleName(value); break;
                            case 'lastname'  : setLastName(value); break; 
                            case 'screenbirthdate'  : 

                                  if (storedCustomerType !== 'register') {
                                      let formattedDate = formatDate(value);
                                      //alert(formattedDate)
                                      setScreenbirthdate(formattedDate) // from database

                                  } else {
                                    
                                       setScreenbirthdate(value)  // as keyed on register
                                  }
                                  break;

                            case 'gender' : setGender(value); break;
                            case 'email'  : setEmail(value); break; 
                            case 'phone'  : setPhone(value); break;
                            case 'address1' : setAddress1(value); break; 
                            case 'address2' : setAddress2(value); break; 
                            case 'promotioncode' : setPromotionCode(value); break; 
                            case 'city' : setCity(value); break;   
                            case 'zip' : setZip(value); break;  

                   }
            }   
        } 
    }) 

        document.querySelectorAll("button").forEach( (element:any) => {
 

                debugger
                    
                // if it has a name lookup via -> find in customer and load data
                let id = element.getAttribute('id') ?? '' 
                
                if(id !== '') { 

                let databaseName = findDatabaseName(id)


                debugger

                // ok so it's an id field - hurray - look up customer data  
                let customerFieldName = customerProperties
                    .find( (property:string) =>  property == databaseName )
            

                debugger

                
                s(`id: ${id} databaseName: ${databaseName} fieldName: ${customerFieldName}`)
                
                // found set it
                if(customerFieldName !== undefined) 
                {  

                    let value = customer[customerFieldName].trim()
                    s(`value: ${value}`)

                    
                    //if(id === 'gender') alert('gender') 
                    //if(id === 'state') alert('state')
                    switch(id) {
 
                            case 'gender' : setGender(value); break; 
                            case 'state' : setState(value); break;  

                   }
                   //alert(id + ' ' + value)
            }   
        } 
    })
 
} 

  
    
    const handleChange = (event:any) => {

        debugger
        //event.handleDefault()

        let t = event.target 
        let id : string | null = t.getAttribute('id')  
        let value = event?.target.value.toString() 

         let a = `id: (${id}) value: (${value})`
         s(a)

        switch(id) {

            case 'customerId' : setCustomerId(value); break;
            case 'password'   : setPassword(value);   break;
            case 'confirm'    : setConfirm(value); break;
            case 'firstname'  : setFirstName(value); break; 
            case 'middlename' : setMiddleName(value); break;
            case 'lastname'  : setLastName(value); break; 
            case 'screenbirthdate'  : setScreenbirthdate(value); break; 
            case 'gender' : setGender(value); break;
            case 'email'  : setEmail(value); break; 
            case 'phone'  : setPhone(value); break;
            case 'address1' : setAddress1(value); break; 
            case 'address2' : setAddress2(value); break; 
            case 'promotioncode' : setPromotionCode(value); break; 
            case 'city' : setCity(value); break;  
            case 'state' : setState(value); break;
            case 'zip' : setZip(value); break; 
            

        }

    }
  
   
   const onCancel = () => {

        navigate('/mainmenu')
        return

   }
   
   
 const onState = (e:any) => {
      


      debugger;
      let value = e.target.dataset.state
      setState(value) 
   }

   const onGender = (e:any) => {

      debugger;
      let value = e.target.dataset.gender
      setGender(value) 
   }
   

  function formatDate(value:string) {

     s('format date input: ' + value)


      if(value === undefined) {

        return 'n/a undefined'

      }


      // changes yyyy/mm/dd to mm/dd/yyyy show yyyy for dob
      if(value === null || value === '') {
         return 'n/a';
      }
      var year = value.substring(0,4);

      if(year === '1900' || year === '1753') {
        return 'n/a'
      }

      var day = value.substring(8,10);
      var month = value.substring(5,7);
      // ie 11 var result = `${month}/${day}/${year}`
      var result = month + '/' + day + '/' + year;
      
      s('format date output: ' + result)
      return result;

  }

     
  
  const whiteHover = (lightMode:string) => (e:any) => {
         

        let color = (lightMode === "Dark") ? 'white' : 'green'
        e.target.style.color = color 
  }

  
  const whiteLeave = (lightMode:string)  => (e:any) => {  
       
        let color = (lightMode === "Dark") ? 'dodgerblue' : 'blue'
        e.target.style.color = color
  }
 
  

const handleUpdate = async (event:any) => {

        event.preventDefault() 

        
         const pattern = /^[ A-Za-z0-9]*$/

        let passwordOneEntered = false
        let passwordTwoEntered = false
 

        if(password.trim() !== '') {

           passwordOneEntered = true

        } 

        if(confirm.trim() !== '') {

            passwordTwoEntered = true

        } 

        if(firstname.trim() === '') {

            setMessage("First Name is blank please enter one")
            return;

            } 

        if(lastname.trim() === '') {

        setMessage("Last Name is blank please enter one")
        return;

        }  

        if(passwordOneEntered && !passwordTwoEntered) {
            setMessage("Enter Confirmation Password")
            return
        }

         if(!passwordOneEntered && passwordTwoEntered) {
            setMessage("Enter Password")
            return
        }
 
          
         if (passwordOneEntered && pattern.test(password) === false) { 
             setMessage(`Password is invalid: ${password}`) 
             return
         } 

        if (passwordOneEntered && pattern.test(confirm) === false) { 
             setMessage(`Confirm is invalid: ${confirm}`) 
             return
         } 

         if (passwordOneEntered && passwordTwoEntered && password !== confirm) {

             setMessage('Password and confirmation password must match') 
             return

         }
 

         // fields blank check
         const blank = ''
         let blankFieldError = false
         let fieldInError = ''
         let fields = ['birthdate','email','phone','address1','city','zip']
         debugger
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

         // if middle name entered edit it
         if(middlename !== '' && pattern.test(middlename) === false) {
            setMessage(`Middle Name is invalid: ${middlename}`)
            return
         }

        var dateParm = { input: screenbirthdate , screen: "register", valid: false, formatted: "", message: ""}
        let editResult = editDate(dateParm)
        if (editResult.valid === false) {
            setMessage(editResult.message)
            return

        } else { 
            
            s('[update] setting birth date ' + editResult.formatted)
            setBirthDate(editResult.formatted)

        }
          
        
         const emailPattern = /^[.A-Za-z0-9]+@[.A-Za-z0-9]+$/ 
         if (emailPattern.test(email) === false) { 
             setMessage(`Email is invalid: ${email}`) 
             return
         } 
         
         const phonePattern = /^[A-Za-z0-9]{10}$/ 
         if (phonePattern.test(phone) === false) { 
             setMessage(`Phone is invalid - must be ten digits: ${phone}`) 
             return
         } 

     

         if (pattern.test(address1) === false) { 
             setMessage(`Address1 is invalid: ${address1}`) 
             return
         } 

        // if address 2 entered edit it
        if (address2 != '' && pattern.test(address2) === false) { 
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
      
         debugger

         let usePassword = '' 

         if(password === "") {

            usePassword = localStorage.getItem('priorPassword') ?? ''

         } else {
          
            usePassword = password
         }
         s("usePassword: " + usePassword)

           
 
         let token = localStorage.getItem('Token')
         //let token = store.Token 

         const appId = 'A500'
         const defaultSpace = ''
         let promotioncode = '100' 
         let birthdate = '1955-01-01T10:47:40'
         
         const updateUser = localStorage.getItem('appUser') ?? ''

         debugger

         s('[update] sets birth date to ' + birthdate)
         let customer   = {

             custId: customerId,
             custPassword: usePassword,
             custFirst: firstname,
             custMiddle: middlename,
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
             appId: appId,
             update_user: updateUser, 
             app: appId,
             _csrf: token
         }
  
     

        updateCustomer(customer).then( (r:any) => {

            let status = r['Status']
            let message = (status === 'Successful') ? "Customer updated successfully" : "Customer update fails"
            if(status === "Successful") {
                 s('update stored customer ')
                 let json = JSON.stringify(customer)
                 s(json)
                 //localStorage.setItem('storedCustomer',json) 

                 //* note regiseter has issue so when coming from reg use local storeage
                 //* for stored customer
                 
                 setStore({storedCustomerType: 'update',
                           storedCustomer:json})

            }
            localStorage.setItem('mainMenuMessage',message)
            //setStore({'mainMenuMessage': message})
            navigate('/mainmenu')

        })
    } /* end of update customer */

    /* run after screen built use useEffect */
    useEffect( () => {

    //Note: link and button accessing this screen must reset this indicator:
    let updateScreenIsLoaded = localStorage.getItem('updateScreenIsLoaded') ?? ''
    //let updateScreenIsLoaded = store.updateScreenIsLoaded 

    if(updateScreenIsLoaded !== "Yes") {
       s("not loaded loading screen first name: " + firstname)
       loadScreen()
       localStorage.setItem("updateScreenIsLoaded","Yes") 
       //setStore({updateScreenIsLoaded: 'Yes'}) 
    }
   else {
        s('loaded... firstname: ' + firstname )
    }

    }) /* end of use effect */

    return(<div className='container' id='updateRootElement'>
  
 
        <h3  style={h3Style}> Update Customer </h3> 

        <div id='center' style={divStyle}>  

        <div className="row">

            <div className="col-3">

            <label onMouseOver={whiteHover(lightMode)} onMouseLeave={whiteLeave(lightMode)}  style={labelStyle} className='control-label'>Customer Identification</label>  
            <input readOnly defaultValue={customerId} value={customerId} id='customerId' onChange={handleChange} style={inputStyle} type='text' className='form-control'/>
           
            </div>

             <div className="col-3">

            <label onMouseOver={whiteHover(lightMode)} onMouseLeave={whiteLeave(lightMode)}  style={labelStyle} className='control-label'>Customer Password</label>  
            <input  defaultValue={password} value={password} id='password' onChange={handleChange} style={inputStyle} type='text' className='form-control'/>
           
            </div>

             <div className="col-3">

            <label onMouseOver={whiteHover(lightMode)} onMouseLeave={whiteLeave(lightMode)}  style={labelStyle} className='control-label'>Confirm Password</label>  
            <input defaultValue={confirm} value={confirm} id='confirm' onChange={handleChange}  style={inputStyle} type='text' className='form-control'/>
           
            </div>
        </div>

        
        <div className="row">

            <div className="col-3">

            <label onMouseOver={whiteHover(lightMode)} onMouseLeave={whiteLeave(lightMode)}  style={labelStyle} className='control-label'>First Name</label>  
            <input defaultValue={firstname} value={firstname} id='firstname' onChange={handleChange}  style={inputStyle} type='text' className='form-control'/>
           
            </div>

             <div className="col-3">

            <label onMouseOver={whiteHover(lightMode)} onMouseLeave={whiteLeave(lightMode)}  style={labelStyle} className='control-label'>Middle Name</label>  
            <input defaultValue={middlename} value={middlename} id='middlename' onChange={handleChange} style={inputStyle} type='text' className='form-control'/>
           
            </div>

             <div className="col-3">

            <label onMouseOver={whiteHover(lightMode)} onMouseLeave={whiteLeave(lightMode)}  style={labelStyle} className='control-label'>Last Name</label>  
            <input defaultValue={lastname} value={lastname} id='lastname' onChange={handleChange} style={inputStyle} type='text' className='form-control'/>
           
            </div>

            <div className="col-3 dropdown">
                
                
               <label   onMouseOver={whiteHover(lightMode)} onMouseLeave={whiteLeave(lightMode)}  style={labelStyle} className='control-label'>Gender</label>  <br />
                <button style={dropStyle} id='gender' className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {gender}
                </button>
                <ul className="dropdown-menu">
                    <li><a onClick={onGender} style={optStyle} className="dropdown-item" data-gender="M" href="#">Male</a></li>
                    <li><a onClick={onGender} style={optStyle} className="dropdown-item" data-gender="F" href="#">Female</a></li> 
                </ul>
                </div>
            </div>

        
        <div className="row">

            <div className="col-3">

            <label onMouseOver={whiteHover(lightMode)} onMouseLeave={whiteLeave(lightMode)}   style={labelStyle} className='control-label'>Birth Date</label>  
            <input defaultValue={screenbirthdate} value={screenbirthdate} id='screenbirthdate' onChange={handleChange} style={inputStyle} type='text' className='form-control'/>
           
            </div>

             <div className="col-3">

            <label  onMouseOver={whiteHover(lightMode)} onMouseLeave={whiteLeave(lightMode)}  style={labelStyle} className='control-label'>Email</label>  
            <input defaultValue={email} value={email} id='email' onChange={handleChange} style={inputStyle} type='text' className='form-control'/>
           
            </div>

             <div className="col-3">

            <label  onMouseOver={whiteHover(lightMode)} onMouseLeave={whiteLeave(lightMode)}  style={labelStyle} className='control-label'>Phone</label>  
            <input defaultValue={phone} value={phone} id='phone' onChange={handleChange} style={inputStyle} type='text' className='form-control'/>
           
            </div>

              <div className="col-3">

            <label  onMouseOver={whiteHover(lightMode)} onMouseLeave={whiteLeave(lightMode)}  style={labelStyle} className='control-label'>Plan</label>  <br />
            <label style={inputStyle}>{plan}</label>
           
            </div>
        </div>


        <div className="row">

            <div className="col-3">

            <label  onMouseOver={whiteHover(lightMode)} onMouseLeave={whiteLeave(lightMode)}  style={labelStyle} className='control-label'>Address 1</label>  
            <input  defaultValue={address1} value={address1} id='address1'  onChange={handleChange} style={inputStyle} type='text' className='form-control'/>
           
            </div>

             <div className="col-3">

            <label  onMouseOver={whiteHover(lightMode)} onMouseLeave={whiteLeave(lightMode)}  style={labelStyle} className='control-label'>Address 2</label>  
            <input  defaultValue={address2} value={address2} id='address2' onChange={handleChange} style={inputStyle} type='text' className='form-control'/>
           
            </div>

             <div className="col-3">

            <label onMouseOver={whiteHover(lightMode)} onMouseLeave={whiteLeave(lightMode)}   style={labelStyle} className='control-label'>Promotion Code</label>  
            <input readOnly  defaultValue={promotioncode} value={promotioncode} id='promotioncode' onChange={handleChange}  style={inputStyle} type='text' className='form-control'/>
           
            </div>
        </div>


 <div className="row">

            <div className="col-3">

            <label  onMouseOver={whiteHover(lightMode)} onMouseLeave={whiteLeave(lightMode)}  style={labelStyle} className='control-label'>City</label>  
            <input defaultValue={city} value={city} id='city'  onChange={handleChange}style={inputStyle} type='text' className='form-control'/>
           
            </div>

          
            <div className="col-3 dropdown">
                
                
            <label style={labelStyle} className='control-label'>State</label>  <br />
                <button value={state} id='state' style={dropStyle}  className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {state}
                </button>
                <ul id='stateDropdown' className="dropdown-menu">
                    <li><a onClick={onState} style={optStyle} className="dropdown-item" data-state="WA" href="#">Washington</a></li>
                    <li><a onClick={onState} style={optStyle} className="dropdown-item" data-state="CA" href="#">California</a></li> 
                </ul>
                 
            </div>

             <div className="col-3">

            <label  onMouseOver={whiteHover(lightMode)} onMouseLeave={whiteLeave(lightMode)}  style={labelStyle} className='control-label'>Zip</label>  
            <input defaultValue={zip} value={zip} id='zip' onChange={handleChange} style={inputStyle} type='text' className='form-control'/>
           
            </div>
        </div>


        <div className='Row'>&nbsp;</div>
 
 

          <button  onClick={handleUpdate} style={btnStyle} className='btn btn-primary'>Update Customer</button>
          &nbsp;&nbsp;
          <button  onClick={onCancel} style={btnStyle} className='btn btn-primary'>Cancel Update</button>
          
          <div className='Row'>&nbsp;</div>

          <div className="Row">

            <div className="col-4">

               <label style={messageStyle} className='control-label'>{message}</label>   
           
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
 

    </div>)


}
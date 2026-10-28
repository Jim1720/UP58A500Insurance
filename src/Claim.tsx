import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { addClaim, readAllServicesForClaimType, readClaim, readPlans, stampAdjustedClaim } from "./Database"
import { editDate } from "./DateEdit"
 
let options: any = []  
let serviceCostList : any = [] // holds service and clist for services for this claim type read after claim made
 
 
export default function Claim({claimOperation, 
                        store,
                        setStore,
                        newClaimIdNumber, 
                        setNewClaimIdNumber,
                        actionButtons, 
                        stay,  
                        setFocusClaimId}:any) {
                 
    
    let navigate = useNavigate()


    // auth check  
        // navigate is in use effect
        let authCheckPassed = true
        let testMode = localStorage.getItem('testMode') ?? ''
        let appUser = localStorage.getItem('appUser') ?? ''
        let currentMode = (testMode === '') ? 'test' : 'prod' 
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

    interface claimOperation {

        what:string,
        operClaimId: string,
        claimData:string,
        claimType: string,
        selectedClaimService: string
    }

     const s = (value:string) => {

        if(store.debug) {

            const {shortToday, time} = getCurrentDate()
            const prefix = shortToday + time
            console.log(`${prefix} Claim ${value}`)

        }

    }

        
    s('claim screen starts')

    // screenClaimType holds current screen type not input adjustment claim type
    // also used to rerender when type changes

    const defaultClaimType = 'm'
    const [screenClaimType, setScreenClaimType] = useState(defaultClaimType) 
  
    const [patientFirst, setPatientFirst] = useState()
    const [patientLast, setPatientLast] = useState()
    const [description , setDescription] = useState()  
    
    const [procedure , setProcedure] = useState()  
    const [diagnosis , setDiagnosis] = useState()  
    const [serviceDate , setServiceDate] = useState('') 
    const [physician , setPhysician] = useState()  
    const [clinic , setClinic] = useState()  
    const [service , setService] = useState('Medical Exam')   

    const [claimService, setClaimService] = useState()

    const [confine , setConfine] = useState('')  
    const [release , setRelease] = useState('') 

    const [tooth, setTooth] = useState('') 
    const [eyeware,  setEyeware] = useState('')
    const [drugname, setDrugName] = useState('')  

    const [message, setMessage] = useState('')   

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

     let h3Style = {marginTop: '1%', marginLeft: '42%', color: titleColor, fontFamily: 'arial', marginBottom: '1%'}
     
   
    let divStyle = { marginLeft: '5%'}
    let p1style = { marginTop: '20px', color: 'white', fontFamily: 'arial',
        fontStyle:'italic', fontSize: 'larger', 
    } 
    let btnStyle = { marginTop: '1%',  marginLeft: '1%', fontSize: 'larger' }  
    let btnStyleFirst = { marginTop: '1%',  marginLeft: '36%', fontSize: 'larger' }

    let tbStyle =  { fontSize: 'larger', fontFamily: 'arial', marginBottom: '25px'}

    let labelStyle = { color: labelColor, 
                       fontFamily: 'arial', 
                       fontSize: 'larger'
    }
    let inputStyle = { color: inputColor,
                       backgroundColor: inputBackGroundColor,
                       fontFamily: 'arial',
                       fontSize: 'larger'
    }
    let messageStyle = {fontFamily: 'arial',
                    fontSize: 'larger',
                    color: messageColor,
                    marginLeft: '24%'
    }

    let spaceStyle = { backgroundColor: inputBackGroundColor}
 
     let dropStyle = {color: inputColor,
                    backgroundColor: inputBackGroundColor,
                    fontFamily: 'arial',
                    fontSize: 'larger'
    }


    let onServiceChange = (e:any) => {

        let innerText = e.target.innerText;  
        localStorage.setItem('claimService', innerText) 
        //claimService = innerText
        setClaimService(innerText)
    }
    
    const handleChange = (event:any) => { 

        let t = event.target 
        let id : string | null = t.getAttribute('id')  
        let value = event?.target.value.toString() 

        //let a = `[handleChange] id: (${id}) value: (${value})` 
        //console.log(a)

        switch(id) {

            case 'patientfirst' : setPatientFirst(value); break; 
            case 'patientlast'  : setPatientLast(value); break;
            case 'description'  : setDescription(value); break; 
            case 'procedure'    : setProcedure(value); break;
            case 'diagnosis'    : setDiagnosis(value); break;
            case 'physician'    : setPhysician(value); break;
            case 'clinic'       : setClinic(value); break;
            case 'confine'      : setConfine(value); break;
            case 'release'      : setRelease(value);break;
            case 'tooth'        : setTooth(value); break;
            case 'eyeware'      : setEyeware(value); break;
            case 'drugname'     : setDrugName(value); break;
            case 'servicedate'  : setServiceDate(value); break; 
        }

    }


    
let onTypeChange = async (claimType: string) => { 
            
       //('[onTypeChange] claimType: ' + claimType)

       await readAllServicesForClaimType(claimType).then( (r:any) => {

            s('[type change service read]') 
            let optStyle = {color: 'white', backgroundColor: 'black', fontFamily: 'arial', fontSize: 'larger'}
        
            let claimService = localStorage.getItem('claimService') ?? ''
        
            options = []
            let key = 1
            let first = true
            for(var {service, cost} of r) {
    
                let option = 
                            <li><a key={key} style={optStyle} 
                                    className="dropdown-item" 
                                    data-state={service} href="#">
                                    {service}
                                    </a></li>

                    options.push(option) 
                    s('[type change service reader] ' + service)
                
                    if(first) {
                        s('[(s1) selected first service] ' + service )
                        setClaimService(service)
                        first = false
                    } 

                    // if 1st or any match selected service from adj/copy use previous selection
                    if(service.trim() === claimService.trim()) { // previously selected  
                       s('[(s2) selected prior service] ' + service )
                       setClaimService(service)
                    }

                    // alert(claimService)

                    let serviceCostEntry = {service: service, cost: cost}
                    serviceCostList.push(serviceCostEntry) 

                    // change screen claim type and force re render

                    setScreenClaimType(claimType) 
            
                    //localStorage.setItem('claimService', claimService)

        }
        })  
    } 
    


     let onCancel = () => {

        navigate('/mainmenu')

   }

   
   let getFriendlyName = (fieldName: string) : string => {

        // when blank show descriptive name for edit

        let friendlyName = 'unknown'
        switch(fieldName) {

            case 'patientfirst'  : friendlyName = "Patient First Name"; break
            case 'patientlast'   : friendlyName = "Patient Last Name"; break;
            case 'description'   : friendlyName = "Claim Description"; break;
            case 'procedure'     : friendlyName = "Procedure Code"; break;
            case 'diagnosis'     : friendlyName = "Diagnosis Code"; break;
            case 'physician'     : friendlyName = "Physician"; break;
            case "clinic"        : friendlyName = "Clinic"; break;
            case "servicedate"   : friendlyName = "Service Date"; break;
            case "confine"       : friendlyName = "Confine Date"; break;
            case "release"       : friendlyName = "Release Date"; break;
            case "tooth"         : friendlyName = "Tooth Number"; break; 
            case "eyeware"         : friendlyName = "Eyeware"; break; 
            case "drugname"         : friendlyName = "Drug Name"; break;
   
        }
        //if(friendlyName === 'unknown') alert (fieldName)
        return friendlyName
   }

   
    const findClaimDatabaseName = (id:string) : string => {

        // find database name matching input field id
        // to support loading the screen from the database

        let databaseName = '';

        switch(id) {

            
            case 'patientfirst' : databaseName = 'PatientFirst'; break;
            case 'patientlast'  : databaseName = 'PatientLast'; break;
            case 'description'  : databaseName = 'ClaimDescription'; break;
            case 'diagnosis'    : databaseName = 'Diagnosis1'; break; 
            case 'procedure'    : databaseName = 'Procedure1'; break;
            case 'physician'    : databaseName = 'Physician'; break;
            case 'clinic'       : databaseName = 'Clinic'; break;  
            case 'servicedate'  : databaseName = "DateService"; break;
            case 'confine'      : databaseName = "DateConfine"; break;
            case 'release'      : databaseName = "DateRelease"; break;
            case 'tooth'        : databaseName = "ToothNumber"; break;
            case 'eyeware'      : databaseName = "Eyeware"; break;
            case 'drugname'     : databaseName  = "DrugName"; break;


            default: break;

        }
        return databaseName 
    }

   
   let getValueOf = (field: string) : string | undefined => {

      // used in input blank check

      let value : undefined | string = ''

      switch(field) {

                case 'patientfirst' : value = patientFirst ; break;
                case 'patientlast'  : value = patientLast; break;
                case 'description'  : value = description; break;
                case 'procedure'    : value = procedure; break;
                case 'diagnosis'    : value = diagnosis; break;
                case 'physician'    : value = physician; break;
                case 'clinic'       : value = clinic; break;
                case 'servicedate'  : value = serviceDate; break;
                // confine release are optional skip
                case 'tooth'        : value = tooth; break;
                case 'eyeware'      : value = eyeware; break;
                case 'drugname'     : value = drugname; break;
            } 

      s(`[getValueOf] ${field} is ${value}`)
      return value
   }
 
   
    let loadClaimScreen = async (claimIdNumber:string, what:string, claimType: string, selectedService: string)  => {  
           
            // set message displayed 

            let literal = ''

            switch(what) {

                case  'adjustment' : literal = 'adjust' ; break;
                case  'copy'       : literal = 'copy'; break;
            }
            let newClaimIdNumber = getClaimIdNumber()
            setNewClaimIdNumber(newClaimIdNumber)
            setMessage(`Claim ${newClaimIdNumber} will ${literal} claim ${claimIdNumber}`) 
          
            // trace 
            s("loadClaimScreen")
            s("claim operation claim data") 

            let claimId = claimIdNumber.trim()

            await readClaim(claimId).then( (r:any) => { 

                let statusText = r['statusText']

                 if(statusText != "OK") {

                      console.log("[readClaim] did not return data ")
                      return
                 }  
 

                 let data = r['data']
                 let claim = data[0]

                 
                 // set screen claim type

                 onTypeChange(claimType)


                 fillInScreenFields(claim)  

                
            })

    }

    let fillInScreenFields = (claim:any) => {
  
        
            let claimProperties = []

            for(var prop in claim) {
                  let value = claim[prop]
                  s('[prop]: ' + prop + ' value: ' + value)
                  claimProperties.push(prop)
            }

            
        document.querySelectorAll("input").forEach( async (element:any) => {

                s("query select all ")
 
                    
                // if it has a name lookup via -> find in customer and load data
                let id = element.getAttribute('id') ?? '' 
                
                if(id !== '') { 

                let databaseName = findClaimDatabaseName(id)
 

                // ok so it's an id field - hurray - look up customer data  
                let claimFieldName = claimProperties
                    .find( (property:string) =>  property == databaseName )
            
 

                
                //(` [claim loader] id: ${id} databaseName: ${databaseName} fieldName: ${claimFieldName}`)
                
                // found set it
                if(claimFieldName !== undefined) 
                {  

                    let value = claim[claimFieldName].trim()
                    s(`value: ${value}`) 

                    switch(id) {

                            case 'patientfirst'  : setPatientFirst(value); break;
                            case 'patientlast'   : setPatientLast(value); break;   
                            case 'procedure' : setProcedure(value); break; 
                            case 'diagnosis' : setDiagnosis(value); break;
                            case 'physician' : setPhysician(value); break;
                            case 'clinic'    : setClinic(value); break;
                            case 'description' : setDescription(value); break;
                            case 'servicedate' :
                                   let _serviceDate : string = formatDate(value)  
                                   setServiceDate(_serviceDate);
                                   break;
                            // TODO: add remaining type fields and others
                            case 'confine' : setConfine(value)
                                   let _confineDate : string = formatDate(value)  
                                   setConfine(_confineDate);
                                   break; 
                            case 'release' : setRelease(value) 
                                   let _releaseDate : string = formatDate(value)  
                                   setRelease(_releaseDate);
                                   break;  
                   } 

                 
            }   
        } 

        document.querySelectorAll("button").forEach( (element:any) => {
 
 
                    
                // if it has a name lookup via -> find in customer and load data
                let id = element.getAttribute('id') ?? '' 
                
                if(id !== '') { 

                let databaseName = findClaimDatabaseName(id)

 

                // ok so it's an id field - hurray - look up customer data  
                let claimFieldName = claimProperties
                    .find( (property:string) =>  property == databaseName )
             

                
                s(`id: ${id} databaseName: ${databaseName} fieldName: ${claimFieldName}`)
                
                // found set it
                if(claimFieldName !== undefined) 
                {  

                    let value = claim[claimFieldName].trim()
                    s(`value: ${value}`) 
                    
                    switch(id) {
 
                            case 'service' : setService(value); break;  
                   } 
            }   
          } 
        })


        // special logic for type fields id not visible
        // medical id's are visiable so above logic takes care of that situation

        switch(claim.ClaimType) { 
            case 'd' : let tooth = claim['ToothNumber']; setTooth(tooth); break;
            case 'v' : let eyeware = claim['Eyeware']; setEyeware(eyeware); break;
            case 'x' : let drugName = claim['DrugName']; setDrugName(drugName);break;
        }


      }) 
     }

     
  function formatDate(value:string) {



      if(value === undefined) {

        return 'n/a undefined'

      }


      // changes yyyy/mm/dd to mm/dd/yyyy show yyyy for dob
      if(value === null || value === '') {
         return '';  // prevent edits on adjustment - return blank
      }
      var year = value.substring(0,4);

      if(year === '1900' || year === '1753') {
        return '' // prevent edits on adjustment 
      }

      var day = value.substring(8,10);
      var month = value.substring(5,7);
      // ie 11 var result = `${month}/${day}/${year}`
      var result = month + '/' + day + '/' + year;
      return result;

  } 

   
      let calculateCoveredAmount = async (plan:string, inputService: string) 
      
      : Promise<{totalCharge:any, balanceOwed:any, coveredAmount:any}> => { 
       
         let _plan = plan.trim();
         let _inputService = inputService.trim(); 
         let _cost = 0
   
         // get service cost
         for(var {service, cost} of serviceCostList) {
   
            if(_inputService === service) {
   
                 _cost = cost
   
            }
   
         }

         let coveredAmount = 0
    
         // get plan percent
         await getPlanPercent(_plan).then( (percent:any) => {

           
            // calculate covered amount using  cost * percent 
            coveredAmount = (percent * _cost) / 100  
        })

        let balanceOwed = _cost - coveredAmount
    
        let obj = {totalCharge: _cost, coveredAmount: coveredAmount, balanceOwed: balanceOwed }

        return obj
   
      }
   
      let getPlanPercent = async (plan:string) => {

         let percent = 0
   
         await readPlans().then( (list: any) => { 
    
                       
                       // Id PlanName PlanLiteral Percent 
                       for(var {PlanName, Percent} of list) { 
           
                               if(plan.trim() === PlanName.trim()) {

                                   percent = Percent
                               }
           
                       }  
                       return percent
           })  
           return percent
      }

      
        function getClaimIdNumber()  {
        
            var d = new Date();
            var yy = d.getFullYear().toString().substring(2);
            var today = pad2(d.getMonth() + 1) + '-' + pad2(d.getDate()) + '-' + yy;
            var time = pad2(d.getHours()) + ":" + pad2(d.getMinutes()) + ":" + pad2(d.getSeconds());
            var id= 'CL-' + today + '-' + time; 
            return id;
        }

        

 

        
  const whiteHover = (lightMode:string) => (e:any) => {
         

        let color = (lightMode === "Dark") ? 'white' : 'green'
        e.target.style.color = color 
  }

  
  const whiteLeave = (lightMode:string)  => (e:any) => {  
       
        let color = (lightMode === "Dark") ? 'dodgerblue' : 'blue'
        e.target.style.color = color
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

  
    // history action buttons - reference only 
    let actionButtonSetup = {
 
        array :  [] = []

    }
   
   let loadActionButtons = (action: string, claimIdNumber: string) => {

        // action = adjustment copy or print 
        let literalPart1 = ''
        switch(action) {
            case 'adjustment' : literalPart1 = 'Adj-'; break; 
            case 'copy'       : literalPart1 = 'Cpy-'; break;
            case 'pay'        : literalPart1 = 'Pay-'; break;
            case 'new'        : literalPart1 = "New-"; break;
        }
        let literalPart2 = claimIdNumber.substring(claimIdNumber.lastIndexOf(':') + 1)
        let literal = literalPart1 + literalPart2
        let newActionArrayEntry = {literal: literal, claimIdNumber: claimIdNumber} 
        
        
        // add to beginning of the arra
        actionButtons.array.unshift(newActionArrayEntry)

        debugger
        const max = 2 // if you increase this you must change history coding to display addiitional buttons
        // if more than max remove extra using splice with not insertion elements 
        if (actionButtons.array.length > max) {
            actionButtons.array.splice(max,1)
        } 
   } 

   
   let onAddClaim =  async () => {


        debugger

        // plan check 
         let thePlan = localStorage.getItem('custPlan') ?? ''
         if(thePlan?.trim() === '') {

                setMessage("Add Plan before entering claim")
                return 
         }


        // fields blank check
         const blank = '' 
         let fields = ['patientfirst',
                       'patientlast',
                       'description',
                       'procedure',
                       'diagnosis',
                       'physician',
                       'clinic' 
                    ]

         const dental = 'd'
         const vision = 'v'
         const drug = 'x'
         
         if(screenClaimType === dental) {
              fields.push('tooth')
         }
          if(screenClaimType === vision) {
              fields.push('eyeware')
         }
          if(screenClaimType === drug) {
              fields.push('drugname')
         }

         let value:  string = ''
 
         for(var field of fields) {

            value = getValueOf(field) ?? ''
  
            if(value === null || value?.trim() === blank) {

                   let friendlyName = getFriendlyName(field) 
                   setMessage(` ${friendlyName} is blank`)
                   return
            } 
         }

         

         let defaultDate = '01/01/1900'

         const defaultDatabaseDate =  '01/01/1900'
        

         const basicPattern = /^[ A-Za-z0-9]*$/ 
         const toothPattern = /^[z0-9]*$/

         let fieldValue:  string = ''

         for(var field of fields) {

             fieldValue = getValueOf(field) ?? ''

             if (basicPattern.test(fieldValue) === false) { 
                 setMessage(`${field} is invalid: ${fieldValue}`) 
                 return
             }  
        }
         
        let serviceToDatabase  = ''
        var dateParm = { input: serviceDate , screen: "claim", valid: false, formatted: "", message: ""}
        let editResult = editDate(dateParm)
        if (editResult.valid === false) {
            setMessage('Sevice Date is invalid')
            return

        } else { 
            
            s('[claim] setting service date ' + editResult.formatted)
            serviceToDatabase = editResult.formatted

        }



        /* edit speciic claim fields */  
        let confineToDatabase = ''
        let releaseToDatabase = ''

        switch(screenClaimType) {

            case 'm':  /* edit confine and release dates */

                let confinedDateEntered = (confine.trim() != '')

                if (confinedDateEntered) {
                    var dateParm1 = { input: confine , screen: "claim", valid: false, formatted: "", message: ""}
                    let editResult1 = editDate(dateParm1)
                    if (editResult1.valid === false) {
                        setMessage('Confine Date is invalild')
                        return
            
                    } else { 
                        
                        s('[update] setting confine date ' + editResult1.formatted)
                        confineToDatabase = editResult1.formatted
            
                    }

                } else {

                    confineToDatabase = defaultDatabaseDate
                } 
                
                let releasedDateEntered = (confine.trim() != '')

                
                if (releasedDateEntered) {
                    var dateParm2 = { input: release , screen: "claim", valid: false, formatted: "", message: ""}
                    let editResult2 = editDate(dateParm2)
                    if (editResult2.valid === false) {
                        setMessage('Release Date is invalid')
                        return
            
                    } else { 
                        
                        s('[update] release date ' + editResult2.formatted)
                        releaseToDatabase = dateParm2.formatted
            
                    }

                } else {

                    releaseToDatabase = defaultDatabaseDate
                }

                break;


            case 'd' : /* edit tooth number */

            if (toothPattern.test(tooth) === false) { 
                 setMessage(`Tooth number is invalid: ${tooth}`) 
                 return
             }  

             break;

            case 'v' : /* edit eyeware  */

             if (basicPattern.test(eyeware) === false) { 
                 setMessage(`Eyeware is invalid: ${eyeware}`) 
                 return
             }  

             break;

            case 'x' : /* edit drug name  */

               if (basicPattern.test(drugname) === false) { 
                 setMessage(`Drug Name is invalid: ${drugname}`) 
                 return
             }  

             break;


        }

        // calculate amounts
       let _totalCharge = 0.0
       let _coveredAmount = 0.0
       let _balanceOwed = 0.0 

       await calculateCoveredAmount(thePlan, service).then( (r:any) => { 
            
           _totalCharge = parseFloat(r['totalCharge'])
           _coveredAmount = parseFloat(r['coveredAmount'])
           _balanceOwed = parseFloat(r['balanceOwed'])

       })

    

        let date = getCurrentDate()
        let today = date['today']
 
         let defaultAmount = '0.0' 
         const entered = 'Entered' 
         const adjustment = 'Adjustment'

        let token = localStorage.getItem('Token')

        let _claimStatus = entered

        
        // if adjustment set up adjusted claim id field 
        let adjustedClaimId = ''
        if( claimOperation.what === 'adjustment') {

            adjustedClaimId = claimOperation.claimIdNumber
            _claimStatus = adjustment

        } 
        
        // get a claim id number:
        let claimId = getClaimIdNumber()  

        // if adjustment or copy use the 'new claim id' presented on the data input screen
        if( claimOperation.what === 'adjustment' || claimOperation.what === 'copy') {

            // override claim id
            claimId = newClaimIdNumber
        }

        //let theService = localStorage.getItem('claimService')
        let theService = claimService
        //('claim add - the service is ' + theService)

        // debug

        s(`[claim add dates: ${confine} ${release}`) 

        let customerId = localStorage.getItem('customerId') ?? ''

        let claim = {

            ClaimIdNumber: claimId,
            ClaimDescription: description,
            CustomerId: customerId,
            PlanId: 'Standard Plan',
            PatientFirst: patientFirst,
            PatientLast: patientLast,
            Diagnosis1: diagnosis,
            Diagnosis2: '',
            Procedure1: procedure,
            Procedure2: '',
            Procedure3: '',
            Physician: physician,
            Clinic: clinic,
            DateService: serviceToDatabase,
            Service: theService,
            Location: '',
            TotalCharge: _totalCharge,
            CoveredAmount: _coveredAmount,
            BalanceOwed: _balanceOwed,
            PaymentAmount: defaultAmount,
            PaymentDate: defaultDate,
            DateAdded: today,
            AdjustedClaimId: adjustedClaimId,
            AdjustingClaimId: '',
            AdjustedDate: defaultDate,
            AppAdjusting: '',
            ClaimStatus: _claimStatus,
            Referral: '',
            PaymentAction: '',
            ClaimType: screenClaimType,
            DateConfine: confineToDatabase,
            DateRelease: releaseToDatabase,
            ToothNumber: tooth,
            DrugName: drugname,
            Eyeware: eyeware,
            adduser: 'n/a',
            addusertime: defaultDate,
            addapp: 'A500',
            updateuser: '',
            updateusertimem: '',
            updateapp: '',
            _csrf: token 

        }

         
 

        await addClaim(claim).then( (r:any) => {
 
            localStorage.setItem('historyScreenIsLoaded','no')
            //setStore({historyScreenIsLoaded:'no'})
            
 
            // fix status check 
            const successfulAdd = 'Good'
            let message =  (r === successfulAdd) ?
                ` Claim  for ${patientFirst} ${patientLast} claim number ${claimId} added successfully` :
                "Claim add failed"
             localStorage.setItem('mainMenuMessage', message)

             //navigate('/mainmenu') 

             let obj = {Status: successfulAdd, Route: '', Message : message}

             return obj
        }) 
        .then( (r:any) => { 
 
            // do not forget to set adjusted claim id and adjsting claim id fields 

            const { Status, Message } = r;

            // return error if failure
            if(Status !== "Good") {
 
                 localStorage.setItem('mainMenuMessage', `Claim Add Failed: ${Message}`)
                 navigate('mainmenu')
                 return
            }
            // tag :stamp to find this code 

            // check for adjustment
            let what = claimOperation.what
            if (what !== 'adjustment') {

                  // set action buttons - adjustment, copy, print  and claim id sent to that routine
                debugger
                const newclaim = 'new'
                loadActionButtons(newclaim, claimId)

                debugger
                let focus = localStorage.getItem('focus') ?? ''
                if(focus === "on") {

                    localStorage.setItem('focusClaimId',claimId)
                    setFocusClaimId(claimId) 
                }

                // claim add check stay
                let stay = localStorage.getItem('stay') ?? ''
                //alert(stay)
                debugger
                if(stay === "on") {

                    // perhaps a claim message at top ?""
                    navigate('/history')
                    return
                }
                // return good add message 
                 localStorage.setItem('mainMenuMessage', "Successful Claim Add")
                 navigate('/mainmenu')
                 return

            }
  
            let adjustmentClaimId = claimId // new claim
            let origionalClaimId = claimOperation.claimIdNumber // old claim
            let adustmentDate = today // date

           
            // :stamp
 

            stampAdjustedClaim(adjustmentClaimId, origionalClaimId, adustmentDate).then( (r:any) => {
 
                let statusOrMessage = r['data']
                if(statusOrMessage === "OK") {

                     loadActionButtons(what, newClaimIdNumber) 
                    
                     let focus = localStorage.getItem('focus') ?? ''
                     if(focus === "on") {
                         localStorage.setItem('focusClaimId',claimId)
                         setFocusClaimId(claimId) 
                      }
                      if(stay === "on") {

                           // perhaps a claim message at top ?""
                           navigate('/history')
                      }
                      localStorage.setItem('mainMenuMessage', "Successful Adjustment")
                      navigate('/mainmenu')
                      return 

                } else {

                      localStorage.setItem('mainMenuMessage', "Ajustment fails: " + statusOrMessage)
                      navigate('/mainmenu')
                      return
                } 
            })  
        })  

   }   

   // padding top right bottom lieft
     
     let signButton = <></>

     let medicalSignButton = <button onClick={onAddClaim}
         style={{fontSize: 'larger', color:'brown', backgroundColor: 'pink',
                 padding: '3px 15px 3px 15px' , marginTop: '28px', marginLeft: '30px',
                 borderRadius: '8px'
         }}>
     
            Medical Claim  

      </button>

       let dentalSignButton = <button onClick={onAddClaim}
           style={{fontSize: 'larger',color:'darkblue', backgroundColor: 'aqua', 
           padding: '3px 15px 3px 15px' , marginTop: '28px', marginLeft: '30px',
           borderRadius: '8px'

           }}>

            Dental Claim

       </button>

        let visionSignButton = <button onClick={onAddClaim}
            style={{fontSize: 'larger',color:'brown', backgroundColor: 'burlywood',
            padding: '3px 15px 3px 15px' , marginTop: '28px', marginLeft: '30px',
            borderRadius: '8px'

            }}>

            Vision Claim

       </button>

        let drugSignButton = <button onClick={onAddClaim}
            style={{fontSize: 'larger',color:'white', backgroundColor: 'green', 
            padding: '3px 15px 3px 15px' , marginTop: '28px', marginLeft: '30px',
                            borderRadius: '8px'

            }}>

            Drug Claim

       </button>

    switch(screenClaimType) {

        case 'm':  signButton = medicalSignButton; break;
        case 'd':  signButton = dentalSignButton; break;
        case 'v':  signButton = visionSignButton; break;
        case 'x':  signButton = drugSignButton; break;
    } 

    
       let medicalFields = 

        <div className='row'>

        <div id='rowspacer' className='col-1'>&nbsp;    </div>

        <div className='col-3'> <br /> {signButton} </div>

        <div className='col-3'> <br />
        <label style={labelStyle} className='control-label'>Confine Date</label>
        <input style={inputStyle}
                id='confine'
                className='form-control'
                onChange={handleChange}
                value={confine} 
                type='text'/> 
        </div>

        <div className='col-3'> <br />
        <label style={labelStyle} className='control-label'>Release Date</label>
        <input style={inputStyle}
                id='release'
                className='form-control'
                onChange={handleChange}
                value={release} 
                type='text'/> 
        </div> 
        </div> 

         let dentalFields = 

        <div className='row'>

        <div id='rowspacer' className='col-1'>&nbsp;    </div> 
        
        <div className='col-3'> <br /> {signButton} </div>

        <div className='col-3'> <br />
        <label style={labelStyle} className='control-label'>Tooth Number</label>
        <input style={inputStyle}
                id='tooth'
                className='form-control'
                onChange={handleChange}
                value={tooth} 
                type='text'/> 
        </div> 
        </div> 

          let visionFields = 

        <div className='row'>

        <div id='rowspacer' className='col-1'>&nbsp;    </div> 
        
        <div className='col-3'> <br /> {signButton} </div>

        <div className='col-3'> <br />
        <label style={labelStyle} className='control-label'>Eyeware</label>
        <input style={inputStyle}
                id='eyeware'
                className='form-control'
                onChange={handleChange}
                value={eyeware} 
                type='text'/> 
        </div> 
        </div> 

        let drugFields = 

        <div className='row'>

        <div id='rowspacer' className='col-1'>&nbsp;    </div> 
        
        <div className='col-3'> <br /> {signButton} </div>

        <div className='col-3'> <br />
        <label style={labelStyle} className='control-label'>Drug Name</label>
        <input style={inputStyle}
                id='drugname'
                className='form-control'
                onChange={handleChange}
                value={drugname} 
                type='text'/> 
        </div> 
        </div> 

    let specificFields = <></>

    
 switch(screenClaimType) {

        case 'm': specificFields = medicalFields; break;
        case 'd': specificFields = dentalFields;  break;
        case 'v': specificFields = visionFields;  break;
        case 'x': specificFields = drugFields;    break;
    } 

    /* developer note:

       1. move service read into code and perform from down here 
       1a. update proves this can load the screen 
       1b. wait.tsx 
           i. loads screen with timer
           ii. use effect calls subs in interface to verify user and set state
               to reload screen and route to unauth or start/message depending on environment
        2. lif all localstorages up to root appObject with propteries ; code technique
 
     end of developer note */


     /* run after screen built use useEffect */
        useEffect( () => {
    
        //Note: link and button accessing this screen must reset this indicator:
        let claimScreenIsLoaded = localStorage.getItem('claimScreenIsLoaded') ?? ''
        let needLoading = (claimOperation.what === 'adjustment' || claimOperation.what === 'copy')
        let claimScreenNotLoaded = !claimScreenIsLoaded
     
        if(needLoading && claimScreenNotLoaded) { 
           s("claim screen not loaded loading screen first name: ")
           loadClaimScreen(claimOperation.claimIdNumber, claimOperation.what, claimOperation.claimType,
                           claimOperation.selectedClaimService
           )
           localStorage.setItem("claimScreenIsLoaded","Yes") 
        }
        else if(claimScreenNotLoaded) {

           const defaultClaimType = 'm'
           onTypeChange(defaultClaimType)
           localStorage.setItem("claimScreenIsLoaded","Yes") 
        }
        else {

           s('claim screen has been loaded')
        }
    
        }) /* end of use effect */

        useEffect( () => {

            
             let claimScreenLoaded = localStorage.getItem('claimScreenLoaded') ?? ''
             if(claimScreenLoaded === '') {

                  const defaultClaimType = 'm'
                  onTypeChange(defaultClaimType)
                  localStorage.setItem('claimScreenLoaded','loaded')

             } 
        })
 
        

    return(<>
 
        <h3  style={h3Style}> Claim Add </h3> 

        <div id='center' style={divStyle}>  

        <div className='row'>

            <div id='typebuttons' className='col-2'> 

                <br /> 
                
                <p style={p1style}>Select Type</p>

                <button onClick={() => {onTypeChange('m')}}  style={tbStyle} className='btn btn-primary'>Medical</button> <br />
                <button onClick={() => {onTypeChange('d')}}  style={tbStyle} className='btn btn-info'>Dental</button> <br /> 
                <button onClick={() => {onTypeChange('v')}}  style={tbStyle} className='btn btn-warning'>Vision</button> <br />
                <button onClick={() => {onTypeChange('x')}}  style={tbStyle} className='btn btn-success'>Drug</button> <br />

            </div>
            <div id='data' className='col-10'>

                <div id='colspacer' className='row'><br/></div>

                {/* Patient Name Row */}

                <div className='row'>

                        <div id='rowspacer' className='col-1'></div>

                        <div className='col-3'>
                        <label onMouseOver={whiteHover(lightMode)} onMouseLeave={whiteLeave(lightMode)}  style={labelStyle} className='control-label'>Patient First</label>
                        <input style={inputStyle} 
                               id='patientfirst'
                               className='form-control'
                               onChange={handleChange}
                               value={patientFirst} 
                               type='text'/> 
                        </div>

                        <div className='col-3'>
                        <label onMouseOver={whiteHover(lightMode)} onMouseLeave={whiteLeave(lightMode)}  style={labelStyle} className='control-label'>Patient Last</label>
                        <input style={inputStyle}
                               id='patientlast'
                               className='form-control'
                               onChange={handleChange}
                               value={patientLast} 
                               type='text'/> 
                        </div>

                        <div className='col-3'>
                        <label onMouseOver={whiteHover(lightMode)} onMouseLeave={whiteLeave(lightMode)}  style={labelStyle} className='control-label'>Description</label>
                        <input style={inputStyle}
                               id='description'
                               className='form-control'
                               onChange={handleChange}
                               value={description} 
                               type='text'/> 
                        </div> 
                </div> 

                <br />

                   {/* Procedure row*/}

                <div className='row'>

                <div id='rowspacer' className='col-1'></div>

                <div className='col-3'>
                <label onMouseOver={whiteHover(lightMode)} onMouseLeave={whiteLeave(lightMode)}  style={labelStyle} className='control-label'>Procedure</label>
                <input style={inputStyle}
                        id='procedure'
                        className='form-control'
                        onChange={handleChange}
                        value={procedure} 
                        type='text'/> 
                </div>

                <div className='col-3'>
                <label onMouseOver={whiteHover(lightMode)} onMouseLeave={whiteLeave(lightMode)}  style={labelStyle} className='control-label'>Diagnosis</label>
                <input style={inputStyle}
                        className='form-control'
                        id='diagnosis'
                        onChange={handleChange}
                        value={diagnosis} 
                        type='text'/> 
                </div>

                <div className='col-3'>
                <label onMouseOver={whiteHover(lightMode)} onMouseLeave={whiteLeave(lightMode)}  style={labelStyle} className='control-label'>Service Date</label>
                <input style={inputStyle}
                        id='servicedate'
                        className='form-control'
                        onChange={handleChange}
                        value={serviceDate} 
                        type='text'/> 
                </div> 
        </div> 

          <br />

        {/* Physician row*/}

        <div className='row'>

        <div id='rowspacer' className='col-1'></div>

        <div className='col-3'>
        <label onMouseOver={whiteHover(lightMode)} onMouseLeave={whiteLeave(lightMode)}  style={labelStyle} className='control-label'>Physician</label>
        <input style={inputStyle}
                id='physician'
                className='form-control'
                onChange={handleChange}
                value={physician} 
                type='text'/> 
        </div>

        <div className='col-3'>
        <label onMouseOver={whiteHover(lightMode)} onMouseLeave={whiteLeave(lightMode)}  style={labelStyle} className='control-label'>Clinic</label>
        <input style={inputStyle}
                id='clinic'
                className='form-control'
                onChange={handleChange}
                value={clinic}  
                type='text'/> 
        </div>
 
         <div className="col-3 dropdown">
                
            
        <label style={labelStyle} className='control-label'>Service</label>  <br />
            <button style={dropStyle}  className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                {claimService}
            </button>
            <ul onClick={onServiceChange} id='stateDropdown' className="dropdown-menu">

                {options}
         
                </ul>
                
        </div>


        <br />

            {/* end of Physician Row */} 


            
            {/* Specific field row for each claim type*/}
 
          {specificFields} 

            </div> ({/* end of claim data rows */})

        </div> ({/* end of main screen area having buttons and claim data */}) 


        <div className='row'>&nbsp;</div> {/* spacing row */}

        <div className='row'> {/* button row */}

            
                <div id='rowspacer' className='col-4'>&nbsp;    </div>

                <div className="col-3"> 

                    <button  onClick={onAddClaim} style={btnStyleFirst} className='btn btn-primary'>
                            Add
                    </button>
                            &nbsp;&nbsp;
                    <button  onClick={onCancel} style={btnStyle} className='btn btn-primary'>
                            Cancel
                    </button> 

                </div>

          </div>

          <div className='row'>&nbsp;</div>{/* spacing row */}


          <div className="row">

             

            <div className="col"> 
                <label style={messageStyle} className='control-label'>{message}</label>   
            </div>

        </div>

     </div> {/* major screen row */}
 
 </div>     {/* end center div */}

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
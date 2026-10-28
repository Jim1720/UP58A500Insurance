import { useNavigate } from "react-router-dom"
import { payTheClaim, readClaimHistory } from "./Database"  
import { useEffect, useRef, useState } from "react"



export default function History({setClaimOperation, 
                                 store,
                                 setStore,
                                 actionButtons,  
                                 setFocusClaimId}:any 
                                  
) { 

    
      
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
        s("hist screen auth check ")
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

            localStorage.setItem('payStayInEffect','')
        })

    
     localStorage.setItem('payHistoryLoaded','')

    let historyAlertMessage = ''
    debugger

    let stayFirst = localStorage.getItem('stay') ?? ''
    let focusFirst = localStorage.getItem('focus') ?? ''
    if (stayFirst === 'on' && focusFirst === 'off') {
        // show last action at topa
        //let message = localStorage.getItem('mainMenuMessage') ?? ''
        let alertMessage = store.mainMenuMessage ?? ''
        historyAlertMessage = alertMessage
        // does not work msg blanks ...
        //localStorage.setItem('mainMenuMessage','')
        /* 
          TODO: other screen logic
          1. turn mainMenuMessage off 
          2. turn focus claim id off ??
        */
    }
    

    let focusClaimIdForScreenMatch = localStorage.getItem('focusClaimId') ?? ''

    /* park
    if(focusClaimForScreenMatch !== '' ) {
       historyAlertMessage += '\n note: Focus Claim id is : ' + focusClaimIdForMsg
    } end park */
 
    
    let displayLineHolder : any [] = [] 
 
    const [displayLines, setDisplayLines] = useState(displayLineHolder)
    //const [reload,setReload] = useState(false)

    // after claims read set this field to reload screen
    // and place data on the screen.
 
     let navigate = useNavigate()    

    // force screen reload to put data on screen
      let customerName = localStorage.getItem('customerName') 
      let lightMode = localStorage.getItem('lightMode') ?? 'Dark'

     /* light mode effects */

    /* TODO: fill page with container */ 
 
    let inputColor = 'white'
    let dataColor = 'dodgerblue'
    let inputBackGroundColor = 'black' 
    let titleColor = 'navajowhite' 
    let lightGoldenRodYellow = 'lightgoldenrodYellow'
    let actionColor = 'navajowhite'
    let actionBorderColor = 'white'
    let alertMessageColor = 'lightgoldenrodyellow'

    if (lightMode === 'Light') { 
             
         inputColor = 'blue'
         inputBackGroundColor = 'white' 
         titleColor = 'blue' 
         dataColor = 'black' 
         lightGoldenRodYellow = 'dodgerblue'
         actionColor = 'blue'
         actionBorderColor = 'blue' 
         alertMessageColor = 'dodgerblue'

    }

    let h3Style = {marginLeft: '42%', color: titleColor, fontFamily: 'arial', marginBottom: '1%'}
    
    let alertMessageStyle = {marginLeft: '10%', 
        color: alertMessageColor, fontFamily: 'arial', 
        marginBottom: '1%'}

    let h5style = {color: lightGoldenRodYellow, marginLeft: '42%', marginBottom: '2%', fontStyle: 'italic'} 
   
    let divStyle = { marginLeft: '10%'}
     
    let spaceStyle = { backgroundColor: inputBackGroundColor }

    // set up stay focus

    let stay = localStorage.getItem('stay') ?? 'off'
    
    let focus = localStorage.getItem('focus') ?? 'off'
 
    let stayLit = (stay === 'on') ? 'Stay On' : 'Stay Off' 
    let focusLit = (focus === 'on') ? 'Focus On' : 'Focus Off'

   
     
    let onStay = (e:any) => { 
         
       
        let stay = localStorage.getItem('stay') ?? 'off'
        let newStay = (stay === 'on') ? 'off' : 'on'
        localStorage.setItem('stay', newStay)
        stayLit = (newStay === 'on') ? 'Stay On' : 'Stay Off'  
        localStorage.setItem('historyScreenIsLoaded','no')
        //setStore({historyScreenIsLoaded:'no'})
        window.location.reload()
        
    }

    
    let onFocus = (e:any) => { 
         
      
        let focus = localStorage.getItem('focus') ?? 'off'
        let newFocus = (focus === 'on') ? 'off' : 'on'
        localStorage.setItem('focus', newFocus)
        focusLit = (newFocus === 'on') ? 'Focus On' : 'Focus Off'  
        localStorage.setItem('historyScreenIsLoaded','no')
        //setStore({historyScreenIsLoaded:'no'})
        window.location.reload()
        
    }

    // headers are white
    // dataa dodgerlue
    let headerStyle = {  color: inputColor, 
                         fontFamily: 'arial',
                         fontSize: 'larger'
                       
     }

     let dataStyle  = {  color: dataColor, 
                        fontFamily: 'arial',
                        fontSize: 'larger' 
                        
     }

     let btnLineStyle = { marginTop: '25px'}

   

       let menuBtnStyleNavajowhite = {
 
          marginLeft: '2%',
          fontSize: 'larger',
          fontFamily: 'arial',
          color: 'navajowhite',
          backgroundColor: 'black',
          borderColor: 'white'

     }

      let menuBtnStyleNavajowhiteBlock = {
 
          display: 'block',
          marginLeft: '2%',
          fontSize: 'larger',
          fontFamily: 'arial',
          color: 'navajowhite',
          backgroundColor: 'black',
          borderColor: 'white'

     }

       let menuBtnStyleAqua = {
 
          marginLeft: '2%',
          fontSize: 'larger',
          fontFamily: 'arial',
          color: 'aqua',
          backgroundColor: 'black',
          borderColor: 'white'

     }

      let menuBtnStyleGreen = {
 
          marginLeft: '2%',
          fontSize: 'larger',
          fontFamily: 'arial',
          color: 'lawngreen',
          backgroundColor: 'black',
          borderColor: 'white'

     }

      let menuBtnStyleYellow = {
 
          marginLeft: '2%',
          fontSize: 'larger',
          fontFamily: 'arial',
          color: 'yellow',
          backgroundColor: 'black',
          borderColor: 'white'

     }

      let menuBtnStyleRed = {
 
          marginLeft: '2%',
          fontSize: 'larger',
          fontFamily: 'arial',
          color: 'red',
          backgroundColor: 'black',
          borderColor: 'white'

     }

     let debugStyle = {
        fontSize: 'larger',
        fontFamily: 'arial',
        color: 'white',
        backgroundColor: 'black' 
     }
 

     let claimIdThatMatchesFirstActionButton = ''
     let claimIdThatMatchesSecondActionButton = ''
     const twoEntries = 2
     const oneEntry = 1

  
     // direct to insert tags at matching locations in the html 
     switch(actionButtons.array.length) {

        case oneEntry:   claimIdThatMatchesFirstActionButton = actionButtons.array[0]['claimIdNumber']
                         break;
        case twoEntries: claimIdThatMatchesFirstActionButton = actionButtons.array[0]['claimIdNumber']
                         claimIdThatMatchesSecondActionButton = actionButtons.array[1]['claimIdNumber']
                         break;
     }
 

     // set up action buttons :actions find tag
 

     const firstEntry = 0
     const secondEntry = 1

     let literal1 = 'not used'
     let literal2 = 'not used' 
     let button1display = 'none'
     let button2display = 'none'

     
     
     if (actionButtons.array.length === 1 || actionButtons.array.length === 2) {

         literal1 = actionButtons.array[firstEntry]['literal'].toString().trim() 
         button1display = 'unset'
                        
     } 
     
     if (actionButtons.array.length === 2) { 
        
         literal2 = actionButtons.array[secondEntry]['literal'].toString().trim()
         button2display = 'unset'
     }

   

    // initial setup of stay and focus buttons
 
 
     let onMenu = () => {

        navigate('/mainmenu')

     }

     let onNew = () => { 
    
        localStorage.setItem('claimScreenLoaded','')

         setClaimOperation({

            // used for adjustments and copies to set service dropdown control
            // pass to claim and to history
            what: 'new' 
      })

        navigate('/claim')
     }

     let onPayClaim = async (e:any) => { 

        debugger 
    
        
        let balanceOwed = e.target.dataset.balanceowed
        let claimId = e.target.dataset.claimid.trim()
        if(balanceOwed === 0) {

                alert("Claim Paid off completely no balance owed")
                return

        }
        let msg = ''
        let finished = false
        do {
                const nothingentered = ''
                const cancel = 'cancel'
                const nothingEntered = null

                let input = 
                window.prompt(`${msg} \n\n Enter Payment Amount. It can be up to ${balanceOwed} - enter 'cancel' to stop`) ?? ''
                switch(input) {
 
                        case nothingEntered: finished = true; break;
                        case cancel: finished = true; break;
                        default: // edit 
 
                          let amtCheck = Number(input)
                          if(!isFinite(amtCheck)) { msg = 'invalid number retry' }
                          let amt = parseFloat(input)
                          if (amt <= 0) {msg = 'invalid amount entered'}
                          if (amt > balanceOwed) {msg = `must not exceed ${balanceOwed}`}
                          if (msg === '') finished = true // passed edits call method to update claim

                          // update payment amount `

                         let date = getCurrentDate()
                         let paymentDate = date['today']
                         const writeHistory = "Y"

                          await payTheClaim(claimId, input, paymentDate , writeHistory).then( (r: any) =>
                          {

                              
                              debugger
                              let data = r['data']
                              if(data === "OK") {

                                 // update action list

                                 loadActionButtons("pay", claimId)

                                  debugger
                                   
                                  // focus on the paid claim
                                  localStorage.setItem('focusClaimId',claimId)
                                  setFocusClaimId(claimId)  
 
                                  debugger 

                                 getHistoryClaims().then( () => { 
                                        
                                    localStorage.setItem("historyScreenIsLoaded","no")   
                                    window.location.reload()
                                    return 
                                 })  

                              } else {

                                //localStorage.setItem('mainMenuMessage',"pay unsuccessful")
                                 setStore({mainMenuMessage: "pay unsuccessful"})
                                 // main menu with error message
                                 navigate('/mainmenu')

                              } 
                          }) 
                }



        } while (finished === false) 
     }

     let onPayHistory = (e:any) => {

        debugger

        let claimId = e.target.dataset.claimid ?? ''
        let cid = claimId.trim()
        let total = e.target.dataset.total ?? ''
        let balance = e.target.dataset.balance ?? ''
        store.histTotalCharge = total
        store.histBalanceOwed = balance
        
        //alert(cid)
        s('1. OnPayHistory claim id is : ' + cid)
        localStorage.setItem('payHistoryClaimIdNumber', cid)
        navigate('/paymenthistory')

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

  




   

    function formatDate(value:string) {

      if(value === undefined) {

        return 'n/a'

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
      return result;

  } 

  
  let onAdjust = (e:any) => {

    
     localStorage.setItem('claimScreenLoaded','')
 
      let claimId = e.target.dataset.claimid  
      let claimtype = e.target.dataset.claimtype
      let service = e.target.dataset.service 
      let claimStatus = e.target.dataset.claimstatus 
      let _claimStatus = claimStatus.trim()

     

      if(_claimStatus === 'Adjusted' || _claimStatus === 'Paid') {

         // keep buttons consistent always show adjustment button and edit it 
         let message = `Adjustemnt not allowed on ${_claimStatus} claim`
         alert(message)
         return

      }

      setClaimOperation({

            // used for adjustments and copies to set service dropdown control
            // pass to claim and to history
            what: 'adjustment',  
            claimIdNumber: claimId,
            selectedClaimService: service,
            claimType: claimtype 
      })

      setStore({

            what: 'adjustment',
            claimIdNumber: claimId,
            selectedClaimService: service,
            claimType: claimtype 
      })

      navigate('/claim')
   
  }

  let onCopy = (e:any) => { 

      
     localStorage.setItem('claimScreenLoaded','')
     
      let claimId = e.target.dataset.claimid  
      let claimtype = e.target.dataset.claimtype
      let service = e.target.dataset.service 


      setClaimOperation({

            // used for adjustments and copies to set service dropdown control
            // pass to claim and to history
            what: 'copy',
            claimIdNumber: claimId,
            selectedClaimService: service,
            claimType: claimtype 
      }) 

        setStore({

            what: 'copy',
            claimIdNumber: claimId,
            selectedClaimService: service,
            claimType: claimtype 
      })

      navigate('/claim')
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

   let lines : any [] = []

   let sequence = 1
   let key = 1 
   let claimIndex = 1 

 

   const BuildScreen = (claims:any) => { 

       s("Beginning Load code in line") 

       let totalClaimCount = claims.length
       let halfway =  (totalClaimCount - (totalClaimCount % 2)) / 2;  
 

   for(var {ClaimIdNumber,
            ClaimDescription,
            PatientFirst,
            PatientLast,
            DateService,
            Diagnosis1,
            Diagnosis2,
            Physician,
            ClaimType,
            Service,
            Procedure1,
            Procedure2,
            Clinic,
            PlanId,
            DateAdded,
            ClaimStatus, 
            TotalCharge,
            CoveredAmount,
            BalanceOwed,
            DateConfine,
            DateRelease,
            ToothNumber,
            DrugName,
            Eyeware,
            AdjustedDate,
            AdjustingClaimId,
            AdjustedClaimId,
        }

          of claims) {  // id desc seq

        s("Loading claim id into screen array: " + ClaimIdNumber)

        let seq = sequence.toString()

        if(sequence === 1) {

            let topLine = <div id='top'></div> 
            lines.push(topLine) 
        }
          if(sequence === halfway) {

             let botLine = <div id='mid'></div>
             lines.push(botLine)

        }
        if(sequence === claims.length) {

             let botLine = <div id='bot'></div>
             lines.push(botLine)

        } 


        if(ClaimIdNumber.trim() === claimIdThatMatchesFirstActionButton) {

             let act1Line = <div style={debugStyle} id='act1'>ACT1</div>
             lines.push(act1Line)

        }
        if(ClaimIdNumber.trim() === claimIdThatMatchesSecondActionButton) {

             let act1Line = <div style={debugStyle} id='act2'>ACT2</div>
             lines.push(act1Line)

        } 
         if(ClaimIdNumber.trim() === focusClaimIdForScreenMatch) {
 
             let act1Line = <div style={debugStyle} id='focus'>FOCUS</div>
             lines.push(act1Line)

        }
      else {
          s(`missed claim focus: /${ClaimIdNumber.trim()}/${focusClaimIdForScreenMatch}/`)
       }
      
       s('start of loop for sequence: ' + seq)

        let spacerLine = <div className='row'>&nbsp</div>
        lines.push(spacerLine)

        let claimIdLine = <>
        
                 <div key={key+10} className='row'>

                        <div style={headerStyle} className='col-md-4'>Claim Identification</div> 
                        <div style={headerStyle} className='col-md-4'>Description</div> 
                        <div style={headerStyle} className='col-md-4'>Sequence</div>

                 </div>

                 <div key={key+11} className='row'>

                         <div style={dataStyle} className='col-md-4'>{ClaimIdNumber}</div>
                         <div style={dataStyle} className='col-md-4'>{ClaimDescription}</div>
                         <div style={dataStyle} className='col-md-4'>{seq}&nbsp;of&nbsp;{claims.length}</div> 

                 </div> 

        </>; 

        let _dateService = formatDate(DateService)

        lines.push(claimIdLine)

           let patientLine = <>
        
                 <div key={key+12} className='row'>

                        <div style={headerStyle}  className='col-md-4'>Patient First Name</div> 
                        <div style={headerStyle} className='col-md-4'>Patient Last Name</div> 
                        <div style={headerStyle} className='col-md-4'>Service Date</div>

                 </div>

                 <div key={key+13} className='row'>

                         <div style={dataStyle} className='col-md-4'>{PatientFirst}</div>
                         <div style={dataStyle} className='col-md-4'>{PatientLast}</div>
                         <div style={dataStyle} className='col-md-4'>{_dateService}</div> 

                 </div> 

        </>; 

        lines.push(patientLine)

         let descriptiveClaimType = 'Unknown'
         let _claimType = ClaimType.toString().trim()
         switch(_claimType) {
            case 'm' : descriptiveClaimType = "Medical"; break;
            case 'd' : descriptiveClaimType = "Dental"; break;
            case 'v' : descriptiveClaimType = "Vision"; break;
            case 'x' : descriptiveClaimType = "Drug"; break;
         }

         let diagnosisLine = <>
        
                 <div key={key+14} className='row'>

                        <div style={headerStyle} className='col-md-4'>Diagnosis</div> 
                        <div style={headerStyle} className='col-md-4'>Physician</div> 
                        <div style={headerStyle} className='col-md-4'>Claim Type</div>

                 </div>

                 <div key={key+15} className='row'>

                         <div style={dataStyle} className='col-md-4'>{Diagnosis1}&nbsp;{Diagnosis2}</div>
                         <div style={dataStyle} className='col-md-4'>{Physician}</div>
                         <div style={dataStyle} className='col-md-4'>{descriptiveClaimType}</div> 

                 </div> 

        </>; 

        lines.push(diagnosisLine)


        let procedureLine = <>
        
                 <div key={key+16} className='row'>

                        <div style={headerStyle} className='col-md-4'>Procedure</div> 
                        <div style={headerStyle} className='col-md-4'>Clinic</div> 
                        <div style={headerStyle} className='col-md-4'>Plan</div>

                 </div>

                 <div key={key+17} className='row'>

                         <div style={dataStyle} className='col-md-4'>{Procedure1}&nbsp;{Procedure2}</div>
                         <div style={dataStyle} className='col-md-4'>{Clinic}</div>
                         <div style={dataStyle} className='col-md-4'>{PlanId}</div> 

                 </div> 

        </>; 

        lines.push(procedureLine)

        let _dateAdded = formatDate(DateAdded)

         let enteredLine = <>
        
                 <div key={key+18} className='row'>

                        <div style={headerStyle} className='col-md-4'>Date Entered</div> 
                        <div style={headerStyle} className='col-md-4'>Claim Status</div> 
                        <div style={headerStyle} className='col-md-4'>Service</div>

                 </div>

                 <div key={key+19} className='row'>

                         <div style={dataStyle} className='col-md-4'>{_dateAdded}</div>
                         <div style={dataStyle} className='col-md-4'>{ClaimStatus}</div>
                         <div style={dataStyle} className='col-md-4'>{Service}</div> 

                 </div> 

        </>; 

        lines.push(enteredLine)

        /* pay stay logic */

        /* usually the divs with psOn are displayed however when
           pay claim stay is used the covered amount is changed
           so we alternate the rows with java script to show
           the new covered amount without any screen refresh
           note:window.reload was not effective
        */ 

            let claimAmountLine = <>
        
                 <div key={key+20} data-ps-on={seq} className='row'>

                        <div style={headerStyle} className='col-md-4'>Total Charge</div> 
                        <div style={headerStyle} className='col-md-4'>Covered</div> 
                        <div style={headerStyle} className='col-md-4'>Owed</div>

                 </div>

                 <div key={key+21} data-ps-on={seq} className='row'>

                         <div style={dataStyle} className='col-md-4'>$ {TotalCharge}</div>
                         <div style={dataStyle} className='col-md-4'>$ {CoveredAmount}</div>
                         <div style={dataStyle} className='col-md-4'>$ {BalanceOwed}</div> 

                 </div> 

        </>; 

        lines.push(claimAmountLine) 

        {/* claim type field lines */}

        const medical = "m"
        const dental  = 'd'
        const vision = 'v'
        const drug = 'x'

         if(ClaimType === medical) {
 
             {/* TODO: show dates if not default */} 

             let formattedDateConfine = formatDate(DateConfine)
             let formattedDateRelease = formatDate(DateRelease) 
             let printLine = (formattedDateConfine !== 'n/a' || formattedDateRelease !== 'n/a')

               let dateLine = <>
        
                 <div key={key+22} className='row'>

                        <div style={headerStyle} className='col-md-4'>Confine Date</div> 
                        <div style={headerStyle} className='col-md-4'>Release Date</div>  
                 </div>

                 <div key={key+23} className='row'>

                         <div style={dataStyle} className='col-md-4'>{formattedDateConfine}</div>
                         <div style={dataStyle} className='col-md-4'>{formattedDateRelease}</div> 

                 </div> 

        </>; 

        if(printLine) {
           lines.push(dateLine)
        }
  

         }

         
         if(ClaimType === dental) {

                  let toothLine = <>
        
                 <div key={key+24} className='row'>

                        <div style={headerStyle} className='col-md-4'>Tooth</div>  

                 </div>

                 <div key={key+25} className='row'>

                         <div style={dataStyle} className='col-md-4'>{ToothNumber}</div> 

                 </div>
                 </>; 

                 lines.push(toothLine)

         }

           
         if(ClaimType === vision) {

                  let eyewareLine = <>
        
                 <div key={key+26} className='row'>

                        <div style={headerStyle} className='col-md-4'>Eyeware</div>  

                 </div>

                 <div key={key+27} className='row'>

                         <div style={dataStyle} className='col-md-4'>{Eyeware}</div> 

                 </div>
                 </>; 

                 lines.push(eyewareLine)

         }

             
         if(ClaimType === drug) {

                  let drugLine = <>
        
                 <div key={key+28} className='row'>

                        <div style={headerStyle} className='col-md-4'>Drug Name</div>  

                 </div>

                 <div key={key+29} className='row'>

                         <div style={dataStyle} className='col-md-4'>{DrugName}</div> 

                 </div>
                 </>; 

                 lines.push(drugLine)

         }

         {/* claim was adjusted  */}

        
         let _claimStatus = ClaimStatus.trim()

          if (_claimStatus === "Adjustment") {

         
                let adjustedLine = <> 
                
                        <div key={key+30} className='row'>

                                <div style={headerStyle} className='col-md-4'>Adjusted Claim</div>  
                        </div>

                        <div key={key+31} className='row'>

                                <div style={dataStyle} className='col-md-4'>{AdjustedClaimId}</div> 

                        </div> 

                </>; 
        
                  lines.push(adjustedLine)

          }

           {/* claim did the adjusting */}

          if(_claimStatus === "Adjusted") {

         
                let _adjustedDate = formatDate(AdjustedDate)

                let adjustingLine = <> 
                
                        <div key={key+32} className='row'>

                                <div style={headerStyle} className='col-md-4'>Adjusting Claim</div> 
                                <div style={headerStyle} className='col-md-4'>Adjusted Date</div>  
                        </div>

                        <div key={key+33}  className='row'>

                                <div style={dataStyle} className='col-md-4'>{AdjustingClaimId}</div>  
                                <div style={dataStyle} className='col-md-4'>{_adjustedDate}</div>

                        </div> 

                </>; 
        
                lines.push(adjustingLine)

          } 

       let payHistoryButton = <></>

       if (_claimStatus === 'Paid')  {
       
            payHistoryButton = 

            <button type='button' onClick={onPayHistory} 
                    data-claimid={ClaimIdNumber}
                    data-total={TotalCharge}
                    data-balance={BalanceOwed}
                    style={menuBtnStyleNavajowhite}
                    className='btn btn-primary'>Pay History</button>;

            }  

         let buttonLine = <div key={key+34} style={btnLineStyle}>

               
                <button type='button' onClick={onMenu} style={menuBtnStyleAqua} className='btn btn-primary'>Menu</button>
                  
                <button type='button' onClick={onStay} style={menuBtnStyleNavajowhite} className='btn btn-primary'>{stayLit}</button>
                 
                <button type='button' onClick={onFocus} style={menuBtnStyleNavajowhite} className='btn btn-primary'>{focusLit}</button>
                
                <button type='button' onClick={onNew} style={menuBtnStyleGreen} className='btn btn-primary'>New</button>
             
                <button type='button' onClick={onAdjust} data-claimid={ClaimIdNumber} 
                        data-claimtype = {ClaimType}
                        data-service={Service}
                        data-claimindex={claimIndex}
                        data-claimstatus={ClaimStatus}
                        style={menuBtnStyleYellow} className='btn btn-primary'>Adjust</button> 
             
                <button type='button' onClick={onCopy} data-claimid={ClaimIdNumber}
                        data-claimtype = {ClaimType}
                        data-service={Service}
                        data-claimindex={claimIndex}
                        style={menuBtnStyleRed} className='btn btn-primary'>Copy</button>

                <a type='button' href='#top' style={menuBtnStyleGreen} className='btn btn-primary'>Top</a>
             
                <a type='button' href='#mid' style={menuBtnStyleYellow} className='btn btn-primary'>Mid</a> 
             
                <a type='button' href='#bot' style={menuBtnStyleRed} className='btn btn-primary'>Bot</a> 
                
                <button type='button' onClick={onPayClaim} 
                                     data-balanceowed={BalanceOwed}
                                     data-claimid={ClaimIdNumber}
                                     data-sequence={seq}
                                     style={menuBtnStyleNavajowhite} className='btn btn-primary'>Pay</button>
 

                 {payHistoryButton} 
             

         </div>

         lines.push(buttonLine)
 

         if (actionButtons.array.length > 0) {
         
                let actionLine = <div key={key+35} style={btnLineStyle}> 
                
                        <a type='button' 
                        href='#act1' 
                        style={{display: button1display, color:actionColor, 
                                backgroundColor: inputBackGroundColor, borderColor: actionBorderColor,
                                marginLeft: '2%',
                                fontSize: 'larger',
                                fontFamily: 'arial',
                                }}
                        className='btn'>{literal1}</a> 
                        
                        <a type='button'  
                        href='#act2'  
                        style={{display: button2display, color: actionColor,
                                backgroundColor: inputBackGroundColor, borderColor: actionBorderColor,
                                marginLeft: '2%',
                                fontSize: 'larger',
                                fontFamily: 'arial',

                                }}
                        className='btn'>{literal2}</a> 

                </div>

                lines.push(actionLine)

        } 
         
       s("end of loop for sequence: " + sequence)

        sequence++
        key += 200
        claimIndex++
     
 
        } /* end loop */ 

        
        s("End of claim Load loop lines has " + lines.length + ' entries')

        s('putting lines into state')

 

         setDisplayLines(lines)

} /* end build screen */

   let claimList : any = []

 
   const getHistoryClaims = async () => { 

      s("Load History Screen")

        let customerId = localStorage.getItem('customerId') ?? '' 

      

        let claims: any [] = []

        await readClaimHistory(customerId).then( (r:any) => { 

                
                let statusText = r['statusText'] 
                if(statusText != "OK") {
                         
                   localStorage.setItem('mainMenuMessage','Claim History Read Error Status is ' + statusText )
                   navigate('mainmenu')

                }   

                claimList   = r['data']  
               s('set claim data to claimList length ' + claimList.length)
              

                let count = claimList.length
               s('Reading history status Text: ' + statusText + ' ' +  count + ' claim(s) found') 
                for(var claim of claimList) { 
                       s(claim['ClaimIdNumber']) 
                        claims.push(claim)  
                } 
                BuildScreen(claims) // claims
                
                 
   
       })
      }
 
      
      useEffect( () => { 

        //setReload(false) // used for pay stay only
   
        //Note: link and button accessing this screen must reset this indicator:
        let historyScreenIsLoaded = localStorage.getItem('historyScreenIsLoaded') ?? ''
        //let historyScreenIsLoaded = store.historyScreenIsLoaded

        s('[history] screen is loaded: ' + historyScreenIsLoaded)
        
        if(historyScreenIsLoaded !== "Yes") {

                s("history screen not loaded loading history screen")

                getHistoryClaims()

                localStorage.setItem("historyScreenIsLoaded","Yes")  
                //setStore({historyScreenIsLoaded:'yes'})
 
        }
        // check focus on and a focusClaimId non bank
        let focus = localStorage.getItem('focus') ?? ''
        if(focus === 'on') {

            // try to find focus if found scroll there
            let focusElement = document.getElementById('focus') as HTMLElement
            if (focusElement !== undefined) 
                focusElement?.scrollIntoView();
            // end of scroll ogic

        }
 
        
        }) /* end of use effect */
  
   
     

    return(<div className='container'>
 
            
        <h3  style={h3Style}> A500Insurance </h3>
        <h5  style={h5style}> Claim History for {customerName} </h5>

        <div style={alertMessageStyle}>{historyAlertMessage}</div>

        <div id='center' style={divStyle}>  

            {displayLines}

        
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

    </div>)


}
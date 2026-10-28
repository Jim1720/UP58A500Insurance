import { useNavigate } from "react-router-dom" 
import { readPaymentHistory } from "./Database" 
import { useEffect, useState } from "react"
 
/* parking 

    let payments: any [] = [] 

    // init a45 check
    localStorage.setItem("A4Server",'ok')
    
    debugger 

    let claimIdNumber = localStorage.getItem("payHistoryClaimIdNumber") ?? ''
    let claimId = claimIdNumber.trim()

    console.log('2. pay history for claim ' + claimId)
     
    await readPaymentHistory(claimId).then( (r: any) => { 

            console.log("3. read payment history: " + claimId)

            if(r === undefined) {

                  // missing a4server check

                  console.log('---------------------------------')
                  console.log("[startup A4Server is not running]") 
                  console.log('---------------------------------')

                  //localStorage.setItem('setupRoute','/start')
                  localStorage.setItem('setupMessage', 'A4Server not started') 
                  localStorage.setItem('setupMessageText', 'Start up A4server')  
                  localStorage.setItem("A4Server",'noserver')
                  return

            }

            let status = r['status']
            console.log(status)

            if(status === 200) {
                console.log("successfull read ")
            }


            // payment records
            let records = r['data']
            console.log(records)
            console.log(records.length + 'record(s) found')
   
            for(var {PaymentAmount, PaymentDate} of records) {  
                let item = {amount: PaymentAmount, date: PaymentDate}  
                payments.push(item)  
            }  

            console.log("** " + payments.length + ' payment(s) read')
              
    }) 

    * end parking */

export default  function PaymentHistory({store, setStore}:any) {  
     
      let navigate = useNavigate() 

      // auth check  
        // navigate is in use effect
        let authCheckPassed = true
        let testMode = localStorage.getItem('testMode') ?? ''
        let appUser = localStorage.getItem('appUser') ?? ''
        let currentMode = (testMode === '') ? 'test' : 'prod'
        console.log("pay hist screen auth check ")
        console.log(`current Mode: ${currentMode} appUser: ${appUser}`)
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

           // scroll to top
              // try to find focus if found scroll there
            let topElement = document.getElementById('top') as HTMLElement
            if (topElement !== undefined) 
                topElement?.scrollIntoView();
            // end of scroll ogic
        })

      const lineTemplate : any [] = []
      const [titleMessage, setTitleMessage] = useState('')
      const [screenLines,setScreenLines] = useState(lineTemplate) 
      
      let lightMode = localStorage.getItem('lightMode') ?? 'Dark'

      
     let claimIdNumber = localStorage.getItem("payHistoryClaimIdNumber") ?? ''

     /* light mode effects */

    /* TODO: fill page with container */ 

    let labelColor = 'dodgerblue'
    let inputColor = 'white'
    let inputBackGroundColor = 'black'
    let messageColor = 'white'
    let paraColor = 'white'
    let titleColor = 'navajowhite' 
    let lightGoldenRodYellow = 'lightGoldenRodYellow' 
    let dataColor = 'dodgerblue'

    if (lightMode === 'Light') { 
            
         labelColor = 'dodgerblue'
         inputColor = 'blue'
         inputBackGroundColor = 'white'
         messageColor = 'blue'
         paraColor = 'dodgerblue'
         titleColor = 'blue'  
         lightGoldenRodYellow = 'dodgerblue' 
         dataColor = 'black'

    }

    let h3Style = {marginTop: '2%', fontStyle: 'italic', marginLeft: '38%', color: titleColor, fontFamily: 'arial', marginBottom: '1%'}
    let h5style = {marginTop: '2%', color: lightGoldenRodYellow, marginLeft: '34%', marginBottom: '2%', fontStyle: 'italic'} 
   
    let divStyle = { marginLeft: '35%'}

    //let pstyle = { color: 'white', fontFamily: 'arial', fontStyle:'italic', fontSize: 'large',
    //    marginTop: '8%'
    //}
    let spanStyle = { color: titleColor}
    let spaceStyle = { backgroundColor: inputBackGroundColor}
 

    
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

     let pstyle  = {  color: inputColor, 
                        fontFamily: 'arial',
                        fontSize: 'larger',
                        marginLeft: '35%'
                        
     }

     let spanStyle2 = { color: dataColor, 
                        fontFamily: 'arial',
                        fontSize: 'larger',
                        marginLeft: '2%'
                        
     }

     
    let btnStyle = { marginTop: '14%',  marginLeft: '43%', fontSize: 'larger' }

 
    
    let onReturn = () => {

            debugger
            
            localStorage.setItem("historyScreenIsLoaded","No") 
            //setStore({historyScreenIsLoaded:'no'})

            // no matter what if you click pay history set the focus on that claim 
            let claimIdNumber = localStorage.getItem("payHistoryClaimIdNumber") ?? '' 
            localStorage.setItem('focusClaimId',claimIdNumber) 

            // always go back to history and focus on the selected claim 
            navigate('/history')
            return 

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
 
    debugger
    let total   = store.histTotalCharge 
    let balance = store.histBalanceOwed

    console.log(`[payhistory] from store: total: ${total} balance: ${balance}`)

    const loadScreen = async () => { 

          let payments: any [] = [] 

          let claimIdNumber = localStorage.getItem("payHistoryClaimIdNumber") ?? ''
          let claimId = claimIdNumber.trim()

          await readPaymentHistory(claimId).then( (r: any) => { 

                console.log("3. read payment history: " + claimId)

                if(r === undefined) {

                    // missing a4server check
                    // temp: move to claim the last 'roof' then fix in interrace 
                    // keep here fore reference 

                    console.log('---------------------------------')
                    console.log("[startup A4Server is not running]") 
                    console.log('---------------------------------')

                    //localStorage.setItem('setupRoute','/start')
                    localStorage.setItem('setupMessage', 'A4Server not started') 
                    localStorage.setItem('setupMessageText', 'Start up A4server')  
                    localStorage.setItem("A4Server",'noserver')
                    return

                }

                let status = r['status']
                console.log(status)

                if(status === 200) {
                    console.log("successfull read ")
                }


                // payment records
                let records = r['data']
                console.log(records)
                console.log(records.length + 'record(s) found')
    
                for(var {PaymentAmount, PaymentDate} of records) {  
                    let item = {amount: PaymentAmount, date: PaymentDate}  
                    payments.push(item)  
                }  

                console.log("** " + payments.length + ' payment(s) read')
              
             }) 

             let lines : any [] = []

            debugger 

            let key = 1
            for (var {amount, date} of payments) {

                debugger
                
                let _date = formatDate(date)
                let _amount = amount.toString()
 
                  let paymentLine = <>
        
                    <div key={key} className='row'>

                            <div style={headerStyle} className='col-md-4'>Payment Amount</div> 
                            <div style={headerStyle} className='col-md-4'>Payment Date</div>  

                    </div>

                    <div key={key+1} className='row'>

                            <div style={dataStyle} className='col-md-4'>{_amount}</div>
                            <div style={dataStyle} className='col-md-4'>{_date}</div> 

                    </div> 

                  </>; 


                lines.push(paymentLine) 

                key++


              } 

              

            let count = lines.length 

            // ah ha - set title message with plan count to force population of screen lines
            // looks like useeffect runs after screen render

            setScreenLines(lines) // need this too ! :)
            setTitleMessage(count + ' payments(s) loaded')
         }


    useEffect( () => {

        let payHistoryLoaded = localStorage.getItem('payHistoryLoaded') ?? ''
        if(!payHistoryLoaded) {
            localStorage.setItem('payHistoryLoaded','yes')
            loadScreen()
        }
        
    })
     

    return(<>
 
        <h3  id='top'  style={h3Style}> Payment History </h3> 
        <h5  style={h5style}> Claim Id Number: <span style={spanStyle}> {claimIdNumber} </span>  </h5> 
        <h5  style={h5style}> {titleMessage} </h5>

        <div id='center' style={divStyle}>  

            {screenLines}
        
        </div>
        <br />
        <p style={pstyle}>Total Claim Charge: <span style={spanStyle2}>{total}</span></p> 
        <p style={pstyle}>Balance Owed: <span style={spanStyle2}>{balance}</span></p>
        
          <button  onClick={onReturn} style={btnStyle} className='btn btn-primary'>Return</button>

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
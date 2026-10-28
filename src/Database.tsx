
// Database.tsx

import axios from "axios"; 

export async function signInCustomer(customerId:string, password:string) {

    debugger
    let baseUrl = localStorage.getItem('baseUrl') ?? ''

    // change sign in routine to use this rather than read customer
    const url = `${baseUrl}/signin?id=${customerId}&pw=${password}`
    const response = await get(baseUrl, url)

    if (response === null || response === undefined) {

        let message = 'failed operation'
        let status = 'bad'
        const returnObject = {Status: status, Message: message, Customer:null, Token: null}
        return returnObject

    }


    const data = response['data']
    const status = data['Status']
    const message = data['Message']
    if (status !== "Successful") {

        const message = data['Message']
        const returnObject = {Status: status, Message: message, Customer:null, Token: null}
        return returnObject
    }

    const customerData = data['Customer']
    const tokenobjectstring = data['Token']
    const tokenobject = JSON.parse(tokenobjectstring)
    const a45object = tokenobject['A45Object']
    const token = a45object['token']

    const returnObject = {Status: status, Message: message, Customer:customerData, Token: token}
    return returnObject

}

 export async function registerCustomer(customer:any) {

    let baseUrl = localStorage.getItem('baseUrl') ?? ''
    const action = 'register'
    const response = await post(baseUrl, action, customer )


   if (response === null || response === undefined) {

        let message = 'failed operation'
        let status = 'bad'
        const returnObject = {Status: status, Message: message, Customer:null, Token: null}
        return returnObject

    }


    const data = response['data']
    const status = data['Status']
    const message = data['Message']
    if (status !== "Successful") {

        const message = data['Message']
        const returnObject = {Status: status, Message: message, Customer:null, Token: null}
        return returnObject
    }


    const customerData = data['Customer']
    const tokenobjectstring = data['Token']
    const tokenobject = JSON.parse(tokenobjectstring)
    const a45object = tokenobject['A45Object']
    const token = a45object['token']

    const returnObject = {Status: status, Message: message, Customer:customerData, Token: token}
    return returnObject

}

export async function readCustomer(customerId:string) {

    let baseUrl = localStorage.getItem('baseUrl') ?? '' 
    const url = `cust?id=${customerId}`
    const response = await get(baseUrl,url)


    if (response === null || response === undefined) {
         const message = '1. read customer unsuccessful'
        const returnObject = {Status: 'UnSuccessful', Message: message, Customer:null, Token: ''}
        return returnObject
    }

    const data = response['data']
    const status = data['Status']
    const message = data['Message']
    const cust = data['Customer']
    if (status !== "Successful") {

        const message = data['Message']
        const returnObject = {Status: status, Message: message, Customer:null, Token: ''}
        return returnObject
    }
 
    const returnObject = {Status: status, Message: message, Customer:cust, Token: ''} 

    return returnObject

}


export async function updateCustomer(customer:any ) {

    let baseUrl = localStorage.getItem('baseUrl') ?? '' 
    const action = 'update'
    const response = await put(baseUrl, action, customer )


   if (response === null || response === undefined) {

        let message = 'failed operation'
        let status = 'bad'
        const returnObject = {Status: status, Message: message, Customer:null, Token: null}
        return returnObject

    }


    debugger
    const data = response['data']
    let status = data['Status']
    const message = data['Message']
    /* workaround
    if (status !== "Successful") {

        const message = data['Message']
        let returnObject = {status: status, message: message, cust:null, token: null}
        return returnObject
    } */
    /* workaround */
    /* A45 is not behaving * check other modules apps etc for how to handle this
       do not change a45 */

    status = "Successful"
    const returnObject = {Status: status, Message: message, Customer:null, Token: null}
    return returnObject



}


export async function readCustomers() {


      let baseUrl = localStorage.getItem('baseUrl') ?? ''
      const send = '/custList'
      const result = await get(baseUrl, send)
      return result

} 


export async function readClaimDataForCustomer(customerId: string) {


      let baseUrl = localStorage.getItem('baseUrl') ?? ''
      const send = `custListExtended?id=${customerId}`
      const result = await get(baseUrl, send)
      return result

}


export async function listCommentsForAppUsers(user:string) {

      let baseUrl = localStorage.getItem('baseUrl') ?? ''
      const send = '/readcomments?id=' + user
      const result = await get(baseUrl, send)
      return result
}



export async function readUsers(user:string) {

      let baseUrl = localStorage.getItem('baseUrl') ?? ''
      const send = '/listusers?id=' + user
      const result = await get(baseUrl, send)
      return result
}




export async function resetPassword(customerId: string, newPassword: string) {

      let baseUrl = localStorage.getItem('baseUrl') ?? ''
      const token = localStorage.getItem('Token')
       
      const action = 'resetPassword'
      const object = {
                        custId: customerId,
                        newPassword: newPassword,
                        _csrf:token
                   }

      const result = put(baseUrl, action, object)
      // check status code for result
      return result


}


export async function resetCustomer(customerId: string, newCustomerId: string) {

      let baseUrl = localStorage.getItem('baseUrl') ?? ''
      const token = localStorage.getItem('Token')

      const action = 'resetcustomerid'
      const object = {
                        custId: customerId,
                        newCustId: newCustomerId,
                        _csrf:token
                   }

      const result = put(baseUrl, action, object)
      // check status code for result
      return result


}


export async function readCustomersForUser(appUser:string) 

     : Promise<{status: string, customerList: any[] | null} >
     
{

    /*
      SELECT custId, custFirst, custLast,
                     custPassword,
                     custAddr1, custAddr2,
                     custCity,  custState, custZip,
                     custPhone, custEmail,
                     custPlan,
                     custMiddle,
                     custGender,
                     custBirthDate,
                     appID,
    */

    let baseUrl = localStorage.getItem('baseUrl') ?? ''
    const url = `forUserShowCustList?id=${appUser}`
    const response = await get(baseUrl,url)

    debugger

    if (response === null || response === undefined) {

        const status = "1. UnSuccessful"
        const returnObject = {status: status, customerList: null}
        return returnObject

    }

    const statusCode = response['status']
    if (statusCode !== 200) {

        const status = "UnSuccessful"
        const returnObject = {status: status, customerList: null}
        return returnObject
    }

    //  return customer rows
    const data = response['data']
    const status = "Successful"
    const returnObject = {status: status, customerList: data}


    return returnObject

}

/*----------------------------------------------------------- */
/* plan read                                                  */
/*------------------------------------------------------------*/

export async function readPlans() {

   let baseUrl = localStorage.getItem('baseUrl') ?? ''
   const url = '/readPlans'
   const result = await get(baseUrl,url)


   if (result === null || result === undefined) {

       return []

    } 

   // Id PlanName PlanLiteral Percent

    interface PlanEntry {
        Id: string,
        PlanName: String,
        PlanLiteral: String,
        Percent: number
    }

    let array : any [] = []
   
    let plans = result['data']
    for(var i = 0; i < plans.length; i++ ) {
        const entry: PlanEntry = plans[i] ?? {}
        const PlanName = entry.PlanName
        const PlanLiteral = entry.PlanLiteral
        const Percent = entry.Percent
        let obj = {PlanName: PlanName, PlanLiteral: PlanLiteral, Percent: Percent}
        array.push(obj)

    } 

    return array
 
     
}

/* ---------------------------------------------------------- */
/* claim                                                      */
/* -----------------------------------------------------------*/


export async function addClaim(claim:any) {

       let baseUrl = localStorage.getItem('baseUrl') ?? ''
       const action = 'addclaim'
       const response = await post(baseUrl, action, claim)

       if(response === null || response === undefined) {

        return "add claim operational error"

       }

       const status = response['status']
       const flag = (status === 200) ? "Good" : "Error"
       return flag

}

  

export async function readServices(isLoaded:boolean) {

    if(isLoaded) {

       // console.log("1")

        return  ''

    }

    let baseUrl = localStorage.getItem('baseUrl') ?? ''
    const url = '/readServices'
    const result = await get(baseUrl,url)

     if (result === null || result === undefined) {

       //console.log("2")

       return []

    }

   // console.log("3")
    let data = result['data']

 //   console.log("[services] database " + data.length + " service(s) found")
    return data

    /* copy code to caller if needed
    const listForClaimScreen = []

    store.serviceArray =  result['data']
    for(let i = 0; i < store.serviceArray.length; i++ ) {
        const entry: any = store.serviceArray[i] ?? {}
        const ServiceName = entry['ServiceName'].toString().trim()
        let claimTypeLiteral = entry['ClaimTypeLiteral']
        let claimType = entry['ClaimType']
        claimTypeLiteral = claimTypeLiteral.toLowerCase()
        claimType = claimType.toLowerCase()
        console.log(`ClaimType: ${claimType} ServiceName: ${ServiceName} Claim Type Literal: ${claimTypeLiteral}`)
        const listEntry = {ServiceName: ServiceName, ClaimType: claimType, ClaimTypeLiteral: claimTypeLiteral}
        listForClaimScreen.push(listEntry)
    }
    // for claim screen service dropdown - return the list
    // others use the store

    return listForClaimScreen

    */

}

// support claim for pre read
export async function readAllServicesForClaimType(claimType:string) : Promise<string[]> {

    let baseUrl = localStorage.getItem('baseUrl') ?? ''
    let serviceList : any [] = []

  //  console.log('[read all services for claim type] of: ' + claimType)

    const url = '/readServices'
    const result = await get(baseUrl,url)

     if (result === null || result === undefined) {
 
       return []

    }
    let services = result['data']
    for(var {ServiceName,ClaimType, Cost} of services) { 

        if(ClaimType !== claimType) continue;

        // match claim type
        let service = ServiceName.toString().trim()
        let cost = Cost.toString()
        let obj = {service: service, cost: cost}
        serviceList.push(obj)
    } 

    return serviceList
}


export async function readClaim(claimIdNumber:string) {

      let baseUrl = localStorage.getItem('baseUrl') ?? ''
      const send = `/claim?id=${claimIdNumber}`
      const result = await get(baseUrl, send)
      return result
}



export async function readClaimHistory(customerId:string) {

      let baseUrl = localStorage.getItem('baseUrl') ?? ''
      const send = `/history?id=${customerId}`
      const result = await get(baseUrl, send)
      return result
}

export async function stampAdjustedClaim(adjustmentClaimId:string, 
                      originalClaimId:string, 
                      adjustmentDate:string)
                      
  {

      let baseUrl = localStorage.getItem('baseUrl') ?? ''
      const user = localStorage.getItem('appUser') ?? ''

      const token = localStorage.getItem('Token') ?? ''

      const action = 'stampAdjustedClaim'
      const object = {
                        AdjustmentIdNumber: adjustmentClaimId,
                        ClaimIdNumber: originalClaimId,
                        AdjustedDate: adjustmentDate,
                        AppAdjusting: 'A500',
                        updateuser: user,
                        updateapp: "A500",
                        _csrf:token
                   }

      const result = put(baseUrl, action, object) 
      return result

}


export async function payTheClaim( 
       claimIdNumber:string,
       paymentAmount:string,
       paymentDate:string,
       writeHistoryFlag:string)
 {

      let baseUrl = localStorage.getItem('baseUrl') ?? ''
      debugger
      const token = localStorage.getItem('Token')
      const user = localStorage.getItem('appUser')
      const pay = 'pay'

      const action = 'setClaimStatus'
      const object = {  action: pay,
                        claimIdNumber: claimIdNumber,
                        amount: paymentAmount,
                        date: paymentDate,
                        AppAdjusting: 'A500',
                        updateuser: user,
                        updateapp: "A500",
                        usePaymentHistory: writeHistoryFlag,
                        _csrf:token
                   }
      debugger
      const result = put(baseUrl, action, object)
      // check status code for result
      return result




}

export async function readPaymentHistory(claimIdNumber:string) {

      let baseUrl = localStorage.getItem('baseUrl') ?? ''
      const send = `/readPayments?claimId=${claimIdNumber}`
      const result = await get(baseUrl, send)
      return result
}

/* --------------------------------------------------------- */
/* plans                                                     */
/* ---------------------------------------------------------- */


export async function updatePlan(customerId:string, plan:string, token:string) {

    let baseUrl = localStorage.getItem('baseUrl') ?? ''
    const custId = customerId.trim()
    const action = 'updatePlan'
    const parm = {CustId: custId , CustPlan: plan, _csrf: token }
    const result = put(baseUrl, action, parm)
    return result

}


/* --------------------------------------------------------- */
/* Parameters                                                */
/* ----------------------------------------------------------*/


export async function findParm(parmName:string) {

      let baseUrl = localStorage.getItem('baseUrl') ?? ''
      try { 
        const send = `/findparm?id=${parmName}`
        const result = await get(baseUrl, send)
      //  console.log('find parm result')
      //  console.log(result)
        return result
      } catch {
        console.log("find parm error")
        return 'error'
      }
}


export async function signInAdministrator(admid: string, password: string )

   : Promise<any>

{

      let baseUrl = localStorage.getItem('baseUrl') ?? ''
      const send = 'findAuthlevel?id=' + admid + "&pw=" + password;
      const result = await get(baseUrl, send)
      return result

}

 
/* --------------------------------------------------------- */
/* interface                                                 */
/* ----------------------------------------------------------*/

export async function getAppDestinationData(appDestUrl:string) : Promise<boolean> {

    try {
    // call insurance130 
    // returns true if good result

    /*
     debugger;
           let applicationId = "A45";
           const url: string = this.port + '/api/appdests/' + applicationId;
           return this.http.get<AppDestData>(url, httpOptions);
    } */

    /*
      // trim and to string
      var dest: string  = appDestData['dest'].toString().trim();
      var start: string = appDestData['start'].toString().trim();
      var apps: string  = appDestData['apps'].toString().trim();
    */
 
    // (port:nnnn) in A100Parameter variable

    // set app dest url and port   

    const applicationId = "A45"
    const url = '/api/appdests/' + applicationId  

    let goodResult = false

    await get(appDestUrl, url).then( (r) => {

       // console.log('app dest return '+ r)

        if (r === null || r === undefined) return false
 

       const data = r['data'] 
       const dest = data['dest'] ?? ''  
       const apps = data['apps'] ?? ''  
       const start = data['start'] ?? '' 
 
       localStorage.setItem('priorBaseUrl',dest)
       // alert(`[test0001] set prior base url to ${dest}`)
 
 
       /*---------------------------------------------------*/
       /* server a4server url                               */
       /*---------------------------------------------------*/

       // uncomment when ready to use interface and read env
 

       localStorage.setItem('baseUrl', dest.toString().trim())
       localStorage.setItem('appsLink', apps.toString().trim())
       localStorage.setItem('startLink',start.toString().trim())

       goodResult = true
       return goodResult

       

    }).catch( (e:Error) => {  

        console.log('app dest fails:')
        console.log(e.message)
        console.log(e.stack) 

     })

    return goodResult

    } catch {

        return false

    }

}

export async function getAuthRecord(user:string) {

    /* test url

    http://localhost:5173/?q=7ogolpognpioplpF3CyBt

    */


    /* read auth record a30
    private   getAuthRecord(user:string) : Observable<string> {
    var url: string = this.port + 'getauthrecord?id=' + user;
    this.s("Get auth record call  url is :" + url);
    return this.http.get<string>(url, httpOptions);
    }  */

    /* notfound, or,
        var authData = {user: uid, datetime: dateTime, token: token};
    */
 
    debugger
    let baseUrl = localStorage.getItem('baseUrl') ?? ''
    const url = `getauthrecord?id=${user}`
    const response = await get(baseUrl,url)
    debugger


    if (response === null || response === undefined) return 'notfound'
    const data = response['data']
    const _status = data['status']
 
    if (_status  === 'NotFound') {

        return {status: 'NotFound'}
    }


    const status = 'Found'
    const dateTime = data['datetime']
    const token = data['token']
    const returnObject = {status: status, dateTime: dateTime, token:token}
    return returnObject

}

async function  get(baseUrl:string, url:string) {

     var instance = axios.create({
            baseURL: baseUrl,
            timeout: 4000
        });


        try {
              var res =  await instance.get(url);
              return res;

        } catch (error:any) {

            console.log('axios - error: ' + error.message);

        }

}

async function  post(baseUrl:string, action:string, object:any) {

     var instance = axios.create({
            baseURL: baseUrl,
            timeout: 4000
        });

        const url = `${baseUrl}/${action}`
        //console.log(`post: base url: ${url}`)

        //console.log("body")
        //for(var item in object) {
        //    console.log(` ${item} is ${object[item]}`)
        //}

        try {
             
              var res =  await instance.post(url, object);
              return res;

        } catch (error:any) {

            debugger;
            console.log('axios - error: ' + error.message);

        }

}



async function  put(baseUrl:string, action:string, object:any) {


     var instance = axios.create({
            baseURL: baseUrl,
            timeout: 4000
        });

        const url = `${baseUrl}/${action}`
       // console.log(`put: base url: ${url}`)

    //    console.log("body")
      //  for(var item in object) {
     //       console.log(` ${item} is ${object[item]}`)
      //  }

        try {
              debugger
              var res =  await instance.put(url, object);
              return res;

        } catch (error:any) {

            debugger;
            console.log('axios - error: ' + error.message);

        }

}

 
/* Utility.tsx helper for functions needed inside useEffects */

/* notes:

   update - does not use this it uses state to read customer data
   plan   - uses this

*/

import { readPlans } from "./Database"  

export async function readPlansUtility() : Promise<any> { 
    
    let plans: any [] = []
    let array: any [] =  []
  
     await readPlans().then( (list: any)  => { 

                
                // Id PlanName PlanLiteral Percent 
                for(var {Id, PlanName, PlanLiteral, Percent} of list) { 
    
                    let item = {Id: Id, PlanName: PlanName, PlanLiteral: PlanLiteral, Percent: Percent} 
                    //console.log(`read: ${PlanName}`)
                    plans.push(item) 

                    // set up plan array to hold plan / percents

                    let planArrayObject = {PlanName: PlanName, Percent: Percent}
                    array.push(planArrayObject)

                    let returnObject = {plans: plans, array: array}

                    return returnObject
    
                }  
                debugger

                let returnObject = {plans: plans, array: array}

                return returnObject
                
                
    })  }
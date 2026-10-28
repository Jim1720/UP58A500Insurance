import   {  useEffect, useState } from "react"
import { useNavigate } from "react-router-dom" 
import { listCommentsForAppUsers} from "./Database"
 

export default function AdminCommentList() { 
    
    let displayLineHolder : any [] = [] 

    const [displayLines, setDisplayLines] = useState(displayLineHolder)
 
    let navigate = useNavigate() 

 let lines: any [] = []

 let key = 1

 let commentDetailFirstLine = false

 let summaryLiteral = 'Summary'
 let detailLiteral = "Detail"
 let stampsLiteral = 'Stamps'
 let pinLiteral = "Pin"
    
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

    /* TODO: fill page with container */ 
 
    let divColor = 'black' 
    let messageColor = 'white' 
    let titleColor = 'navajowhite'   
    let headerColor = 'white'
    let detailColor = 'dodgerblue'


    if (lightMode === 'Light') { 
             
         divColor = 'white' 
         messageColor = 'blue' 
         titleColor = 'blue'   
         headerColor = 'blue'
         detailColor = 'black'

    } 
     
    
    let divStyle = { marginLeft: '4%', backgroundColor: divColor}

    let h3Style = {marginTop: '3%', marginLeft: '42%', color: titleColor, fontFamily: 'arial', marginBottom: '1%'} 

 
     let headerStyle = {marginTop: '1%', color: headerColor, fontFamily: 'arial', fontSize:'larger'} 
    
    let detailStyle = {marginTop: '1%', color: detailColor, fontFamily: 'arial', fontSize:'larger'}
           
   

    let filter = localStorage.getItem('userCommentSearchLoaded') ?? ''  
    
   let pinInUse = localStorage.getItem('pinUserId') ?? ''

   let btnStyle = {marginTop: '4%', marginLeft: '5%', fontFamily: 'arial', fontSize:'larger'}
   
   let btnStyleFirst = {marginTop: '4%', marginLeft: '24%', fontFamily: 'arial', fontSize:'larger'}

    

let users : any = []
 

 let onReturn = () => { 

    
    navigate('/admincommentlistprompt')

 }  

 
 let onAdminLists = () => { 

    
    navigate('/adminlistsmenu')

 }  

 
 let onUserPin = () => { 

     localStorage.setItem('pinInUse','')

 }  

let loadData = async () => {
   
await listCommentsForAppUsers(filter).then ( (r:any) => {

  debugger
   
    if(r === undefined) return null 
    
    let data = r['data'] 

    let id = 1 

    /* sort */
    let preSort : any [] = []

    for(const {UserId, DateTime, Comment} of data) {  
            
        let entry = {UserId, DateTime, Comment, id}
        console.log("1. presort " + UserId)
        preSort.push(entry)
    } 
        
    console.log(preSort.length + ' users read')

    preSort.sort( (a,b) => a.UserId.localeCompare(b.UserId)) 

    /* end of sort logic */
 
    for(const {UserId, DateTime, Comment} of preSort) { 

        let uid = UserId.toString().trim()
        
        console.log("1a. sorted " + UserId)

        debugger
 
        console.log(`1 user /${uid}/ filter /${filter}/`)

       // only show filered claim
       // note: for this proc '' means all 
        if(uid !== filter && filter !== '') continue  
        
        console.log(`2 pinId /${pinInUse}/ uid /${uid}/`)

        // only show pinned claim
        if(pinInUse !== '' && uid !== pinInUse) continue  

        let _dateTime = formatDate(DateTime)

        let entry = {UserId, DateTime: _dateTime, Comment}
        users.push(entry)
        id++ 
    } 

    debugger

    formatReport(users)

    //buildScreen(users)

    debugger
    
})

} /* end load data */ 


const formatReport = (users:any) => {

     let lineBreak = ''
     let currentUser = ''
     let last = ''
     let count = 1

     let comments : any [] = []

     debugger

     let final = false

     for(var {UserId, DateTime, Comment} of users) { 
      
         debugger

         console.log(`2. user ${UserId} count ${count}`)

         /* check for break - print buttons */
         lineBreak = 'no'

         let uid = UserId.toString().trim()
         console.log(`userid: ${UserId} last: ${last}`)
         if(uid !== last && last !=='') {
            lineBreak = 'yes' 
         }
         if(count === users.length) {
            final = true 
         } 
         last = uid
         console.log('line break ' + lineBreak)
         console.log('comments length ' + comments.length)
          
         commentDetailFirstLine = true
         if(lineBreak === 'yes') {

            console.log('break write header for ' + currentUser)

            writeUserHeader(currentUser)

            for(var comment of comments) {
                
                console.log('comment written ' + comment)
                writeCommentDetail(comment)
                commentDetailFirstLine = false
            }
            comments = []
            lineBreak = 'no'
            key += 100
         }

        if(lineBreak === 'no') {

             let commentEntry = { DateTime: DateTime, Comment: Comment}
             comments.push(commentEntry)
         }

         
         currentUser = UserId

        
         if(final === true) {
   
             //if(lineBreak === 'yes')
                writeUserHeader(currentUser)  

             for(var comment of comments) {
                
                 console.log('final comment written ' + comment)
                 writeCommentDetail(comment)
                 commentDetailFirstLine = false
             }


         }  

         count++
    }

    setDisplayLines(lines)



}

const writeUserHeader = (UserId: string) => {

       let header1 = 

            <div className="row" key={key+10}>
            
                <div style={headerStyle} className="col-md-2">User</div>  
            </div>;

        let detail1 = 

            <div className="row" key={key+15}> 
                
                <div style={detailStyle} className="col-md-2">{ UserId }</div>  
            </div>;  

          lines.push(header1)
          lines.push(detail1)   

}
const writeCommentDetail = (item:any) => {

      let {DateTime, Comment} = item

      let header1 = 

            <div className="row" key={key+20}>
             
                <div style={headerStyle} className="col-md-2">Date</div>
                <div style={headerStyle} className="col-md-2">Comment</div>
            </div>;

        let detail1 = 

            <div className="row" key={key+25}> 
                   
                <div style={detailStyle} className="col-md-2">{ DateTime }</div>  
                <div style={detailStyle} className="col-md-8">{ Comment }</div> 
            </div>;  

          if(commentDetailFirstLine === true) {
            lines.push(header1)
          }
          lines.push(detail1)   

          key += 10
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

        let userDataLoaded = localStorage.getItem('userCommentSearchLoaded') ?? ''
        if(userDataLoaded !== 'yes') {

            loadData()

            localStorage.setItem('userCommentSearchLoaded','yes')

        }
    }) 


  
    
    const onListsMenu = () => {
 
           // useNavigate
            navigate('/adminlistsmenu')  

    }

    
    const onMainMenu = () => {
 
           // useNavigate
            navigate('/adminmenu')  

    }

    return(<><div style={divStyle} className='container'> 
      
    
        <h3 style={h3Style}> User Comments </h3>  
            
        <div id='center' style={divStyle}> 

            {displayLines}
             
        </div> 

        <div id='buttonLine'> 
            
          <button onClick={onReturn}  style={btnStyleFirst} className='btn btn-primary'>User Select</button> 
          <button onClick={onListsMenu}  style={btnStyle} className='btn btn-primary'>List Menu</button>  
          <button onClick={onMainMenu}  style={btnStyle} className='btn btn-primary'>Menu</button>
        </div>

    </div></>) 
}
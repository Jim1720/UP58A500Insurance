import { useState } from "react"
import { useNavigate } from "react-router-dom"

 
export default function AdminListsMenu() { 


    const [message] = useState('')

let lightmode = localStorage.getItem('lightMode') ?? 'dark'

// dark mode constituents
let navajowhite = 'navajowhite'  
let black = 'black'
let gray = 'gray'
let lightgoldenrodyellow = 'lightgoldenrodyellow'
let yellow = 'yellow'
let white = 'white'
let dodgerblue = 'dodgerblue'
let divblack = 'black'

if(lightmode === 'light') { 

      // dark mode constituents
      navajowhite = 'blue'  
      black = 'white'
      gray = 'dodgerblue'
      lightgoldenrodyellow = 'red'
      yellow = 'green'  
      white = 'blue'
      dodgerblue = 'dodgerblue'
      divblack = 'white'
}


    let navigate = useNavigate()

//const menuMessage = store.adminMenuMessage  // adm menu message





function onCustomerList() {
 
    navigate('/adminbasiccustomerlistprompt')

}


function onUserList() {
 
    navigate('/adminuserlistprompt')

}


function onUserComments() {
 
    navigate('/admincommentlistprompt') // screen link not coded

} 
 

let messageStyle  = { color: 'white', fontFamily: 'arial', marginLeft: '35%', fontSize:'larger', marginTop:'1%'}
 
let btnStyle = {display: 'inline'}

let divStyle =  { backgroundColor:black } 

let imageStyle = {borderRadius: '3%', marginLeft: '26%', marginTop: '2%', marginBottom: '2%'}

let h3Style =  { marginBottom: '2%',  color: navajowhite,  fontFamily: 'Arial', marginLeft: '42%'}
 

let b1first =  { marginLeft: '30%', fontFamily: 'arial', fontSize: 'larger'}

let b1 = {marginLeft : '2%', fontFamily: 'arial', fontSize: 'larger'}
 
return(<div className='container'> 

    <div style={divStyle}>

        <br />

        <h3 style={h3Style}>Administration List Menu</h3>

        <img  style={imageStyle}  src='./images/rock.jpg'  width="60%" height="40%"/>

        <br />
        <br />
        <br />

        <div id="buttons" style={btnStyle}>

            <button style={b1first} onClick={onCustomerList} className="s b1first btn btn-primary">Customer List</button>

            <button style={b1} onClick={onUserList} className="s b1 btn btn-primary">User List</button>

            <button style={b1} onClick={onUserComments} className="s b1 btn btn-primary">User Comments List</button> 
 
            <a style={b1} className="s b1 btn btn-primary" href="/adminmenu">Menu</a>

            <a style={b1} className="s b1 btn btn-primary" href="/adminsignin">Sign Out</a>

        </div>

        <br />

        <div className="mmstyle" id="menumessage">

           <label style={messageStyle}>{message}</label>   

        </div>
        <br />

        <br />
        <br />

        <br />
        <br />

        <br />
        <br />

    </div>

  </div>)

}
 
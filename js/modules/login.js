import app from "../app.js"
import User from "../User.js"
const log =(_=>{
    let user = new User();
    console.log(user)

    const loginButtonEl = document.querySelector(".login-button input")
    console.log(loginButtonEl)

})()
app.listner()
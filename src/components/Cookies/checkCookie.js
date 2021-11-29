import getCookie from "./getCookie";

function checkCookie() {
    const email = getCookie("email");
    if (email !== "") {
     console.log(`Welcome again ${  email}`);
     return true;
    } 
      
      console.log('email cookie is not set')
      return false;
    
  }

  export default checkCookie;


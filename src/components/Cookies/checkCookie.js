import getCookie from "./getCookie";

function checkCookie() {
    const email = getCookie("email");
    if (email !== "") {
     
     return true;
    } 
      
      
      return false;
    
  }

  export default checkCookie;


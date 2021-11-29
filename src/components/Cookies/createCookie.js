function createCookie(email){
    const d = new Date();
    d.setTime(d.getTime() + (1*24*60*60*1000));
    const expires = `expires=${ d.toUTCString()}`;
    document.cookie = `email=${  email  }; ${ expires } ;path=/`;
}

export default createCookie;
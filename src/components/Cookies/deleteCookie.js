function deleteCookie(){
    document.cookie = "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    console.log('cookie deleted');
}
export default deleteCookie;
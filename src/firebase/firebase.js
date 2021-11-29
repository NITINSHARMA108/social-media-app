// Import the functions you need from the SDKs you need

import  {  initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { get, getDatabase, increment, ref, set, update } from "firebase/database";
import { getStorage, uploadBytes } from "firebase/storage";
import { doc, setDoc , getDocs, getDoc, getFirestore, collection, Firestore, updateDoc, query, where, deleteDoc } from "firebase/firestore"; 

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: env.apiKey,
  authDomain: env.authDomain,
  projectId: env.projectId,
  storageBucket: env.storageBucket,
  messagingSenderId: env.messagingSenderId,
  appId: env.appId,
  measurementId: env.measurementId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage();
const db=getFirestore();

async function writeUserData( userdata) {
  const db = getFirestore();
 
  const docRef = doc(db, "user",userdata.email);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    return false;
  } 
    // doc.data() will be undefined in this case
  console.log("No such document!");
  const response =await setDoc(doc(db, "user", userdata.email), 
    userdata);
  return true;
}

async function getTweets(){
  
  const datastore = [];
  const querySnapshot = await getDocs(collection(db, "tweets"));
  // console.log(querySnapshot);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    datastore.push(doc.data());
    // console.log(doc.id, " => ", doc.data());
  });
  // console.log(datastore);
  return datastore;
}

async function postTweets(object){
  // const db = getFirestore()
  const tempdocRef=doc(db,"user",object.useremail);
  const tempDocSnap=await getDoc(tempdocRef);
  if(tempDocSnap.exists())
  {
    const image=tempDocSnap.data().profile;
    const response =await setDoc(doc(db, "tweets", object.postId), {
      postId:object.postId,
      content:object.content,
      img:object.img,
      likes:object.likes,
      comments:object.comment,
      username:object.username,
      useremail:object.useremail,
      image
    });
    return response;
  }
  return null;
 
}

async function getUsers(){
  
  const queryresult= await getDocs(collection(db,"user"));
  const users=[];
  queryresult.forEach((element)=>{
    users.push(element.data());
  })
  console.log(users);
  return users;


}

async function getUser(email){
  const docRef=doc(db,"user",email);
  const docSnap=await getDoc(docRef);
  if(docSnap.exists()){
    return docSnap.data();
  }
 
  return false;
  
}

async function Login (userEmail,password){
  
  const docRef = doc(db, "user",userEmail);
  const docSnap = await getDoc(docRef);
  let response;
  
  if (docSnap.exists()) {
      if(password===docSnap.data().password){
        response=docSnap.data();
      }
      else{
        response=false;
      }
  }
  
  return response;
}

async function addLike(postId){
  // const db = getFirestore();
  const docRef = doc(db, "tweets", postId);
  const docSnap=await getDoc(docRef);
  if(docSnap.exists())
  {
    const like=docSnap.data().likes;
    await updateDoc(docRef, {
      likes:like+1
  });
    

  }
  // console.log(docRef);
  // Set the "capital" field of the city 'DC'
 

}

async function getIndividualTweet(id){
  // const db = getFirestore();
  const docRef = doc(db, "tweets", id);
  const docSnap=await getDoc(docRef);
  if(docSnap.exists())
  {
    return docSnap.data();
  }
  return false;
}

async function addcomment(comment,id,useremail){
  
  const docRef=doc(db,"tweets",id);
  const data=await getDoc(docRef);
  if(data.exists())
  {
    let array=data.data().comments;
    array=[{comment,useremail},...array];
    await updateDoc(docRef,{
      comments:array
    })
  }
  
}

async function getProfilePosts(email){
  const q = query(collection(db, "tweets"), where("useremail", "==", email));
  const querySnapshot = await getDocs(q);
  let data=[];
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    data=[doc.data(),...data];
    console.log(doc.id, " => ", doc.data());
  });
  return data;
}


async function addFollowing(hostemail,useremail){
  console.log(hostemail,useremail);
  const docRef=doc(db,"user",hostemail);
  const docSnap=await getDoc(docRef);
  if(docSnap.exists()){
    let {followingList, following}=docSnap.data();
    followingList=[useremail,...followingList];
    following+=1;
    await updateDoc(docRef,{
      followingList,
      following
    })


  }
}
async function addFollower(useremail,hostemail){
  console.log(useremail);
  const docRef=doc(db,"user",useremail);
  const docSnap=await getDoc(docRef);
  if(docSnap.exists()){
    let {followersList, followers}=docSnap.data();
    followersList=[hostemail,...followersList];
    followers+=1;
    await updateDoc(docRef,{
      followersList,
      followers
    })


  }
}

async function removeFollower(hostemail,useremail){
  const docRef=doc(db,"user",useremail);
  const docSnap=await getDoc(docRef);
  if(docSnap.exists()){
    let {followersList,followers}=docSnap.data();
    followersList=followersList.filter((f)=>f!==hostemail);
    followers-=1;
    await updateDoc(docRef,{
      followersList,followers
    })
  }

}

async function removeFollowing(useremail,hostemail){
  const docRef=doc(db,"user",hostemail);
  const docSnap=await getDoc(docRef);
  if(docSnap.exists()){
    let {followingList,following}=docSnap.data();
    followingList=followingList.filter((f)=>f!==useremail);
    following-=1;
    await updateDoc(docRef,{
      followingList,following
    })
  }

}

async function addAdditionalData(useremail,profile,cover,bio,password){
  const docRef = doc(db,"user",useremail);
  
  if(password!=='')
  {
    await updateDoc(docRef,{
      profile,
      cover,
      bio,
      password

    })
  }
 
  else
  {
    await updateDoc(docRef,{
      profile,
      cover,
      bio
    })
  }

}

async function addBookmark(useremail,postId){
  const docRef=doc(db,"user",useremail);
  const docSnap=await getDoc(docRef);
  if(docSnap.exists()){
    let {bookmarks}=docSnap.data();
    bookmarks=[postId,...bookmarks];
    await updateDoc(docRef,{
      bookmarks
    })

    
  }
  return true;


}
async function getBookmarkList(x){
  const docRef=doc(db,"user",x);
  const docSnap=await getDoc(docRef);
  return docSnap.data().bookmarks;
}

async function getBookmarks(email){
  const docRef=doc(db,"user",email);
  const docSnap=await getDoc(docRef);
  let posts;
  if(docSnap.exists())
  {
    posts=docSnap.data().bookmarks;
  }
  // console.log(posts);
  let postData=[];
  const tweetRef=collection(db,"tweets");
  if(posts.length>0){
    const que = query(tweetRef, where('postId', 'in', posts));
    const response=await getDocs(que);
    // console.log(response);
    
    response.forEach((e)=>{
      postData=[...postData,e.data()];

    })
    // console.log(postData);
    return postData;
  }
  
  return [];


}

async function follower(useremail){
  const docRef=doc(db,"user",useremail);
  const docSnap=await getDoc(docRef);
  if(docSnap.exists())
  {
    
    return docSnap.data().followersList;
  }
  
    return [];
}
async function followingfunc(useremail){
  const docRef=doc(db,"user",useremail);
  const docSnap=await getDoc(docRef);
  if(docSnap.exists())
  {
    return docSnap.data().followingList;
  }
  return [];
}

async function deleteTweet(postId){
  const docRef=doc(db,"tweets",postId);
  let error=false;
  await deleteDoc(docRef).catch((err)=>{error=true})
  if(error)
  {
    return false;
  }
  
  return true;
  

}

async function removeBookmark(postId,useremail){
  const docRef=doc(db,"user",useremail);
  let error=false;
  const docSnap=await getDoc(docRef).catch((err)=>{error=true})
  if(error){
    return false;
  }
  if(docSnap.exists())
  {
    let {bookmarks}=docSnap.data();
    bookmarks=bookmarks.filter((id)=>id!==postId);
    await updateDoc(docRef,{
      bookmarks
    }).catch((err)=>{error=true})
    if(error)
    {
      return false;
    }

  }
  return true;
}

export { writeUserData, getTweets, Login, storage, ref, uploadBytes, postTweets, getUsers, addLike, getIndividualTweet, addcomment, getUser, getProfilePosts, addFollower, addFollowing, removeFollower, removeFollowing, addAdditionalData, addBookmark, getBookmarks,follower,followingfunc, deleteTweet, removeBookmark, getBookmarkList};
import React from 'react';
import { BrowserRouter, Route,Routes } from 'react-router-dom';
import Home from './components/Home';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Profile from './components/Profile';
import './App.css';
import Sidenav from './components/Sidenav';
import Right from './components/Right';
import Edit from './components/Edit';
import Saved from './components/Saved';
import Tweet from './components/Tweet';
import ShowFollowers from './components/showFollowers';
import ShowFollowing from './components/showFollowing';
import NotHost from './components/NotHost';

const App = function() {
  return (
    <BrowserRouter>
      
    <Routes>
      <Route exact path="/signup" element={ <SignUp />} />
      <Route exact path="/signin" element={<SignIn/>} />
      <Route exact path="/" element={<Home />} />
      <Route exact path="/profile"element={<Profile name="Nitin" followers="20" following="40" email="biyalanitin786@gmail.com" posts={[]} />} />
      <Route exact path="/saved" element={<Saved />} />
      <Route exact path="/edit" element={<Edit />} />
      <Route exact path="/post/:id" element={<Tweet />} />
      <Route exact path="/showFollowers" element={<ShowFollowers />} />
      <Route exact path="/showFollowing" element={<ShowFollowing />} />
      <Route exact path="/profile/:id" element={<NotHost/>} />
        
  
      
    </Routes>
    
    </BrowserRouter>
   
      
  );
}

export default App;

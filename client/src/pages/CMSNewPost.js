import React from 'react'
import Navbar from '../components/cms/CMSNavbar';
import CMSCreatePost from '../components/cms/CMSCreatePost';
import Footer from '../components/Footer';

function CMSNewPost(props) {
  const {user, setUser} = props;

  return (
    <div className='flex flex-col h-screen'>
      <Navbar user={user} setUser={setUser} />
      <CMSCreatePost />
      <Footer/>
    </div>
  )
}

export default CMSNewPost
import React from 'react'
import {AiOutlineGithub} from 'react-icons/ai'

function Footer() {
  return (
    <footer className='p-3 flex justify-center items-center gap-2'>
      <span>Made by Jylx</span>
      <a href="https://github.com/jylx-x/blog-express"><AiOutlineGithub size={24}/></a>
    </footer>
  )
}

export default Footer
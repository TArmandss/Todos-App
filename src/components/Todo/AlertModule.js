import React from 'react'
import '../Todo/AlertModule.css'
import { AiOutlineClose } from 'react-icons/ai';

export default function AlertModule(props) {
  return (
    <div>
        <div className= 'backdrop'onClick={props.onConfirm}></div>
          <div className="box-module">
          <button className='close-modal' onClick={props.onConfirm}><AiOutlineClose/></button>
            <div className="content">
              <h1>{props.title}</h1>
              <h4>{props.message}</h4>
            </div>
          </div>
    </div>
  )
}

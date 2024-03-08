import React,{useState} from 'react'
import './APIQuotes.css'
import { IoIosArrowForward } from 'react-icons/io';
import { IoIosArrowBack } from 'react-icons/io';

function APIQuotes() {

    const [quote , setQuote]=useState("The happiness of most people is not ruined by great catastrophes or fatal errors, but by the repetition of slowly destructive little things.")
    let category = 'happiness'
    let urlKey = 'JJ3d64qmPPGacD+rkqr8fA==gBneYmbudOFuNJZ8'
    const url = 'https://api.api-ninjas.com/v1/quotes?category=' + category;
  
    const API_CALL = ()=>{
      
      fetch(url,{
        headers:{
            "X-API-KEY": urlKey
        }
    })
    .then(response => response.json())
    .then(data =>{
      data.forEach(data =>{
        setQuote(data['quote'])
      })
  })
    .catch(error => {
        console.error("Request failed:", error)
    })
    }

  return (
    <div className='box'>
           <div className="left-arrow" onClick={API_CALL}>
           <IoIosArrowBack/>
           </div>
           <div className="quotes">
            <div className="pic"></div>
            <p><strong>" </strong>{quote}<strong> "</strong></p></div>
           <div className="right-arrow" onClick={API_CALL}>
           <IoIosArrowForward/>
           </div>
    </div>
  )
}

export default APIQuotes
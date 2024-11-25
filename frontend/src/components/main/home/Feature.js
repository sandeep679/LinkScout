import React from 'react';
import '../styles/Feature.css'
import short from '../../../assests/short-card.png'
import qr from '../../../assests/qr-code-card.png'


function Feature() {
  const card =[
    { id:1,
      title:'URL Shortener',
      info:'A comprehensive solution to help make every point of connection between your content and your audience more powerful.',
      img: short,
    },
    { id:2,
      title:'QR Codes',
      info:'QR Code solutions for every customer, business and brand experience.',
      img: qr,
    },
    { id:3,
      title:'Analytics',
      info:'View Analytics for each links with Charts , Country wise visits and much more..',
      img: qr,
    },
  ]

  return (
    <div className='feature'>
        <div className='feature-head'>
            <h1>The LinkScout Platform</h1>
            <p>Use our URL shortener, QR Codes, and analytics to engage your audience and connect them to the right information. Build, edit, and track it all in the LinkScout Platform.</p>
        </div>
        
        <div className="card-container">

        {card.map(({id,title,info,img})=>{
          return (
            <div className="card" key={id}>
              <img src={img} alt={title} className="card-image"/>
              <h3>{title}</h3>
              <p>{info}</p>
          </div>
          )
        })}
          
        </div>
        
    </div>
  )
}

export default Feature
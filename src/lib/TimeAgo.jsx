import React from 'react'
import ReactTimeAgo from 'react-time-ago'
 
export default function TimeAgo({ date }) {
  return (
    <div>
        {console.log(date)}
        <ReactTimeAgo date={date}/>
    </div>
  )
}
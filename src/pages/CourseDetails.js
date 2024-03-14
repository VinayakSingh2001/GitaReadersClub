import React from 'react'
import { useParams } from 'react-router-dom'

export default function CourseDetails({courses}) {
    const {id} = useParams();
    console.log(id);
    console.log(courses[id]);
  return (
    <div>
      
      {courses[id].desc}
    </div>
  )
}

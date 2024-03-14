import React from 'react';
import Wrapper from '../components/Wrapper'

const CourseDetails = () => {
  // Mock data for demonstration purposes

  const courseData = {
    title: 'Converting Stress to Smile',
    description: 'Embark on a journey to transform stress into smiles with our course, offering practical tools and timeless wisdom to cultivate resilience, inner peace, and radiant joy',
    topics: ['Understanding Stress: Explore the root causes and effects of stress in our daily lives, and how it impacts our physical, mental, and emotional well-being.', 'Mindful Awareness: Learn the practice of mindfulness to cultivate present-moment awareness and reduce the grip of stress on your mind', 'Gratitude and Satisfaction: Discover the power of gratitude and contentment in fostering resilience and a positive outlook on life ','Empathy and Connection: Explore the importance of empathy and connection in nurturing relationships and building a supportive community.',
   'Self-Care and Wellness Practices: Develop a personalized self-care routine that nourishes your body, mind, and spirit, promoting overall well-being.',
   'Cultivating Joy and Excitement: Unlock the secrets to embracing life with childlike wonder and enthusiasm, even amidst challenges.',
    'Balancing Work and Life: Learn strategies for finding balance in the midst of the modern "rat race," prioritizing self-care and fulfillment.',
    'Creating Lasting Change: Develop strategies for integrating these practices into your daily life for sustained happiness and resilience.',
   "Whether you're feeling overwhelmed by the demands of daily life or simply seeking to enhance your overall well-being, this course offers practical tools and insights to help you thrive in the midst of lifes challenges.", 'Join us on a journey of transformation as we convert stress into smiles and embrace holistic wellness in the modern age.'],
    outcomes: ['Outcome 1', 'Outcome 2', 'Outcome 3'],
    speaker: { name: 'Speaker 1', photo: 'speaker1.jpg' },
    status: 'ongoing', // or 'upcoming'
    image: 'https://images.squarespace-cdn.com/content/v1/656b5dff54775d2229594396/241ba205-fa4d-44a4-80b6-fb214347d946/Thinkgita+Post+A.jpgour_image_url.jpg',
  };


  // Generic blob image URL
  const blobImage = 'blob_placeholder.jpg';

  return (
    <div className="bg-gradient-to-br from-purple-700 to-indigo-800 text-white">
     
          <Wrapper className=' py-20'>
<div className='flex gap-20 '>
<div className="w-[60%] py-10">
          <img
            src={courseData.image}
            alt="Course"
            className=" rounded-lg "
          />
          </div>
         
          {/* Course Details */}
          <div className='w-[60%]'> 
            <h1 className="text-4xl font-extrabold mb-4 text-yellow-300 transition duration-300">{courseData.title}</h1>

            <p className="text-base mb-4">{courseData.description}</p>

            {/* Topics */}
            <div className="mb-4">
              <p className="text-2xl font-extrabold mb-4 text-yellow-300 transition duration-300">Topics:</p>
              <ul className="list-disc  ">
                {courseData.topics.map((topic, index) => (
                  <li key={index}>{topic}</li>
                ))}
              </ul>
            </div>
          </div>

</div>
          


          <div>
             {/* Outcomes */}
             <div className="mb-4">
              <p className="font-bold mb-2 text-lg">Outcomes:</p>
              <ul className="list-disc ml-4">
                {courseData.outcomes.map((outcome, index) => (
                  <li key={index}>{outcome}</li>
                ))}
              </ul>
            </div>

            {/* Speaker Section */}
            <div className="mb-4">
              <p className="font-bold mb-2 text-lg">Speaker:</p>
              <div className="flex items-center">
                <img
                  src={courseData.speaker.photo || blobImage}
                  alt={courseData.speaker.name}
                  className="w-12 h-12 rounded-full mr-2"
                />
                <p>{courseData.speaker.name}</p>
              </div>
            </div>

            {/* Enroll Button */}
            <div>
              {courseData.status === 'ongoing' ? (
                <button className="bg-green-500 text-white px-4 py-2 rounded-md">
                  Enroll Now
                </button>
              ) : (
                <p className="text-gray-500">Coming Soon</p>
              )}
            </div>
          </div>
          </Wrapper>
          {/* Course Image */}
          
        
      
    </div>
  );
};

export default CourseDetails;

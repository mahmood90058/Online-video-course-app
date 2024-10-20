// step-7

const MASTER_URL="https://ap-south-1.cdn.hygraph.com/content/"+process.env.NEXT_PUBLIC_HYGRAPH_API_KEY+"/master"


import { gql,request} from 'graphql-request'




const getCourseList=async()=>{
    const query=gql`
    query MyQuery {
  courseLists {
    createdAt
    name
    free
    banner {
      url
    }
    description
    chapter {
      ... on Chapter {
        id
        name
        shortDesc
       
        
      }
    }
    auther
    slug
  }
}
    
    `

    const result= await request(MASTER_URL,query);
    return result;
}


const getSideBanner=async()=>{
  const query=gql`

  query GetsideBanner {
  sideBanners {
    id
    name
    banner {
      url
    }
  }
}
  
  
  `

  const result= await request(MASTER_URL,query);
    return result;

}
const getCourseById=async(courseid)=>{
  const query=gql`

  query MyQuery {
  courseLists(where: {slug: "`+courseid+`"}) {
    id
    name
    auther
    chapter {
      ... on Chapter {
        id
        name
        youtubeurl
        shortDesc
      }
    }
    totalChapters
    free
    description
    tags
    slug
  }
}
  
  `

  const result= await request(MASTER_URL,query);
    return result;

}



// enroll to course api

const enrollToCourse=async(courseId, email)=>{
  const query=gql`

  mutation MyMutation {
  createUserEnrollCourse(
    data: {courseId: "`+courseId+`", userEmail: "`+email+`", courseList: {connect: {slug: "`+courseId+`"}}}
  ) {
    id
    
  }

   publishManyUserEnrollCoursesConnection {
    edges {
      node {
        id
      }
    }
  }

  
}


  
  
  `

  
  const result= await request(MASTER_URL,query);
    return result;
}



// this step is after enrolling course
// to check user already enrolled in course or not

const checkUserEnrolledCourse=async(courseId,email)=>{
  const query=gql`

  query MyQuery {
  userEnrollCourses(where: {courseId: "`+courseId+`", userEmail: "`+email+`"}) {
    id
  }
}
  
  
  
  
  `

  const result= await request(MASTER_URL,query);
    return result;
}



const getUserEnrolledCourse=async(id,email)=>{
  const query=gql`

  query MyQuery {
  userEnrollCourses(where: {id: "`+id+`", userEmail: "`+email+`"}) {
    courseId
    id
    userEmail
    
  
    completedChapter {
      ... on CompletedChapter {
        id
        chapterId
      }
    }
 
    courseList {
      auther
      banner {
        url
      }
      chapter {
        ... on Chapter {
          id
          name
          youtubeurl
          shortDesc
         
        }
      }
      description
      free
      id
      name
      slug
      sourceCode
      totalChapters
    }
  }
}
  
  
  
  
  `

  const result= await request(MASTER_URL,query);
    return result;
}

const markCompletedChapter=async(enrollId,chapterId)=>{
  const query=gql`
  mutation MyMutation {
  updateUserEnrollCourse(
    data: {completedChapter: {create: {CompletedChapter: {data: {chapterId: "`+chapterId+`"}}}}}
    where: {id: "`+enrollId+`"}
  ) {
    id
  }
  publishUserEnrollCourse(where: {id: "`+enrollId+`"}) {
    id
  }
}
 
  
  
  
  `

  const result= await request(MASTER_URL,query);
    return result;
}



// for progress bar dashboard


const getUserAllEnrolledCourseList=async(email)=>{
  const query=gql`
  query MyQuery {
  userEnrollCourses(where: {userEmail: "`+email+`"}) {
    completedChapter {
      ... on CompletedChapter {
        id
        chapterId
      }
    }
    courseId
    courseList {
      id
      name
      totalChapters
      slug
      free
      description
      chapter {
        ... on Chapter {
          id
          name
        }
      }
      auther
      banner {
        url
      }
    }
  }
}
 
  
  
  
  `

  const result= await request(MASTER_URL,query);
    return result;
}

const addNewMember=async(email,paymentId)=>{
  const query=gql`

  mutation MyMutation {
  createMembership(data: {active: true, email: "`+email+`", paymentId: "`+paymentId+`"}) {
    id
  }
      publishManyMemberships(to: PUBLISHED) {
    count
  }
}
 
  
  
  
  `

  const result= await request(MASTER_URL,query);
    return result;
}




const checkForMembersShips=async(email)=>{
  
  const query =gql`

  query MyQuery {
  memberships(where: {email: "`+email+`"}) {
    email
    id
    paymentId
    createdAt
  }
}
  
  
  `

  const result= await request(MASTER_URL,query);
    return result;
}


export default{
    getCourseList,
    getSideBanner,
    getCourseById,
    enrollToCourse,
    checkUserEnrolledCourse,
    getUserEnrolledCourse,
    markCompletedChapter,
    getUserAllEnrolledCourseList,
    addNewMember,
    checkForMembersShips
}
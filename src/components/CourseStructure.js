import React,{useState,useEffect} from 'react';

import ReactPlayer from 'react-player';


function CourseStructure(props) {
    //console.log(props)
    const courseName= props.match.params.coursename;
    const [courses,setCourses]=useState([])

    const [vid,uid]= useState("")
    const [title,utit]= useState("")
    

    useEffect( ()=>{
      const playlist = courseName==="reactjs"?'PLB97yPrFwo5j60AxzdZVC3dOJvJy4Oxkp':'PLwGdqUZWnOp00IbeN0OtL9dmnasipZ9x8';
      const playlist_api=`https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails%2Csnippet&maxResults=40&playlistId=${playlist}&key=AIzaSyArDhBUqhMz9lc3oJXCU7w5t1qaT0WhS4s`
      
      async function fetchData(){
      let data = await fetch(playlist_api)
      data= await data.json()
      let result = data.items.map(item=>{
      return {title:item.snippet.title,v_id:item.contentDetails.videoId}
      })
      console.log(result);
      setCourses(result)
      uid(result[0].v_id)
      utit(result[0].title)
    }
 fetchData();
    },[])

const [counter,setCounter]=useState(0)
const watched=(vid)=>{
  if(localStorage.getItem('saveID')){
      if(JSON.parse(localStorage.getItem('saveID')).includes(vid))
      return true
  }
  return false
}
const renderVedios =()=>{
    return(
      <>
      <h1>{title}</h1>
    <div className="player-wrapper">
        {/*<iframe width="853" height="480" src={`//www.youtube.com/embed/${vid}?rel=0`} frameBorder="0" allowFullScreen></iframe>*/}
      
        <ReactPlayer
          className='react-player'
          url={`https://www.youtube.com/watch?v=${vid}`}
          width='100%'
          height='100%'
          controls={true}
          onEnded={()=>{
            if( localStorage.getItem('saveID')){
              let data=JSON.parse(localStorage.getItem('saveID'))
              localStorage.setItem('saveID',JSON.stringify([...data,vid]))
            }
            else{
              localStorage.setItem('saveID',JSON.stringify([vid]))
            }
          }}
        />
      
      </div>
    </>
    ) 
}

  return (
    <> 
    {courses.length>0 ?
  <div >
  <h1>welcome to {courseName}</h1>

{renderVedios()}
<ul className="collection">
  {courses.map((item,index)=>{
    return <li to="#!" 
       className={counter==index?"collection-item myitem":"collection-item" }onClick={()=>{
      uid(item.v_id)
      utit(item.title)
      setCounter(index)
    }}>{item.title} 
     {watched(item.v_id) && <i className="small material-icons " >check</i>}

    </li>
  })}
</ul>
</div> : 
<h1>Loading...</h1> 
  }
    
    </>
  );
}

export default CourseStructure;

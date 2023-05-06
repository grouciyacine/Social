import Post from "../post/Post";
import "../posts/posts.scss";
import {useQuery} from '@tanstack/react-query'
import { makeRequest } from "../../axios";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
const LocalPosts = ({userId}) => {
  const { currentUser } = useContext(AuthContext);
console.log(userId+'current user:'+currentUser)

  const {isLoading,error,data}=useQuery(['posts'],()=>
  makeRequest.get("/post?userId="+userId).then((res)=>{
    return res.data;
  })
  //useQuery here name is posts
  )


  return <div className="posts">
    {error?"somthing wrongs": (isLoading? "loading": data.map(post=>(
      <Post post={post} key={post.id}/>
    )))}
  </div>;
};

export default LocalPosts;
//1h:03
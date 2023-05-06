import Post from "../post/Post";
import "./posts.scss";
import {useQuery} from '@tanstack/react-query'
import { makeRequest } from "../../axios";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
const Posts = ({userId}) => {
  const { currentUser } = useContext(AuthContext);
console.log(userId+'current user:'+currentUser)

  const {isLoading,error,data}=useQuery(['posts'],()=>
  makeRequest.get("/post/all?userId="+currentUser.id).then((res)=>{
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

export default Posts;
//1h:03
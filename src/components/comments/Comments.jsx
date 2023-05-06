import { useContext } from "react";
import "./comments.scss";
import { AuthContext } from "../../context/authContext";
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import {makeRequest} from '../../axios'
import moment from 'moment'
import { useState } from "react";
const Comments = ({postId}) => {
  const [desc,setDesc]=useState()
  const { currentUser } = useContext(AuthContext);
  const {isLoading,error,data}=useQuery(['comments'],()=>
    makeRequest.get('/comments?postid='+postId).then((res)=>{
      return res.data;
    })
  )
  const queryClient=useQueryClient()
//mutation is function for add desc,img
const mutation=useMutation((newComment)=>{
return makeRequest.post("/comments",newComment);
},
{onSuccess:()=>{
queryClient.invalidateQueries(["comments"])
}}
)
const handleClick=async(e)=>{
  e.preventDefault();
  mutation.mutate({desc,posid:postId})
  setDesc("")

}

  return (
    <div className="comments">
      <div className="write">
        <img src={currentUser.profilepi} alt="" />
        <input type="text" placeholder="write a comment" value={desc} onChange={(e)=>setDesc(e.target.value)}/>
        <button onClick={handleClick}>Send</button>
      </div>
      {isLoading? 'Loading': data.map((comment) => (
        <div className="comment">
          <img src={comment.profilepi} alt="" />
          <div className="info">
            <span>{comment.name}</span>
            <p>{comment.description}</p>
          </div>
          <span className="date">{moment(comment.creatat).fromNow()}</span>
        </div>
      ))}
    </div>
  );
};

export default Comments;

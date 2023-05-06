import "./profile.scss";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts"
import { makeRequest } from "../../axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { useState } from "react";
import Update from "../../components/update/Update";
import LocalPosts from "../../components/localPo/localPosts";

const Profile = () => {
  const [openUpdate,setOpenUpdate]=useState(false)
  const {currentUser}=useContext(AuthContext)
  const userId= parseInt(useLocation().pathname.split('/')[2])
  const {isLoading,error,data}=useQuery(["user"],()=>
  makeRequest.get("/users/find/"+userId).then((res)=>{
    return res.data
  })
)
const {isLoading:risLoading,data:relationshipData}=useQuery(["relationship"],()=>
makeRequest.get("/relationships?followedUserId="+userId).then((res)=>{
  return res.data
})
)
const queryClient=useQueryClient()
//mutation is function for add desc,img
const mutation=useMutation((following)=>{
  if(following) return makeRequest.delete("/relationships?userId="+userId);
  return makeRequest.post('/relationships',{userId})
},
{onSuccess:()=>{
queryClient.invalidateQueries(["relationship"])
}}
)

console.log(relationshipData)
const handleFollow=()=>{
mutation.mutate(relationshipData?.includes(currentUser.id))
}

  return (

  
    <div className="profile">
      {isLoading?'is loading':<>
      <div className="images">
        <img
          src={'/upload/'+data?.coverpi}
          alt=""
          className="cover"
        />
        <img
          src={'/upload/'+data?.profilepi}
          alt=""
          className="profilePic"
        />
      </div>
      <div className="profileContainer">
        <div className="uInfo">
          <div className="left">
            <a href="http://facebook.com">
              <FacebookTwoToneIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <InstagramIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <TwitterIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <LinkedInIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <PinterestIcon fontSize="large" />
            </a>
          </div>
          <div className="center">
            <span>{data?.name}</span>
            <div className="info">
              <div className="item">
                <PlaceIcon />
                <span>{data?.cityname}</span>
              </div>
              <div className="item">
                <LanguageIcon />
                <span>{data?.website}</span>
              </div>
            </div>
            {risLoading ? "loading" : userId===currentUser.id?(<button onClick={()=>setOpenUpdate(true)}>Update</button>) :(<button onClick={handleFollow}>{relationshipData.includes(currentUser.id)?'Following':"Follow"}</button>)}
            
          </div>
          <div className="right">
            <EmailOutlinedIcon />
            <MoreVertIcon />
          </div>
        </div>
      <LocalPosts userId={userId}/>
      </div>
      </>
      }
      {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data}/> }
    </div>
  );
};

export default Profile;
//2h:03
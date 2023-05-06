import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { useContext, useState } from 'react'
import { makeRequest } from '../../axios'
import { AuthContext } from '../../context/authContext'
import './update.scss'
const Update = ({setOpenUpdate,user}) => {
  const[cover,setCover]=useState(null)
  const [profile,setProfile]=useState(null)
  const [texts,setTexts]=useState({
    name:"",
    city:"",
    website:""
  })

  const upload=async(file)=>{
    try{
  const formData=new FormData();
  formData.append('file',file)
  const res=await makeRequest.post("/upload",formData) 
  return res.data;
    }catch(err){
  console.log(err)
    }
  }

const {currentUser} = useContext(AuthContext)
const queryClient=useQueryClient()
//mutation is function for add desc,img
const mutation=useMutation((user)=>{
return makeRequest.put("/users",user);
},
{onSuccess:()=>{
queryClient.invalidateQueries(["user"])
}}
)

const handleClick=async(e)=>{
  e.preventDefault();
  
  let coverUrl
  let profilepi
  coverUrl=cover ? await upload(cover) :user.coverpi
  profilepi=profile ? await upload(profile) : user.profilepi
  mutation.mutate({...texts,coverPic:coverUrl,profilePic:profilepi})
setOpenUpdate(false)
}

  const handleChange=(e)=>{
setTexts((prev)=>({...prev,[e.target.name]:[e.target.value]}))
  }
console.log(cover)
  return (
    <div className='update'>Update
    <input type='file' onChange={e=>setCover(e.target.files[0])}/>
    <input type='file' onChange={e=>setProfile(e.target.files[0])}/>
    <input type='text' name='name' onChange={handleChange}/>
    <input type='text' name='city' onChange={handleChange}/>
    <input type='text' name='website' onChange={handleChange}/>
    <button onClick={handleClick}>Update</button>
    <button onClick={()=>setOpenUpdate(false)}>X</button>
    </div>
  )
}

export default Update
//2h:32m
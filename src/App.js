import React from 'react'
import {useGetAllPostQuery,useGetPostByIdQuery,useGetPostByLimitQuery,useDeletePostMutation, 
          useCreatePostMutation, useUpdatePostMutation} from './services/post'
import './App.css'

const App = () => {


  const res = useGetAllPostQuery()
  const res2 = useGetPostByLimitQuery(5)
  const res_id = useGetPostByIdQuery(11)
  const [delete_post,res_info] = useDeletePostMutation()
  const [create_post,res_info2] = useCreatePostMutation()
  const [update_post,res_info3] = useUpdatePostMutation()


  const newPost = { 
    title: 'foo',
    body: 'bar',
    userId: 1
  }

  const updatePost = { 
    id: 1,
    title: 'Update foo',
    body: 'Update bar',
    userId: 1
  }


  const deletehandler=(id)=>{
    delete_post(id);
    res_info.isSuccess?alert('Your Post is Deleted!!'):alert('Sorry Unable to delete post')
  }

  const createHandler=(post)=>{
    create_post(post);
    res_info2.isSuccess?alert('Your Post is Created!!'):alert('Sorry Unable to create post')
  }
  const updateHandler=(post)=>{
    update_post(post);
    res_info3.isSuccess?alert('Your Post is Updated!!'):alert('Sorry Unable to update post')
  }

  return (
    <>
      <div className="App">
        <h1>Redux Toolkit - RTK Query (Get All Data) </h1>

        {
          res_id.isLoading?<h1>Loading....</h1>:<div><h1>{res_id.data.id}. {res_id.data.title}</h1>
          <p>{res_id.data.body}</p></div>
        }

        {
          res2.isLoading?<h1>Loading....</h1>:
          res2.data.map((post)=>{
            return(
              <div key={post.id}>
                <h1>{post.id}.  {post.title}</h1>
                <p>{post.body}</p>
                <button onClick={()=>{createHandler(newPost)}}>Add</button>
                <button onClick={()=>{updateHandler(updatePost)}}>Update</button>
                <button onClick={()=>{deletehandler(post.id)}}>Delete</button>
                <hr/>
            </div>
            )
          })
        }
      </div>
    </>
  )
}

export default App

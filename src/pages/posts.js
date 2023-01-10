import React, { useContext, useEffect, useState, useRef } from 'react'
import { UserContext } from '../context/usercontent';
import { useNavigate } from 'react-router-dom';



export default function Posts() {

  const navigate = useNavigate()

  const { user } = useContext(UserContext);
  const [currentPosts, setCurrentPosts] = useState([]);
  const [activeLinkIndex, setActiveLinkIndex] = useState([]);
  const [activeIndex, setActiveIndex] = useState();
  const [Comments, setComments] = useState([]);
  const [CurrentComments, setCurrentComments] = useState([]);

  const userlocal = JSON.parse(localStorage.getItem('onlineUser'));
  const userId = userlocal.id

  useEffect(() => {
    const fetchPost = async () => {
      const data = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
      const Posts = await data.json();
      setCurrentPosts(Posts)
      for (let i = 0; i < Posts.length; i++) {
        const dataCom = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${Posts[i].id}`)
        const Comments = await dataCom.json();
        setComments(oldArray => [...oldArray, Comments])
      }
    }

    fetchPost();



  }, [user])

  const showComments = (i) => {
    console.log(i)
    setCurrentComments(Comments[i])
    console.log(CurrentComments)
  }

  const setTwo = (i) => {
    showComments(i)
    setActiveIndex(i)

  }


  return (
    <section className='section'>
      <h1>Posts page:</h1>
      {currentPosts.map((post, i) => {
        return (
          <div key={post.id} className="section">
            <ul type="text" />
            <li className={activeLinkIndex.includes(i) ? 'postBold' : ''}>
              Post title: {post.title}
            </li>
            <br />
            <li>
              Post body: {post.body}
              <br />
            </li>

            {activeIndex === i ? <div>{CurrentComments.map((comment) => { return <div><p className='albumName'>{comment.name}</p></div> })}</div> : ''}


            <button className='btn' onClick={() => setTwo(i)} >Show comments</button>
            <button className='btn' onClick={() => setActiveLinkIndex(oldArray => [...oldArray, i])} >Bold</button>
          </div>
        )
      })}


    </section>
  )
}
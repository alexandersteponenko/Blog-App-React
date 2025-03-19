import { useState, useEffect } from 'react';
import { getPosts, addPost, deletePost } from './api/post';
import { normalizedPosts } from './utils/normalized-posts';
import { v4 as uuidv4 } from 'uuid';
import Post from './components/Post/Post';
import Header from './components/Heading/Header';
import './App.css'

function App() {
  const [postsIds, setPostsIds] = useState([]);
  const [postsById, setPostsById] = useState({});
  const [isPostsLoading, setPostsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [postTitle, setPostTitle] = useState('');
  const [postText, setPostText] = useState('');
  const [titleError, setTitleError] = useState('');
  const [textError, setTextError] = useState('');

  useEffect(() => {
    setIsError(false);
    setPostsLoading(true);

    getPosts()
      .then(posts => {
        const [ids, byIds] = normalizedPosts(posts);
        setPostsLoading(false);
        setPostsIds(ids);
        setPostsById(byIds);
      })
      .catch(() => {
        setIsError(true);
        setPostsLoading(false);
      });
  }, []);

  function handleInputPostTitle(event) {
    const value = event.target.value;
    if (value.length <= 100) {
      setPostTitle(value);
      setTitleError('');
    } else {
      setTitleError('Заголовок больше 100 символов');
    }
  }

  function handleInputPostText(event) {
    const value = event.target.value;
    if (value.length <= 200) {
      setPostText(value);
      setTextError(''); 
    } else {
      setTextError('Пост больше 200 символов');
    }
  }

  function handleAddPostBtn() {
    if (postTitle.trim() === '' || postText.trim() === '' || titleError || textError) {
      return; 
    }

    const id = uuidv4();
    const currentDate = new Date();
    const dt = `${currentDate.toLocaleDateString()} - ${currentDate.toLocaleTimeString()}`;
    const post = {
      id,
      dt,
      title: postTitle,
      body: postText,
    };

    setPostsById({
      ...postsById,
      [post.id]: post,
    });

    setPostsIds([post.id, ...postsIds]);

    addPost(post);

    setPostTitle('');
    setPostText('');
  }

  function handleDeletPost(id) {
    setPostsIds(postsIds.filter(postId => postId !== id));
    deletePost(id);
  }

  return (
    <>
      <div className='container'>
          <Header />
           
           <div className='posts__wrapper'>
              <div className='posts__col'>
                 <h2>Новый пост</h2>
          
               <div className='posts__form'>
                <input
                    className='posts__title-input'
                    type='text'
                    placeholder='Заголовок'
                    value={postTitle}
                    onChange={handleInputPostTitle} />
                    {titleError && <p className='post__message-error'>{titleError}</p>} 

                <textarea
                    className='posts__text-input'
                    type='text'
                    placeholder='Напиши пост'
                    value={postText}
                    onChange={handleInputPostText}>
                </textarea>
                   {textError && <p className='post__message-error'>{textError}</p>} 
                   
                  <button onClick={handleAddPostBtn} className='addPostBtn'>Опубликовать</button>
               </div>
            </div>

              <div className='posts__col'>
                 <h2>Лента</h2>
                   
                {isError && <p className='posts__error'>Произошла ошибка</p>}
                {isPostsLoading && <p className='posts__posts'>Тут пока пусто...</p>}
                
                 <div className='posts__message'>
                 {postsIds && postsIds.map(id => (
                  <div className='posts' key={id}>
                    <Post
                    post={postsById[id]}
                    onDelete={() => handleDeletPost(id)} />
                  </div>
                ))}
                 </div>
              </div> 
           </div>
      </div>
    </>
  );
}

export default App;


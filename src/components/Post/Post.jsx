import './Post.css'

function Post({ post, onDelete }) {
    
  return (
    <div>
      <p className="post__date">{post.dt}</p>
      <p className="post__title">{post.title}</p>
      <p className="post__text">{post.body}</p>
      <button onClick={onDelete} className="deleteBtnPost">Удалить пост</button>
    </div>
  );
}
export default Post;

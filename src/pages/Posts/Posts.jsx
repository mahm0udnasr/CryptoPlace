import "./Posts.css";
import { useState, useEffect } from "react";
import Post from "../../components/Post/Post";
import AddPost from "../../components/AddPost/AddPost";
// firebase get posts
import { collection, getDocs,deleteDoc, doc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { db,storage  } from "../../firebaseConfig";

export default function Posts() {
  const [isOpen, setIsOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [currentPost, setCurrentPost] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const handleOpen = () => {
    setCurrentPost(null);
    setIsEdit(false);
    setIsOpen(true);
  };
  const handleClose = () => setIsOpen(false);


  const handleDeletePost = async (postId, imgUrl) => {
    try {
      const postRef = doc(db, "posts", postId); 
      const imageRef = ref(storage, imgUrl);
      await deleteObject(imageRef);
      await deleteDoc(postRef);
      setPosts(posts.filter((post) => post.id !== postId)); 
      alert("Post and image deleted successfully!");
    } catch (err) {
      alert("Error deleting post and image: " + err.message); 
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const postsCollection = collection(db, "posts");
      const postsSnapshot = await getDocs(postsCollection);
      const postsList = postsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postsList);
    };
    fetchPosts();
  }, []);

  const openEditPost = (editPost) => {
    if (editPost) {
      setCurrentPost(editPost);
      setIsEdit(true);
      setIsOpen(true);
    }
  };

  return (
    <div className="posts">
      {posts.length === 0 ? (
        <p>No posts available</p>
      ) : (
        posts.map((post) => (
          <Post
            key={post.id}
            title={post.title}
            description={post.description}
            author={post.author}
            imageUrl={post.imageUrl}
            createdAt={post.createdAt.toDate().toLocaleDateString()}
            openEditPost={() => openEditPost(post)}
            handleDeletePost={()=> handleDeletePost(post.id, post.imageUrl)}
          />
        ))
      )}
      <div className="adding-post" onClick={handleOpen}>
        +
      </div>
      <AddPost
        isOpen={isOpen}
        onClose={handleClose}
        postData={currentPost}
        isEdit={isEdit}
      />
    </div>
  );
}

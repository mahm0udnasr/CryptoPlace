import { createPortal } from "react-dom";
import { useState, useEffect } from "react";
import { storage, db } from "../../firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
  doc,
  updateDoc,
  addDoc,
  collection,
  Timestamp,
} from "firebase/firestore";
import "./AddPost.css";
export default function AddPost({ isOpen, onClose, postData }) {
  if (!isOpen) return null;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [cover, setCover] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (postData) {
      setTitle(postData.title);
      setDescription(postData.description);
      setAuthor(postData.author);
      setCover(postData.imageUrl);
    }
  }, [postData]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCover(file);
    } else {
      console.error("No file selected.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let downloadURL = postData?.imageUrl;
      if (!postData && !cover) {
        alert("Please upload a cover image.");
        setLoading(false);
        return;
      }
      if (cover) {
        const storageRef = ref(storage, `covers/${Date.now() + "-" + cover.name }`);
        const uploadTask = uploadBytesResumable(storageRef, cover);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          },
          (error) => {
            setLoading(false);
          },
          async () => {
            downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            await savePost(downloadURL);
            setLoading(false);
          }
        );
      } else {
        await savePost(downloadURL);
        setLoading(false);
      }
    } catch (err) {
      alert(`Error adding/updating post: ${err}`);
      setLoading(false);
    }
  };

  const savePost = async (downloadURL) => {
    const postRef = postData ? doc(db, "posts", postData.id) : null;
    if (postData) {
      await updateDoc(postRef, {
        title,
        description,
        author,
        imageUrl: downloadURL,
        updatedAt: Timestamp.now(),
      });
      alert("Post updated successfully!");
    } else {
      await addDoc(collection(db, "posts"), {
        title,
        description,
        author,
        imageUrl: downloadURL,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
      alert("Post added successfully!");
    }
    onClose();
  };

  return createPortal(
    <div className="overlay" onClick={onClose}>
      <div className="adding-post-form" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="titlePost">Title</label>
            <input
              id="titlePost"
              type="text"
              name="title"
              placeholder="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="descPost">Description</label>
            <textarea
              id="descPost"
              name="description"
              placeholder="add description ..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="authorPost">Author</label>
            <input
              id="authorPost"
              type="text"
              name="author"
              placeholder="mahmoudnasr"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="coverPostLabel" htmlFor="coverPost">
              Upload Cover
            </label>
            <input
              id="coverPost"
              type="file"
              name="cover"
              onChange={handleImageChange}
            />
          </div>
          <div className="btn-group">
            <button type="submit" disabled={loading}>
              {loading ? "Uploading..." : "Upload"}
            </button>
            <button type="button" onClick={onClose}>
              Close
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.getElementById("postUpload")
  );
}

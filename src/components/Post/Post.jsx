import "./Post.css";

export default function Post({
  title,
  description,
  author,
  imageUrl,
  createdAt,
  openEditPost,
  handleDeletePost
}) {
  return (
    <div className="single-post">
      <div className="cover">
        <span onClick={() => openEditPost()}>Edit</span>
        <span onClick={() => handleDeletePost()}>Delete</span>
        <img src={imageUrl || "/src/assets/blog.jpg"} alt="cover" />
      </div>
      <div className="details">
        <h3>{title}</h3>
        <p>
          {description
            ? description.length > 110
              ? description.substring(0, 110) + "..."
              : description
            : "This post without decription"}
        </p>
      </div>
      <div className="more-details">
        <span>{author}</span>
        <span>{createdAt}</span>
      </div>
    </div>
  );
}

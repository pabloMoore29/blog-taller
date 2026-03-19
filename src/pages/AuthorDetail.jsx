import { useParams, Link } from "react-router-dom";
import authors from "../data/authors";
import "./AuthorDetail.css";

function AuthorDetail({ posts }) {
  const { email } = useParams();

  const authorData = authors[email];
  const authorPosts = posts.filter((post) => post.author === email);

  if (!authorData) {
    return (
      <div className="author-detail">
        <h1>Autor no encontrado</h1>
      </div>
    );
  }

  return (
    <div className="author-detail">
      <div className="author-header">
        <img
          className="author-image"
          src={authorData.image || "https://via.placeholder.com/220x220"}
          alt={authorData.name}
        />

        <div className="author-info">
          <h1>{authorData.name}</h1>
          <p className="author-bio">{authorData.bio}</p>
        </div>
      </div>

      <h2 className="author-texts-title">Textos publicados</h2>

      <div className="author-post-list">
        {authorPosts.length === 0 ? (
          <p>Este autor no tiene textos publicados todavía.</p>
        ) : (
          authorPosts.map((post) => (
            <div className="author-post-card" key={post.id}>
              <Link to={`/posts/${post.id}`}>{post.title}</Link>
              <p className="author-post-date">{post.date}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AuthorDetail;
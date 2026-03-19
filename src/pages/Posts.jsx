import { Link } from "react-router-dom";
import authors from "../data/authors";
import "./Posts.css";

function Posts({ posts }) {
  return (
    <div className="posts">
      <h1>Publicaciones</h1>

      {posts.map((post) => {
        const authorData = authors[post.author];

        return (
          <div className="post-card" key={post.id}>
            <Link to={`/posts/${post.id}`}>{post.title}</Link>

            <p>
              Autor:{" "}
              <Link to={`/author/${post.author}`}>
                {authorData ? authorData.name : post.author}
              </Link>
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default Posts;
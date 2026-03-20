import { Link } from "react-router-dom";
import authors from "../data/authors";
import avatarFallback from "../assets/avatarF.jpg";
import "./Authors.css";

function Authors() {
  const authorsList = Object.entries(authors);

  return (
    <section className="authors-page">
      <div className="authors-header">
        <h1>Autores</h1>
        <p>
          Conoce a quienes publican en este espacio y explora sus textos.
        </p>
      </div>

      <div className="authors-grid">
        {authorsList.map(([email, author]) => (
          <Link to={`/author/${email}`} className="author-card" key={email}>
            <div className="author-image-wrapper">
              <img
                className="author-card-image"
                src={author.image || avatarFallback}
                alt={author.name}
                onError={(e) => {
                  e.currentTarget.src = avatarFallback;
                }}
              />
            </div>

            <div className="author-card-content">
              <h2>{author.name}</h2>
              <p>{author.bio}</p>
              <span className="author-card-link">Ver perfil</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Authors;
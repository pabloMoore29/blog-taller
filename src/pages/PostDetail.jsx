import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import badWords from "../utils/badWords";
import authors from "../data/authors";
import "./PostDetail.css";

function PostDetail({ posts, isAdmin }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = posts.find((item) => item.id === id);

  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (post) {
      setComments(post.comments || []);
    }
  }, [post]);

  if (!post) {
    return <h1>Texto no encontrado</h1>;
  }

  const authorData = authors[post.author];

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name.trim() || !text.trim()) {
      return;
    }

    const lowerText = text.toLowerCase();
    const containsBadWord = badWords.some((word) =>
      lowerText.includes(word)
    );

    if (containsBadWord) {
      alert("Tu comentario contiene lenguaje no permitido.");
      return;
    }

    const newComment = {
      id: Date.now(),
      author: name,
      text: text
    };

    const updatedComments = [...comments, newComment];

    try {
      const postRef = doc(db, "posts", id);
      await updateDoc(postRef, {
        comments: updatedComments
      });

      setComments(updatedComments);
      setName("");
      setText("");
    } catch (error) {
      console.error("Error al guardar comentario:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    const updatedComments = comments.filter(
      (comment) => comment.id !== commentId
    );

    try {
      const postRef = doc(db, "posts", id);
      await updateDoc(postRef, {
        comments: updatedComments
      });

      setComments(updatedComments);
    } catch (error) {
      console.error("Error al borrar comentario:", error);
    }
  };

  const handleDeletePost = async () => {
    const confirmDelete = window.confirm(
      "¿Seguro que quieres borrar este texto?"
    );

    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "posts", id));
      navigate("/posts");
    } catch (error) {
      console.error("Error al borrar el post:", error);
    }
  };

  return (
    <div className="post-detail">
      <h1>{post.title}</h1>

      {isAdmin && (
        <button className="delete-post-button" onClick={handleDeletePost}>
          Borrar texto
        </button>
      )}

      <p>
        <strong>Autor:</strong>{" "}
        <Link to={`/author/${post.author}`}>
          {authorData ? authorData.name : post.author}
        </Link>
      </p>

      <p><strong>Fecha:</strong> {post.date}</p>

      <p style={{ marginTop: "20px", lineHeight: "1.7" }}>
        {post.content}
      </p>

      <h2 style={{ marginTop: "30px" }}>Comentarios</h2>

      {comments.length === 0 ? (
        <p>No hay comentarios todavía.</p>
      ) : (
        comments.map((comment) => (
          <div className="comment" key={comment.id}>
            <p>
              <strong>{comment.author}:</strong> {comment.text}
            </p>

            {isAdmin && (
              <button
                className="delete-comment-button"
                onClick={() => handleDeleteComment(comment.id)}
              >
                Borrar comentario
              </button>
            )}
          </div>
        ))
      )}

      <h3 style={{ marginTop: "30px" }}>Añadir comentario</h3>

      <form onSubmit={handleSubmit} className="comment-form">
        <input
          type="text"
          placeholder="Tu nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          placeholder="Escribe tu comentario"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>

        <button type="submit">Enviar comentario</button>
      </form>
    </div>
  );
}

export default PostDetail;
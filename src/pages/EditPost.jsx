import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import "./EditPost.css";

function EditPost({ user }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postRef = doc(db, "posts", id);
        const postSnap = await getDoc(postRef);

        if (!postSnap.exists()) {
          alert("El texto no existe.");
          navigate("/posts");
          return;
        }

        const postData = postSnap.data();

        if (user?.email !== postData.author) {
          alert("No tienes permiso para editar este texto.");
          navigate(`/posts/${id}`);
          return;
        }

        setTitle(postData.title || "");
        setContent(postData.content || "");
      } catch (error) {
        console.error("Error al cargar el texto:", error);
        alert("Hubo un error al cargar el texto.");
        navigate("/posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, user, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert("Título y contenido no pueden estar vacíos.");
      return;
    }

    try {
      setSaving(true);

      const postRef = doc(db, "posts", id);

      await updateDoc(postRef, {
        title: title.trim(),
        content: content.trim()
      });

      alert("Texto actualizado correctamente.");
      navigate(`/posts/${id}`);
    } catch (error) {
      console.error("Error al actualizar el texto:", error);
      alert("Hubo un error al guardar los cambios.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <h1 style={{ padding: "2rem" }}>Cargando texto...</h1>;
  }

  return (
    <div className="edit-post-page">
      <h1>Editar texto</h1>

      <form className="edit-post-form" onSubmit={handleSubmit}>
        <label htmlFor="title">Título</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título del texto"
        />

        <label htmlFor="content">Contenido</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Edita tu texto aquí"
          rows="16"
        />

        <div className="edit-post-actions">
          <button type="submit" disabled={saving}>
            {saving ? "Guardando..." : "Guardar cambios"}
          </button>

          <button
            type="button"
            className="cancel-button"
            onClick={() => navigate(`/posts/${id}`)}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditPost;
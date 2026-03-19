import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db, auth } from "../services/firebase";
import "./AddText.css";

function AddText({ addPost }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title.trim() || !content.trim()) {
      return;
    }

    // 🔥 Obtener usuario actual
    const user = auth.currentUser;

    if (!user) {
      alert("Debes iniciar sesión");
      return;
    }

    const newPost = {
      title: title,
      content: content,
      author: user.email, // 👈 automático
      date: new Date().toISOString().split("T")[0],
      comments: []
    };

    try {
      const docRef = await addDoc(collection(db, "posts"), newPost);

      // 🔹 agregar al estado local
      addPost({
        id: docRef.id,
        ...newPost
      });

      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Error al agregar post:", error);
    }
  };

  return (
    <div className="add-text">
      <h1>Añadir texto</h1>

      <form onSubmit={handleSubmit} className="add-text-form">
        <label>Título</label>
        <input
          type="text"
          placeholder="Título del texto"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Texto</label>
        <textarea
          placeholder="Escribe tu texto aquí..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>

        <button type="submit">Publicar</button>
      </form>
    </div>
  );
}

export default AddText;
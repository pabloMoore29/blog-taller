import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { db, auth } from "./services/firebase";

import Home from "./pages/Home";
import Posts from "./pages/Posts";
import Authors from "./pages/Authors";
import AddText from "./pages/AddText";
import PostDetail from "./pages/PostDetail";
import AuthorDetail from "./pages/AuthorDetail";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";

function App() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);

  const adminEmail = "p.ochoa@literatura.com";
  const isAdmin = user?.email === adminEmail;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "posts"));
        const postsFromFirestore = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));

        setPosts(postsFromFirestore);
      } catch (error) {
        console.error("Error al obtener posts:", error);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const addPost = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <Router>
      <Navbar user={user} handleLogout={handleLogout} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<Posts posts={posts} />} />
        <Route
          path="/posts/:id"
          element={<PostDetail posts={posts} isAdmin={isAdmin} />}
        />
        <Route
          path="/author/:email"
          element={<AuthorDetail posts={posts} />}
        />
        <Route path="/authors" element={<Authors />} />
        <Route
          path="/add"
          element={
            user ? (
              <AddText addPost={addPost} />
            ) : (
              <Login setUser={setUser} />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
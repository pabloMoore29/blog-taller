import authors from "../data/authors";

function Authors() {
  const authorsList = Object.values(authors);

  return (
    <div style={{ padding: "40px", maxWidth: "900px", margin: "0 auto" }}>
      <h1>Autores</h1>

      <div
        style={{
          display: "flex",
          gap: "30px",
          flexWrap: "wrap",
          marginTop: "30px"
        }}
      >
        {authorsList.map((author, index) => (
          <div
            key={index}
            style={{
              width: "220px",
              backgroundColor: "var(--card)",
              padding: "15px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.06)"
            }}
          >
            <img
              src={author.image}
              alt={author.name}
              style={{ width: "100%", marginBottom: "10px" }}
            />

            <h3>{author.name}</h3>
            <p style={{ fontSize: "0.95rem" }}>{author.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Authors;
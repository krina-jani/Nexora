const Footer = () => {
  return (
    <footer
      style={{
        padding: "60px 0",
        textAlign: "center",
        background: "#0f172a",
        color: "#fff",
      }}
    >
      <div className="container">
        <h2>Nexora Career</h2>

        <p style={{ marginTop: "15px" }}>
          © {new Date().getFullYear()} Nexora Career.
          All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
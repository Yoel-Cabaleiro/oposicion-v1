import React from "react";
import "../components/navigation/footer.css"

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container-fluid mx-0" style={{ position: "relative", zIndex: "1" }}>
        <p className="text-center">
          © EASYOP 2024 - Web creada por developers para facilitarte las opos .
        </p>
      </div>
    </footer>
  );
}

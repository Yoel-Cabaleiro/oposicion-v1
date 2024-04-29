import React from "react";
import "../components/navigation/footer.css"

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container-fluid mx-0" style={{ position: "relative", zIndex: "1" }}>
        <div style={{ overflow: "hidden" }}>
          <svg
            preserveAspectRatio="none"
            viewBox="0 0 1200 120"
            xmlns="http://www.w3.org/2000/svg"
            style={{ fill: '#cecfc1', width: '100%', height: 95, transform: 'rotate(180deg)', position: 'absolute', top: "100%", }}
          >
            <path d="M1200 120L0 16.48V0h1200v120z" />
            <text x="-600" y="-30" fill="black" className="p-4 fw-light text-start" style={{ fontSize: "14px", transform: "rotate(180deg)", textAnchor: "middle" }}>
              © EASYOPP 2024 - Web creada por developers para facilitarte las opos .
            </text>
          </svg>
        </div>
      </div>
    </footer>
  );
}

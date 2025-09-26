// components/WhatsAppButton.tsx
"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/237653189528?text=Bonjour%20je%20veux%20en%20savoir%20plus"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        backgroundColor: "#25D366",
        borderRadius: "50%",
        paddingTop: "20px",
        paddingBottom: "20px",
        paddingLeft: "15px",
        paddingRight: "15px",
        zIndex: 9999,
        boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
      }}
    >
      <FontAwesomeIcon icon={faWhatsapp} size="3x" color="white" />
    </a>
  );
}

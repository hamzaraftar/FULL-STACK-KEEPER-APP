import React from "react";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <p>Hamza Asghar ⓒ {year} All Right Received</p>
    </footer>
  );
}

export default Footer;

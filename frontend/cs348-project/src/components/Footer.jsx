import React from "react";

function Footer(){
  const date = new Date();
  const year = date.getFullYear();

  return (
  <footer>
    <p>
      © Copyright {year} - CS348 F22 Group 3 
    </p>
  </footer>
  );
}

export default Footer;

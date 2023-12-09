import "./Footer.css";

const Footer = () => {
  return (
    <footer class = "footer-container">
      <p>&copy; {new Date().getFullYear()} Snappies. All rights reserved.</p>
      {/* Replace the comment with something random */}
      <p>Visit our website for amazing deals!</p>
    </footer>
  );
};

export default Footer;

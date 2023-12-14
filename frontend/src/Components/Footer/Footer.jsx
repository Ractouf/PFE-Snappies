import "./Footer.css";

const Footer = () => {
  return (
    <footer class = "footer-container">
      <p>&copy; {new Date().getFullYear()} Snappies. All rights reserved.</p>
    </footer>
  );
};

export default Footer;

import "./Header.css";

const Header = () => {
    return (
        <header>
            <img src="/src/assets/logo.png" alt="Logo" class="logo"/>
            <nav><a href="/login">Login</a></nav>
        </header>
    );
};

export default Header;
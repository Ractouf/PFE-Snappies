import "./Header.css";

const Header = () => {

    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;

    const isAdmin = user && user.is_admin;

    return (
        <header>

            <div className="logo"><img src="/src/assets/logo.png" alt="Logo" className="logo-img"/></div>
            <p>Page Name</p>

            <input className="side-menu" type="checkbox" id="side-menu"/>
            <label className="hamb" htmlFor="side-menu"><span className="hamb-line"></span></label>

            <nav className="nav">
                <ul className="menu">
                    {isAdmin && (
                        <li className="subnav">
                            <p className="subnavbtn">Admin <i className="fa fa-caret-down"></i></p>
                            <div className="subnav-content">
                                <a href="#">Tournées</a>
                                <a href="#">Clients</a>
                                <a href="#">Articles</a>
                                <a href="#">Livreurs</a>
                            </div>
                        </li>
                    )}
                    <li><a href="#">Inventaire</a></li>
                    <li><a href="#">Changer Tournée</a></li>
                    <li><a href="#">Déconnexion</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
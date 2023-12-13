import "./Header.css";

const Header = () => {

    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;

    const isAdmin = user && user.is_admin;

    return (
        <header>

            <div class="logo"><img src="/src/assets/logo.png" alt="Logo" class="logo-img"/></div>
            <p>Page Name</p>

            <input class="side-menu" type="checkbox" id="side-menu"/>
            <label class="hamb" for="side-menu"><span class="hamb-line"></span></label>

            <nav class="nav">
                <ul class="menu">
                    {isAdmin ? (
                            <li class="subnav">
                                <p class="subnavbtn">Admin <i class="fa fa-caret-down"></i></p>
                                <div class="subnav-content">
                                    <a href="#">Tournées</a>
                                    <a href="#">Clients</a>
                                    <a href="#">Articles</a>
                                    <a href="#">Livreurs</a>
                                </div>
                            </li>
                        )
                        : <>
                            <li><a href="#">Inventaire</a></li>
                            <li><a href="#">Changer Tournée</a></li>
                        </>
                    }
                    <li><a href="#">Déconnexion</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
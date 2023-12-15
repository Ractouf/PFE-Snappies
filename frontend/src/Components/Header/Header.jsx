import "./Header.css";
import {useNavigate} from "@solidjs/router";

const Header = () => {
    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;
    const navigate = useNavigate();

    const isAdmin = user && user.is_admin;

    function goTo(url) {
        navigate(url);
    }

    async function logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        await fetch("http://localhost:8000/api/logout", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        })

        navigate("/login");
    }

    function gotToMyToursToday() {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        navigate("/tours/" + user.id + "/" + date + "-" + month + "-" + year);
    }

    return (
        <header>

            <div class="logo-header"><img src="/src/assets/logo.png" alt="Logo" class="logo-img"/></div>
            <p>Snappies</p>

            <input class="side-menu" type="checkbox" id="side-menu"/>
            <label class="hamb" for="side-menu"><span class="hamb-line"></span></label>

            <nav class="nav">
                <ul class="menu">
                    {isAdmin ? (
                            <li class="subnav">
                                <p class="subnavbtn">Admin <i class="fa fa-caret-down"></i></p>
                                <div class="subnav-content">
                                    <a onClick={() => goTo('/')}>Tournées</a>
                                    <a onClick={() => goTo('/clients')}>Clients</a>
                                    <a onClick={() => goTo('/articles')}>Articles</a>
                                    <a onClick={() => goTo('/boxes')}>Caisses</a>
                                    <a onClick={() => goTo('/users')}>Livreurs</a>
                                </div>
                            </li>
                        )
                        : <>
                            {/*<li><a onClick = {() => goTo()}>Inventaire</a></li>*/}
                            <li><a onClick={() => goTo('/')}>Tournées</a></li>
                            <li><a onClick={() => gotToMyToursToday}>Mes tournées</a></li>
                        </>
                    }
                    <li><a onClick = {() => logout()}>Déconnexion</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
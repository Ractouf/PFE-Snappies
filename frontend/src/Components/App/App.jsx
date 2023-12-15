import Header from "../Header/Header";
import {Navigate, useLocation} from "@solidjs/router";

function isLoggedIn() {
    return localStorage.getItem("token") !== null;
}

const App = props => {
    const location = useLocation();

    return (
        <>
            {location.pathname !== "/login" && <Header />}

            {!isLoggedIn() && <Navigate href="/login" />}

            <div class="page">
                {props.children}
            </div>

        </>
    );
}

export default App;

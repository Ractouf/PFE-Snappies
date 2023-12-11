import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import {Navigate} from "@solidjs/router";

function isLoggedIn() {
    return localStorage.getItem("token") !== null;
}

const App = props => {
    return (
        <>
            <Header></Header>

            {!isLoggedIn() && <Navigate href="/login" />}
            {props.children}

            <Footer></Footer>
        </>
    );
}

export default App;

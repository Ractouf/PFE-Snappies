import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const App = props => {
    return (
        <>
            <Header></Header>

            {props.children}

            <Footer></Footer>
        </>
    );
}

export default App;

import "./Header.css";
import { A } from '@solidjs/router';

const Header = () => {
    return (
      <header>
        <img src="src/assets/topleft.png" alt="Logo" class="logo"></img>
          <A href="/login">Login</A>
      </header>
    );
  };

export default Header;
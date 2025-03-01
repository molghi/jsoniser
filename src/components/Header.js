import "./Header.css";

function Header() {
    return (
        <header className="header">
            <div className="container">
                <div className="header__column">
                    <div className="header__logo">
                        <span>JSONISER</span>
                        <span>Text to JSON</span>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;

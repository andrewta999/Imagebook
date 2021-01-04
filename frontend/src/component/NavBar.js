export default function NavBar() {
    return <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <a className="navbar-brand ml-4 mb-1" href="/">Imagebook</a>

            <ul className="navbar-nav mr-5">
                <li className="nav-item active">
                    <a className="nav-link" href="/">Home</a>
                </li>
            </ul>

            <div style={{ "position": "absolute", "right": "3rem" }}>
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <a className="nav-link" href="/">Signup</a>
                    </li>
                    <li className="nav-item active">
                        <a className="nav-link" href="/">Login</a>
                    </li>
                </ul>
            </div>

        </nav>
    </div>
}
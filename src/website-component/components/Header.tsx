import '../design/Header.css';

function Header() {
    return ( 
        <header className='header'>
            <nav className='nav-links'> 
                <a href='#features'>Features</a>
                <a href='#contact'>Contact</a>
                <a href='#docs'>Docs</a>
                <a href='#dashboard'>Dashboard</a>
            </nav> 
            <div className='language-selector'>
                <select onChange={(e) => { console.log(`Selected Language: ${e.target.value}`); }}>
                    <option value="en">English</option>
                    <option value="ar">عربي</option>
                </select>
            </div>
        </header>
    );
}

export default Header;

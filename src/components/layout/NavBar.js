import { Link } from 'react-router-dom'

import Container from './Container'

import styles from './NavBar.module.css'

import logo from '../../img/costs_logo.png'

function NavBar() {
    return(
        <nav  className={styles.navbar}>
            <Container>
                <div className={styles.navbar_content}>
                    <Link to="/"><img className={styles.logo} src={logo} alt="Costs"/></Link>
                    <ul className={styles.list}>
                        <li><Link to="/">Início</Link></li>
                        <li><Link to="/about">Sobre</Link></li>
                        <li><Link to="/contact">Contato</Link></li>
                        <li><Link to="/projects">Projetos</Link></li>
                    </ul>
                </div>
            </Container>
        </nav>
    )
}

export default NavBar
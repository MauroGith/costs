import styles from './Home.module.css'
import homeImage from '../../img/savings.svg'
import LinkButton from '../layout/LinkButton'

function Home(){
    return (
        <section className={styles.home_container}>
            <h1>Bem-vindo ao <em>Costs</em></h1>
            <p className="para">Comece a gerenciar os seus projetos agora mesmo !</p>
            <LinkButton to="/newproject" text="Criar projeto"/>
            <img src={homeImage} alt="Costs"/>
        </section>
    )
}

export default Home
import {Link} from 'react-router-dom'

import styles from './ProjectCard.module.css'

import { FaCoins, FaBullseye ,FaTrash, FaEdit } from 'react-icons/fa'

function ProjectCard ({ id, name, budget, category, handleRemove }) {

    const remove = event => {
        event.preventDefault()
        handleRemove(id)
    }

    return (
        <div className={styles.project_card}>
            <div className={styles.card_content}>
                <h4 className={`${styles[category.toLowerCase()]}`}>{name}</h4>
                <p><span><FaCoins/></span> R${budget}</p>
                <p><span ><FaBullseye/></span> {category}</p>
                <div className={styles.actions}>
                    <p>
                        <Link to={`/project/${id}`}>
                            <span><FaEdit/></span> Editar
                        </Link>
                    </p>
                    <p>
                        <button onClick={remove}>
                            <span><FaTrash/></span> Excluir
                        </button>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ProjectCard
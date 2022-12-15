import styles from '../projectComps/ProjectCard.module.css'

import { FaCoins, FaBook ,FaTrash } from 'react-icons/fa'


function ServiceCard({id, name, cost, description, handleRemove}) {

    const remove = (event) => {
        event.preventDefault()
        handleRemove(id, cost)
    }

    return (
        <div className={styles.project_card}>
            <div className={styles.card_content}>
                <h4>{name}</h4>
                <p>
                    <span><FaCoins/></span> R${cost}
                </p>
                <p>
                    <span><FaBook/></span> {description}
                </p>
                <div className={styles.actions}>
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

export default ServiceCard
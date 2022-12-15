import { v4 as uuidv4} from 'uuid'

import styles from './Project.module.css'

import { useParams } from 'react-router-dom'
import {useState, useEffect} from 'react'

import Message from '../layout/Message'
import ProjectForm from '../projectComps/ProjectForm'
import ServiceForm from '../service/ServiceForm'
import ServiceCard from '../service/ServiceCard'


function Project() {
    const { id } = useParams()
    
    const [project, setProject] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
    const [message, setMessage] = useState()
    const [type, setType] = useState()

    useEffect(() => {

        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(data => setProject(data))
        .catch(error => console.log(error))

    }, [id])

    function editPost(project) {
        setMessage('')


        if(project.budget < project.cost) {
            setMessage('Orçamento disponível menor que o custo do serviço.')
            setType('error')
            return false
        }
        
        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-type' : 'application/json',
            },
            body: JSON.stringify(project)
        })
        .then(response => response.json())
        .then(data => {
            setProject(data)
            setShowProjectForm(false)
            setMessage('Edição concluída com sucesso!')
            setType('success')
        })
        .catch(error => console.log(error))
    }

    function createService() {
        
        setMessage('')

        const lastService = project.services[project.services.length -1]

        lastService.id = uuidv4()

        const lastServiceCost = lastService.cost

        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

        if(newCost > parseFloat(project.budget)) {
            setMessage(`Orçamento disponível ${project.budget - project.cost}`)
            setType('error')
            project.services.pop()

            return false
        }

        project.cost = newCost


        toggleServiceForm(false)
    }
    

    function removeService(id, cost) {

        setMessage('')

        const servicesUpdated = project.services.filter(
            service => service.id !== id
        )

        const projectUpdated = project

        projectUpdated.services = servicesUpdated
        projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost)


        fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(projectUpdated)
        })
            .then(response => response.json())
            .then(() => {
                setProject(projectUpdated)
                setMessage('Serviço removido com sucesso!')
                setType('success')
            })
            .catch(error => console.log(error))

    }

    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm)
    }

    function toggleServiceForm() {
        setShowServiceForm(!showServiceForm)
    }

    return(
        <>
            {project.name ? (
                <div>
                    {message && <Message type={type} msg={message} />}
                    <div className={styles.edit_header}>
                        <h1>{project.name}</h1>
                        <button onClick={toggleProjectForm}>
                            {!showProjectForm ? 'Editar projeto' : 'Fechar'}
                        </button>
                    </div>
                    {!showProjectForm ? (
                        <div className={styles.project_info}>
                            <p>
                                <span>Categoria:</span> {project.category.name}
                            </p>
                            <p>
                                <span>Orçamento do projeto :</span> R${project.budget}
                            </p>
                            <p>
                                <span>Total utilizado:</span> R${project.cost}
                            </p>
                                {project.cost > 0 && 
                                    <p>
                                        <span>Fundos restantes: </span>R${project.budget - project.cost}
                                    </p>
                                }
                        </div>
                    ) : (
                        <div className={styles.project_info}>
                            <ProjectForm 
                                handleSubmit={editPost} 
                                btnText="Confirmar edição" 
                                projectData={project}
                            />
                        </div>
                    )}
                    <div className={styles.edit_header}>
                        <h2>Adicione um serviço</h2>
                        <button onClick={toggleServiceForm}>
                            {!showServiceForm ? 'Adicionar serviço' : 'Fechar'}
                        </button>
                    </div>
                    <div className={styles.project_info}>
                        {showServiceForm && 
                            <ServiceForm 
                            handleSubmit={createService}
                            btnText="Adicionar serviço"
                            projectData={project}
                            />
                        }
                    </div>

                    <div className={styles.service_box}>
                        {project.services.length > 0 && 
                            project.services.map(service => (
                                <ServiceCard 
                                    id={service.id}
                                    name={service.name}
                                    cost={service.cost}
                                    description={service.description}
                                    key={service.id}
                                    handleRemove={removeService}
                                />
                            ))
                        }
                        {project.services.length === 0 && 
                            <p className={styles.feedback_text}>
                                Nenhum serviço cadastrado
                            </p>
                        }
                    </div>
                </div>
            ) : (
                <div>
                    <p className={styles.feedback_text}>Não foi possível obter dados do projeto</p>
                </div>
            )}
        </>
    )
}

export default Project
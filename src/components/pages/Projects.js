import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

import Message from "../layout/Message"
import LinkButton from '../layout/LinkButton'
import ProjectCard from '../projectComps/ProjectCard'

import styles from './Projects.module.css'

function Projects(){
    const [projects, setProjects] = useState([])
    const [projectMessage, setProjectMessage] = useState('')


    const location = useLocation()
    let message = ''
    if (location.state) {
        message = location.state.message
    }

    useEffect(() => {

        fetch('http://localhost:5000/projects', {
            method: 'GET',
            headers: {
                'Content-type' : 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => setProjects(data))
            .catch(error => console.log(error))
    }, [])

    function removeProject(id) {

        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(() => { 
                setProjects(projects.filter(project => project.id !== id))
                setProjectMessage('Projeto removido com sucesso!')
            })
            .catch(error => console.log(error))

    }

    return (
        <div>
            <div className={styles.title_content}>
                <h1>Projetos</h1>
                <LinkButton to="/newproject" text="Criar projeto"/>
            </div>
                {message && <Message type="success" msg={message}/>}
                {projectMessage && <Message type="success" msg={projectMessage}/>}
                <div className={styles.projects_box}>
                    {projects.length > 0 && 
                        projects.map(project => (
                            <ProjectCard 
                                id={project.id}
                                name={project.name}
                                budget={project.budget}
                                category={project.category.name}
                                key={project.id}
                                handleRemove={removeProject}
                            />
                        ))    
                    }
                </div>
        </div>
    )
}

export default Projects
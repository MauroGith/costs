import { useNavigate } from 'react-router-dom'


import ProjectForm from '../projectComps/ProjectForm'
import style from './NewProject.module.css'

function NewProject(){

    const navigate = useNavigate()

    function createPost(project) {
        project.cost = 0
        project.services = []

        fetch('http://localhost:5000/projects', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(project),
        })
            .then( response => response.json())
            .then(() => {
                navigate('/projects',{state:  {message: 'Projeto criado'}})
            })
            .catch(error => console.log(error))
        
    }

    return (
        <div className={style.newproject_container}>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto depois adicione os serviços</p>
            <ProjectForm handleSubmit={createPost} btnText="Criar Projeto"/>
        </div>
    )
}

export default NewProject
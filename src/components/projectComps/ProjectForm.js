import {useState, useEffect} from 'react'

import Input from '../form/Input'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'
import styles from './ProjectForm.module.css'

function ProjectForm ({ handleSubmit, btnText, projectData }) {
    const [categories, setCategories] = useState([])
    const [project, setProject] = useState(projectData || {})
    
    useEffect(() => {

        fetch("http://localhost:5000/categories", {
            method: "GET",
            headers: {
                'Content-type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => setCategories(data))
        .catch(error => console.log(error))
    }, [])

    const submit = event => {
        event.preventDefault()
        handleSubmit(project)
    }

    function handleChange(event) {
        setProject({...project, [event.target.name]: event.target.value})
    }

    function handleCategory(event) {
        setProject({
            ...project,
            category: {
                id: event.target.value,
                name: event.target.options[event.target.selectedIndex].text,
            },
        })
    }

    return (
        <form onSubmit={submit} className={styles.form}>
            <Input 
                type="text" 
                text="Nome" 
                name="name" 
                placeholder="Inisira o nome do projeto"
                handleOnChange={handleChange}
                value={project.name ? project.name : ''}
            />
            <Input 
                type="number" 
                text="Valor" 
                name="budget"
                placeholder="Orçamento disponível" 
                handleOnChange={handleChange}
                value={project.budget ? project.budget : ''}
            />
            <Select 
                name="category_id" 
                text="Categorias" 
                options={categories}
                handleOnChange={handleCategory}
                value={project.category ? project.category.id : ''}
            />
            
            <SubmitButton text={btnText}/>
        </form>
    )
}

export default ProjectForm
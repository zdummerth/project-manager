import React from 'react'
import styled from 'styled-components'
import Flex from 'components/shared/Flex'
import { useProjects } from 'lib/hooks'
import NewProjectForm from 'components/forms/NewProjectForm'
import ProjectCard from 'components/projects/ProjectCard'

const Container = styled(Flex)``

export default function ProjectList({ userId }) {
    const { projects, createProject, deleteProject, updating } = useProjects({ userId })

    console.log('prod updating', updating)
    return (
        <Container dir='column' ai='center' className='w-100'>
            <div className='std-div alt-bg w-100 mb-s'>
                <NewProjectForm
                    createProject={createProject}
                    loading={updating.creating}
                />
            </div>
            <div className='std-div alt-bg w-100'>
                {projects && projects.map((p, ind) => {
                    return (
                        <ProjectCard
                            project={p}
                            id={p._id}
                            key={p._id}
                            remove={() => deleteProject(p._id)}
                            className={`${ind > 0 && 'mt-s'}`}
                            loading={updating.ids.includes(p._id)}
                        />
                    )
                })}
            </div>
        </Container>
    )
}

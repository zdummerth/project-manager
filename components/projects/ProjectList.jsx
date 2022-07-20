import React from 'react'
import styled from 'styled-components'
import Flex from 'components/shared/Flex'
import { useProjects } from 'lib/hooks'
import NewProjectForm from 'components/forms/NewProjectForm'
import ProjectCard from 'components/projects/ProjectCard'

const Container = styled(Flex)`
    position: relative;
    max-width: 800px;

    // #form {
    //     position fixed;
    //     bottom: 10px;
    //     right: 10px;
    //     left: 10px;
    //     box-shadow: 0 0 5px 1px ${({ theme }) => theme.colors.text};
    // }
`

export default function ProjectList({ userId, className }) {
    const { projects, createProject, deleteProject, updating } = useProjects({ userId })

    console.log('prod updating', updating)
    return (
        <Container dir='column' ai='center' className={`w-100 ${className}`}>
        <div className="std-div alt-bg w-100 mtb-s">
          <Flex jc='center' className='bg std-div w-100'>
            <h2>My Projects</h2>
          </Flex>
        </div>
        <div id='form' className='w-100 std-div alt-bg mtb-s'>
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

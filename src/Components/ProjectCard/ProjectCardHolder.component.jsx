import { Pane } from "evergreen-ui"
import { useContext } from "react"
import { ProjectCard } from ".."
import DataContext from "../../DataContext"

const ProjectCardHolder = () => {
  const { projects, fetchProjects } = useContext(DataContext)

  return (
    <Pane marginTop="3em" >
      {projects && projects?.data.map(element => {
        return (
          <ProjectCard
            updateProjects={fetchProjects}
            {...element} key={element.id} />
        )
      })}
    </Pane>
  )
}

export default ProjectCardHolder
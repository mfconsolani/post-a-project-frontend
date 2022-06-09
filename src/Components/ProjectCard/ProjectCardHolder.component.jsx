import { Pane } from "evergreen-ui"
import { useContext } from "react"
import { ProjectCard } from ".."
import DataContext from "../../DataContext"

const ProjectCardHolder = (props) => {
    const {projects, fetchProjects} = useContext(DataContext)
    console.log(projects)

    return (
      <Pane marginTop="3em" >
        {projects && projects?.data.map(element => {
          return (
            <ProjectCard
              updateProjects={fetchProjects}
              userLogged={props.isLoggedIn}
              {...element} key={element.id} />
          )
        })}
      </Pane>
    )
  }

export default ProjectCardHolder
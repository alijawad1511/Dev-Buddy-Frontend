import axios from 'axios';
import { createContext,useState } from 'react';

export const ProjectContext = createContext();

// Holding Information of Projects
export const ProjectProvider = (props) => {
    const [allProjects,setAllProjects] = useState([]);
    const [project,setProject] = useState({});  // Project Detail
    const [liked,setLiked] = useState();
    const [projectLikeCount,setProjectLikeCount] = useState();
    const [participants,setParticipants] = useState([]);
    const [assignedTasks,setAssignedTasks] = useState([]);
    const [completedTasks,setCompletedTasks] = useState([]);

    // Tasks
    const [tasks,setTasks] = useState([]);

    const getAllProjects = () => {
        // Configuration
        var config = {
            method: "GET",
            url: `${process.env.REACT_APP_BASE_URL}/api/projects/all-projects`,
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("garbage"),
            },
        };

        axios(config)
            .then((response) => {
                setAllProjects(response.data.message);
            })
            .catch((error) => {
                console.log(error.message);
            });
    }

    const getProjectById = (projectId) => {
        var config = {
            method: "GET",
            url: `${process.env.REACT_APP_BASE_URL}/api/projects/project/${projectId}`,
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("garbage"),
            },
        };

        // API Call
        axios(config)
            .then((response) => {
                setProjectLikeCount(response.data.project.likeCount);
                setLiked(response.data.project.isLiked);
                setProject(response.data.project);
            })
            .catch((error) => {
                console.log(error.message);
            });
    }

    const getMyProjects = () => {
        // Body required
    }

    const getJoinedProjects = () => {
        // Body required
    }

    return (
        <ProjectContext.Provider value={{ tasks,setTasks,assignedTasks,setAssignedTasks,participants,setParticipants }}>
            {props.children}
        </ProjectContext.Provider>
    )
}
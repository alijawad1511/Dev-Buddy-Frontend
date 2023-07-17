import { createContext,useState } from 'react';

export const UserContext = createContext();

// Holding Information of Projects
export const UserProvider = (props) => {

    const [loggedInUser,setLoggedInUser] = useState(null);
    const [timelineProjects,setTimelineProjects] = useState([]);
    const [recommendedProjects,setRecommendedProjects] = useState([]);

    return (
        <UserContext.Provider value={{ loggedInUser,setLoggedInUser,timelineProjects,setTimelineProjects,recommendedProjects,setRecommendedProjects }}>
            {props.children}
        </UserContext.Provider>
    )
}
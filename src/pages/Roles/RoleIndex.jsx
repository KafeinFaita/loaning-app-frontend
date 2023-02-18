import { useLoaderData } from "react-router-dom";

const Roles = () => {
    const roles = useLoaderData();

    return (
        <div>
        {roles.data.map(role => {
            return <h1>{role.title}</h1>
        })}
        </div>
    )
} 

export default Roles;
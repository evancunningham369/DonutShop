import { useState } from "react";

function Users(){
    const [users, setUsers] = useState([{}]);

    fetch('http://localhost:3001/users')
    .then((res) => res.json())
    .then((data) => setUsers(data))

    return(
        <div>
            {users.map((user, index) => {
                return(<h1 key={index}>{user.username}</h1>)
            })}
        </div>
    )
}

export default Users;
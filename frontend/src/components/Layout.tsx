import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { IUser } from "../interface/IUser";

export function Layout(){
    useEffect(() => {
        let ls = localStorage.getItem("user");
        if (ls) {
          setStart(false)
          setLoggIn(true)
        } 
    },[])

    const nav = useNavigate();

    const [start, setStart] = useState(true)
    const [loggIn, setLoggIn] = useState(false)
    const[user, setUser] = useState<IUser>({
        status: "",
        user: 0,
        userName: "",
        passWord: "",
    })

//skickar till adress med user, får tillbaka status och id. 
    async function logg(){
        await axios.post<IUser>("http://localhost:3000/users", user)
        .then(response => {

            let data = response.data
            console.log("data", data)
        if(data.status === "loggedIn"){

         //om loggedIn status finns så sparas datan
            localStorage.setItem('user', JSON.stringify(data.user));
            setStart(false)
            setLoggIn(true)
            nav("/user")
        }
    })
    }

    function loggOut(){
        setStart(true)
        setLoggIn(false)
        localStorage.clear();
        nav("/")
    }

    function handleUser(e: ChangeEvent<HTMLInputElement>) {
        let name = e.target.name
        let uppdate = ({ ...user, [name]: e.target.value })
        setUser(uppdate)   
    }
    
    return(<> 
    <header>
        {start && <><form >
        username: <input type="text" name="userName" value={user.userName} onChange={handleUser} ></input>
        password: <input type="text" name="passWord" value={user.passWord} onChange={handleUser}></input>
        </form>
        <button onClick={logg}>LoggIn</button> 
        </>}
        {loggIn && <>
        <div>
            Välkommen {user.userName} 
            <button onClick={loggOut}>Logga ut</button>
        </div>
        </>}
    </header>
    <Outlet/>
    </>)
}
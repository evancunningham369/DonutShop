import { createContext, useContext, useEffect, useState } from "react";
import { me } from "../fetch_req";

const UserContext = createContext(undefined);

export function UserProvider({ children }){
    const [user, setUser] = useState(undefined);

    useEffect(() => {
        (async () => {
            try{ setUser(await me()); } catch { setUser(null); }
        })();
    }, []);

    const value = { user, setUser };
    
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser(){
    const context = useContext(UserContext);
    if(context === undefined){
        throw new Error("useUser must be used within <UserProvider>");
    }
    return context;
}
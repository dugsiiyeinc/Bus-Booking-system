import { createContext, useContext, useEffect, useState } from "react";
import { getUserProfile, onAuthChange, signOut } from "../Lib/Auth";

const AuthContext = createContext(null);


export const AuthProvider = ({ children }) => {

    const [user,setUser] = useState(null);
    const [profile,setProfile] = useState(null);
    const [isloading,setIsLoading] = useState(true);

    useEffect(() => {

        const cleanUp = onAuthChange(async (user) => {

            setUser(user);

            if (user) {

                try {
                    const userProfile = await getUserProfile(user.id);
                    setProfile(userProfile);
                } catch (error) {
                    console.error("Error fetching user profile: ", error)
                }

            } else {
                setProfile(null)
            }
            setIsLoading(false)
        })

        return cleanUp;

    }, [])


   const logout= async()=>{
        try{
            await signOut()
            setUser(null)
            setProfile(null)

        }catch(error){
            console.error("Error signing out",error)

        }
    }

    const Value={
        user,
        profile,
        isloading,
        IsLoggedIn:!!user,
        setIsLoading,
        logout
    }

    return (
        <AuthContext.Provider value={Value}>
        {children}
        </AuthContext.Provider>
    );
};





export const  useAuth=()=>{
    const context=useContext(AuthContext);

    if(context===null){
        throw new Error("useAuth must be used within an AuthProvider")
    }

    return context;
}
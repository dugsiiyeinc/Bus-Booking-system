import { createContext, useContext, useEffect, useState } from "react";
import { getUserProfile, onAuthChange, signOut } from "../Lib/Auth";
import { Navigate } from "react-router-dom";
import supabase from "../Lib/supabase";

const AuthContext = createContext(null);


export const AuthProvider = ({ children }) => {

    const [user,setUser] = useState(null);
    const [profile,setProfile] = useState(null);
    const [isloading,setIsLoading] = useState(true);
    const [Getuser, setGetUser]= useState(null);

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


//         const GetUser=async()=>{

//             try {
//  let { data, error } = await supabase
//                 .from('users')
//                 .select('id')

//                 .eq('id', user.id)
//                 .single()

//                 console.log("dataaaasssase",data)

//                 if (error) throw error
                
//             } catch (error) {
//                 console.error("Error fetching user data: ", error)
                
//             }


//         }

//         GetUser()

        return cleanUp;

    }, [])


   const logout= async()=>{
        try{
            await signOut()
            setUser(null)
            setProfile(null)
            Navigate("/Signin")

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
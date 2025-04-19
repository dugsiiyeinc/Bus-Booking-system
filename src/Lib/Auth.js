import supabase from "./supabase"

export const signUp=async(email,password,username)=>{



    
    const { data, error } = await supabase.auth.signUp({
        email: email,
   
      
        password: password,
        options: {
          data: {
            username: username,
          },
        },
      
    
      });
      

  console.log("data",data)

//   if(data?.user){
//     const { data: sessionData }= await supabase.auth.getSession();

  

//   if(!sessionData?.session) {
//     console.log("No Active session yet - Profile will be created  on First Sign")
//     return data
//   }

//}


//return data

}
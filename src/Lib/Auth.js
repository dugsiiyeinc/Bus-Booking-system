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

  if(data?.user){
    const { data: sessionData }= await supabase.auth.getSession();

  

  if(!sessionData?.session) {
    console.log("No Active session yet - Profile will be created  on First Sign")
    return data
  }

}


//return data

}

export const signIn= async(email,password)=>{

    let { data, error }= await supabase.auth.signInWithPassword({
      email: email,
      password: password
    });
  
    console.log("datatttt user info",data)
  
    if(error) throw error;
  
    //check if user profile exists, create if it  does'nt login
  
    // if (data?.user) {
    //   try {
    //     const profile = await getUserProfile(data.user.id)
    //     console.log('Profile after signin:', profile)
    //   } catch (profileError) {
    //     console.error('Error with profile during signin:', profileError)
    //   }
    // }
  
    return data
  
  
  
  }
  
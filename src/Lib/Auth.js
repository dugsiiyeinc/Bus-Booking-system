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



  
export const  getUserProfile=async(userId)=>{

    const { data: sessionData } = await supabase.auth.getSession()
    console.log('Current session:', sessionData)
    
    // First, try to get the existing profile
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single()
  
      if (error && error.code === 'PGRST116') {
        console.log('No profile found, attempting to create one for user:', userId)
        
        // Get user email to derive username if needed
        const { data: userData } = await supabase.auth.getUser()
        console.log('gggCurrent user dataaaaaaaa:', userData)
        
        const email = userData?.user?.email || ''
        const defaultUsername = email ? email.split('@')[0] : `user_${Date.now()}`
        
        console.log('Creating profile with:', {
          id: userId,
          username: defaultUsername
        })
  
  
  
   // Create a new profile
   const { data: newProfile, error: insertError } = await supabase
   .from('users')
   .insert({
     id: userId,
     username: defaultUsername,
     avatar_url: null
   })
   .select()
   .single()
  
  if (insertError) {
   console.error('Profile creation error:', insertError)
   throw insertError
  }
  
  console.log('New profile created successfully:', newProfile)
  return newProfile
  
  
  
  
    }
  
  
    if(error){
  
      console.error("Error Fetching profile",error);
  
      throw error
    }
  
  
    console.log("existing data");
  
    return data;
  
  
  
  }
  
  export function onAuthChange(callback) {
  
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
              callback(session?.user || null, event)
         })
  
  return () => data.subscription.unsubscribe();
  
  
   }
  
  
   export async function signOut() {
    await supabase.auth.signOut()
  }
  
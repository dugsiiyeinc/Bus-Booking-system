import supabase from "./supabase"


export const signUp=async(email,password,username="")=>{



    
  let { data, error }= await supabase.auth.signUp({
  email: email,
  password: password
})

if(error) throw error

console.log("data",data)

if(data?.user){
  const { data: sessionData }= await supabase.auth.getSession();



if(!sessionData?.session) {
  console.log("No Active session yet - Profile will be created  on First Sign")
  return data
}

// console.log("data",data)

const displayName = username || email.split('@')[0]
console.log('Creating user profile with:', {
 id: data.user.id,
 username: displayName
})

//  create profile

const { data: profileData, error:profileError } = await supabase
.from('users')
.insert([
{id:data.user.id, username: displayName,
  role:"user",
},
])
.select().single();

console.log("profile datagsgfgdf",profileData)

// const { data: profileData, error: profileError } = await supabase
// .from('users')
// .insert({
//   id: data.user.id,
//   username: displayName,
//   avatar_url: null
// })
// .select()
// .single()


if(profileError){

console.error("profile error",profileError)
}
else{
console.log("profile created succesfully",profileData)
}



}

return data
}

 


export const signIn= async(email,password)=>{

    let { data, error }= await supabase.auth.signInWithPassword({
      email: email,
      password: password
    });
  
    console.log("datatttt user info",data)
  
    if(error) throw error;
  
    //check if user profile exists, create if it  does'nt login
    console.log("user id",data.user.id)
  
    if (data?.user) {
      try {
        const profile = await getUserProfile(data?.user.id)
        console.log('Profile after signinnnnnnnnnnnnn:', profile)
      } catch (profileError) {
        console.error('Error with profile during signin:', profileError)
      }
    }


  
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

      console.log("dataaaaaaaaaaaaaaaaaaaaaaa",data)
  
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
     role:"user",
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
  
    return sessionData;
  
  
  
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
  
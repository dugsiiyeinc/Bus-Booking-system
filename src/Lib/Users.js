import supabase from "./supabase"

export const getUsersById = async (id) => {
    
    /*
    article -> comments -> users = id, name, 
    */

    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', id)
        .single()

    if (error) throw error
    return data

}

export const updateUsers = async (id, updates) => {

    console.log(`Attempting to update Buses with ID: ${id}`, updates)

    const { data, error } = await supabase
        .from('users')
        .update({
           username:updates.username,
           role:updates.role,
            updated_at: new Date()
        })
        .eq('id', id)
        .select()
        .single()


    if (error) {
        console.error('Error updating Buses', error)
        console.error('Update error details:', JSON.stringify(error, null, 2))
        throw error
    }

    console.log('Buses updated successfully:', data)
    return data

}
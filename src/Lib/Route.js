import supabase from "./supabase"


export const createRoute = async (Route) => {

    const RouteData = {
    From_city:Route.From_city,
     To_city:Route.To_city,
        
        
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),

    }

    //insert supabase article
    const { data, error } = await supabase
        .from('Routes')
        .insert(RouteData)
        .select()
        .single()

    if (error) {
        console.error('Error creating Route:', error)
        throw error
    }

    return data

}

export const getRouteById = async (id) => {
    
   

    const { data, error } = await supabase
        .from('Routes')
        .select('*')
        .eq('id', id)
        .single()

    if (error) throw error
    return data

}

export const updateRoute = async (id, updates) => {

    console.log(`Attempting to update Route with ID: ${id}`, updates)

    const { data, error } = await supabase
        .from('Routes')
        .update({
            From_city: updates.From_city,
            To_city:updates.To_city,
            
            updated_at: new Date()
        })
        .eq('id', id)
        .select()
        .single()


    if (error) {
        console.error('Error updating Route', error)
        console.error('Update error details:', JSON.stringify(error, null, 2))
        throw error
    }

    console.log('Buses updated successfully:', data)
    return data

}

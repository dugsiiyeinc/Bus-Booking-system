import supabase from "./supabase"


export const createBus = async (Bus) => {

    const BusData = {
        name:Bus.name,
        plate_number:Bus.plate_number,
        TotalSeats:Bus.total_seats,
        
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),

    }

    //insert supabase article
    const { data, error } = await supabase
        .from('Buses')
        .insert(BusData)
        .select()
        .single()

    if (error) {
        console.error('Error creating Buses:', error)
        throw error
    }

    return data

}

export const getBusById = async (id) => {
    
    /*
    article -> comments -> users = id, name, 
    */

    const { data, error } = await supabase
        .from('Buses')
        .select('*')
        .eq('id', id)
        .single()

    if (error) throw error
    return data

}

export const updateBuses = async (id, updates) => {

    console.log(`Attempting to update Buses with ID: ${id}`, updates)

    const { data, error } = await supabase
        .from('Buses')
        .update({
            name: updates.name,
            plate_number: updates.plate_number,
            TotalSeats: updates.total_seats,
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
import supabase from "./supabase"


export const createSchedule = async (schedule) => {

    const ScheduleData = {
  bus_id:schedule.bus_id,
     route_id:schedule.route_id,
     departure_time:schedule.departure_time,
     days_of_week:schedule. days_of_week,
     price:schedule.price,
        
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),

    }

    //insert supabase article
    const { data, error } = await supabase
        .from('Schedules')
        .insert(ScheduleData)
        .select()
        .single()

    if (error) {
        console.error('Error creating Route:', error)
        throw error
    }

    return data

}


export const getScheduleById = async (id) => {
    
    /*
    article -> comments -> users = id, name, 
    */

    const { data, error } = await supabase
        .from('Schedules')
        .select('*')
        .eq('id', id)
        .single()

    if (error) throw error
    return data

}

export const updateSchedule = async (id, updates) => {

    console.log(`Attempting to update Buses with ID: ${id}`, updates)

    const { data, error } = await supabase
        .from('Schedules')
        .update({
            route_id: updates.route_id,
          bus_id: updates.bus_id,
          days_of_week: updates.days_of_week,
          departure_time:updates.departure_time,
          price:updates.price,
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
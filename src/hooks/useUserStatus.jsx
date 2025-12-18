import React from 'react'
import useAuth from './useAuth'
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from './useAxiosSecure'


const useUserStatus = () => {
 const {user}= useAuth()
 const axiosSecure = useAxiosSecure()

 const {data : status ,isLoading:isStatusLoading}=useQuery({
    // enabled: !loading && !!user?.email,
    queryKey : ['status', user?.email],
    queryFn : async ()=>{
        const {data} = await axiosSecure(`user/status`)
        return data.status
    }
 })
 return {status,isStatusLoading}

}

export default useUserStatus

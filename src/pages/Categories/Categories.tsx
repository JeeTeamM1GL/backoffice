import React, { useEffect, useState } from 'react'
import { getActions } from '../../actions/actions.ts';
import { endpoints } from '../../constants/endpoints.constants.ts';
import axios from 'axios';

function Categories() {
    // const [categories , setCategories] = useState([]);
    // const [loading , setLoading] = useState(false);
    // useEffect(() => {
    //     setLoading(true)
    //     getActions(endpoints.categories.LIST)
    //     .then((response : any)=>{
    //         console.log(response)
    //         //setCategories(response?.data)
    //     })
    //     .finally(()=>{
    //         setLoading(false)
    //     })
    
    //   return () => {
        
    //   }
    // }, [])
    
    
    return (
        <div>Categories</div>
    )
}

export default Categories
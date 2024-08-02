import { API_URL } from "../constants/environment.constants.ts";
import axios from "axios";
import { message } from "antd";

export const getActions = async (endpoint : string) => {
    try {
        const response = await axios.get(`${API_URL}${endpoint}`, {
             headers : {
                 "Content-Type" : "application/json",
                 Authorization : `Bearer ${sessionStorage.getItem("accessToken")}`,
                 'Access-Control-Allow-Origin': '*'
             }
        }
    );
        return response; 
    } catch (error) {
        message.error(error.message);
        console.log(error);
    }
}

export const postActions = async (endpoint : string , payload : any) => {
    try {
        const response = await axios.post(`${API_URL}${endpoint}` , payload , {
            headers : {
                Authorization : `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        });
        return response; 
    } catch (error) {
        message.error(error.message);
        console.log(error);
    }
}

export const putActions = async (endpoint : string , payload : any) => {
    try {
        const response = await axios.put(`${API_URL}${endpoint}` , payload , {
            headers : {
                Authorization : `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        });
        return response; 
    } catch (error) {
        message.error(error.message);
        console.log(error);
    }
}


export const deleteActions = async (endpoint : string) => {
    try {
        const response = await axios.delete(`${API_URL}${endpoint}`, {
            headers : {
                Authorization : `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        });
        return response; 
    } catch (error) {
        message.error(error.message);
        console.log(error);
    }
}
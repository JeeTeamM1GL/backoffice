import { API_URL } from "../constants/environment.constants.ts";
import axios from "axios";
import { message } from "antd";
import { endpoints } from "../constants/endpoints.constants.ts";

export const _getAllHotels = async () => {
    try {
        const response = await axios.get(`${API_URL}${endpoints.hotels.LIST}`, {
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


export const _getHotel = async (id : string) => {
    try {
        const response = await axios.get(`${API_URL}${endpoints.hotels.GET_BY_ID}/${id}`, {
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

export const _addHotel = async (payload : any) => {
    try {
        const response = await axios.post(`${API_URL}${endpoints.hotels.ADD}` , payload , {
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

export const _updateHotel = async (id : string , payload : any) => {
    try {
        const response = await axios.put(`${API_URL}${endpoints.hotels.UPDATE}/${id}` , payload , {
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


export const _deleteHotel = async (id : string) => {
    try {
        const response = await axios.delete(`${API_URL}${endpoints.hotels.DELETE}/${id}`, {
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
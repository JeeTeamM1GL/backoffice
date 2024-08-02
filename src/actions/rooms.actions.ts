import { API_URL, API_URL_2 } from "../constants/environment.constants.ts";
import axios from "axios";
import { message } from "antd";
import { endpoints } from "../constants/endpoints.constants.ts";

export const _getRoomsByHotelId = async (id : string) => {
    try {
        const response = await axios.get(`${API_URL_2}${endpoints.rooms.LIST_BY_HOTEL_ID}/${id}`, {
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


export const _getRoom = async (id : string) => {
    try {
        const response = await axios.get(`${API_URL_2}${endpoints.rooms.GET_BY_ID}/${id}`, {
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

export const _addRoom = async (payload : any) => {
    try {
        const response = await axios.post(`${API_URL_2}${endpoints.rooms.ADD}` , payload , {
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

export const _updateRoom = async (id : string , payload : any) => {
    try {
        const response = await axios.put(`${API_URL_2}${endpoints.rooms.UPDATE}/${id}` , payload , {
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


export const _deleteRoom = async (id : string) => {
    try {
        const response = await axios.delete(`${API_URL_2}${endpoints.rooms.DELETE}/${id}`, {
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
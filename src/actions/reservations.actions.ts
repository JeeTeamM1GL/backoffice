import { API_URL } from "../constants/environment.constants.ts";
import axios from "axios";
import { message } from "antd";
import { endpoints } from "../constants/endpoints.constants.ts";

export const _getReservationsByHotelId = async (id : string) => {
    try {
        const response = await axios.get(`${API_URL}${endpoints.reservations.LIST_BY_HOTEL_ID}/${id}`, {
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


export const _getReservation = async (id : string) => {
    try {
        const response = await axios.get(`${API_URL}${endpoints.reservations.GET_BY_ID}/${id}`, {
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

export const _addReservation = async (payload : any) => {
    try {
        const response = await axios.post(`${API_URL}${endpoints.reservations.ADD}` , payload , {
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

export const _updateReservation = async (id : string , payload : any) => {
    try {
        const response = await axios.put(`${API_URL}${endpoints.reservations.UPDATE}/${id}` , payload , {
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


export const _deleteReservation = async (id : string) => {
    try {
        const response = await axios.delete(`${API_URL}${endpoints.reservations.DELETE}/${id}`, {
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
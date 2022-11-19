import axios from "axios"
import { GET_ACCOUNT_INFO, GET_ALL_TRANSACTIONS, GET_USERNAME_BY_ACCOUNT_ID, POST_NEW_USER, POST_TRANSACTION } from "./routes"

export const getUserInfo = async() => {
  if(localStorage.getItem('user')){ 
    const user = JSON.parse(localStorage.getItem('user') as string)
  try {
    const res = await axios.get(GET_ACCOUNT_INFO,{headers:{'Authorization':user.token}})
    return {...res.data, message:'ok'}
  } catch (error) {
    if(axios.isAxiosError(error)) {
      return {message:error.response?.data.message}
    }
    }
  }
}

export const getUserByAccountId = async(id:number) => {
  if(localStorage.getItem('user')){ 
    const user = JSON.parse(localStorage.getItem('user') as string)
  try {
    const res = await axios.get(GET_USERNAME_BY_ACCOUNT_ID,{params:{id:id}, headers:{'Authorization':user.token}})
    return {...res.data, message:'ok'}
  } catch (error) {
    if(axios.isAxiosError(error)) {
      return {message:error.response?.data.message}
    }
    }
  }
}

export const postTransfer = async(username:string, value:string, token:string) => {
  try {
    console.log(token)
    const res = await axios.post(POST_TRANSACTION,{creditedAccountUsername:username,value:value},{headers:{'Authorization':token}})
    return res.data
  } catch (error) {
      if(axios.isAxiosError(error)) {
        console.log(error)
        return {message:error.response?.data.message}
      }
    }
}

export const postSignUp = async(username:string, value:string) => {
  try {
    const res = await axios.post(POST_NEW_USER,{username:username,password:value})
    return res.data
  } catch (error) {
      if(axios.isAxiosError(error)) {
        console.log(error)
        return {message:error.response?.data.message}
      }
    }
}

export const getAllTransactions = async() => {
  if(localStorage.getItem('user')){ 
    const user = JSON.parse(localStorage.getItem('user') as string)
  try {
    const res = await axios.get(GET_ALL_TRANSACTIONS,{headers:{'Authorization':user.token}})
    return {transactions:res.data, message:'ok'}
  } catch (error) {
    if(axios.isAxiosError(error)) {
      return {transactions:[], message:error.response?.data.message}
    }
    }
  }
}
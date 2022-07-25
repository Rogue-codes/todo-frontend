import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
import jwtDecode from 'jwt-decode'

const baseUrl = 'http://localhost:5000/api/'

const initialState = {
    token : localStorage.getItem('token'),
    name :'',
    email:'',
    _id: '',
    registerStatus: '',
    registerError: '',
    loginStatus: '',
    loginError: '',
    userLoaded: false
}

export const registerUser = createAsyncThunk(
    'auth/registerUser',
   async (value, {rejectWithValue})=>{
    try{
        const token = await axios.post(baseUrl + 'signup',{
            name: value.name,
            email: value.email,
            password: value.password,
        })
        localStorage.setItem('token', token.data)
        return token.data
    }catch(err){
        console.log(err.response.data)
        return rejectWithValue(err.response.data)
    }
    }
)

export const loginUser = createAsyncThunk(
    'auth/loginUser',
   async (value, {rejectWithValue})=>{
    try{
        const token = await axios.post(baseUrl + 'signin',{
            email: value.email,
            password: value.password,
        })
        localStorage.setItem('token', token.data)
        return token.data
    }catch(err){
        console.log(err.response.data)
        return rejectWithValue(err.response.data)
    }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        loadUser:(state, action)=>{
            const token = state.token
            if(token){
                const user = jwtDecode(token)
                return{
                    ...state,
                    token,
                    name: user.name,
                    email: user.email,
                    _id: user._id,
                    userLoaded: true
                }
            }
        },
        logOutUser:(state, action)=>{
            localStorage.removeItem('token')
            return{
                ...state,
                token : '',
                name :'',
                email:'',
                _id: '',
                registerStatus: '',
                registerError: '',
                loginStatus: '',
                loginError: '',
                userLoaded: false
            }
        }
    },
    extraReducers:{
        [registerUser.pending]: (state,action) => {
            return { ...state, registerStatus: 'pending' }
        },
        [registerUser.fulfilled]: (state,action)=>{
            if(action.payload){
                let user = jwtDecode(action.payload)
                return{
                    ...state,
                    token: action.payload,
                    name: user.name,
                    email: user.email,
                    _id: user._id,
                    registerStatus: "success"
                }
            }else return state
        },
        [registerUser.rejected]: (state,action)=>{
            return{
                ...state,
                registerStatus: "rejected",
                registerError: action.payload
            }
        },

        [loginUser.pending]: (state,action) => {
            return { ...state, loginStatus: 'pending' }
        },
        [loginUser.fulfilled]: (state,action)=>{
            if(action.payload){
                let user = jwtDecode(action.payload)
                return{
                    ...state,
                    token: action.payload,
                    name: user.name,
                    email: user.email,
                    _id: user._id,
                    loginStatus: "success"
                }
            }else return state
        },
        [loginUser.rejected]: (state,action)=>{
            return{
                ...state,
                loginStatus: "rejected",
                loginError: action.payload
            }
        }
    }
})
export const {loadUser,logOutUser} = authSlice.actions
export default authSlice.reducer
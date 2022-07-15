import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

const baseUrl = 'http://localhost:5000/api/'

const initialState = {
    todos:[],
    addTodoStatus:'',
    addTodoError:'',
    fetchTodoStatus:'',
    fetchTodoError:'',
    updateTodoStatus:'',
    updateTodoError:'',
    deleteTodoStatus:'',
    deleteTodoError:'',
    toggleTodoStatus:'',
    toggleTodoError:'',
    modal: false
}

export const todoPost = createAsyncThunk(
    'todo/todoPost',
    async(todo, {rejectWithValue} )=>{
        try{
            const response = await axios.post(baseUrl + 'todos', todo)
            return response.data
        }catch(err){
            console.log(err)
            return rejectWithValue(err.response.data)
        }

    }
)

export const todoFetch = createAsyncThunk(
    "todo/todoFetch",
    async (id=null, {rejectWithValue})=>{
        try{
            const res = await axios.get(baseUrl + 'todos')
            return res.data
        }catch(err){
            console.log(err)
            return rejectWithValue(err.response.data)
        }
    }
)

export const todoUpdate = createAsyncThunk(
    'todos/todoUpdate',
    async (todo, {rejectWithValue}) =>{
        try{
           const {_id, name, isComplete, priority,author, date} = todo

           const res = await axios.put(baseUrl + 'todos/' + _id, {name, isComplete, priority, author, date})

           return res.data
        }catch(err){
            console.log(err)
            return rejectWithValue(err.response.data)
        }
    }

)

export const todoDelete = createAsyncThunk(
    'todo/tododelete',
    async (_id, {rejectWithValue}) => {
        try{
            const res = await axios.delete(baseUrl + 'todos/' + _id)
            return res.data
        }catch(err){
            console.log(err)
            return rejectWithValue(err.response.data)
        }
    }
)

export const todoToggle = createAsyncThunk(
    "todo/todoToggle",
    async (_id, {rejectWithValue}) =>{
        try{
            const res = await axios.patch(baseUrl + 'todos/' + _id)
            return res.data
        }catch(err){
            console.log(err)
            return rejectWithValue(err.response.data)
        }
    }
)
const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers:{
        openModal : (state, action) => {           
            state.modal = !state.modal
        },
    },
    extraReducers:{
        [todoPost.pending]: (state, action) => {
            return{
                ...state,
                addTodoStatus:'pending',
                addTodoError:'',
                fetchTodoStatus:'',
                fetchTodoError:'',
                updateTodoStatus:'',
                updateTodoError:'',
                deleteTodoStatus:'',
                deleteTodoError:'',
            }
        },
        [todoPost.fulfilled]: (state, action) => {
            return{
                ...state,
                todos: [action.payload, ...state.todos],
                addTodoStatus:'success',
                addTodoError:'',
                fetchTodoStatus:'',
                fetchTodoError:'',
                updateTodoStatus:'',
                updateTodoError:'',
                deleteTodoStatus:'',
                deleteTodoError:'',
            }
        },
        [todoPost.rejected]: (state, action) => {
            return{
                ...state,
                addTodoStatus:'rejected',
                addTodoError: action.payload,
                fetchTodoStatus:'',
                fetchTodoError:'',
                updateTodoStatus:'',
                updateTodoError:'',
                deleteTodoStatus:'',
                deleteTodoError:'',
            }
        },
        [todoFetch.pending]: (state, action) => {
            return{
                ...state,
                addTodoStatus:'',
                addTodoError:'',
                fetchTodoStatus:'pending',
                fetchTodoError:'',
                updateTodoStatus:'',
                updateTodoError:'',
                deleteTodoStatus:'',
                deleteTodoError:'',
            }
        },
        [todoFetch.fulfilled]: (state, action) => {
            return{
                ...state,
                todos:action.payload,
                addTodoStatus:'',
                addTodoError:'',
                fetchTodoStatus:'success',
                fetchTodoError:'',
                updateTodoStatus:'',
                updateTodoError:'',
                deleteTodoStatus:'',
                deleteTodoError:'',
            }
        },
        [todoFetch.rejected]: (state, action) => {
            return{
                ...state,
                addTodoStatus:'',
                addTodoError: '',
                fetchTodoStatus:'rejected',
                fetchTodoError:'action.payload',
                updateTodoStatus:'',
                updateTodoError:'',
                deleteTodoStatus:'',
                deleteTodoError:'',
            }
        },
        [todoUpdate.pending]: (state, action) => {
            return{
                ...state,
                addTodoStatus:'',
                addTodoError:'',
                fetchTodoStatus:'',
                fetchTodoError:'',
                updateTodoStatus:'pending',
                updateTodoError:'',
                deleteTodoStatus:'',
                deleteTodoError:'',
            }
        },
        [todoUpdate.fulfilled]: (state, action) => {
            const updatedTodo = state.todos.map((todo) => todo._id === action.payload._id ? action.payload : todo)
            return{
                ...state,
                todos: updatedTodo,
                addTodoStatus:'',
                addTodoError:'',
                fetchTodoStatus:'',
                fetchTodoError:'',
                updateTodoStatus:'success',
                updateTodoError:'',
                deleteTodoStatus:'',
                deleteTodoError:'',
            }
        },
        [todoUpdate.rejected]: (state, action) => {
            return{
                ...state,
                addTodoStatus:'',
                addTodoError: '',
                fetchTodoStatus:'',
                fetchTodoError:'',
                updateTodoStatus:'rejected',
                updateTodoError: action.payload,
                deleteTodoStatus:'',
                deleteTodoError:'',
            }
        },
        [todoDelete.pending]: (state, action) => {
            return{
                ...state,
                addTodoStatus:'',
                addTodoError:'',
                fetchTodoStatus:'',
                fetchTodoError:'',
                updateTodoStatus:'',
                updateTodoError:'',
                deleteTodoStatus:'pending',
                deleteTodoError:'',
            }
        },
        [todoDelete.fulfilled]: (state, action) => {
            const updatedTodo = state.todos.filter((todo) => todo._id !== action.payload._id)
            return{
                ...state,
                todos: updatedTodo,
                addTodoStatus:'',
                addTodoError:'',
                fetchTodoStatus:'',
                fetchTodoError:'',
                updateTodoStatus:'',
                updateTodoError:'',
                deleteTodoStatus:'success',
                deleteTodoError:'',
            }
        },
        [todoDelete.rejected]: (state, action) => {
            return{
                ...state,
                addTodoStatus:'',
                addTodoError: '',
                fetchTodoStatus:'',
                fetchTodoError:'',
                updateTodoStatus:'',
                updateTodoError: '',
                deleteTodoStatus:'rejected',
                deleteTodoError:action.payload,
            }
        },
        [todoToggle.pending]: (state, action) => {
            return{
                ...state,
                addTodoStatus:'',
                addTodoError:'',
                fetchTodoStatus:'',
                fetchTodoError:'',
                updateTodoStatus:'',
                updateTodoError:'',
                deleteTodoStatus:'',
                deleteTodoError:'',
                toggleTodoStatus:'pending',
                toggleTodoError:'',
            }
        },
        [todoToggle.fulfilled]: (state, action) => {
            const updatedTodo = state.todos.map((todo) => todo._id === action.payload._id ? action.payload : todo)
            return{
                ...state,
                todos: updatedTodo,
                addTodoStatus:'',
                addTodoError:'',
                fetchTodoStatus:'',
                fetchTodoError:'',
                updateTodoStatus:'',
                updateTodoError:'',
                deleteTodoStatus:'',
                deleteTodoError:'',
                toggleTodoStatus:'success',
                toggleTodoError:'',
            }
        },
        [todoToggle.rejected]: (state, action) => {
            return{
                ...state,
                addTodoStatus:'',
                addTodoError: '',
                fetchTodoStatus:'',
                fetchTodoError:'',
                updateTodoStatus:'',
                updateTodoError: '',
                deleteTodoStatus:'',
                deleteTodoError:'',
                toggleTodoStatus:'rejected',
                toggleTodoError:action.payload,
            }
        },
    }
})

export const {openModal} = todoSlice.actions
export default todoSlice.reducer
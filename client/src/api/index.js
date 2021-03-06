import axios from 'axios'

const api = axios.create({
    baseURL: 'https://rest-express-app.herokuapp.com/api',
})

export const insertTask = payload => api.post(`/task`, payload)
export const getAllTasks = () => api.get(`/tasks`)
export const getDoneTasks = () => api.get(`/done_tasks`)
export const updateTask = (id, payload) => api.put(`/task/${id}`, payload)
export const deleteTaskById = id => api.delete(`/task/${id}`)
export const deleteAllTasks = () => api.delete(`/tasks`)
export const getTaskById = id => api.get(`/task/${id}`)

const apis = {
    insertTask,
    getAllTasks,
    getDoneTasks,
    updateTask,
    deleteTaskById,
    deleteAllTasks,
    getTaskById,
}

export default apis


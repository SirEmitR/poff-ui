import request from "./request"

export default async function uploadFile(file, path){
    const formData = new FormData()
    formData.append('file', file)
    formData.append('path', path)
    const response = await request(`/archivos`, 'POST', formData, true)
    return response.data.url
}
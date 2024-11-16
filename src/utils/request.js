export default function request(endpoint, method = 'GET', data, formData = false) {
    return new Promise((resolve, reject) => {
        const url = process.env.NEXT_PUBLIC_API_URL
        const path = process.env.NEXT_PUBLIC_API_PATH
        const requestUrl = `${url}${path}${endpoint}`
        let headers = {
            'Content-Type': 'application/json',
        }
        fetch(requestUrl, {
            method,
            headers: formData ? {} : headers,
            credentials: 'include',
            body: formData ? data : JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => resolve(data))
        .catch(error => reject(error))
    }
)}
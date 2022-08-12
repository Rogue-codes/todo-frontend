export const setHeaders = () =>{
    const headers = {
        header: {
            'x-auth-token' : localStorage.getItem("token")
        }
    };
    return headers
}
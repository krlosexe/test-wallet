const Api      = 'http://localhost:4000/api'
const base_url = function base_url(server, uri){
    return `${server}/${uri}`
}
export  {
    base_url,
    Api
}
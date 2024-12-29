import https from "https"

const getRequest = async (url: string) => {
    return new Promise((resolve) => {
        let data = ''

        https.get(url, res => {
            res.on('data', chunk => { data += chunk })
            res.on('end', () => {
                resolve(data);
            })
        })
    })
}


export default getRequest
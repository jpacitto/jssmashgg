const axios = require('axios');
const URL = "https://api.smash.gg/gql/alpha";

async function run_query (query, variables, token) {
    const data = {
        query: query,
        variables: variables
    }

    const headers = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }

    try
    {
        const response = await axios.post(URL, data, headers);
        return response;
    }
    catch(error)
    {
        if(error.response.status === 429) {
            throw new Error("Sending too many requests right now, try again in like 30 seconds -- this will usually fix the error");
        }else if(error.response.status > 299 || error.response.status < 200) {
            throw new Error(`error code: ${error.response.status}\nerror response: ${error.response.statusText}`)
        }
    }
}

module.exports = { run_query };
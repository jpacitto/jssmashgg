const axios = require('axios');
const URL = "https://api.smash.gg/gql/alpha";

exports.run_query = async (query, variables, token) => {
    const data = {
        query: query,
        variables: variables
    }

    const headers ={
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }

    try 
    {
        const response = await axios.get(URL, data, headers);
        console.log(response);
    }
    catch(error)
    {
        console.error(error);
    }
}

// const axios = require('axios');
// const URL = "https://api.smash.gg/gql/alpha";

// const token = '';
// const tournament_name = "genesis-7";

// memes();

// async function memes() {
//     try {
//         let data = await axios.post(URL, {
//             query: `query ($tourneySlug: String!) {
//                 tournament(slug: $tourneySlug) {
//                   events {
//                     id
//                     slug
//                   }
//                 }
//             }`,
//             variables: {
//                 tourneySlug: tournament_name
//             }
//         }, {
//             headers: {
//                 'Content-Type': "application/json",
//                 "Authorization": `Bearer ${token}`
//             }
//         });

//         console.log(data.data.data.tournament.events);
//     }catch(error) {
//         console.log(error);
//     }
// }
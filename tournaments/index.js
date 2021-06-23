const t_queries = require('./t_queries');
const { run_query } = require('../api');
const  filters = require('./filters');

function get_player_id(event_id, player_name, token) {
    let variables = {"eventId": event_id, "name": player_name};
    let response = run_query(t_queries.PLAYER_ID_QUERY, variables, token);
}

// Helper function to get an eventId from a tournament
async function get_event_id(tournament_name, event_name, token) {
    let variables = {"tourneySlug": tournament_name};
    let response = await run_query(t_queries.EVENT_ID_QUERY, variables, token);
    return filters.event_id_filter(response.data, event_name);
}

// Shows all entrants from a specific event
async function show_entrants(tournament_name, event_name, page_num, token) {
    let event_id = await get_event_id(tournament_name, event_name, token);
    let variables = {"eventId": event_id, "page": page_num};
    let response = await run_query(t_queries.SHOW_ENTRANTS_QUERY, variables, token)
    return filters.show_entrants_filter(response.data);
}

async function show_sets(tournament_name, event_name, page_num, token) {
    let event_id = await get_event_id(tournament_name, event_name, token);
    let variables = {"eventId": event_id, "page": page_num};
    let response = await run_query(t_queries.SHOW_SETS_QUERY, variables, token);
    return filters.show_sets_filter(response.data);
}

module.exports = {
    get_player_id,
    get_event_id,
    show_entrants,
    show_sets
}
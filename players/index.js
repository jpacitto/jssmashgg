const p_queries = require('./p_queries');
const { run_query } = require('../api');
const filters = require('./filters');

async function get_upcoming_player_tournys(player_id, page, token) {
    let variables = {"playerId": player_id, "page": page};
    let response = await run_query(p_queries.PLAYER_SHOW_TOURNAMENTS_QUERY, variables, token);
    return filters.upcoming_player_tournys(response.data);
}

module.exports = {
    get_upcoming_player_tournys
}
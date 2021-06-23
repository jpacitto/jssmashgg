const tournaments = require('./tournaments');
const players = require('./players');

class SmashGG {
    constructor(token) {
        this.token = token;
    }

    // tournament data
    tournament_show_event_id(tournament_name, event_name) {
        return tournaments.get_event_id(tournament_name, event_name, this.token);
    }

    tournament_show_entrants(tournament_name, event_name, page_num) {
        return tournaments.show_entrants(tournament_name, event_name, page_num, this.token);
    }

    tournament_show_sets(tournament_name, event_name, page_num) {
        return tournaments.show_sets(tournament_name, event_name, page_num, this.token);
    }

    // player data
    player_upcoming_tournaments(player_id, page) {
        return players.get_upcoming_player_tournys(player_id, page, this.token);
    }
}

module.exports = {
    SmashGG
};
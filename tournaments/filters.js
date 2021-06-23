function event_id_filter(response, event_name) {
    if(response.data.tournament === undefined) {
        return;
    }

    for(const event of response.data.tournament.events) {
        if(event.slug.split("/").pop() === event_name) {
            return event.id;
        }
    }

    return;
}

function show_entrants_filter(response) {
    if(response.data.event === undefined) {
        return;
    }

    if(response.data.event.standings.nodes === undefined) {
        return;
    }

    let entrants = [];

    response.data.event.standings.nodes.forEach((node) => {
        entrants.push({ id: node.entrant.id, playerTag: node.entrant.name });
    });

    return entrants;
}

function show_sets_filter(response) {
    let sets = response.data.event.sets.nodes;

    let matches = [];

    sets.forEach((set) => {
        let match = {};

        match.id = set.id;
        match.player1Tag = set.slots[0].entrant.participants[0].player.gamerTag;
        match.player2Tag = set.slots[1].entrant.participants[0].player.gamerTag;

        match.player1Score = set.slots[0].standing.stats.score.value;
        match.player2Score = set.slots[1].standing.stats.score.value;

        match.winner = match.player1Score > match.player2Score ? match.player1Tag : match.player2Tag;

        matches.push(match);
    });

    return matches;
}

module.exports = {
    event_id_filter,
    show_entrants_filter,
    show_sets_filter
}
const { SmashGG } = require('./smashgg');
require('dotenv').config()


const smashgg = new SmashGG(process.env.SMASHGG_API_TOKEN);

main();

async function main() {
    let entrants = await smashgg.player_upcoming_tournaments(1000, 1);
}


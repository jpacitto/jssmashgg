// Queries for tournaments.py
const PLAYER_ID_QUERY = `query EventEntrants($eventId: ID!, $name: String!) {
    event(id: $eventId) {
    entrants(query: {
      page: 1
      perPage: 32
      filter: {name: $name}
    }) {
      nodes {
        participants {
          gamerTag
          player {
            id 
          }
        }
      }
    }
    }
    }`;

const EVENT_ID_QUERY = `query ($tourneySlug: String!) {
  tournament(slug: $tourneySlug) {
    events {
      id
      slug
    }
  }
}`;

const ENTRANT_ID_QUERY = `query EventEntrants($eventId: ID!, $name: String!) {
    event(id: $eventId) {
    entrants(query: {
      page: 1
      perPage: 32
      filter: {
        name: $name
      }
    }) {
      nodes {
        id
        name
      }
    }
    }
    }`

const SHOW_QUERY = `query ($tourneySlug: String!) {
  tournament(slug: $tourneySlug) {
    id
    name
    countryCode
    addrState
    city
    startAt
    endAt
    numAttendees
  }
}`;


const SHOW_WITH_BRACKETS_QUERY = `query ($tourneySlug: String!) {
  tournament(slug: $tourneySlug) {
    id
    name
    countryCode
    addrState
    city
    startAt
    endAt
    numAttendees
    events {
      id
      name
      slug
      phaseGroups {
        id
      }
    }
  }
}`

const SHOW_EVENTS_QUERY = `query ($tourneySlug: String!) {
  tournament(slug: $tourneySlug) {
    events {
      id
      name
      slug
      numEntrants
    }
  }
}`;

const SHOW_SETS_QUERY = `query EventSets($eventId: ID!, $page: Int!) {
  event(id: $eventId) {
    sets(page: $page, perPage: 25) {
      nodes {
        id
        slots {
          standing {
            id
            placement
            stats {
              score {
                value
              }
            }
          }
          entrant {
            id
            name
            participants {
              player {
                id
                gamerTag
              }
            }
          }
        }
        phaseGroup {
          id
          phase {
            name
          }
        }
      }
    }
  }
}`


const SHOW_ENTRANTS_QUERY = `query EventStandings($eventId: ID!, $page: Int!) {
  event(id: $eventId) {
    id
    name
    standings(query: {
      perPage: 25,
      page: $page}){
      nodes {
        placement
        entrant {
          id
          name
          participants {
            player {
              id
              gamerTag
            }
          }
          seeds {
            seedNum
          }
        }
      }
    }
  }
}`

const SHOW_EVENT_BRACKETS_QUERY = `query ($tourneySlug: String!) {
  tournament(slug: $tourneySlug) {
    events {
      name
      slug
      phaseGroups {
        id
      }
    }
  }
}`

const SHOW_ENTRANT_SETS_QUERY = `query EventSets($eventId: ID!, $entrantId: ID!, $page: Int!) {
  event(id: $eventId) {
    sets(
      page: $page
      perPage: 16
      filters: {
        entrantIds: [$entrantId]
      }
    ) {
      nodes {
        id
        fullRoundText
        slots {
          standing {
            placement
            stats {
              score {
                value
              }
            }
          }
          entrant {
            id
            name
          }
        }
        phaseGroup {
          id
        }
      }
    }
  }
}`

const SHOW_EVENT_BY_GAME_SIZE_DATED_QUERY = `query TournamentsByVideogame($page: Int!, $videogameId: [ID!], $after: Timestamp!, $before: Timestamp!) {
  tournaments(query: {
    perPage: 32
    page: $page
    sortBy: "startAt asc"
    filter: {
      past: false
      videogameIds: $videogameId
      afterDate: $after
      beforeDate: $before
    }
  }) {
    nodes {
      name
      id
      slug
      isOnline
      endAt
      events {
        name
        id
        numEntrants
        videogame {
          id
        }
      }
    }
  }
}`

const SHOW_LIGHTWEIGHT_RESULTS_QUERY = `query EventStandings($eventId: ID!, $page: Int!,) {
  event(id: $eventId) {
    standings(query: {
      perPage: 64,
      page: $page
    }){
      nodes {
        placement
        entrant {
          name
          id
        }
      }
    }
  }
}`

const SHOW_BY_COUNTRY_QUERY = `query TournamentsByCountry($countryCode: String!, $page: Int!) {
  tournaments(query: {
    perPage: 32,
    page: $page,
    sortBy: "startAt desc"
    filter: {
      countryCode: $countryCode
    }
  }) {
    nodes {
      id
      name
      slug
      numAttendees
      addrState
      city
      startAt
      endAt
      state
    }
  }
}`

const SHOW_BY_STATE_QUERY = `query TournamentsByState($state: String!, $page: Int!) {
  tournaments(query: {
    perPage: 32
    page: $page
    filter: {
      addrState: $state
    }
  }) {
    nodes {
      id
      name
      slug
      numAttendees
      city
      startAt
      endAt
      state
    }
  }
}`

const SHOW_BY_RADIUS_QUERY = `query ($page: Int, $coordinates: String!, $radius: String!) {
  tournaments(query: {
    page: $page
    perPage: 32
    filter: {
      location: {
        distanceFrom: $coordinates,
        distance: $radius
      }
    }
  }) {
    nodes {
      id
      name
      slug
      numAttendees
      countryCode
      addrState
      city
      startAt
      endAt
      state
    }
  }
}`

const SHOW_PLAYERS_BY_SPONSOR = `query ($slug:String!, $sponsor: String!) {
  tournament(slug: $slug) {
    participants(query: {
      filter: {
        search: {
          fieldsToSearch: ["prefix"],
          searchString: $sponsor
        }
      }
    }) {
      nodes {
        id
        gamerTag
        user {
          name
          location {
            country
            state
            city
          }
          player {
            id
          }
        }
      }
    }
  }
}`


module.exports = {
  PLAYER_ID_QUERY,
  EVENT_ID_QUERY,
  ENTRANT_ID_QUERY,
  SHOW_QUERY,
  SHOW_WITH_BRACKETS_QUERY,
  SHOW_EVENTS_QUERY,
  SHOW_SETS_QUERY,
  SHOW_ENTRANTS_QUERY,
  SHOW_EVENT_BRACKETS_QUERY,
  SHOW_ENTRANT_SETS_QUERY,
  SHOW_EVENT_BY_GAME_SIZE_DATED_QUERY,
  SHOW_LIGHTWEIGHT_RESULTS_QUERY,
  SHOW_BY_COUNTRY_QUERY,
  SHOW_BY_STATE_QUERY,
  SHOW_BY_RADIUS_QUERY,
  SHOW_PLAYERS_BY_SPONSOR
}
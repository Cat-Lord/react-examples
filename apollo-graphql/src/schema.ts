import { gql } from "apollo-server";

// graphQL schema definition
export const typeDefs = gql`

  type Query {
    sessions: [Session]
  }

  type Speaker {
    id: ID!
    name: String!
  }

  type Session {
    id: ID!
    title: String
    description: String
    startsAt: String
    endsAt: String
    room: String
    speakers: [Speaker]
    day: String
    format: String
    track: String @deprecated(reason: "Too many sessions don't fit into single track, use tag instead")
    level: String
  }
`
// import sessionsData from '../data/sessions.json';

import { Context } from "apollo-server-core";


// this syntax creates a 'sessionData' object and adds
// the values into it. We would need to query the data 
// with Object.values(sessionData);
// import * as sessionsData from '../data/sessions.json';

export const resolvers = {
  Query: {

    // using the 'json' file we can simply return an array
    // sessions: ()  => {
    //   return sessionsData;
    // }

    sessions: (previousObject: Object, args: any[], context: any) => {
      return context.dataSources.SessionAPI.getSessions();
    }
  }
}
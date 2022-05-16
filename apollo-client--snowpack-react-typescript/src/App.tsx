import React, { useEffect } from 'react';
import { Book, Maybe, useRandomQuery } from './graphql/generated/graphql';

interface AppProps { }

function App({ }: AppProps) {
  const { data, loading, error } = useRandomQuery();

  if (error) {
    console.log(error);
    return <h2>Error</h2>
  }

  if (loading)
    return <h4>Loading....</h4>

  return (
    <ul>
      {
        data?.allBooks?.map((book: Maybe<Book>) => {
          if (!book)
            return <li>No book</li>;
          return <li key={book.id}> <p>{book.name}</p></li>;
        })
      }
    </ul>
  );
}

export default App;

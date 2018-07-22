import React from "react";
import { render } from "react-dom";

import ApolloClient from "apollo-boost";
import { ApolloProvider, Query } from "react-apollo";
import gql from "graphql-tag";
import {InMemoryCache} from 'apollo-cache-inmemory';

const cache = new InMemoryCache();
const client = new ApolloClient({
  uri: `http://localhost:5555/graphql`,
  cache,
  clientState: {
    defaults: {},
    resolvers: {}
  }
});

// Fetch GraphQL data with plain JS
// client
//   .query({
//     query: gql`
//       {
//         lgdVersions {
//           versionId
//           modelName
//           version
//         }
//       }
//     `
//   })
//   .then(({ data }) => console.log({ data }));

// Fetch GraphQL data with a Query component
const MainModelsPage = () => (
  <Query
    query={gql`
      {
        lgdVersions {
          versionId
          modelName
          version
          status
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      return data.lgdVersions.map(({ versionId, modelName }) => (
        <div key={versionId}>
          <p>VersionId : {`${versionId}`} </p>
          <p> Model Name: {`${modelName}`}</p>
        </div>
      ));
    }}
  </Query>
);

const OneVersionPage = () => (
  <Query
    query={gql`
      {
        lgdVersions {
          versionId
          modelName
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      return data.lgdVersions.map(({ versionId, modelName }) => (
        <div key={versionId}>
          <p> Name: {`${modelName}`}</p>
        </div>
      ));
    }}
  </Query>
);

const App = () => (
  <ApolloProvider client={client}>
    <div>
      <h2>My first Apollo app 🚀</h2>
      <MainModelsPage />
      <OneVersionPage />
    </div>
  </ApolloProvider>
);

render(<App />, document.getElementById("root"));

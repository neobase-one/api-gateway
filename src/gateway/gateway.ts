import { ApolloServer } from '@apollo/server'
import { ApolloGateway, IntrospectAndCompose } from '@apollo/gateway'
import { startServerAndCreateLambdaHandler } from '@as-integrations/aws-lambda'

const NODE_ENV = process.env.NODE_ENV || 'production'

const EXPLORER_HASURA_API = process.env.EXPLORER_HASURA_API
const DEX_SUBGRAPH = process.env.DEX_SUBGRAPH
const LENDING_SUBGRAPH = process.env.LENDING_SUBGRAPH
const SPLITS_SUBGRAPH = process.env.SPLITS_SUBGRAPH
const SYNAPSE_SUBGRAPH = process.env.SYNAPSE_SUBGRAPH
const SQL_SERVERLESS = process.env.SQL_SERVERLESS

const gateway = new ApolloGateway({
  supergraphSdl: new IntrospectAndCompose({
    subgraphs: [
      { name: 'explorer_hasura', url: EXPLORER_HASURA_API },
      { name: 'dex_subgraph', url: DEX_SUBGRAPH },
      { name: 'lending_subgraph', url: LENDING_SUBGRAPH },
      { name: 'splits_subgraph', url: SPLITS_SUBGRAPH },
      { name: 'synapse_subgraph', url: SYNAPSE_SUBGRAPH },
      { name: 'sql_serverless', url: SQL_SERVERLESS },
    ],
  }),
})

const server = new ApolloServer({
  gateway,
})

export const gatewayHandler = startServerAndCreateLambdaHandler(server)

import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import './index.css'
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws'

// Create WebSocket Client
const wsClient = new SubscriptionClient(
  'wss://subscriptions.graph.cool/v1/cj1npvp93esvi0153e1v9hvy4',
  {
    reconnect: true,
  },
)

const networkInterface = createNetworkInterface({
  uri: 'https://api.graph.cool/simple/v1/cj1npvp93esvi0153e1v9hvy4',
})

// Extend the network interface with the websocket
const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(networkInterface, wsClient)

const client = new ApolloClient({
  networkInterface: networkInterfaceWithSubscriptions,
  dataIdFromObject: o => o.id,
})

const freecom = {
  render,
  companyName: 'Graphcool',
  companyLogoURL: 'http://imgur.com/qPjLkW0.png',
  mainColor: 'rgba(39,175,96,1)',
}

function render(element) {
  if (!element) {
    const root = document.createElement('div')
    root.id = '__freecom-root__'
    document.body.appendChild(root)
    element = root
  }

  ReactDOM.render(
    <ApolloProvider client={client}>
      <App freecom={freecom} />
    </ApolloProvider>,
    element,
  )
}

render(document.getElementById('__freecom-root__'))

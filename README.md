# Fifa Dashboard App (fifa-dashboard)

Dashboard to visualize FIFA player performance

Back-end: https://github.com/tranmani/Fifa-Dashboard-API-public

## Install the dependencies
```bash
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```


### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).


# Example GraphQL calls

## Simple Querry

```js
const LOGIN = gql`
  query loginList($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      email
    }
  }
`;

data() {
  return {
    email: "",
    password: "",
  };
},

this.$apollo
  .query({
    query: LOGIN,
    variables: {
      email: this.email,
      password: this.password,
    },
  })
  .then((data) => {
    // DO SOMETHING IF SUCCESS
  })
  .catch((error) => {
    if (error) {
      // DO SOMETHING IF HAVE ERROR
    }
  });
```

## Simple Subscription (Websocket)

```js
const REAL_TIME_XML = gql`
  subscription {
    newXML {
      name
      xmin
      ymin
      xmax
      ymax
    }
  }
`;

data() {
  return {
    data: [],
  };
},

apollo: {
  $subscribe: {
    data: {
      query: REAL_TIME_XML,
      result({ data }) {
        this.data.push(data.newXML);
      },
    },
  },
},
```
OR
```js
const this_ = this;
this.$apollo
  .subscribe({
    query: REAL_TIME_XML,
  })
  .subscribe({
    next(data) {
      this_.data.push(data.data.newXML);
    },
    error(err) {
      console.error("err", err);
    },
  });
```

## Simple Subscription To More (Websocket)

```js
const ALL_XML = gql`
  {
    allXML {
      name
      xmin
      ymin
      xmax
      ymax
    }
  }
`;

const REAL_TIME_XML = gql`
  subscription {
    newXML {
      name
      xmin
      ymin
      xmax
      ymax
    }
  }
`;

data() {
  return {
    data: [],
  };
},

apollo: {
  data: {
    query: ALL_XML,
    update(data) {
      return data.allXML;
    },
    subscribeToMore: {
      document: REAL_TIME_XML,
      updateQuery: (previousResult, { subscriptionData }) => {
        if (previousResult) {
          return {
            data: previousResult.allXML.push(subscriptionData.data.newXML),
          };
        }
      },
    },
  },
},
```

---
layout: post
title: Building and testing an API with Express, Mongo, and Chai
---

Recently, I've been going through the Express, Mongoose, and Chai docs in order to help build out and test an API that's going to be used for ACM Hack, a committee of UCLA's CS club that focuses on teaching students new technlogies and frameworks, as well as fostering/building an environment of hackers and makers at UCLA. Thus, we're completely revamping Hack for the next quarter with regular events, projects, and additional content in terms of blog posts and tutorials for our users. To do this, we needed to revamp the Hack website over this ongoing winter break. 

Specifically, a few backend tasks were required, in the form of creating a functional API to support the needs of our front-end developers and users: 

- Create, update, get, and delete Events (an Event, for example, could be an "Android Workshop Session")
- Create, update, get, and delete Showcase Projects (these our projects that our hack members submit to us, and we showcase the coolest/most innovative projects)
- Securing this API through the use of tokens, to make sure that requests cannot be spammed.
- Create an email list API endpoint, that allows users to subscribe to our mailing list that notifies them about new events or important updates.
- Create Mongoose Schemas for all of the above data types. 

### Tools Used
On the backend, we decided to use MongoDB for our database, Express.js for our web framework, and Mocha/Chai for unit tests. The first order of business was to create database schemas for all of the above data types. We used `mongoose` to interact with our MongoDB database. Mongoose allows us to define object models that we can save and retrieve from our database. From the MongooseJS docs, models are compiled from their schema definitions and represent specific documents in our database. The models also handle document creation and retrieval. 

To take the example of creating our mailing list API endpoint, it would be useful to have an email schema that contains both the user's email address as well as the user's name. Moreover, we'd like to be able to retrieve all emails in a single request. Here's the schema that we defined for emails: 

<script src="https://gist.github.com/rohan-varma/1cde65d7e093ddfc24d048a28dcc4af0.js"></script>

We defined a `getAll` function in our schema to support querying for the entire mailing list. From the MongooseJS docs, each model has `find`, `findById`, `findOne` and a few other useful functions that we can use to retrieve particular documents. We primarily used the `find` function, that has a few interesting use cases: 

<script src="https://gist.github.com/rohan-varma/20889e90b5bc7f7d348d214753397a05.js"></script>

We used the latter to return all email documents, thus providing us with our mailing list. 

Next, we created a `mongoose` instance and connected it to MongoDB. There are several ways to create your own MongoDB instance, a popular choice being [MongoLab](https://mlab.com). We also exported our schemas so that they can be instantiated in other areas of our application, namely, in our API where these models will be created and accessed. The following code connects the `mongoose` instance and exports the schemas: 

<script src="https://gist.github.com/rohan-varma/ad8eb415c940d359e31159fc6ee4d327.js"></script>

### Defining Our API Endpoint with Express

The next step was to set up the Express framework and begin to define routes and endpoints for our application. [Express](http://expressjs.com/) is a minimal web framework that is essentially composed of two things: routing and middleware functions. At a high level, routing defines endpoints for your application that can be accessed to perform certain actions (ie, GET or POST certain data). In other words, it defines the structure that is used for interaction with the backend of your web app. An Express route essentially maps a URL to a specific set of functions, called middleware functions. Middleware functions are quite powerful, and are capable of the following actions: 

- Execute any code on the server
- Modify the request (req) and response (res) object
- Access the next middleware function on the stack, denoted by `next()`
- End the request/response cycle. 

For example, we can create a route for obtaining and sending data to our mailing list. To do this, we will create a router that maps the URL `/api/v1/email/:email?` to a set of functions. The last part of the URL, `:email?` is an an optional URL parameter. First, we can define middleware functions for this URL, which will also take care of the behavior of the endpoint without the optional argument: 

<script src="https://gist.github.com/rohan-varma/5ff1f324e9524332468f77ec9233a4c1.js"></script>

In other files in our `api` directory of our application, we can tell Express to use certain routers for specific API endpoints. This way, routers can be composed: the `/api` endpoint can have routes for each API version, and each API version can have routes for its several endpoints that access data such as the mailing list or upcoming events:

```javascript
//require the routers implemented for each data type
router.use(‘/event’, require(‘./event’).router);
router.use(`/email`, require(`./email).router);
router.use(`/showcase`, require(`./showcase).router);
module.exports = {router};
```

```javascript
//require routers for each version of the API implemented
router.use(‘/v1’, require(‘./v1’).router); 
module.exports = {router};
```

With this setup, our application's data was organized into several different API endpoints. Next, we had to actually implement each middleware function for each of our API endpoints. To do this, we had to think about our API's design at a granular level: what fields will we require for particular requests? Which requests will need token authentication? What will the response body look like in the case of success and in the case of failure? 


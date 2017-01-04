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

```
Email.find({email: "rvarm1@ucla.edu"}, (err, users) => err ? console.log(err) : console.log(users)); //find all documents matching email of "rvarm1@ucla.edu", and pass the results to an anonymous function. 
Email.find({}, (err, users) => err ? console.log(err) : console.log(users)); //no matching specified, so retrieve all documents.
```

We used the latter to return all email documents, thus providing us with our mailing list. 

The first step was to create a `mongoose` instance and connect it to our MongoDB database. There are several ways you can create your own MongoDB instance, a popular choice being [MongoLab](https://mlab.com/). 


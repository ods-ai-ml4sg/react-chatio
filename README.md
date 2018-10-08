### How to use
To begin the development, run `npm start` in this folder.\
To create a production bundle, use `npm run build`.\
To build Docker image `docker build  -t chatio:latest .`\
To run Docker image `docker run --rm -it -p 8080:8080 chatio:latest`\
and access it via browser on `http://localhost:8080`\


### Features I didn't make due to out of time
* isLoading state
* true authentication and ACL's
* external storage for messages and messages state
* namespaces in socket.io
* schemas for events
* templating/rendering for messages
* performance optimizations: props bindings, state structure
* full test suite + eslint 

### Technical design considerations:
Backend is meant to be stateless component and synchronize 
state with external storage (AWS S3 or OpenShift Object storage). 
Each 'workspace/team' should have separate instance of backend.

This way chat service can have nice strategies for deployments 
and scaling challenges:

Public connection\
|\
|\
Fleet of backends <--> Obj state storage <--> External indexers (ES, Solr)<br/> 
|\
|\
Redis cluster for state pub/sub updates   


This way we can have blue\green deployments and scale backend when we need that

### How to use
To begin the development, run `npm start` in this folder.\
To create a production bundle, use `npm run build`.\
To build Docker image `docker build  -t chatio:latest .`\
To run Docker image `docker run --rm -it -p 8080:8080 chatio:latest`\
and access it via browser on `http://localhost:8080`\


### Features I didn't make due to out of time
* isLoading states
* true authentication and ACL's
* external storage for messages and messages state
* use socket.io to isolate communication channels
* schemas for events
* templating/rendering for messages
* performance optimizations: props bindings, state structure
* caching layers
* full test suite + eslint 

### Technical design considerations:
Backend is meant to be stateless component and synchronize 
state through external storage (AWS S3 or OpenShift Object storage). 
Each 'workspace/team' should have separate instance of backend.

This way chat service can have nice strategies for deployments 
and scaling challenges:

![Diagram](https://raw.githubusercontent.com/ods-ai-ml4sg/react-chatio/master/docs/images/chat.png)

Keeping state in S3 Buckets enable us versioning of state, HA. State should be stored 
using Event Sourcing pattern. This can be achieved either handling event sourcing on backend side
or using serverless API like AWS Lambda to assemble latest state. Redis cluster should be used to
pub/sub of updates when multiple backend instances push new events to the same state, so backends
would update caches/current state.

This way we can have blue\green deployments and scale backends per workspace/team when we need that

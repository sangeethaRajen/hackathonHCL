# Ecommerce Site(2 React, 1 Node)

## TechStack
 - React(FrontEnd)
    - Router
    - contextAPI
    - react hooks
    - tailwind
    - fetch api
    - toastify
    - jest
 - Backend(Nodejs)
	- Express(RestAPI)
    - Postman Tool
    - JSONwebtoken
    - CSURF
    - jest
    - xlsx(dataload)
    - winston logger
    - server cluster(incase for multithread and heavy load)
- MongoDB(DataModel)
- CMS Portal(contentfull)
- AWS Secret Manager
- AWS S3 for image storage
- AWS SNS

### Product interface:
- image(aws s3)
- title
- price
- inventory
- category
- tag
- color/size

### User interface:
- name
- email
- userid

## Features to build:
- Login/signup page save in usermodel
- JWT token generation using jsonwebtoken package, api autheration as bearer in header
- after successful authentication, trigger email to user using AWS SNS
- Middleware with CORS, CSURF packages
- bodyparser for reading json request payload
- post call validated with CSURF
- Initial data load using excel upload in nodejs
- catalogue page with filter options based on category, colour, size,
- Agilio for search
- cart page
- toastify to use notifications on success/failure
- UI form validations
- Error Handling using try/cache
- GDPR popup for European customers
- server side rendering 

## Hosting
- Github workflow actions/ AWS Lambda with GitLab to trigger CI/CD 
- pipeline setup for dev and prod
- Use nodejs container in docker file for image creation
- push the image in AWS ECR
- Deploy using AWS EKS, for autoscaling in muliple AZs for failover
- Route53 for user DNS
- secrets configured in secret manager- 
- Configure threshold to 70% of CPU and create datadog monitor for alerting
- Host Database in AWS RDS, have replica in secondary region
- Datadog monitoring for email alerts

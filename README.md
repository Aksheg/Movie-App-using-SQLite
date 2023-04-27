# EXPRESS

### Setup

1. Use and setup the project with `yarn`.
2. Convert the project to Typescript.
3. Initialize tsconfig.
4. Create .gitignore file to ignore the node_modules
## Problem Description:

Create A basic Express application, that makes a CRUD operation (create, read, update, delete) using SQLite database, document and publish your endpoints using postman.
In this project, you’ll build a basic CRUD (Create, Read, Update, Delete) for an Movie Listing Application

## Requirements:

IMPLEMENT AUTHORIZATION AND AUTHENTICATION: PROTECT ALL ROUTES. ONLY THE LOGGED-IN USERS CAN PERFORM THE FOLLOWING OPERATIONS

- You can add a Movies.
- You can edit Movies.
- You can delete a Movies.

## NOTE
- Users that are not authenticated can browse through  Movies on the app

## How will I complete this project?

- Your aplication should be able to perform.
  - `GET` Request which returns all the data in your database
  - `POST` Request which adds data to your database
  - `PUT` Request which updates fields of a particular data using the id in database
  - `DELETE` Request which removes a particular data from your database using the id
- Host your application on Heroku.
- Data format example: This show the model for users and the Movies added/created by the user

```
[

 {
   fullname: 'john doe',
   username:'Yourusername'
   email: 'john@example.com', // no duplicates allowed.
   password:"ofyourchoice",
 }
 
   Movies:[
   {
    title: 'Avengers',
    description :'Avengers is an interesting movie'
    image:"https://mycourseimge.com",
    price: 3000
    id:"databaseId1"
   },
     {
    title: 'God's must be crazy',
    description :'You know it's God's not God, because he cant be.'
    image:"https://mymovieimage.com",
    price: 8000
    id:"databaseId2"
   }
   ......
]
```

## FRONTEND

- Page to display all Movie Listings(title, image including description and price should display)
- Implement an admin/dashboard area to add, edit and delete ( User can only edit and delete Movies created by them)
- Create a Login Page and Sign Up Page

## Test coverage

- Make sure you write test to cover your application using Jest/supertest

### Test

- Test for a GET request
- Test for a POST request
- Test for a PUT request
- Test for a DELETE request
- Test to return proper HTTP status codes

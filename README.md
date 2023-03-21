# Book-Worm

## Description

Ever wanted to make a book list of a million books which you could read but probably won't? Ever wanted to add to your coffee table pile of unread books or that random assortment of books on your "book shelf". Well look no further! Using the power of a Google API you are able to easily search books, save them and view the important details (such as the cover). You can make a list for future reference (we both know you won't buy any of them), and hope that maybe one day you'll finish that one book you bought 5 years ago that you were so enthralled in and now its covered in dust!

## User Story

```
AS A book worm
I WANT to be able to look up any and all books
SO THAT I can make an unending book list that I will regret
```

## Installation

This application uses a multitude of dependencies. Node and express are used to be able to get information from the API and return it to the user. Authentication is used to store the user's info and make sure that they can retrieve it later through token sessions. GraphQL is the API responsible for mutating queries to fit the request and responses, thanks to being refactored and built with the Apollo Server. MongoDB is used as our database storage for the books the user wants to save to remember later. 

## Usage

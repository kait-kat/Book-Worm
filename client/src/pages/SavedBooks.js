import React from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
import { useQuery, useMutation } from "@apollo/client"
import { GET_USER } from "../gql/queries"
import { DELETE_BOOK } from "../gql/mutations"
import Auth from '../utils/auth.js';
import { removeBookId } from '../utils/localStorage.js';

const SavedBooks = () => {
  const username = Auth.getProfile().data.username
  const { loading, data } = useQuery(GET_USER, {
    variables: { username },
  })
  const userData = data?.user || {}

  const [deleteBook] = useMutation(DELETE_BOOK)
  const handleDeleteBook = async (bookId) => {
    try {
      const { data } = await deleteBook({
        variables: { username, bookId },
      })
      removeBookId(bookId)
    } catch (err) {
      console.error(err)
    }
  }
  if (loading) {
    return <h2>Loading...</h2>
  }

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Saved books</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
            : ' No saved books'}
        </h2>
        <CardColumns>
          {userData.savedBooks.map((book) => {
            return (
              <Card key={book.bookId} border='dark'>
                {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className='small'>Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedBooks;
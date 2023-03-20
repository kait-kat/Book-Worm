import React from 'react';
import { Button, Card, Col, Container, Row } from "react-bootstrap"
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
      <div className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </div>
      <Container>
        <h2 className="pt-5">
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? "book" : "books"}:`
            : "You have no saved books!"}
        </h2>
        <Row>
          {userData.savedBooks.map((book, index) => {
            return (
              <Col key={index} md="4">
                <Card key={book.bookId} border="dark">
                  {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant="top" /> : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className="small">Authors: {book.authors}</p>
                    <Card.Text>{book.description}</Card.Text>
                    <Button className="btn-block btn-danger" onClick={() => handleDeleteBook(book.bookId)}>
                      Delete this Book!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            )
          })}
        </Row>
      </Container>
    </>
  )
}

export default SavedBooks
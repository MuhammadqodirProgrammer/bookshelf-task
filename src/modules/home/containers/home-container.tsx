import React, { useCallback, useEffect } from 'react'
import { Box, Button, Container, Grid, Typography } from '@mui/material'
import FlexBox from 'components/main/flexbox'
import AddIcon from '@mui/icons-material/Add'
import { prop, propOr, pathOr } from 'ramda'

import { BookCard } from '../../../components/card/book-card'
import { BaseLayout } from '../../../layout'
import useDialog from '../../../hooks/useDialog'
import BookAddDialogue from '../components/book-add-dialogue'
import { usePost } from '../../../hooks/usePost'
import { createBook, deleteBook, getListBook, updateBook } from '../api/api'
import { useGetList } from '../../../hooks/useGetList'
import BookActionRowMenu from '../components/book-action-row'
import { usePut } from '../../../hooks/usePut'
import { useDelete } from '../../../hooks/useDelete'
import { useSearchContext } from '../../../context/search'
import Loader from '../../../components/loader/loader'
import { useSnackbar } from '../../../context/snackbar'
import { useGetProductsQuery } from 'store/rtk-query/productApi'
import { useAddBookMutation, useGetAllBooksQuery, useGetMySelfQuery } from 'store/rtk-query/book-query'

export const HomeContainer = () => {
  const addBookDialog = useDialog()
  const getBookList = useGetList(getListBook)
  const addBook = usePost(createBook)
  const statusBook = usePut(updateBook)
  const bookDelete = useDelete(deleteBook)
  const snacbar = useSnackbar()
  const loading = prop('loading', getBookList)
  const list = prop('list', getBookList)
  const { searchValue } = useSearchContext()
  const title = propOr('', 'title', searchValue)

  const handleCreateBook = useCallback((values: any) => {
    addBook
      .postData({ data: values })
      .then(() => snacbar({ message: 'Book added bookshelf successfully!' }))
      .then(() => getBookList.getList())
      .then(() => addBookDialog.handleClose())
  }, [])

  const handleUpdateStatusBook = useCallback((id: number, book: any, status: number) => {
    statusBook
      .putData({ params: { id }, data: { book, status } })
      .then(() => snacbar({ message: 'Your book status updated successfully!' }))
      .then(() => getBookList.getList())
  }, [])

  const handleDeleteBook = useCallback((id: number) => {
    bookDelete
      .deleteData({ params: { id } })
      .then(() => snacbar({ message: 'Your book deleted successfully!' }))
      .then(() => getBookList.getList())
  }, [])
  useEffect(() => {
    const hasValue = title ? { query: { title } } : undefined
    getBookList.getList(hasValue)
  }, [title])
  const filters = { category: '' }; // Example filter object
  const  { data, isLoading, error }  =useGetMySelfQuery({})
  const  [AddBook, { error: addError, data: addData }]  =useAddBookMutation()
console.log(AddBook({isbn: "isbn20"}), addData ,addError,"postBook");

  return (
    <BaseLayout>
      <Container maxWidth={'xl'}>
        <FlexBox align="flex-start" justify="space-between" sx={{ my: 2 }}>
          <Box>
            <FlexBox>
              <Typography variant="h3" color="grey.100">
                You’ve got
              </Typography>
              <Typography variant="h3" color="primary" sx={{ display: 'inline', ml: 1 }}>
                {!loading && list.length === 0 ? 'no book please add book!' : list.length + ' book'}
              </Typography>
            </FlexBox>
            <Typography variant="h5" color="grey.100" sx={{ mt: 1 }}>
              Your books today
            </Typography>
          </Box>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => addBookDialog.handleOpen()}
          >
            Create a book
          </Button>
        </FlexBox>
        <Grid container spacing={2} alignItems="center">
          {!loading &&
            list.map((item) => {
              const id = pathOr('id', ['book', 'isbn'], item)
              const book = prop('book', item)
              const status = prop('status', item)
              const searchBook = book || item
              return (
                <Grid item lg={'auto'} key={id}>
                  <BookCard
                    key={id}
                    book={searchBook}
                    status={status}
                    actions={() => (
                      <BookActionRowMenu
                        book={book}
                        status={status}
                        onDelete={handleDeleteBook}
                        handleStatus={handleUpdateStatusBook}
                      />
                    )}
                  />
                </Grid>
              )
            })}
        </Grid>
        {loading && <Loader />}
      </Container>
      {addBookDialog.open && (
        <BookAddDialogue
          open={addBookDialog.open}
          initialValues={{}}
          handleClose={addBookDialog.handleClose}
          onSubmit={handleCreateBook}
        />
      )}
    </BaseLayout>
  )
}

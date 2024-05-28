import React, { useCallback, useEffect } from "react";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import FlexBox from "components/main/flexbox";
import AddIcon from "@mui/icons-material/Add";
import { prop, propOr, pathOr } from "ramda";

import { BookCard } from "../../../components/card/book-card";
import { BaseLayout } from "../../../layout";
import useDialog from "../../../hooks/useDialog";
import BookAddDialogue from "../components/book-add-dialogue";
import {  getListBook, updateBook } from "../api/api";
import { useGetList } from "../../../hooks/useGetList";
import BookActionRowMenu from "../components/book-action-row";
import { usePut } from "../../../hooks/usePut";
import { useDelete } from "../../../hooks/useDelete";
import { useSearchContext } from "../../../context/search";
import Loader from "../../../components/loader/loader";
import { useSnackbar } from "../../../context/snackbar";
import { GetListResponse } from "../../../api/base-DTO";
import { useGetProductsQuery } from "store/rtk-query/productApi";
import {
  useAddBookMutation,
  useDeleteBookMutation,
  useEditBookStatusMutation,
  useGetAllBooksQuery,
  useGetMySelfQuery,
} from "store/rtk-query/book-query";

export const HomeContainer = () => {
  const addBookDialog = useDialog();
  const statusBook = usePut(updateBook);
  const snacbar = useSnackbar();
  const { searchValue } = useSearchContext();
  const title = propOr("", "title", searchValue);

  const { data, isLoading,  refetch } = useGetAllBooksQuery({});
  const { data:mySelfData,  } = useGetMySelfQuery({});
  const [AddBook, { error: addError, isSuccess: isSuccessCreated, isError }] =
    useAddBookMutation();
  const [DeleteBook, { error: deleteError,isSuccess:isSuccessDeleted, isError:isErrorDeleted }] =
    useDeleteBookMutation();

  const handleCreateBook = useCallback(async  (data: any) => {
    console.log(data , isSuccessCreated, "data");
    await  AddBook(data);
  
    if (isSuccessCreated) {
      () => snacbar({ message: "Book added bookshelf successfully!" });
      addBookDialog.handleClose();
    } else if (isError) {
      () => snacbar({ message: `${addError}` });
    } else {
      () => snacbar({ message: "Oops, Something went wrong!" });
    }
  }, []);

  const handleUpdateStatusBook = useCallback(
    (id: number, book: any, status: number) => {
      statusBook
        .putData({ params: { id }, data: { book, status } })
        .then(() =>
          snacbar({ message: "Your book status updated successfully!" }),
        )
        .then(() => refetch());
    },
    [],
  );

  const handleDeleteBook = useCallback((id: number) => {
    DeleteBook(id);
    if (isSuccessDeleted) {
      () => snacbar({ message: "Your book deleted successfully!" });
      addBookDialog.handleClose();
    } else if (isErrorDeleted) {
      () => snacbar({ message: `${deleteError}` });
    } else {
      () => snacbar({ message: "Oops, Something went wrong!" });
    }
  }, []);
  useEffect(() => {}, [title]);

  return (
    <BaseLayout>
      <Container maxWidth={"xl"}>
        <FlexBox align="flex-start" justify="space-between" sx={{ my: 2 }}>
          <Box>
            <FlexBox>
              <Typography variant="h3" color="grey.100">
                You’ve got
              </Typography>
              <Typography
                variant="h3"
                color="primary"
                sx={{ display: "inline", ml: 1 }}
              >
                {isLoading && data?.data?.length == 0
                  ? "no book please add book!"
                  : data?.data?.length + " book"
                  
                }
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
          {!isLoading &&
            data?.data?.map((item: any) => {
              const id = pathOr("id", ["book", "isbn"], item);
              const book = prop("book", item);
              const status = prop("status", item);
              const searchBook = book || item;
              return (
                <Grid item lg={"auto"} key={id}>
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
              );
            })}
        </Grid>
        {isLoading && <Loader />}
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
  );
};

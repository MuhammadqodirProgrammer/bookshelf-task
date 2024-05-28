import React from 'react'
import isEqual from 'react-fast-compare'
import { Form, Formik } from 'formik'

export interface WithFormProps {
  readonly onSubmit: (values: any) => void
  readonly initialValues: any
  readonly validate?: any
  readonly validationSchema?: any
}

function withForm (Component: any, FormProps?: any) {
  const Bookshelf = (props: any) => {
    const { onSubmit, initialValues, validate, validationSchema, ...rest } = props as WithFormProps
    return (
      <Formik
        onSubmit={onSubmit}
        validate={validate}
        initialValuesEqual={isEqual}
        initialValues={initialValues}
        validationSchema={validationSchema}
        {...FormProps}
      >
        {(form: any) => {
          return (
            <>
            <Form placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              <Component {...rest} form={form}/>
            </Form>
            </>
          )
        }}
      </Formik>
    )
  }
  return React.memo(Bookshelf, isEqual)
}

export default withForm

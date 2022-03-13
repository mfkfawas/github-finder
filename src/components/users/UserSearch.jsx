import React, { useContext } from 'react';
import { ErrorMessage, Formik } from 'formik';
import * as Yup from 'yup';

import GithubContext from '../../context/github/GithubContext';

const validationSchema = Yup.object({
  search: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
});

const UserSearch = () => {
  const { users, searchUsers, clearUsers } =
    useContext(GithubContext);

  return (
    <Formik
      initialValues={{
        search: '',
      }}
      validationSchema={validationSchema}
      onSubmit={(data, { setSubmitting, resetForm }) => {
        setSubmitting(true);

        searchUsers(data.search);

        setSubmitting(false);

        resetForm();
      }}
    >
      {({
        values,
        errors,
        touched,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => (
        <div className='grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8'>
          <form onSubmit={handleSubmit}>
            <div className='form-control'>
              <div className='relative'>
                <input
                  name='search'
                  type='text'
                  className='w-full pr-40 bg-gray-200 input input-lg text-black'
                  placeholder='Search'
                  value={values.search}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <button
                  type='submit'
                  className='absolute top-0 right-0 rounded-l-none w-36 btn btn-lg'
                  disabled={isSubmitting}
                >
                  Go
                </button>
                {touched.search && errors.search && (
                  <ErrorMessage
                    component='div'
                    name='search'
                    className='error'
                  />
                )}
              </div>
            </div>
          </form>

          {users.length > 0 && (
            <div>
              <button
                className='btn btn-ghost btn-lg'
                onClick={clearUsers}
              >
                Clear
              </button>
            </div>
          )}
        </div>
      )}
    </Formik>
  );
};

export default UserSearch;

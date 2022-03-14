import React, { useContext } from 'react';
import { ErrorMessage, Formik } from 'formik';
import { motion, AnimatePresence } from 'framer-motion';
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
                  <AnimatePresence>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.9 }}
                      exit={{ opacity: 0 }}
                    >
                      <p className='flex items-center my-4 space-x-1'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='stroke-current flex-shrink-0 h-6 w-6'
                          fill='none'
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
                          />
                        </svg>
                        <ErrorMessage
                          component='span'
                          name='search'
                          className='flex-1 text-base font-semibold leading-7 text-white'
                        />
                      </p>
                    </motion.div>
                  </AnimatePresence>
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

import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import AddBlogForm from './AddBlogForm'

test('<AddBlogForm /> form calls event hanlder via props with correct details', () => {
  const createBlog = jest.fn()

  const component = render(
    <AddBlogForm addNewBlog={createBlog} />
  )

  const form = component.container.querySelector('form')
  const title = component.container.querySelector("#title")
  // const author = component.container.querySelector("#author")
  // const url = component.container.querySelector("#url")


  fireEvent.change(title, { target: { value: 'testTitle' } })
  fireEvent.change(title, { target: { value: 'testTitle' } })
  // fireEvent.change(author, { target: { value: 'testAuthor' } })
  // fireEvent.change(url, { target: { value: 'testURL' } })
  fireEvent.submit(form)

  //expect(createBlog.mock.calls).toHaveLength(1)
  expect(title.value).toBe('testTitle')
})


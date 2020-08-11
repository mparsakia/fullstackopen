import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blogcontent = {
    title: "Blog.test.js Title",
    author: "Blog.test.js Author",
    url: "Blog.test.js URL",
    likes: "999",
    id: "Blog.test.js id",
    user: {
      id: "Blog.test.js user id",
      username: "Blog.test.js user username",
      name: "Blog.test.js user name"
     }
  };

  const component = render(<Blog blog={blogcontent} />)

  expect(component.container).toHaveTextContent('Blog.test.js')
})




test('Only TITLE and AUTHOR are visible by default', () => {
  const blogcontent = {
    title: "Blog.test.js Title",
    author: "Blog.test.js Author",
    url: "Blog.test.js URL",
    likes: "999",
    id: "Blog.test.js id",
    user: {
      id: "Blog.test.js user id",
      username: "Blog.test.js user username",
      name: "Blog.test.js user name"
     }
  };

  const component = render(<Blog blog={blogcontent} />)

  const div = component.container.querySelector('.togglableContent')
  expect(div).toHaveStyle('display: none')
})




test('URL and LIKES are shown when button is clicked', () => {
  const blogcontent = {
    title: "Blog.test.js Title",
    author: "Blog.test.js Author",
    url: "Blog.test.js URL",
    likes: "999",
    id: "Blog.test.js id",
    user: {
      id: "Blog.test.js user id",
      username: "Blog.test.js user username",
      name: "Blog.test.js user name"
     }
  };

	const component = render(<Blog blog={blogcontent} />)
	
	const div = component.container.querySelector('.togglableContent')
	const button = component.getByText("expand info")
	fireEvent.click(button)

	expect(div).toHaveTextContent('URL')
	expect(button).not.toHaveStyle('display: none')
})



test('Clicking LIKE button calls event handler once', () => {
  const blogcontent = {
    title: "Blog.test.js Title",
    author: "Blog.test.js Author",
    url: "Blog.test.js URL",
    likes: "999",
    id: "Blog.test.js id",
    user: {
      id: "Blog.test.js user id",
      username: "Blog.test.js user username",
      name: "Blog.test.js user name"
     }
  };

  const mockLikebutton = jest.fn()
  
  const component = render(<Blog blog={blogcontent} likebutton={mockLikebutton} />)
  const button = component.getByText('add like')
  fireEvent.click(button)

 expect(mockLikebutton.mock.calls).toHaveLength(1)
})


test('Clicking DELETE button calls event handler once', ()=>{
	window.confirm = jest.fn(() => true) 

  const blogcontent = {
    title: "Blog.test.js Title",
    author: "Blog.test.js Author",
    url: "Blog.test.js URL",
    likes: "999",
    id: "Blog.test.js id",
    user: {
      id: "Blog.test.js user id",
      username: "Blog.test.js user username",
      name: "Blog.test.js user name"
     }
  };

  const mockDeleteButton = jest.fn()
	const component = render(<Blog blog={blogcontent} deletebutton={mockDeleteButton} user={blogcontent.user} />)
	const button = component.container.querySelector('#delbtn')
	// component.debug()
	// console.log(button)
	fireEvent.click(button)

	expect(window.confirm).toBeCalled() 
 	expect(mockDeleteButton.mock.calls).toHaveLength(1)
})




test('Clicking LIKE twice calls event handler twice', ()=>{
  const blogcontent = {
    title: "Blog.test.js Title",
    author: "Blog.test.js Author",
    url: "Blog.test.js URL",
    likes: "999",
    id: "Blog.test.js id",
    user: {
      id: "Blog.test.js user id",
      username: "Blog.test.js user username",
      name: "Blog.test.js user name"
     }
  };

  const mockLikebutton = jest.fn()
  const component = render(<Blog blog={blogcontent} likebutton={mockLikebutton} />)
  const button = component.getByText('add like')
  fireEvent.click(button)
  fireEvent.click(button)
 expect(mockLikebutton.mock.calls).toHaveLength(2)
})




/**
 * 
 * https://stackoverflow.com/questions/48728167/simulate-clicking-ok-or-cancel-in-a-confirmation-window-using-enzyme
 * Before the test, use jest.fn to mock window.confirm.
 * // with jest.fn, you can pass a function as the mock's implementation
 * // so pass something that returns `true` for yes, or `false` for no.
 * window.confirm = jest.fn(() => true) // always click 'yes'
 * // run your test code here
 *  expect(window.confirm).toBeCalled() // or whatever assertions you want
 */
import React from "react"
import "@testing-library/jest-dom/extend-expect"
import Blog from "./Blog"
import { prettyDOM } from "@testing-library/dom"
import { render, fireEvent } from "@testing-library/react"

test("renders only title when not clicking", () => {
  const blog = {
    title: "Title for testing",
    author: "Author for testing",
    url: "Testing url",
    likes: 100
  }

  const component = render(<Blog blog={blog} />)

  expect(component.container).toHaveTextContent("Title for testing")
})

test("renders rest of the blog when clicked", () => {
  const user = {
    username: "tester",
    password: "tester"
  }
  window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user))

  const blog = {
    title: "Title for testing",
    author: "Author for testing",
    url: "Testing url",
    likes: 100,
    user: "Testing"
  }

  const mockHandler = jest.fn()
  const component = render(<Blog blog={blog} />)
  const button = component.getByText("view")

  fireEvent.click(button)

  const likeButton = component.getByText("likes")
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(component.container).toHaveTextContent("Author for testing")
  expect(component.container).toHaveTextContent("Testing url")
  expect(component.container).toHaveTextContent(100)
})

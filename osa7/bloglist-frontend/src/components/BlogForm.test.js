import React from "react"
import { render, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import BlogForm from "./BlogForm"

test("<BlogForm /> updates parent state and calls onSubmit", () => {
  const createBlog = jest.fn()

  const component = render(<BlogForm createBlog={createBlog} />)

  const blogTitle = component.container.querySelector("#titleID")
  const author = component.container.querySelector("#authorID")
  const form = component.container.querySelector("form")

  fireEvent.change(blogTitle, {
    target: { value: "testing of forms could be easier" }
  })
  fireEvent.change(author, {
    target: { value: "fireAuthor" }
  })
  fireEvent.click(form)

  expect(component.container.querySelector("#titleID").value).toBe(
    "testing of forms could be easier"
  )
  expect(component.container.querySelector("#authorID").value).toBe(
    "fireAuthor"
  )
})

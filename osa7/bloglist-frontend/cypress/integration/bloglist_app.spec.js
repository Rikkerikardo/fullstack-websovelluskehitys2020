describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset")
    const user = {
      name: "Testi testaaja",
      username: "testaaja",
      password: "salainen"
    }
    cy.request("POST", "http://localhost:3001/api/users/", user)
    cy.visit("http://localhost:3000")
  })

  it("Login form is shown", function () {
    cy.contains("Blogs")
  })

  it("login form can be opened", function () {
    cy.contains("login").click()
  })

  it("user can login", function () {
    cy.contains("login").click()
    cy.get("#username").type("testaaja")
    cy.get("#password").type("salainen")
    cy.get("#login-button").click()
    cy.contains("testaaja logged in")
  })

  it("fails with wrong credentials", function () {
    cy.contains("login").click()
    cy.get("#username").type("väärinmenee")
    cy.get("#password").type("topsekret")
    cy.get("#login-button").click()
    cy.contains("wrong credentials")
  })
})

describe("When logged in", function () {
  beforeEach(function () {
    cy.login({ username: "testaaja", password: "salainen" })
  })

  it("A blog can be created", function () {
    cy.contains("new blog").click()
    cy.get("#titleID").type("a blog created by cypress")
    cy.get("#authorID").type("cypress author")
    cy.contains("create").click()
    cy.contains("a blog created by cypress")
  })

  describe("and a blog exists", function () {
    beforeEach(function () {
      cy.createBlog({
        title: "a blog created by cypress command",
        author: "cypress command"
      })
    })

    it("A like-button can be clicked", function () {
      cy.contains("view").click()
      cy.contains("likes").click()
      cy.contains("Likes: 1")
    })

    it("A blog can be deleted", function () {
      cy.contains("view").click()
      cy.contains("delete").click()
      cy.contains("blog removed")
    })
  })

  describe("and multiple blogs exists", function () {
    beforeEach(function () {
      cy.createBlog({
        title: "first blog created by cypress command",
        author: "cypress command"
      })
      cy.createBlog({
        title: "second blog created by cypress command",
        author: "cypress command"
      })
      cy.createBlog({
        title: "third blog created by cypress command",
        author: "cypress command"
      })
    })

    it("blogs are sorted correctly", function () {
      cy.get(".blog").as("blog")
      cy.contains("first blog")
      cy.contains("second blog").contains("view").click()
      cy.contains("third blog")
      cy.contains("likes").click()
      cy.contains("hide").click()
      cy.get("@blog").first().contains("second blog created by cypress command")
    })
  })
})

import React from "react"

const Course = () => {
  const course = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2,
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3,
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ]

  return (
    <div>
      {course.map((osio) => (
        <Courses course={osio} key={osio.id} />
      ))}
    </div>
  )
}

const Courses = (props) => {
  return (
    <div>
      <Header name={props.course.name} />
      <Content part={props.course.parts} />
      <Statistics statistics={props.course.parts} />
    </div>
  )
}

const Header = (props) => {
  return (
    <div>
      <h2> {props.name} </h2>
    </div>
  )
}

const Statistics = (props) => {
  const total = props.statistics.reduce(
    (prevValue, currentValue) => prevValue + currentValue.exercises,
    0
  )

  return (
    <div>
      <h5> Total of {total} exercises </h5>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part parts={props.part} />
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      {props.parts.map((osio) => (
        <p key={osio.id}>
          {osio.name} {osio.exercises}
        </p>
      ))}
    </div>
  )
}

export default Course

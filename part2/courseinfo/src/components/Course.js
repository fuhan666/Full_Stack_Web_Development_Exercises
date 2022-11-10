import React from 'react'


const Header = ({ courseNmae }) => <h2>{courseNmae}</h2>

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

const Content = ({ parts }) => (
    <>
        {parts.map(part =>
            <Part key={part.id} part={part} />
        )}
    </>
)

const Total = ({ parts }) => {
    const sumExercises = parts.reduce((sum, obj) => sum + obj.exercises, 0)
    return (
        <p><b>total of {sumExercises} exercises</b></p>
    )
}

const Course = ({ course }) => {
    return (
        <div>
            <Header courseNmae={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

export default Course
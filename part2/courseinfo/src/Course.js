const Header = ({name}) => {

    return (
        <h2>{name}</h2>
    )
}

const Part = ({part}) => {

    return (
        <p>{part.name} {part.exercises}</p>
    )
}

const Content = ({parts}) => {
    return (
        parts.map(part => <Part key={part.id} part={part}/>)
    )
}

const Course = ({course}) => {
    return (
        <>
            <Header name={course.name}/>
            <Content parts={course.parts}/>
            <b>total of {course.parts.reduce((acc, ele) => acc + ele.exercises, 0)} exercise</b>
        </>
    )
}

export default Course;
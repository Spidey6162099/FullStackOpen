
const Header=({text})=>{
    return (<h1>{text}</h1>)
}

const ContentCard=({part})=>{
return <h3>{part.name} {part.exercises}</h3>
}
const Content=({parts})=>{
    return(
    <div>
    {parts.map((part)=><ContentCard key={part.id} part={part}></ContentCard>)}
    </div>)
}
const Course =({course})=>{
    
    const total=course.parts.reduce((total,currentPart)=>total+currentPart.exercises,0)
    
    return (
        <>
    <Header text={course.name}></Header>
    <Content parts={course.parts}></Content>
    <h3>total:{total}</h3>
    </>
    )

}

export {Course};
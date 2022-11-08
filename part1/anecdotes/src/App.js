import { useState } from 'react'


const BrowseAnecdotes = ({ index, anecdotes, countVote }) => {
    return (
        <>
            {anecdotes[index]}<br />
            has {countVote[index]} votes
        </>
    )
}

const DisplayMostVotesAnecdote = ({ anecdotes, countVote }) => {
    const largestNumberOfVotes = Math.max(...countVote)
    const anecdoteIndex = countVote.indexOf(largestNumberOfVotes)
    return (
        <>
            {anecdotes[anecdoteIndex]}<br />
            has {largestNumberOfVotes} votes
        </>
    )
}

const App = () => {
    const anecdotes = [
        'If it hurts, do it more often',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
    ]

    const [selected, setSelected] = useState(0)
    const [countVote, setCountVote] = useState(Array(anecdotes.length).fill(0))

    const randomArrayElementIndex = arrayLength => Math.floor(Math.random() * arrayLength)

    const handleVote = () => {
        const arrayCopy = [...countVote]
        arrayCopy[selected] += 1
        setCountVote(arrayCopy)
    }

    const handleNextAnecdote = () => {
        const randomIndex = randomArrayElementIndex(anecdotes.length)
        setSelected(randomIndex)
    }

    return (
        <div>
            <h1>Anecdote of the day</h1>
            <BrowseAnecdotes index={selected} anecdotes={anecdotes} countVote={countVote} />
            <div>
                <button onClick={handleVote}>vote</button>
                <button onClick={handleNextAnecdote}>next anecdote</button>
            </div>
            <h1>Anecdote with most votes</h1>
            <DisplayMostVotesAnecdote anecdotes={anecdotes} countVote={countVote} />
        </div>
    )
}

export default App
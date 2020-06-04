import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {

    const [klikit, lisaaKlikki] = useState({
        good: 0, neutral: 0, bad: 0
    })
    const [selected, setSelected] = useState({
        valittu: 0
    })
    const [points, setPoints] = useState([0, 0, 0, 0, 0, 0])

    const valitse = () => setSelected({ valittu: [Math.floor(Math.random() * 6)] })
    const aanesta = () => setPoints({ ...points, [selected.valittu]: points[selected.valittu] += 1 })

    const lisaaYksiHyva = () => lisaaKlikki({ ...klikit, good: klikit.good + 1 })
    const lisaaYksiNeutraali = () => lisaaKlikki({ ...klikit, neutral: klikit.neutral + 1 })
    const lisaaYksiHuono = () => lisaaKlikki({ ...klikit, bad: klikit.bad + 1 })

    return (
        <div>
            <h1>Give feedback</h1>
            <Button handleClick={lisaaYksiHyva} text='Good' />
            <Button handleClick={lisaaYksiNeutraali} text='Neutral' />
            <Button handleClick={lisaaYksiHuono} text='Bad' />
            <h2> Anecdote of the day </h2>
            {anecdotes[selected.valittu]}
            <br />
            <Button handleClick={valitse} text='next anecdote' />
            <Button handleClick={aanesta} text='vote' />
            <p> Has {points[selected.valittu]} votes </p>
            <Statistics hyvat={klikit.good} neutraalit={klikit.neutral} huonot={klikit.bad} />
            
        </div>
    )
}



const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const Button = (props) => {
    return (
        <button onClick={props.handleClick}> {props.text} </button>
    )
}

const Statistics = (props) => {

    let kaikki = props.hyvat + props.neutraalit + props.huonot
    let keskiarvo = (props.hyvat * 1 + props.huonot * -1) / kaikki
    let positiivisa = (props.hyvat / kaikki) * 100 + "%"

    if (props.kaikki == 0) {
        return <p>No feedback given</p>
    }

    return (
        <div>
            <h2>Statistics</h2>
            <table>
                <tbody>
                    <tr>
                        <td> <StatisticsLine text="Good" /> </td>
                        <td> <StatisticsLine value={props.hyvat} /> </td>
                    </tr>
                    <tr>
                        <td> <StatisticsLine text="Neutral" /> </td>
                        <td> <StatisticsLine value={props.neutraalit} /> </td>
                    </tr>
                    <tr>
                        <td> <StatisticsLine text="Bad" /> </td>
                        <td> <StatisticsLine value={props.huonot} /> </td>
                    </tr>
                    <tr>
                        <td> <StatisticsLine text="All" /> </td>
                        <td> <StatisticsLine value={kaikki} /> </td>
                    </tr>
                    <tr>
                        <td> <StatisticsLine text="Average" /> </td>
                        <td> <StatisticsLine value={keskiarvo} /> </td>
                    </tr>
                    <tr>
                        <td>  <StatisticsLine text="Positive" /> </td>
                        <td> <StatisticsLine value={positiivisa} /> </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

const StatisticsLine = (props) => {
    return (
        <div>
            {props.text} {props.value}
        </div>
    )
}


ReactDOM.render(<App />,
    document.getElementById('root')
)
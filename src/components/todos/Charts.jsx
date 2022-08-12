import React from 'react'
import styled from 'styled-components'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

ChartJS.register(ArcElement, Tooltip, Legend);

const Cont = styled.div`
    @media (max-width:480px) {
        flex-direction: column;
        gap: 25%;
    }
    width: 100%;
    height: 90vh;
    display: flex;
    justify-content: center;
    align-items: center;
    p{
      padding: 5%;
    }
`
const PieCont = styled.div`
    @media (max-width:480px) {
        width: 100%;
        height: 20vh;
    }
    width: 30%;
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
`
function Charts() {
   
    const totalTask = useSelector((state) => state.todos.todos)

    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd ;

    const tod = new Date()
    let yesterday = new Date(tod)
    yesterday.setDate(yesterday.getDate() - 1)
    let yesDd = String(yesterday.getDate()).padStart(2, '0');
    let yesMm = String(yesterday.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yesYyyy = yesterday.getFullYear();

    yesterday = yesYyyy + '-' + yesMm + '-' + yesDd ;

    const pending = totalTask.filter((item) => !item.isComplete)

    const completed = totalTask.filter((item) => item.isComplete)

    const data = {
        labels: ['incomplete task', 'complete task'],
        datasets: [
          {
            label: '# of patients',
            data: [pending.length,completed.length],
            backgroundColor: [
              'red',
              '#04c707'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              '#04c707'
            ],
            borderWidth: 1,
          },
        ],
      };
    
  return (
    <Cont>
        <PieCont>
            <Pie data={data}  />
        </PieCont>
        <p>{pending.length > completed.length ? 'Over 50% of your tasks are incomplete.':` You've completed over 60% of your tasks great job!!...`} </p>
    </Cont>
  )
}

export default Charts
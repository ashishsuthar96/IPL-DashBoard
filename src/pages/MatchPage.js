import { React, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import MatchDetailCard from '../components/MatchDetailCard';
import YearSelector from '../components/YearSelector';
import './MatchPage.scss'

const MatchPage = () => {

    const [matches,setMatches]= useState([]);
    const { teamName, year } = useParams();
    useEffect(()=>{
        const fetchMatches = async () => {
            const response = await fetch(`http://localhost:8080/team/${teamName}/matches?year=${year}`)
            const data = await response.json();
            setMatches(data);
        };
        fetchMatches()

    },[teamName, year])
    return (
        <div className='MatchPage'>
            <div className='year-selector'>
                <h3>Select Year</h3>
                 <YearSelector teamName={teamName}/>
            </div>
            
            { matches.length===0 ?<h1 className='page-heading'>{teamName} not played any match in this year select another year</h1> :
            <div>
            <h1 className='page-heading'>{teamName} Matches in {year}</h1>
            {matches.map(match => <MatchDetailCard key={match.id} match={match} teamName={teamName} />)} 
            </div> }


        </div>
    )
}

export default MatchPage

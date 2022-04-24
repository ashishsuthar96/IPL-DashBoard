import {React, useEffect, useState} from 'react'
import TeamTile from '../components/TeamTile';
import './HomePage.scss'

const HomePage = () => {

    const [team, setTeam] = useState([]);
    useEffect(() => {
        const fetchTeams = async () => {
            const response = await fetch('http://localhost:8080/team')
            const data = await response.json();
            setTeam(data);
        };
        fetchTeams()

    }, [])
    return (
        <div className='HomePage'>
            <div className='header-section'>
                <h1 className='app-name'>IPL Dashboard</h1>
            </div>
            <div  className='team-grid'>
                {team.map(team=> <TeamTile key={team.id} teamName={team.teamName} />)}
            </div>

        </div>
    )
}

export default HomePage

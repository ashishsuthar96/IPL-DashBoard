import './TeamPage.scss'
import { React, useEffect, useState } from 'react'
import { useParams,Link  } from 'react-router-dom';
import MatchDetailCard from '../components/MatchDetailCard';
import MatchSmallCard from '../components/MatchSmallCard';
import { PieChart } from 'react-minimal-pie-chart';

const TeamPage = () => {

    const [team, setTeam] = useState({ latestMatches: [] });
    const { teamName } = useParams();
    useEffect(() => {
        const fetchMatches = async () => {
            const response = await fetch(`http://localhost:8080/team/${teamName}`)
            const data = await response.json();
            setTeam(data);
        };
        fetchMatches()

    }, [teamName])

    if (!team || !team.teamName) return <h1>Team not Found</h1>
    return (
        <div className='TeamPage'>
            <div className='team-name-section'>
                <h1 className='team-name'>{team.teamName}</h1>
            </div>
            <div className='win-loss-section'>Wins/ Losses
            <PieChart
                data={[
                    {title:'Losses', value: team.totalMatches-team.totalWins, color:'#a34d5d'},
                      {title:'Wins', value: team.totalWins, color:'#4da375'}
                ]}
            />
            </div>

            <div className='match-detail-section'>
                <h3>Latest Matches</h3>
                <MatchDetailCard teamName={team.teamName} match={team.latestMatches[0]} />
            </div>

            {team.latestMatches.slice(1).map(match => <MatchSmallCard key={match.id} match={match} teamName={team.teamName} />)}
            <div className='more-link'>
            <Link to={`/team/${teamName}/matches/${process.env.REACT_APP_DATA_END_YEAR}`}>More &gt;</Link>
            </div>
        </div>
    )
}

export default TeamPage

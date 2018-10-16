import PropTypes from 'prop-types';
import queryString from 'query-string';
import React from 'react';
import {Link} from 'react-router-dom';
import api from '../utils/api';
import Loading from './Loading';
import PlayerPreview from './PlayerPreview';

const Profile = ({info}) => (
    <PlayerPreview
        avatar={info.avatar_url}
        username={info.login}>

        <ul className='space-list-item'>
            {info.name && <li>{info.name}</li>}
            {info.location && <li>{info.location}</li>}
            {info.location && <li>{info.location}</li>}
            <li>Followers: {info.followers}</li>
            <li>Following: {info.following}</li>
            <li>Public Repos: {info.public_repos}</li>
            {info.blog && <li><a href={info.blog}>{info.blog}</a></li>}
        </ul>
    </PlayerPreview>
);

Profile.propTypes = {
    info: PropTypes.object.isRequired,
}

const Player = ({label, score, profile}) => {
    return (
        <div>
            <h1 className='header'>{label}</h1>
            <h3 style={{textAlign: 'center'}}> Score: {score}</h3>
            <Profile info={profile}/>
        </div>
    );
};

Player.propTypes = {
    label: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    profile: PropTypes.object.isRequired,
}

class Results extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            winner: null,
            loser: null,
            error: null,
            loading: true,
        }
    }

    componentDidMount() {
        const {playerOneName, playerTwoName} = queryString.parse(this.props.location.search);

        api.battle([
            playerOneName,
            playerTwoName,
        ]).then(results => {
            if (results === null) {
                return this.setState(() => ({
                    error: 'Looks like there was an error. Check that both users exist in Github',
                    loading: false,
                }));
            }

            this.setState(() => ({
                error: null,
                winner: results[0],
                loser: results[1],
                loading: false,
            }));
        });
    }

    render() {
        let {error, winner, loser, loading} = this.state;

        if(loading) {
            return <Loading />;
        }

        if(error) {
            return (
                <div>
                    <p>{error}</p>
                    <Link to='/battle'>Reset</Link>
                </div>
            );
        }

        return (
            <div className='row'>
                <Player
                    label='Winner'
                    score={winner.score}
                    profile={winner.profile}
                />
                <Player
                    label='Loser'
                    score={loser.score}
                    profile={loser.profile}
                />
            </div>
        );
    }
}

Results.propTypes = {
    location: PropTypes.shape({
        search: PropTypes.string.isRequired,
    }),
}

export default Results;

import PropTypes from 'prop-types';
import React from 'react';
import api from '../utils/api';
import Loading from './Loading';

const SelectLanguage = ({selectedLanguage, onSelect}) => {
    const languages = [
        'All',
        'JavaScript',
        'Ruby',
        'Java',
        'CSS',
        'Python',
    ];

    return (
        <ul className='languages'>
            {languages.map(lang => (
                <li
                    style={lang === selectedLanguage ?
                        {color: '#d0021b'} :
                        null
                    }
                    onClick={onSelect.bind(null, lang)}
                    key={lang}>
                    {lang}
                </li>
            ))}
        </ul>
    );
}

SelectLanguage.propTypes = {
    selectedLanguage : PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired,
}

const RepoGrid = ({repos}) => (
    <ul className='popular-list'>
        {repos.map((repo, index) => (
            <li key={repo.name} class-name='popular-item'>
                <div className='popular-rank'>#{index + 1}</div>
                <ul className='space-list-items'>
                    <li>
                        <img
                            className='avatar'
                            src={repo.owner.avatar_url}
                            alt={`Avatar for ${repo.owner.login}`}
                        />
                    </li>
                    <li><a href={repo.html_url}>{repo.name}</a></li>
                    <li>@{repo.owner.login}</li>
                    <li>{repo.stargazers_count} stars</li>
                </ul>
            </li>
        ))}
    </ul>
);

RepoGrid.propTypes = {
    repos: PropTypes.array.isRequired,
}

class Popular extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedLanguage: 'All',
            repos: null,
        };

        this.updateLanguage = this.updateLanguage.bind(this);
    }

    updateLanguage(selectedLanguage) {
        this.setState(() => ({
            selectedLanguage,
            repos: null,
        }));

        api.fetchPopularRepos(selectedLanguage)
            .then(repos => this.setState(() => ({repos})));
    }

    componentDidMount() {
        const {selectedLanguage} = this.state;
        this.updateLanguage(selectedLanguage);
    }

    render() {
        return (
            <div>
                <SelectLanguage
                    selectedLanguage={this.state.selectedLanguage}
                    onSelect={this.updateLanguage}
                />
                {!this.state.repos ?
                    <Loading />:
                    <RepoGrid repos={this.state.repos} />}
            </div>
        );
    }
}

export default Popular;

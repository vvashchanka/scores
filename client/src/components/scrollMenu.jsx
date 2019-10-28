import React from 'react';
import axios from 'axios';
import {api} from '../config';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import './homePage.css';
import 'jspdf-autotable';

//Arrows to move slider with games dates
const Arrow = ({ text, className }) => {
    return (
        <div
            className={className}
        >{text}</div>
    );
};

const ArrowLeft = Arrow({ text: '◄', className: 'arrow-prev' });
const ArrowRight = Arrow({ text: '►', className: 'arrow-next' });

export default class ScrollGames extends React.Component {
    state = {
        selected: 0,
        gamesList: 'Nothing to show',
        games: [],
        gamesByDate: [],
        teams: []
    };

    onSelect = key => {
        this.setState({ selected: key });
    };

    //Get list of all teams
    getTeams = () => {
        axios.get(`${api}teams`)
            .then(res => this.setState({
                teams: res.data
            }))
            .catch(err => console.log(err))
    };
//Get list of all games and sort it by date
    getGames = () => {
        axios.get(`${api}games`)
            .then(games => {
                const sorted = games.data.sort((a,b) => new Date(a.date) - new Date(b.date)
                );
                this.setState({
                    games: sorted
                })
            })
            .catch(err => {
                console.log(err)
            });
    };

    componentWillMount() {
        this.getGames();
        this.getTeams();
    }
//Games list by selected date
    showGames =  () => {
        return  this.state.gamesList.data.map(game => {
            console.log(this.state.teams);
            const imgTeam1 = this.state.teams.find(team => team.teamName === game.team1).image;
            const imgTeam2 = this.state.teams.find(team => team.teamName === game.team2).image;
            return <div className="fadeIn" key={game.id}>
                <div key={game.id+1} className="team"><img className="avatar" src={imgTeam1} alt=""/></div>
                <div key={game.id+2} className="team">{game.team1}</div>
                <div key={game.id+3} className={game.approved ? "score" : "unapproved"}>{game.score1} </div>
                <div key={game.id+4} className="score"> : </div>
                <div key={game.id+5} className={game.approved ? "score" : "unapproved"}> {game.score2}</div>
                <div key={game.id+6} className="team">{game.team2}</div>
                <div key={game.id+7} className="team"><img className="avatar" src={imgTeam2} alt=""/></div>
            </div>
        });

    };

//Create an array of dates and games attached to date
    gamesByDate = () => {
        const dates = this.state.games.map(game => game.date.slice(0,10));
        let uniqueDates = [];
        for (let str of dates) {
            if (!uniqueDates.includes(str)) {
                uniqueDates.push(str);
            }
        }
        return uniqueDates.map(date => {
            const filtered = this.state.games.filter(game => game.date.slice(0, 10) === date);
            const newDate = new Date(date).toUTCString();
            return {
                name: newDate.substr(0, newDate.length - 13),
                data: filtered
            }
        });
    };
//Horizontal slider, date and games
    Menu = () => {
        return this.gamesByDate().map(el => {
            const { name } = el;
            const MenuItem = ({ text }) => {
                const dateNow = new Date().toUTCString().slice(0, -13);
                const gameDate = el.name;

                let cl = "menu-item";
                if (dateNow === gameDate) {
                    cl += " today"
                }
                return (
                    <div
                        className={cl}
                        onClick={() => this.setState({
                            gamesList: el
                        })}
                    >
                        {text}
                    </div>
                );
            };
            return (
                <MenuItem
                    text={name}
                    key={name}
                />
            );
        });
    };

    render() {
        const { selected } = this.state;
        const menu = this.Menu();
            return <div>
                <div>
                    <ScrollMenu
                        data={menu}
                        arrowLeft={ArrowLeft}
                        arrowRight={ArrowRight}
                        selected={selected}
                        onSelect={this.onSelect}/>
                    {this.state.gamesList.data ? <div>{this.showGames()}</div> : null}
                </div>
            </div>
        }
    }
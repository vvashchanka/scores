import React from 'react';
import UserPage from './userPage';
import axios from 'axios';
import {api} from '../config';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import './homePage.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import save from "./img/save.png"


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

export default class App extends React.Component {
    state = {
        selected: 0,
        loggedOut: false,
        gamesList: 'Nothing to show',
        games: [],
        gamesByDate: [],
        teams: []
    };
//Save games results in pdf
    exportPDF = () => {
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "portrait"; // portrait or landscape

        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);

        doc.setFontSize(15);

        const title = "Games";
        const headers = [["Date", "Winner", "", "", "Opponent"]];
        const data = this.state.games.filter(game => game.approved).map(el => {
            const {team1, team2, score1, score2, date} = el;
            let winner, looser, winScore, looseScore;
            if (score1 > score2) {
                winner = team1;
                winScore = score1;
                looseScore = score2;
                looser = team2;
            } else {
                winner = team2;
                looser = team1;
                winScore = score2;
                looseScore = score1;
            }
                return [date.slice(0, -14), winner, winScore, looseScore, looser]
        }
        );

        let content = {
            startY: 50,
            head: headers,
            body: data
        };

        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("scores.pdf")
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
    showGames = () => {
        return this.state.gamesList.data.map((game)=> {
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

    logOutRedirect = () => {
        this.setState({
            loggedOut: true
        })
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

        if(localStorage.jwt) {
        return <UserPage logged={this.logOutRedirect}/>
    } else {
        return <div className="container">
            <div className="note">
            </div>
            <div className="content">
                <ScrollMenu
                    data={menu}
                    arrowLeft={ArrowLeft}
                    arrowRight={ArrowRight}
                    selected={selected}
                    onSelect={this.onSelect}/>
                {this.state.gamesList.data ? <div>{this.showGames()}</div> : null}
                </div>
            <img onClick={() => this.exportPDF()} src={save} alt="Save game results in pdf"/>
            </div>
    }
}}
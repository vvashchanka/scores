import React from 'react';
import UserPage from './userPage';
import axios from 'axios';
import {api} from '../config';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import './homePage.css';

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
        games: []
    };

    onSelect = key => {
        this.setState({ selected: key });
    };


    getGames = () => {
        axios.get(`${api}games`)
            .then(res => {
                const sorted = res.data.sort((a,b) => new Date(a.date) - new Date(b.date)
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
        this.getGames()
    }

    showGames = () => {
        return this.state.gamesList.data.map((game)=> {

            return <div className="fadeIn" key={game.id+1}>
                <div key={game.id+2} className="team">{game.team1}</div>
                <div key={game.id+3} className={game.approved ? "score" : "unapproved"}>{game.score1} </div>
                <div key={game.id+4} className="score"> : </div>
                <div key={game.id+5} className={game.approved ? "score" : "unapproved"}> {game.score2}</div>
                <div key={game.id+6} className="team">{game.team2}</div>
            </div>
        });

    };

    logOutRedirect = () => {
        this.setState({
            loggedOut: true
        })
    };

    Menu = () => {
        const dates = this.state.games.map(game => game.date.slice(0,10));
        let uniqueDates = [];
        for (let str of dates) {
            if (!uniqueDates.includes(str)) {
                uniqueDates.push(str);
            }
        }
        const newArr = uniqueDates.map(date => {
            const filtered = this.state.games.filter(game => game.date.slice(0, 10) === date);
            const newDate = new Date(date).toUTCString();
            return {
                name: newDate.substr(0, newDate.length - 13),
                data: filtered
            }
        });

        return newArr.map(el => {
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
            </div>
    }
}}
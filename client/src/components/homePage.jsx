import React from 'react';
import UserPage from './userPage';
import axios from 'axios';
import {api} from '../config';
import './homePage.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import {ReactComponent as Export} from './img/svg/export-variant.svg'
import Header from "./header/Header";
import ScrollGames from './scrollMenu'


export default class App extends React.Component {
    state = {
        loggedOut: false
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
    }


    logOutRedirect = () => {
        this.setState({
            loggedOut: true
        })
    };


    render() {
        if(localStorage.jwt) {
        return <UserPage logged={this.logOutRedirect}/>
    } else {
        return <div>
            <Header/>
            <div className="container">
                <div className="note">
                </div>
                <div className="content">
                    <ScrollGames/>
                </div>
                <div className="footer">
                <Export className="saveGame" onClick={() => this.exportPDF()} alt="Save game results in pdf"/>
                </div>
            </div>
        </div>
    }
}}
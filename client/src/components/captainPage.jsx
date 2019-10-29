import React from 'react';
import jwt from "jsonwebtoken";
import InfoMsg from "./infoMsg";
import axios from 'axios';
import 'react-table/react-table.css'
import ReactTable from "react-table";
import {api} from '../config';
import "react-datepicker/dist/react-datepicker.css";
import ScrollGames from "./scrollMenu";
import Header from "./header/Header";
import styles from  '../components/modal/CreateTeam/test.module.css'

export default class CaptainView extends React.Component {
    state = {
        showCreateGame: false,
        ...this.props.state
    };

    game = '';


  //Reset alerts when modal is closed
    resetMsg = () => {
        this.setState({
            msg: null,
            ok: null
        })
    };

//Create new game result
    createGame = () => {
        axios.post(`${api}games`,
            {
                team1: this.state.myTeam.teamName,
                team2: this.state.gameAddTeam || this.game,
                score1: this.state.score1,
                score2: this.state.score2,
                date: this.state.date
            })
            .then(() => {
                this.setState({
                    ok: 'Score sent to opponent',
                    msg: null
                });
            })
            .then(() => {
                this.getUserData()
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    msg: err.response.data,
                    ok: null
                });
            })
    };
//Get all games with my team
    getGames = () => {
        axios.get(`${api}games`, {
            params: {
                team: this.state.myTeam.teamName
            }
        })
            .then(res => {
                this.setState({
                    gamesToConfirm: res.data
                });
            })
            .catch(err => {
                console.log(err)
            });
    };
//Confirm game results
    confirmGame = id => {
        axios.put(`${api}games`, {
            id
        })
            .then((res) => {
                this.setState({
                    ok: res.data
                });
            })
            .then(() => {
                this.getGames();
            })
            .catch(err => {
                console.log(err)
            });
    };
//Decline and delete game result
    deleteGame = id => {
        axios.delete(`${api}games`, {params: {
                id
            }})
            .then(res => {
                this.setState({
                    ok: res.data
                });
                this.getGames();
            })
            .catch(err => {
                console.log(err)
            });
    };
//Get all players without a team
    getFreePlayers = () => {
        axios.get(`${api}users/free`)
            .then(res => {
                this.setState({
                    freePlayers: res.data
                })
            })
    };

//Remove a player from team
    leaveTeam = (teamName) => {
        axios.put(`${api}teams/leave`, {
            teamName, login: this.state.myTeam.player
        })
            .then(() => {
                this.setState({
                    isInTeam: ''
                });
                this.getTeams()
            })
            .catch(err => {
                console.log(err)
            });
    };
//Confirm player`s request to join a team
    confirmPlayer = () => {
        axios.put(`${api}users/confirm`,
            {
                team: this.state.myTeam.teamName
            })
            .then(() => {
                this.getUserData()
            })
            .catch(err => {
                console.log(err)
            });
    };

    setGame = (game) => this.game = game;
//Get captain`s team and all other teams list
    getTeams = () => {

            axios.get(`${api}teams`)
                .then((res) => {
                        const myTeamIdx = res.data.findIndex(team => {
                                return +team.captainId === this.state.data.id
                            }
                        );
                        const myTeam = res.data.splice(myTeamIdx,1)[0];
                        this.setState({
                            teams: res.data,
                            myTeam
                        })
                    }
                )
                .then(() => {
                    this.getPlayerName();
                    this.getGames();
                })
                .catch(err => {
                    console.log(err)
                });
    };
//Handle team choice to create game result
    selectTeam = (team) => {
        this.setState({
            gameAddTeam: team
        })
    };
//Handle team1 score choice to create game result
    setScore1 = (e) => {
        this.setState({
            score1: e.target.value
        })
    };
//Handle game date choice to create game result
    setDate = (date) => {
        this.setState({
            date
        })
    };
//Handle team2 score choice to create game result
    setScore2 = (e) => {
        this.setState({
            score2: e.target.value
        })
    };


//Get user data by login decoded from token
    getUserData = () => {
        const login = jwt.decode(localStorage.jwt).login;
        axios.get(`${api}users`, {
            params: {
                login
            }
        })
            .then(res => {
                this.setState({
                    data: res.data
                })
            })
            .then(() => {
                this.getTeams();
            })
            .catch(err => {
                console.log(err)
            });
    };

    componentWillMount() {
        this.getFreePlayers();
        if(localStorage.jwt) {
            this.getUserData();
        }
    }
//Delete team
    removeTeam = () => {
        axios.delete(`${api}teams`, {
            params:
                {
                    player: this.state.myTeam.player,
                    teamName: this.state.myTeam.teamName,
                    login: this.state.data.login
                }}
        )
            .then(() => {
                this.props.captain()
            })
            .catch(err => {
                console.log(err)
            })
    };

    //Send invite to player
    sendInvite = (player) => {
        axios.post(`${api}users/invite`, {
            userName: player,
            teamName: this.state.myTeam.teamName
        })
            .then(() => this.setState({
                ok: "Invite sent"
            }))
            .catch(err => {
                console.log(err)
            });
    };

    //Get player`s name by login to display on page
    getPlayerName = () => {
        axios.get(`${api}users/player`, {
            params: {
                login: this.state.myTeam.player
            }
        })
            .then(res => {
                this.setState({
                    playerName: res.data
                });
            })
            .catch(err => console.log(err))
    };

    render() {
        const GamesToConfirm = () => {
            console.log(this.state.gamesToConfirm);
            const gameColumns = [{
                Header: 'Opponent Team',
                accessor: 'team1'
            },
                {
                    Header: 'Opponent Score',
                    accessor: 'score1'
                },
                {
                    Header: 'Your Score',
                    accessor: 'score2'
                },
                {
                    Header: 'Game Date',
                    accessor: 'date'
                },
                {
                    Header: '',
                    Cell: row => (
                        <div>
                            <button onClick={() => this.confirmGame(row.original)}>Confirm game</button>
                        </div>
                    )
                },
                {
                    Header: '',
                    Cell: row => (
                        <div>
                            <button onClick={() => this.deleteGame(row.original)}>Decline</button>
                        </div>
                    )
                }
            ];
            return <ReactTable
                minRows='3'
                data={this.state.gamesToConfirm}
                columns={gameColumns}
            />
        };

        const HasPlayer = () => {
            const approvement = () => {
                if (this.state.myTeam.captainApproved  && this.state.myTeam.playerApproved) {
                    return <div>Your team is ready to play</div>
                } else if (this.state.myTeam.captainApproved) {
                    return <div className={styles.waitingConfirm}>Waiting for player to confirm invitation</div>
                } else if (this.state.myTeam.playerApproved) {
                    return <div>The player is not confirmed to join.
                        <button className="btn btn-outline-secondary mr-2" onClick={this.confirmPlayer}>Confirm player</button>
                    </div>
                }
            };

            return <div>Your player is {this.state.playerName}. <button className={styles.removePlayer} onClick={() => this.leaveTeam(this.state.myTeam.teamName)}>Remove player</button>
                {approvement()}
            </div>
        };

        const NoPlayer = () => {
            return <div>You have no player yet. You can invite one.
            </div>
        };

        const {logged} = this.props;
        return        <div>
            <Header state={this.state} isHome={logged} freePlayers={this.state.freePlayers}
                    gamesToConfirm={this.state.gamesToConfirm} reset = {this.resetMsg}
                    confirmGame={this.confirmGame} deleteGame={this.deleteGame}
                    team={this.state.myTeam.teamName}
                    removeTeam={this.removeTeam} sendInvite={this.sendInvite}
                    logo={this.state.myTeam.image}
                    player={this.state.myTeam.player ?  <HasPlayer/> : <NoPlayer/>}
                    captain={this.state.data.login}
                    game={this.setGame} teams={this.state.teams} score1={this.state.score1} score2={this.state.score2}
                    date={this.state.date} ok={this.state.ok} msg={this.state.msg} selectTeam={this.selectTeam}
                    setDate={this.setDate} setScore1={this.setScore1}
                    setScore2={this.setScore2} createGame={this.createGame}
            />
            <div className="container">
                <div className="content">
                    <ScrollGames/>
                </div>
            </div>
        </div>

    }}
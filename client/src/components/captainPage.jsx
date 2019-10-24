import React from 'react';
import jwt from "jsonwebtoken";
import LogoutBtn from "./logoutBtn";
import InfoMsg from "./infoMsg";
import axios from 'axios';
import 'react-table/react-table.css'
import ReactTable from "react-table";
import {api} from '../config';

export default class CaptainView extends React.Component {
    state = this.props.state;

    game = '';
    invite = '';

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

    confirmGame = (row) => {
        axios.put(`${api}game`, {
            id: row.id
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

    deleteGame = (row) => {
        axios.delete(`${api}game`, {params: {
            id: row.id
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

    getFreePlayers = () => {
        axios.get(`${api}players`)
            .then(res => {
                this.setState({
                    freePlayers: res.data
                })
            })
    };

    sendInvite = (player) => {
        axios.post(`${api}invite`, {
            player: player || this.invite,
            team: this.state.myTeam.teamName
        })
            .then(() => {
                this.setState({
                    ok: "Invite sent"
                });
            })
            .catch(err => {
                console.log(err)
            });
    };

    choosePlayer = (player) => {
        this.setState({
            chosenPlayer: player
        });
    };

    leaveTeam = (team) => {
        axios.put(`${api}team/leave`, {
            team, login: this.state.myTeam.player
        })
            .then(res => {
                this.setState({
                    isInTeam: ''
                });
                this.getTeams()
            })
            .catch(err => {
                console.log(err)
            });
    };

    confirmPlayer = () => {
        axios.put(`${api}player/confirm`,
            {
                team: this.state.myTeam.teamName
            })
            .then((res) => {
                this.getUserData()
            })
            .catch(err => {
                console.log(err)
            });
    };

    getTeams = () => {
        if (this.state.data.isCaptain) {
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
        } else {
            axios.get(`${api}teams`)
                .then(res => {
                    const idx = res.data.findIndex(val => val.player === this.state.data.login);
                    if(idx !== -1) {
                        this.setState({
                            isInTeam: res.data[idx].teamName
                        });

                        if(res.data[idx].captainApproved) {
                            this.setState({
                                captainApproved: true
                            })
                        }
                    }

                })
        }


    };

    selectTeam = (team) => {
        this.setState({
            gameAddTeam: team
        })
    };

    setScore1 = (e) => {
        this.setState({
            score1: e.target.value
        })
    };

    setScore2 = (e) => {
        this.setState({
            score2: e.target.value
        })
    };



    createGame = () => {
        axios.post(`${api}game`,
            {
                team1: this.state.myTeam.teamName,
                team2: this.state.gameAddTeam || this.game,
                score1: this.state.score1,
                score2: this.state.score2
            })
            .then(() => {
                this.setState({
                    ok: 'Score sent to opponent'
                });
            })
            .then(() => {
                this.getUserData()
            })
            .catch(err => {
                console.log(err)
            })
    };

    getUserData = () => {
        const login = jwt.decode(localStorage.jwt).login;

        axios.get(`${api}user`, {
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

    removeTeam = () => {
        axios.delete(`${api}team`, {
            params:
                {
                    player: this.state.myTeam.player,
                    teamName: this.state.myTeam.teamName,
                    login: this.state.data.login
                }}
            )
            .then(res => {
                this.props.captain()
            })
            .catch(err => {
                console.log(err)
            })
    };

    getPlayerName = () => {
        axios.get(`${api}player`, {
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
                         return <div>Waiting for player to confirm invitation</div>
                     } else if (this.state.myTeam.playerApproved) {
                         return <div>The player is not confirmed to join.
                             <button className="btn btn-outline-secondary mr-2" onClick={this.confirmPlayer}>Confirm player</button>
                         </div>
                     }
             };

             return <div>Your player is {this.state.playerName}. <button className="btn btn-outline-secondary mr-2" onClick={() => this.leaveTeam(this.state.myTeam.teamName)}>Remove player</button>
                 {approvement()}
             </div>
         };

         const NoPlayer = () => {
             return <div>You have no player yet. Invite: <form className="form" onSubmit={(e) => {
                 e.preventDefault();
                 this.sendInvite(this.state.chosenPlayer);
             }}>
                 <div className="form-group">
                     <select value={this.state.chosenPlayer} onChange={e => this.choosePlayer(e.target.value)}>{
                         this.state.freePlayers.map(
                             (option, i) => {
                                 if(!i) {
                                     this.invite = option.userName
                                 }
                                 return <option key={i}>{option.userName}</option>}
                         )
                     }</select>
                     <button className="btn btn-outline-secondary mr-2">Send invite
                     </button>
                     <InfoMsg ok={this.state.ok} msg={this.state.msg}/>
                 </div>
             </form>
             </div>
         };

        const {logged} = this.props;
        return <div className="container">
            <div className="note">
                <p>Welcome, {this.state.data.userName}</p>
            </div>
            <div className="content">
                Your Login is {this.state.data.login}.
                You registered {this.state.data.createdAt ? this.state.data.createdAt.slice(0, 10) : ''}.
                You are captain
                <div>
                    Your team: {this.state.myTeam.teamName} <button className="btn btn-outline-secondary mr-2" onClick={this.removeTeam}>Delete team</button>
                    {this.state.myTeam.player ?  <HasPlayer/> : <NoPlayer/>
                        }

                </div>
                <form className="form" onSubmit={(e) => {
                    e.preventDefault();
                    this.createGame()
                }}>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Enter your team score"
                               onChange={(e) => this.setScore1(e)}
                        />
                        <input type="text" className="form-control" placeholder="Enter opponent`s score"
                               onChange={(e) => this.setScore2(e)}
                        />
                        Select opponent team: <select onChange={e => this.selectTeam(e.target.value)}>{
                            this.state.teams.map((option, i) => {
                                if(!i) {
                                    this.game = option.teamName
                                }
                               return <option key={i}>{option.teamName}</option>
                            })
                        }</select>

                        <button className="btn btn-outline-secondary mr-2">Save game results
                        </button>

                        <InfoMsg ok={this.state.ok} msg={this.state.msg}/>
                    </div>
                </form>
                {this.state.gamesToConfirm.length ? <GamesToConfirm/> : null}
                <LogoutBtn isHome={logged}/>
            </div>
        </div>
    }}
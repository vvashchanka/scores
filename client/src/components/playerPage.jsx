import React from 'react';
import jwt from "jsonwebtoken";
import axios from 'axios';
import 'react-table/react-table.css';
import {api} from '../config';
import Header from "./header/Header";
import ScrollGames from "./scrollMenu";
import styles from './modal/CreateTeam/test.module.css';

/*const fs = require('fs');*/

export default class PlayerView extends React.Component {
    state = {
        showCreateTeam: false,
        myTeamCaptain: '',
        ...this.props.state
    };
//Open create team modal
    toggleShowCreateTeam = () => {
        this.setState({
            showCreateTeam: !this.state.showCreateTeam,
            msg: null,
            ok: null
        })
    };
//Join team
    joinTeam = (teamName) => {
        axios.put(`${api}teams/join`, {
            player: this.state.data.login,
            teamName
        })
            .then(res => {
                this.setState({
                    isInTeam: res.data.teamName
                });
                this.getUserData()
            })
            .catch(err => {
                console.log(err)
            });
    };
//Accept invite
    acceptTeam = (teamName) => {
        axios.put(`${api}teams/accept`, {
            player: this.state.data.login,
            teamName
        })
            .then(res => {
                this.setState({
                    isInTeam: res.data.teamName,
                    hasInvites: false
                });
            })
            .then(() =>
                this.getTeams()
            )
            .catch(err => {
                console.log(err)
            });
    };
//Decline invite
    declineTeam = (teamName) => {
        axios.put(`${api}teams/decline`, {
            player: this.state.data.login,
            teamName
        })
            .then(res => {
                this.setState({
                    isInTeam: '',
                    hasInvites: false
                });
            })
            .then(() =>
                this.getUserData()
            )
            .catch(err => {
                console.log(err)
            });
    };
//Leave a team
    leaveTeam = (teamName) => {
        axios.put(`${api}teams/leave`, {
            teamName, login: this.state.data.login
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
//Get teams list to join and invites

    getCaptain = () => {
        /*console.log(this.state.data);*/
        axios.get(`${api}users/captain`, {
            params: {teamName: this.state.data.teamName}
        })
            .then(res => {
               /* console.log(res.data)*/
                this.setState({
                    myTeamCaptain: res.data
                });
            })
            .catch(err => console.log(err))
    };

    getTeams = () => {
        axios.get(`${api}teams`)
            .then(res => {
                const idx = res.data.findIndex(val => val.player === this.state.data.login);
                if (idx !== -1) {
                    this.setState({
                        isInTeam: res.data[idx].teamName
                    });
                    if (res.data[idx].captainApproved && res.data[idx].playerApproved) {
                        this.setState({
                            teamApproved: true
                        })
                    } else if (res.data[idx].captainApproved) {
                        this.setState({
                            hasInvites: true
                        })
                    }
                }
                const teamsToJoin = res.data.filter(team => !team.player);
                const teamsToAccept = res.data.filter(team => team.player === this.state.data.login);
                this.setState({
                    teamsToJoin, teamsToAccept
                })
            })
    };
//Decode login by token and get user`s data
    getUserData = async () => {
        const data = {
            login: jwt.decode(localStorage.jwt).login
        };
        await axios.get(`${api}users`, {
            params: {
                login: data.login
            }
        })
            .then(res => {
                this.setState({
                    data: res.data
                })
            })
            .then(() => {
                this.getTeams()
            })
            .then(() => {
                this.getCaptain()
            })
            .catch(err => {
                console.log(err)
            });
        await this.getCaptain()
    };

    componentDidMount() {
        if (localStorage.jwt) {
            this.getUserData();
        }
    }

//Handle team name input to create a team
    teamName = (e) => {
        this.setState({
            team: e.target.value
        })
    };
//Create a new team and become a captain
    createTeam = (team, image) => {
        axios.post(`${api}teams`, {
            image,
            teamName: team,
            id: this.state.data.id
        })
            .then(() => {
                this.props.captain()
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    msg: err.response.data,
                    ok: null
                });
            })
    };

    render() {
        /*const Invites = () => {
            return <div>Invites:
                <ReactTable
                    minRows='3'
                    data={this.state.teamsToAccept}
                    columns={acceptColumns}
                />
            </div>
        };*/

        /*const IsInTeam = () => {
            return <div>Your team is {this.state.isInTeam}. {this.state.teamApproved ?
                <div>Your team is ready to play</div>
                : <div>You are not approved yet</div>}
                <button className="btn btn-outline-secondary mr-2"
                        onClick={() => this.leaveTeam(this.state.isInTeam)}>Leave team {this.state.isInTeam}</button>
            </div>
        };*/

      /*  const IsNotInTeam = () => {
            console.log(this.state.teamsToJoin);
            return <div>
                <ReactTable
                    minRows='3'
                    data={this.state.teamsToJoin}
                    columns={joinColumns}
                />
                <button className="buttonCreateTeam" onClick={this.toggleShowCreateTeam}>
                    Create team
                </button>
                <Modal show={this.state.showCreateTeam} onHide={this.toggleShowCreateTeam}>
                    <CreateTeam ok={this.state.ok} msg={this.state.msg} team={this.createTeam}/>
                </Modal>
            </div>
        };*/

       /* const joinColumns = [{
            Header: 'Team name',
            accessor: 'teamName'
        },
            {
                Header: '',
                Cell: row => (
                    <div>
                        <button onClick={() => this.joinTeam(row.original)}>Join team</button>
                    </div>
                )
            }
        ];*/
      /*  const acceptColumns = [{
            Header: 'Team name',
            accessor: 'teamName'
        },
            {
                Header: '',
                Cell: row => (
                    <div>
                        <button onClick={() => this.acceptTeam(row.original)}>Accept invite</button>
                    </div>
                )
            },
            {
                Header: '',
                Cell: row => (
                    <div>
                        <button onClick={() => this.declineTeam(row.original)}>Decline</button>
                    </div>
                )
            }
        ];*/
       /* const {logged} = this.props;*/
        return <>
            <Header
                myCaptain={this.state.myTeamCaptain}
                state={this.state}
                createTeam={this.createTeam}
                teamsToJoin={this.state.teamsToJoin}
                joinTeam={this.joinTeam}
                playerLogin={this.state.data.login}
                acceptTeam={this.acceptTeam}
                declineTeam={this.declineTeam}
                teamName={this.state.isInTeam}
                approvedPlayer={this.state.teamApproved ?
                        <div>Your team is ready to play</div>
                        : <div>You are not approved yet</div>}
                leaveTeam={<button className={styles.notApprovedButton}
                                   onClick={() => this.leaveTeam(this.state.isInTeam)}>Leave team {this.state.isInTeam}</button>}
            />
            <div className="container">
              {/*  <div className="content">
                    {this.state.hasInvites ? <Invites/>
                        : this.state.isInTeam ? <IsInTeam/>
                            : IsNotInTeam()}
                    Your Login is {this.state.data.login}.
                    You registered {this.state.data.createdAt ? this.state.data.createdAt.slice(0, 10) : ''
                }.
                </div>*/}
                <ScrollGames/>
            </div>
        </>
    }
}
import React from 'react';
import jwt from "jsonwebtoken";
import LogoutBtn from "./logoutBtn";
import InfoMsg from "./infoMsg";
import axios from 'axios';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import {api} from '../config';
import { Modal } from 'react-bootstrap';
import CreateTeam from './modal/CreateTeam/createTeam'

export default class PlayerView extends React.Component {
    state = {
        showCreateTeam: false,
        ...this.props.state};

    toggleShowCreateTeam = () => {
        this.setState({
            showCreateTeam: !this.state.showCreateTeam
        })
    };

    joinTeam = (row) => {
        axios.put(`${api}team/join`, {
            player: this.state.data.login,
            team: row.teamName
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

    acceptTeam = (row) => {
        axios.put(`${api}teams/accept`, {
            player: this.state.data.login,
            team: row.teamName
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

    declineTeam = (row) => {
        axios.put(`${api}teams/decline`, {
            player: this.state.data.login,
            team: row.teamName
        })
            .then(res => {
                this.setState({
                    isInTeam: '',
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

    leaveTeam = (team) => {
        axios.put(`${api}team/leave`, {
            team, login: this.state.data.login
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

    getTeams = () => {
        if (this.state.data.isCaptain) {
            axios.get(`${api}teams`,{
                    query: {
                        id: this.state.data.id
                    }
                }
                )
                .then(res => {
                    this.setState({
                        myTeam: res.data
                    })
                })
                .catch(err => {
                    console.log(err)
                });
        }

        axios.get(`${api}teams`)
            .then(res => {
                const idx = res.data.findIndex(val => val.player === this.state.data.login);
                if(idx !== -1) {
                    this.setState({
                        isInTeam: res.data[idx].teamName
                    });

                    if(res.data[idx].captainApproved && res.data[idx].playerApproved) {
                        this.setState({
                            teamApproved: true
                        })
                    }else if (res.data[idx].captainApproved) {
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

    getUserData = () => {
        const data = {
            login: jwt.decode(localStorage.jwt).login
        };
        axios.get(`${api}user`, {
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
            .catch(err => {
                console.log(err)
            });
    };
    componentDidMount() {
        if(localStorage.jwt) {
            this.getUserData();
        }
    }

    teamName = (e) => {
        this.setState({
            team: e.target.value
        })
    };

    createTeam = (t) => {
        console.log('create');
        axios.post(`${api}team`, {
            name: t,
            id: this.state.data.id
        })
            .then(() => {
                this.setState({
                    ok: 'Team created',
                    disabled: true
                });
            })
            .then(() => {
                this.props.captain()
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    msg: err.response.data
                });
            })
    };

    render() {
        const Invites = () => {
            return <div>Invites:
                <ReactTable
                    minRows='3'
                    data={this.state.teamsToAccept}
                    columns={acceptColumns}
                />
            </div>
        };

        const IsInTeam = () => {
            return <div>Your team is {this.state.isInTeam}. {this.state.teamApproved ? <div>Your team is ready to play</div>
                : <div>You are not approved yet</div>}
                <button className="btn btn-outline-secondary mr-2" onClick={() => this.leaveTeam(this.state.isInTeam)}>Leave team {this.state.isInTeam}</button></div>
        };

        const IsNotInTeam = () => {
            return <div>
                <ReactTable
                    minRows='3'
                    data={this.state.teamsToJoin}
                    columns={joinColumns}
                />
                <button className="btn btn-outline-secondary mr-2" onClick={this.toggleShowCreateTeam}>
                    Create team
                </button>
                <Modal show={this.state.showCreateTeam} onHide={this.toggleShowCreateTeam}>
                <CreateTeam team={this.createTeam}/>
                </Modal>
                <InfoMsg ok={this.state.ok} msg={this.state.msg}/>
            </div>
        };

        const joinColumns = [{
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
        ];
        const acceptColumns = [{
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
        ];
        const {logged} = this.props;
        return        <div className="container">
            <div className="note">
                <p>Welcome, {this.state.data.userName}</p>
            </div>
            <div className="content">
                {this.state.hasInvites ? <Invites/>
                : this.state.isInTeam ? <IsInTeam/>
                : IsNotInTeam() }
                Your Login is {this.state.data.login}.
                You registered {this.state.data.createdAt ? this.state.data.createdAt.slice(0, 10) : ''
            }.
                <LogoutBtn isHome={logged}/>
            </div>
        </div>}}
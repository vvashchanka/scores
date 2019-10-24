import React from 'react';

export default class InfoMsg extends React.Component {
    render() {
        if (this.props.msg) {
            return <div className="alert alert-danger error" role="alert">
                {this.props.msg}
            </div>
        } else if (this.props.ok){
            return <div className="alert alert-success error" role="alert">
                {this.props.ok}
            </div>
        } else {
            return null
        }
    }
}
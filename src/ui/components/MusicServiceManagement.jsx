import _ from 'lodash';
import React from 'react';

import MusicServiceManagementStore from '../stores/MusicServiceManagementStore';
import MusicServiceManagementActions from '../actions/MusicServiceManagementActions';

class MusicServiceManagement extends React.Component {

    constructor (props) {
		super(props);
        this.state = {};
    }

	componentDidMount() {
		MusicServiceManagementStore.addChangeListener(this._onChange.bind(this));
	}

	_onChange() {
		this.setState({
            client: MusicServiceManagementStore.getClient(),
            link: MusicServiceManagementStore.getLink(),
        });
	}

	_cancel () {
        this.state = {};
		MusicServiceManagementActions.hideManagement();
	}

    _next () {
        if(!this.state.link && this.state.client.auth === 'UserId') {
            console.log(this.state);
            return;
        }

        if(!this.state.link && this.state.client.auth === 'Anonymous') {
            MusicServiceManagementActions.addAnonymousService(this.state.client);
        }

        if(!this.state.link && this.state.client.auth === 'DeviceLink') {
            MusicServiceManagementActions.getLink(this.state.client);
            return;
        }
	}

    _changeUserName (e) {
        this.setState({
            username: e.target.value
        });
    }

    _changePassword (e) {
        this.setState({
            password: e.target.value
        });
    }

	render () {

        let link;

		if(!this.state.client) {
			return null;
		}

        if(this.state.client.auth === 'Anonymous') {
            link = (
                <p>Click next to add the Service at your own risk.</p>
            );
        }

        if(this.state.client.auth === 'UserId') {
            link = (<form>
                <p>Click next to add the Service at your own risk.</p>
                <div>
                    <label>Username</label>
                    <input type="text" onChange={this._changeUserName.bind(this)} />
                </div>

                <div>
                    <label>Password</label>
                    <input type="password" onChange={this._changePassword.bind(this)} />
                </div>
            </form>);
        }

        if(this.state.client.auth === 'DeviceLink' && !this.state.link) {
            link = (
                <p>Click next to add the Service at your own risk.</p>
            );
        }

        if(this.state.client.auth === 'DeviceLink' && this.state.link) {
            link = (
                <div>
                    <p>Click the link below to authorize this app to use the Service.</p>
                    <a href={this.state.link.regUrl} target="_blank">{this.state.link.regUrl}</a>
                </div>
            );
        }

		return (
			<div id="music-service-management">
				<div id="music-service-management-container">
					<h3>
						{this.state.client.name}
					</h3>

                    <div>
                        <p>This feature is super experimental and untested mostly. It might not work at all or lead to unexpected behaviour.</p>
                        <p>Unlike the offical Sonos apps, this will require you to authenticate against the music service again, as auth tokens cannot be retrieved from the sonos players.</p>
                    </div>

                    {link}

					<button onClick={this._cancel.bind(this)} className="cancel-button">Cancel</button>
                    <button onClick={this._next.bind(this)} className="next-button">Next</button>
				</div>
			</div>
		);
	}
}

export default MusicServiceManagement;

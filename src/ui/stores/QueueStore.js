"use strict";

import events from 'events';
import _ from "lodash";

import Dispatcher from '../dispatcher/AppDispatcher';
import Constants  from '../constants/Constants';

const CHANGE_EVENT = 'change';

var QueueStore = _.assign({}, events.EventEmitter.prototype, {

	// _selected : [],
	_tracks : [],
	_position: null,
	_updateID: null,

	emitChange () {
		this.emit(CHANGE_EVENT);
	},

	addChangeListener (listener) {
		this.on(CHANGE_EVENT, listener);
	},

	setPosition (pos) {
		this._position = Number(pos);
	},

	getPosition (pos) {
		return this._position;
	},

	setUpdateID (id) {
		this._updateID = id;
	},

	getUpdateID (id) {
		return this._updateID;
	},

	setTracks (tracks) {
		tracks = tracks || [];
		// preserve selection if direct match
		let old = this._tracks;
		let oldIDs = old.map((t) => { return t.uri; });
		let newIDs = tracks.map((t) => { return t.uri; });

		tracks.forEach((t, i) => {
			if(oldIDs[i] === newIDs[i] && oldIDs[i] && old[i].selected) {
				t.selected = true;
				return;
			} 
		});

		this._tracks = tracks;
	},

	moveTrack (position, newPosition) {
		let slice = this._tracks.splice(position - 1, 1);
		this._tracks.splice(newPosition - 1, 0, slice[0]);
	},

	getTracks () {
		return this._tracks;
	},

	getSelected () {
		return this._selected;
	},

	clearSelected () {
		this._selected = [];
	},

	addToSelection (track, position) {
		this._tracks[position - 1].selected = true;
		// this._selected.push(track);
	},

	removeFromSelection (track, position) {
		this._tracks[position - 1].selected = false;
		// let matches = _.filter(this._selected, _.matches(track));
		// _.pull(this._selected, matches[0]);
	},
});

Dispatcher.register(action => {
	switch (action.actionType) {
		case Constants.QUEUE_REORDER:
			QueueStore.moveTrack(action.position, action.newPosition);
			QueueStore.emitChange();
			break;

		case Constants.QUEUE_SELECT:
			QueueStore.addToSelection(action.track, action.position);
			QueueStore.emitChange();
			break;

		case Constants.QUEUE_DESELECT:
			QueueStore.removeFromSelection(action.track, action.position);
			QueueStore.emitChange();
			break;

		case Constants.SONOS_SERVICE_POSITION_INFO_UPDATE:
			QueueStore.setPosition(action.info.Track);
			QueueStore.emitChange();
			break;

		case Constants.SONOS_SERVICE_QUEUE_UPDATE:
			QueueStore.setTracks(action.result.items);
			QueueStore.setUpdateID(action.result.updateID);
			QueueStore.emitChange();
			break;

		case Constants.ZONE_GROUP_SELECT:
			QueueStore.setTracks(null);
			QueueStore.clearSelected();
			QueueStore.emitChange();
			break;

		case Constants.QUEUE_FLUSH:
			QueueStore.clearSelected();
			QueueStore.emitChange();
			break;
	}
});

export default QueueStore;


const { EventTarget, defineEventAttribute } = require('event-target-shim');
const utils = require('./utils');

class MediaStreamTrack extends EventTarget
{
	constructor({ kind, id, label } = {})
	{
		super();

		// Id.
		// @type {String}
		this._id = id || utils.randomString();

		// Kind ('audio' or 'video').
		// @type {String}
		this._kind = kind;

		// Label.
		// @type {String}
		this._label = label;

		// Enabled flag.
		// @type {Boolean}
		this._enabled = true;

		// Muted flag.
		// @type {Boolean}
		this._muted = false;

		// Ready state ('live' or 'ended').
		// @type {String}
		this._readyState = 'live';

		// Custom data.
		// @type {Any}
		this._data = null;
	}

	get id()
	{
		return this._id;
	}

	get kind()
	{
		return this._kind;
	}

	get label()
	{
		return this._label;
	}

	get enabled()
	{
		return this._enabled;
	}

	set enabled(enabled)
	{
		this._enabled = Boolean(enabled);

		if (this._enabled)
			this.dispatchEvent({ type: 'enable' });
		else
			this.dispatchEvent({ type: 'disable' });
	}

	get muted()
	{
		return this._muted;
	}

	set muted(muted)
	{
		this._muted = Boolean(muted);

		if (this._muted)
			this.dispatchEvent({ type: 'mute' });
		else
			this.dispatchEvent({ type: 'unmute' });
	}

	get readyState()
	{
		return this._readyState;
	}

	set readyState(readyState)
	{
		this._readyState = readyState;
	}

	get data()
	{
		return this._data;
	}

	set data(data)
	{
		this._data = data;
	}

	clone({ id } = {})
	{
		const newTrack = new MediaStreamTrack(
			{
				id         : id || utils.randomString(),
				kind       : this._kind,
				label      : this._label,
				enabled    : this._enabled,
				muted      : this._muted,
				readyState : this._readyState,
				data       : this._data
			});

		return newTrack;
	}

	stop()
	{
		if (this._readyState === 'ended')
			return;

		this._readyState = 'ended';

		this.dispatchEvent({ type: 'ended' });
	}
}

// Define `track.onended` property.
defineEventAttribute(MediaStreamTrack.prototype, 'ended');

// Define `track.onmute` property.
defineEventAttribute(MediaStreamTrack.prototype, 'mute');

// Define `track.onunmute` property.
defineEventAttribute(MediaStreamTrack.prototype, 'unmute');

// Define `track.onenable` property.
defineEventAttribute(MediaStreamTrack.prototype, 'enable');

// Define `track.ondisable` property.
defineEventAttribute(MediaStreamTrack.prototype, 'disable');

module.exports = MediaStreamTrack;

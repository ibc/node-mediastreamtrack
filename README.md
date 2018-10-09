# node-mediastreamtrack

W3 [MediaStreamTrack](https://www.w3.org/TR/mediacapture-streams/#mediastreamtrack) interface for Node.js.

This library is intended for Node.js applications or libraries that depend on the `MediaStreamTrack` class. The exposed `MediaStreamTrack` class does not internally manage any audio/video source. It's up to the application how to associate a `MediaStreamTrack` instance with a real media stream/track.


## Install

```bash
$ npm install node-mediastreamtrack
```


## Usage

```js
const MediaStreamTrack = require('node-mediastreamtrack');

const track = new MediaStreamTrack({ kind: 'audio' });

track.enabled = false;

console.log('track.readyState: %s, track.enabled: %s', track.readyState, track.enabled);
// => 'track.readyState: live, track.enabled: false'

const clonedTrack = track.clone();

track.stop();

console.log('track.readyState: %s', track.readyState);
// => 'track.readyState: ended'

console.log('clonedTrack.readyState: %s', clonedTrack.readyState);
// => 'clonedTrack.readyState: live'
```


## API additions

### Constructor

The `MediaStreamTrack` provides a class constructor that accepts an Object as parameter with the following fields.

```js
const track = new MediaStreamTrack({ kind, id, label })
```

* `kind`: "audio" or "video" string.
* `id`: Track unique identificator string. If not given, a random one is internally generated.
* `label`: Track label (string).

### Properties

* Setting `track.enabled = true/false` emits a custom "enable" or "disable" [Event](https://dom.spec.whatwg.org/#event).
* `track.muted` is writable.
* Setting `track.muted = true/false` emits "mute" or "unmute" [Event](https://dom.spec.whatwg.org/#event).
* "ended" [Event](https://dom.spec.whatwg.org/#event) is emitted when calling  `track.stop()`.

```js
const track = new MediaStreamTrack({ kind: 'video' });

track.onended = () => console.log('track ended (1)');
track.addEventListener('ended', () => console.log('track ended (2)'));

track.stop();
// => track ended (1)
// => track ended (2)
```


## Limitations

Some W3 [MediaStreamTrack](https://www.w3.org/TR/mediacapture-streams/#mediastreamtrack) properties and methods are not implemented:

* `track.getCapabilities()`
* `track.getConstraints()`
* `track.getSettings()`
* `track.applyConstraints`
* `track.onoverconstrained`


## Author

* Iñaki Baz Castillo [[website](https://inakibaz.me)|[github](https://github.com/ibc/)]


## License

ISC

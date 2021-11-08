// Class for sending midi notes

export class MidiDevice {

    private _channel: number;
    private _midiAccess: WebMidi.MIDIOutput;

    constructor(midi: WebMidi.MIDIOutput, channel?: number) {
        this._midiAccess = midi;
        this._channel = channel || 0;
    }

    playNote(note: number, vel: number, state: 'on' | 'off') {
        if (state === 'on') {
            this._midiAccess.send([0x90 + this._channel, note, vel]);
        } else {
            this._midiAccess.send([0x80 + this._channel, note, vel]);
        }
    }
};

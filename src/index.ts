import { MidiDevice } from './MidiDevice';
let channel = 12;
let midiDevices:Array<MidiDevice> = [];

navigator.requestMIDIAccess().then((access) => {
    for (let output of access.outputs.values()) {
        midiDevices.push(new MidiDevice(output, channel));
    }
});

function* notes() {
    let total = 0;
    while (total < 10) {
        total++;
        let random = ~~(Math.random() * (90 - 50 + 1) + 50);
        yield random;
    }
}

const noteGen = notes();

function playNotes(notes:Iterator<number>) {
    setTimeout(() => {
        const note = notes.next().value;

        console.log(note);

        if (!note) {
            return;
        }

        midiDevices[0].playNote(note, 100, "on");

        setTimeout(() => {
            midiDevices[0].playNote(note, 100, "off");
            playNotes(noteGen);
        }, Math.random() * 1000);

    }, Math.random() * 500);
}

playNotes(noteGen);

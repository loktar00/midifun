import { MidiDevice } from './MidiDevice';

import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('lets-noodle')
class LetsNoodle extends LitElement {

    private channel = 12;
    private midiDevices:Array<MidiDevice> = [];
    private notes;

    constructor() {
        super();
        this.notes = this.noteGen();
        navigator.requestMIDIAccess().then((access) => {
            for (let output of access.outputs.values()) {
                this.midiDevices.push(new MidiDevice(output, this.channel));
            }
        });

        this.playNotes(this.notes);
    }


    * noteGen() {
        let total = 0;
        while (total < 10) {
            total++;
            let random = ~~(Math.random() * (90 - 50 + 1) + 50);
            yield random;
        }
    }

    playNotes(notes:Iterator<number>) {
        setTimeout(() => {
            const note = notes.next().value;

            console.log(note);

            if (!note) {
                return;
            }

            this.midiDevices[0].playNote(note, 100, "on");

            setTimeout(() => {
                this.midiDevices[0].playNote(note, 100, "off");
                this.playNotes(this.notes);
            }, Math.random() * 1000);

        }, Math.random() * 500);
    }

    render() {
        return html`
            <div>
                Noodle
            </div>
        `;
    }
}

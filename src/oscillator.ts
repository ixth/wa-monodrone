import { CustomAudioNode } from './custom-audio-node';

interface OscillatorOptions {
    type: OscillatorType;
    frequency: number;
    volume: number;
}

export class Oscillator extends CustomAudioNode {
    static numberOfInputs = 0;

    static numberOfOutputs = 1;

    private _oscillatorNode: OscillatorNode;

    public gain: AudioParam;

    public frequency: AudioParam;

    // using setter because type is not an AudioParam
    set type(value: OscillatorType) {
        this._oscillatorNode.type = value;
    }

    constructor(
        context: BaseAudioContext,
        { type, frequency, volume }: Partial<OscillatorOptions>
    ) {
        super(context);

        const gainNode = new GainNode(context, { gain: volume });
        this.gain = gainNode.gain;

        this._oscillatorNode = new OscillatorNode(context, { type, frequency });
        this.frequency = this._oscillatorNode.frequency;
        this._oscillatorNode.connect(gainNode);

        this._outputs[0] = gainNode;
    }

    start() {
        this._oscillatorNode.start();
    }
}

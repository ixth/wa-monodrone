import { CustomAudioNode } from './custom-audio-node';
import { FeedbackDelay } from './feedback-delay';
import { NoiseNode } from './noise';
import { Oscillator } from './oscillator';

export class Monotron extends CustomAudioNode {
    static numberOfInputs = 0;

    static numberOfOutputs = 1;

    public gain: AudioParam;

    public lfoRate: AudioParam;

    public lfoInt: AudioParam;

    public vcfCutoff: AudioParam;

    public delayTime: AudioParam;

    public delayFeedback: AudioParam;

    constructor(context: BaseAudioContext) {
        super(context);

        const gainNode = new GainNode(context, { gain: 0.5 });

        const lfoNode = new Oscillator(context, {
            type: 'triangle',
            frequency: 6,
            volume: 5,
        });

        const oscNode = new Oscillator(context, {
            type: 'sawtooth',
            volume: 0,
        });

        const noiseNode = new NoiseNode(context, { volume: 0.01 });

        const vcfNode = new BiquadFilterNode(context, { frequency: 20000 });

        const delayNode = new FeedbackDelay(context, {
            maxDelayTime: 2,
            delayTime: 0.05,
            feedback: 0.5,
        });

        lfoNode.connect(oscNode.frequency);

        oscNode.connect(vcfNode);
        noiseNode.connect(vcfNode);

        vcfNode.connect(gainNode);
        vcfNode.connect(delayNode);

        delayNode.connect(gainNode);
        delayNode.connect(vcfNode, 1);

        this.gain = gainNode.gain;

        this.lfoRate = lfoNode.frequency;
        this.lfoInt = lfoNode.gain;

        this.vcfCutoff = vcfNode.frequency;

        this.delayTime = delayNode.delayTime;
        this.delayFeedback = delayNode.feedback;

        this._outputs[0] = gainNode;
    }
}

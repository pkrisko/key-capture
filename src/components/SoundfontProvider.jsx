// See https://github.com/danigb/soundfont-player
// for more documentation on prop options.
import React, { useState, useEffect } from 'react';
import Soundfont from 'soundfont-player';

const SoundfontProvider = ({
   format = 'mp3',
   soundfont = 'MusyngKite',
   instrumentName = 'acoustic_grand_piano',
   hostname,
   audioContext,
   render
}) => {
    const [activeAudioNodes, setActiveAudioNodes] = useState({});
    const [instrument, setInstrument] = useState(null);

    const loadInstrument = async () => {
        // Re-trigger loading state
        setInstrument(null);
        const soundfontInstrument = await Soundfont.instrument(audioContext, instrumentName, {
            format: format,
            soundfont: soundfont,
            nameToUrl: (name, soundfont, format) =>
                `${hostname}/${soundfont}/${name}-${format}.js`,
        });
        setInstrument(soundfontInstrument);
    };

    const playNote = async midiNumber => {
        await audioContext.resume();
        const audioNode = instrument.play(midiNumber);
        setActiveAudioNodes(Object.assign({}, activeAudioNodes, {
            [midiNumber]: audioNode,
        }));
    };

    const stopNote = async (midiNumber) => {
        await audioContext.resume();
        if (!activeAudioNodes[midiNumber]) {
            return;
        }
        const audioNode = activeAudioNodes[midiNumber];
        audioNode.stop();
        setActiveAudioNodes(Object.assign({}, activeAudioNodes, {
            [midiNumber]: null,
        }));
    };

    const stopAllNotes = async () => {
        await audioContext.resume();
        const values = Object.values(activeAudioNodes);
        values.forEach(node => node && node.stop());
        setActiveAudioNodes({});
    };

    useEffect(() => {
        loadInstrument();
    }, []);

    return render({
        isLoading: !instrument,
        playNote,
        stopNote,
        stopAllNotes,
    });
}

export default SoundfontProvider;

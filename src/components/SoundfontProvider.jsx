import { useState, useEffect } from 'react';
import Soundfont from 'soundfont-player';

const SoundfontProvider = ({
  format = 'mp3',
  soundfont = 'MusyngKite',
  instrumentName = 'acoustic_grand_piano',
  hostname,
  audioContext,
  render,
}) => {
  const [activeAudioNodes, setActiveAudioNodes] = useState({});
  const [instrument, setInstrument] = useState(null);

  const playNote = async (midiNumber) => {
    await audioContext.resume();
    const audioNode = instrument.play(midiNumber);
    setActiveAudioNodes({ ...activeAudioNodes, [midiNumber]: audioNode });
  };

  const stopNote = async (midiNumber) => {
    await audioContext.resume();
    if (!activeAudioNodes[midiNumber]) {
      return;
    }
    const audioNode = activeAudioNodes[midiNumber];
    audioNode.stop();
    setActiveAudioNodes({ ...activeAudioNodes, [midiNumber]: null });
  };

  const stopAllNotes = async () => {
    await audioContext.resume();
    const values = Object.values(activeAudioNodes);
    values.forEach((node) => node && node.stop());
    setActiveAudioNodes({});
  };

  useEffect(() => {
    const loadInstrument = async () => {
      // Re-trigger loading state
      setInstrument(null);
      const soundfontInstrument = await Soundfont.instrument(audioContext, instrumentName, {
        format,
        soundfont,
        nameToUrl: (name, font, form) => `${hostname}/${font}/${name}-${form}.js`,
      });
      setInstrument(soundfontInstrument);
    };
    loadInstrument();
  }, [audioContext, format, hostname, instrumentName, soundfont]);

  return render({
    isLoading: !instrument,
    playNote,
    stopNote,
    stopAllNotes,
  });
};

export default SoundfontProvider;

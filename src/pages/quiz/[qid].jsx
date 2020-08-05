import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Piano from '../../components/Piano';
import { MIDI_MAP } from '../../util/constants';
import { Typography } from '@material-ui/core';

const quiz = ['a', 'c', 'd#', 'f', 'g'];

const QuestionSection = ({num, note}) => (
    <div className="question-section">
        <div className="question-number">
            {num}
        </div>
        <Typography variant="h6">
            Click this note on the piano and confirm: <strong>{note}</strong>
        </Typography>
    </div>
)

const Quiz = () => {
    const [questionIdx, setQuestionIdx] = useState(0);
    const [answers, setAnswers] = useState([]);
    const router = useRouter();
    const { qid } = router.query;

    const onNotePlayed = midiNotes => {
        const firstNote = midiNotes[0];
        if (firstNote && questionIdx < quiz.length) {
            const selection = {
                midiNote: firstNote,
                letterNoteSelected: MIDI_MAP[firstNote],
                correctAnswer: quiz[questionIdx]
            };
            setAnswers([...answers, selection]);
            setQuestionIdx(questionIdx + 1);
        }
    }

    if (questionIdx === quiz.length) {
        console.log("DONE");
        console.log("SCORE");
        console.log(answers);
        const reducer = (acc, {correctAnswer, letterNoteSelected}) => {
            return correctAnswer === letterNoteSelected ? acc + 1 : acc;
        }
        const score = answers.reduce(reducer, 0);
        console.log(score);
        console.log(score / quiz.length);
    }

    return (
        <>
            <QuestionSection num={questionIdx + 1} note={quiz[questionIdx]}/>
            <Piano onNotePlayed={onNotePlayed} />
            {JSON.stringify(answers)}
        </>
    );
}

export default Quiz;
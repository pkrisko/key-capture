import React from 'react';
import _ from 'lodash';

const noteMap = {
  C4: {
    position: 10,
    ledgerLine: true,
    flat: false,
    sharp: false,
  },
  'C#4': {
    position: 10,
    ledgerLine: true,
    flat: false,
    sharp: true,
  },
  D4: {
    position: 9,
    ledgerLine: false,
    flat: false,
    sharp: false,
  },
  'D#4': {
    position: 9,
    ledgerLine: false,
    flat: false,
    sharp: true,
  },
  E4: {
    position: 8,
    ledgerLine: false,
    flat: false,
    sharp: false,
  },
  F4: {
    position: 7,
    ledgerLine: false,
    flat: false,
    sharp: false,
  },
  'F#4': {
    position: 7,
    ledgerLine: false,
    flat: false,
    sharp: true,
  },
  G4: {
    position: 6,
    ledgerLine: false,
    flat: false,
    sharp: false,
  },
  'G#4': {
    position: 6,
    ledgerLine: false,
    flat: false,
    sharp: true,
  },
  A4: {
    position: 5,
    ledgerLine: false,
    flat: false,
    sharp: false,
  },
  'A#4': {
    position: 5,
    ledgerLine: false,
    flat: false,
    sharp: true,
  },
  B4: {
    position: 4,
    ledgerLine: false,
    flat: false,
    sharp: false,
  },
  C5: {
    position: 3,
    ledgerLine: false,
    flat: false,
    sharp: false,
  },
  'C#5': {
    position: 3,
    ledgerLine: false,
    flat: false,
    sharp: true,
  },
  D5: {
    position: 2,
    ledgerLine: false,
    flat: false,
    sharp: false,
  },
  'D#5': {
    position: 2,
    ledgerLine: false,
    flat: false,
    sharp: true,
  },
  E5: {
    position: 1,
    ledgerLine: false,
    flat: false,
    sharp: false,
  },
  'E#5': {
    position: 1,
    ledgerLine: false,
    flat: false,
    sharp: true,
  },
  F5: {
    position: 0,
    ledgerLine: false,
    flat: false,
    sharp: false,
  },
};

const SharpSvg = ({ top }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.0"
    viewBox="0 0 6 19"
    className="sharp-svg"
    width="9"
    height="28.5"
    style={{ top }}
  >
    <defs id="defs1363" />
    <g transform="translate(0.000000,0.765000)" id="layer1">
      <g transform="translate(-84.19600,-436.0680)" fill="#000" id="g2103">
        <path
          d="M 86.102000,447.45700 L 86.102000,442.75300 L 88.102000,442.20100 L 88.102000,446.88100 L 86.102000,447.45700 z M 90.040000,446.31900 L 88.665000,446.71300 L 88.665000,442.03300 L 90.040000,441.64900 L 90.040000,439.70500 L 88.665000,440.08900 L 88.665000,435.30723 L 88.102000,435.30723 L 88.102000,440.23400 L 86.102000,440.80900 L 86.102000,436.15923 L 85.571000,436.15923 L 85.571000,440.98600 L 84.196000,441.37100 L 84.196000,443.31900 L 85.571000,442.93500 L 85.571000,447.60600 L 84.196000,447.98900 L 84.196000,449.92900 L 85.571000,449.54500 L 85.571000,454.29977 L 86.102000,454.29977 L 86.102000,449.37500 L 88.102000,448.82500 L 88.102000,453.45077 L 88.665000,453.45077 L 88.665000,448.65100 L 90.040000,448.26600 L 90.040000,446.31900 z "
          id="path2109"
        />
      </g>
    </g>
  </svg>
);

const TrebleClefSvg = () => (
<svg viewBox="0 0 44 75"
     version="1.0" className="treble-clef-svg">
  <defs id="defs1941" />
  <g transform="matrix(1.010278,0,0,1.010278,-24.38602,-0.986803)">
    <path
      d="M 39.708934,63.678683 C 39.317094,65.77065 41.499606,70.115061 45.890584,70.256984 C 51.19892,70.428558 54.590321,66.367906 53.010333,59.740875 L 45.086538,23.171517 C 44.143281,18.81826 44.851281,16.457097 45.354941,15.049945 C 46.698676,11.295749 50.055822,9.7473042 50.873134,10.949208 C 51.339763,11.635413 52.468042,14.844006 49.256275,20.590821 C 46.751378,25.072835 35.096985,30.950138 34.2417,41.468011 C 33.501282,50.614249 43.075689,57.369301 51.339266,54.71374 C 56.825686,52.950639 59.653965,44.62402 56.258057,40.328987 C 47.29624,28.994371 32.923702,46.341263 46.846564,51.0935 C 45.332604,49.90238 44.300646,48.980054 44.1085,47.852721 C 42.237755,36.876941 58.741182,39.774741 54.294493,50.18735 C 52.466001,54.469045 45.080341,55.297323 40.874269,51.477433 C 37.350853,48.277521 35.787387,42.113231 39.708327,37.687888 C 45.018831,31.694223 51.288782,26.31366 52.954064,18.108736 C 54.923313,8.4061491 48.493821,0.84188926 44.429027,10.385835 C 43.065093,13.588288 42.557016,16.803074 43.863006,22.963534 L 51.780549,60.311215 C 52.347386,62.985028 51.967911,66.664419 49.472374,68.355474 C 48.236187,69.193154 43.861784,69.769668 42.791575,67.770092"
      style={{ fill: 'black', fillOpacity: 1, fillRule: 'nonzero', stroke: 'black', strokeWidth: 0.1, strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 4, strokeDasharray: 'none', strokeOpacity:1 }} />
    <path
      transform="matrix(-1.08512,-2.036848e-2,2.036848e-2,-1.08512,90.68868,135.0572)"
      d="M 48.24903 64.584198 A 3.439605 3.4987047 0 1 1  41.36982,64.584198 A 3.439605 3.4987047 0 1 1  48.24903 64.584198 z"
      id="path4608"
      style={{ fill: 'black', fillOpacity: 1, stroke: 'black', strokeWidth: 0.09213948, strokeMiterlimit: 4, strokeDasharray: 'none', strokeOpacity: 1 }}
    />
  </g>
</svg>

);

const NoteSvg = ({ top }) => (
  <svg viewBox="0 0 52.13 97.301" version="1.0" style={{ top }} className="note-svg" width="31" height="57.86">
    <g id="layer1" transform="translate(-382.51 -658)">
      <path
        d="m408.04 658c5.88 14.34 12.3 22.76 16.39 27.42 3.23 3.68 20.94 20.04 0.53 45.61 12.12-25.04 7.76-39.88-13.92-49.03v53c0.68 21.83-21.75 23.16-27.21 17.35-5.65-5.99 7.67-25.89 24.21-19.35v-75z"
      />
    </g>
  </svg>
);

const MusicalStaff = ({ note }) => {
  const { position, ledgerLine, sharp } = _.get(noteMap, `[${note}]`, {});
  const noteTop = `${8 * position + 8}px`;
  const sharpTop = `${(8 * position) + 37}px`;
  return (
    <div className="musical-staff">
      <TrebleClefSvg />
      {sharp && <SharpSvg top={sharpTop} />}
      <NoteSvg top={noteTop} />
      <div className="staff-line" />
      <div className="staff-line" />
      <div className="staff-line" />
      <div className="staff-line" />
      <div className="staff-line" />
      {ledgerLine && <div className="ledger-line" />}
    </div>
  );
};

export default MusicalStaff;

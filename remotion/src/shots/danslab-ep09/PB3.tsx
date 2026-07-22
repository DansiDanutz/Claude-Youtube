import React from 'react';
import { DlBumper } from '../../lib/danslab';

export const compositionConfig = { id: 'PB3', durationInSeconds: 8, fps: 30, width: 1920, height: 1080 };

const PB3: React.FC = () => <DlBumper part="ACT THREE" title="The Bets" />;
export default PB3;

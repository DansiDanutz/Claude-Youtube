import React from 'react';
import { DlBumper } from '../../lib/danslab';

export const compositionConfig = { id: 'PB2', durationInSeconds: 8, fps: 30, width: 1920, height: 1080 };

const PB2: React.FC = () => <DlBumper part="ACT TWO" title="The Schools" />;
export default PB2;

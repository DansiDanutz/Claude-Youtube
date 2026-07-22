import React from 'react';
import { DlBumper } from '../../lib/danslab';

export const compositionConfig = { id: 'StB2', durationInSeconds: 8, fps: 30, width: 1920, height: 1080 };

const StB2: React.FC = () => <DlBumper part="PART TWO" title="The Right Hand" />;
export default StB2;

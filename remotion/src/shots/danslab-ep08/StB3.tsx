import React from 'react';
import { DlBumper } from '../../lib/danslab';

export const compositionConfig = { id: 'StB3', durationInSeconds: 8, fps: 30, width: 1920, height: 1080 };

const StB3: React.FC = () => <DlBumper part="PART THREE" title="The Watch" />;
export default StB3;

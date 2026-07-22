import React from 'react';
import { DlBumper } from '../../lib/danslab';

export const compositionConfig = { id: 'PB4', durationInSeconds: 8, fps: 30, width: 1920, height: 1080 };

const PB4: React.FC = () => <DlBumper part="ACT FOUR" title="The Method" />;
export default PB4;

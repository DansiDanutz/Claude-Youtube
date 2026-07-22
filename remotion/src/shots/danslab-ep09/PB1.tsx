import React from 'react';
import { DlBumper } from '../../lib/danslab';

export const compositionConfig = { id: 'PB1', durationInSeconds: 8, fps: 30, width: 1920, height: 1080 };

const PB1: React.FC = () => <DlBumper part="ACT ONE" title="The Table" />;
export default PB1;

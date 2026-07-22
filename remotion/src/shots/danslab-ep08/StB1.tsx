import React from 'react';
import { DlBumper } from '../../lib/danslab';

export const compositionConfig = { id: 'StB1', durationInSeconds: 8, fps: 30, width: 1920, height: 1080 };

const StB1: React.FC = () => <DlBumper part="PART ONE" title="The Desk" />;
export default StB1;

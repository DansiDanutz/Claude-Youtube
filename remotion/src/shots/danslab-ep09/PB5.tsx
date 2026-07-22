import React from 'react';
import { DlBumper } from '../../lib/danslab';

export const compositionConfig = { id: 'PB5', durationInSeconds: 8, fps: 30, width: 1920, height: 1080 };

const PB5: React.FC = () => <DlBumper part="ACT FIVE" title="The Player" />;
export default PB5;

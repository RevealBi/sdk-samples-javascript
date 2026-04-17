process.env.NODE_OPTIONS = `${process.env.NODE_OPTIONS || ''} --max-old-space-size=16384`.trim();
require('react-scripts/scripts/start');

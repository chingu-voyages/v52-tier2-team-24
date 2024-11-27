import { useState } from 'react';

export default function Planning () {
  const [timePeriod, setTimePeriod] = useState('daily');
  const [outputType, setOutputType] = useState('list');

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-gray-700 mb-2">Select Time Period</h3>
          <div className="flex gap-2">
            <button
              className={`px-4 py-2 rounded ${
                timePeriod === 'daily' ? 'bg-gray-100' : 'bg-white'
              }`}
              onClick={() => setTimePeriod('daily')}
            >
              Daily
            </button>
            <button
              className={`px-4 py-2 rounded ${
                timePeriod === 'weekly' ? 'bg-gray-100' : 'bg-white'
              }`}
              onClick={() => setTimePeriod('weekly')}
            >
              Weekly
            </button>
            <button
              className={`px-4 py-2 rounded ${
                timePeriod === 'monthly' ? 'bg-gray-100' : 'bg-white'
              }`}
              onClick={() => setTimePeriod('monthly')}
            >
              Monthly
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-gray-700 mb-2">Output Type</h3>
          <div className="flex gap-2">
            <button
              className={`px-4 py-2 rounded ${
                outputType === 'list' ? 'bg-gray-100' : 'bg-white'
              }`}
              onClick={() => setOutputType('list')}
            >
              List View
            </button>
            <button
              className={`px-4 py-2 rounded ${
                outputType === 'map' ? 'bg-gray-100' : 'bg-white'
              }`}
              onClick={() => setOutputType('map')}
            >
              Map View
            </button>
            <button
              className={`px-4 py-2 rounded ${
                outputType === 'both' ? 'bg-gray-100' : 'bg-white'
              }`}
              onClick={() => setOutputType('both')}
            >
              Both
            </button>
          </div>
        </div>

        <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          Retrieve Planning
        </button>
      </div>
    </div>
  );
};

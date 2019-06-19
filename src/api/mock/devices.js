import _ from 'lodash';
import facility from './data/mock-facilities';
import devices from './data/mock-devices';

/*
summary = {
  facility: {
    installed: val,
    active: val,
    failures: val,
    deviceStats: [
      {type: count},
    ]
  },
  floors: [
    {
      floorNo: val,
      devices:[
        {type:'led', stats: {installed: value, active: value, failures: [{type, value}]}},
        {type:'hvac', stats: {installed: value, active: value, failures: [{type, value}]}},
      ],
      status: 'OK or Device Failures',
    }
  ]
}


*/

export function getDeviceSummary() {
  devices.forEach((d) => {});

  const summary = {};
  // for facility
  // per floor
  return summary;
}

export function getDevices() {
  return Promise.resolve({ data: devices });
}

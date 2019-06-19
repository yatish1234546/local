import _ from 'lodash';
import chance from '@/api/mock/data/mock-generator';
import facility from '@/api/mock/data/mock-facilities';

// Device Defn.
chance.pickone(['LED', 'HVAC', 'Window Blind', 'Sensor']);
chance.mixin({
  led() {
    return {
      id: chance.guid(),
      type: 'LED',
      serialNo: chance.integer({ min: 10001, max: 20000 }),
      name: `MHT-${chance.pad(chance.integer({ min: 1, max: 200 }), 3)}`,
      vendor: 'MHT',
      model: `MHTi-VOLS-SC-2x2-${chance.integer({ min: 20, max: 28 })}`,
      modelType: 'Luminaire',
      hwVersion: '1.0',
      swVersion: '1.0',
      connectivity: chance.pickone(['online', 'offline']),
      location: {
        id: chance.pad(chance.integer({ min: 1, max: 100 }), 3),
        name: `005-001-S3-D-F1-${chance.pad(chance.integer({ min: 1, max: 200 }), 3)}`,
        path: '',
        floorIndex: 0,
      },
      custom: {
        brightness: chance.integer({ min: 0, max: 100 }),
        onStatus: chance.pickone(['ON', 'OFF']),
        wattage: chance.pickone([10, 18, 24, 36]),
      },
      macAddress: chance.mac_address(),
      ipAddress: chance.ip(),
    };
  },
  hvac() {
    return {
      id: chance.guid(),
      type: 'HVAC',
      serialNo: chance.integer({ min: 10001, max: 20000 }),
      name: `MHT-${chance.pad(chance.integer({ min: 1, max: 200 }), 3)}`,
      vendor: 'MHT',
      model: `MHTi-VOLS-SC-2x2-${chance.integer({ min: 20, max: 28 })}`,
      modelType: 'Luminaire',
      hwVersion: '1.0',
      swVersion: '1.0',
      connectivity: chance.pickone(['online', 'offline']),
      location: {
        id: chance.pad(chance.integer({ min: 1, max: 100 }), 3),
        name: `005-001-S3-D-F1-${chance.pad(chance.integer({ min: 1, max: 200 }), 3)}`,
        path: '',
        floorIndex: 0,
      },
      custom: {
        onStatus: chance.pickone(['ON', 'OFF']),
        temperature: chance.integer({ min: 65, max: 75 }),
      },
      macAddress: chance.mac_address(),
      ipAddress: chance.ip(),
    };
  },
  blinds() {
    return {
      id: chance.guid(),
      type: 'Window Blind',
      serialNo: chance.integer({ min: 10001, max: 20000 }),
      name: `MHT-${chance.pad(chance.integer({ min: 1, max: 200 }), 3)}`,
      vendor: 'MHT',
      model: `MHTi-VOLS-SC-2x2-${chance.integer({ min: 20, max: 28 })}`,
      modelType: 'Luminaire',
      hwVersion: '1.0',
      swVersion: '1.0',
      connectivity: chance.pickone(['online', 'offline']),
      location: {
        id: chance.pad(chance.integer({ min: 1, max: 100 }), 3),
        name: `005-001-S3-D-F1-${chance.pad(chance.integer({ min: 1, max: 200 }), 3)}`,
        path: '',
        floorIndex: 0,
      },
      custom: {
        onStatus: chance.pickone(['OPEN', 'CLOSED']),
      },
      macAddress: chance.mac_address(),
      ipAddress: chance.ip(),
    };
  },
  motionSensor() {
    return {
      id: chance.guid(),
      type: 'Motion Sensor',
      serialNo: chance.integer({ min: 10001, max: 20000 }),
      name: `MHT-${chance.pad(chance.integer({ min: 1, max: 200 }), 3)}`,
      vendor: 'MHT',
      model: `MHTi-VOLS-SC-2x2-${chance.integer({ min: 20, max: 28 })}`,
      modelType: 'Luminaire',
      hwVersion: '1.0',
      swVersion: '1.0',
      connectivity: chance.pickone(['online', 'offline']),
      location: {
        id: chance.pad(chance.integer({ min: 1, max: 100 }), 3),
        name: `005-001-S3-D-F1-${chance.pad(chance.integer({ min: 1, max: 200 }), 3)}`,
        path: '',
        floorIndex: 0,
      },
      custom: {
        onStatus: chance.pickone(['ON', 'OFF']),
        motionStatus: chance.pickone([0, 1]),
      },
      macAddress: chance.mac_address(),
      ipAddress: chance.ip(),
    };
  },
  co2Sensor() {
    return {
      id: chance.guid(),
      type: 'CO2 Sensor',
      serialNo: chance.integer({ min: 10001, max: 20000 }),
      name: `MHT-${chance.pad(chance.integer({ min: 1, max: 200 }), 3)}`,
      vendor: 'MHT',
      model: `MHTi-VOLS-SC-2x2-${chance.integer({ min: 20, max: 28 })}`,
      modelType: 'Luminaire',
      hwVersion: '1.0',
      swVersion: '1.0',
      connectivity: chance.pickone(['online', 'offline']),
      location: {
        id: chance.pad(chance.integer({ min: 1, max: 100 }), 3),
        name: `005-001-S3-D-F1-${chance.pad(chance.integer({ min: 1, max: 200 }), 3)}`,
        path: '',
        floorIndex: 0,
      },
      custom: {
        onStatus: chance.pickone(['ON', 'OFF']),
        value: chance.floating({ min: 0, max: 1 }),
      },
      macAddress: chance.mac_address(),
      ipAddress: chance.ip(),
    };
  },
  heatSensor() {
    return {
      id: chance.guid(),
      type: 'Temperature Sensor',
      serialNo: chance.integer({ min: 10001, max: 20000 }),
      name: `MHT-${chance.pad(chance.integer({ min: 1, max: 200 }), 3)}`,
      vendor: 'MHT',
      model: `MHTi-VOLS-SC-2x2-${chance.integer({ min: 20, max: 28 })}`,
      modelType: 'Luminaire',
      hwVersion: '1.0',
      swVersion: '1.0',
      connectivity: chance.pickone(['online', 'offline']),
      location: {
        id: chance.pad(chance.integer({ min: 1, max: 100 }), 3),
        name: `005-001-S3-D-F1-${chance.pad(chance.integer({ min: 1, max: 200 }), 3)}`,
        path: '',
        floorIndex: 0,
      },
      custom: {
        onStatus: chance.pickone(['ON', 'OFF']),
        value: chance.floating({ min: 65, max: 78 }),
      },
      macAddress: chance.mac_address(),
      ipAddress: chance.ip(),
    };
  },
  humiditySensor() {
    return {
      id: chance.guid(),
      type: 'Humidity Sensor',
      serialNo: chance.integer({ min: 10001, max: 20000 }),
      name: `MHT-${chance.pad(chance.integer({ min: 1, max: 200 }), 3)}`,
      vendor: 'MHT',
      model: `MHTi-VOLS-SC-2x2-${chance.integer({ min: 20, max: 28 })}`,
      modelType: 'Luminaire',
      hwVersion: '1.0',
      swVersion: '1.0',
      connectivity: chance.pickone(['online', 'offline']),
      location: {
        id: chance.pad(chance.integer({ min: 1, max: 100 }), 3),
        name: `005-001-S3-D-F1-${chance.pad(chance.integer({ min: 1, max: 200 }), 3)}`,
        path: '',
        floorIndex: 0,
      },
      custom: {
        onStatus: chance.pickone(['ON', 'OFF']),
        value: chance.floating({ min: 40, max: 60 }),
      },
      macAddress: chance.mac_address(),
      ipAddress: chance.ip(),
    };
  },
  lightSensor() {
    return {
      id: chance.guid(),
      type: 'Light Sensor',
      serialNo: chance.integer({ min: 10001, max: 20000 }),
      name: `MHT-${chance.pad(chance.integer({ min: 1, max: 200 }), 3)}`,
      vendor: 'MHT',
      model: `MHTi-VOLS-SC-2x2-${chance.integer({ min: 20, max: 28 })}`,
      modelType: 'Luminaire',
      hwVersion: '1.0',
      swVersion: '1.0',
      connectivity: chance.pickone(['online', 'offline']),
      location: {
        id: chance.pad(chance.integer({ min: 1, max: 100 }), 3),
        name: `005-001-S3-D-F1-${chance.pad(chance.integer({ min: 1, max: 200 }), 3)}`,
        path: '',
        floorIndex: 0,
      },
      custom: {
        onStatus: chance.pickone(['ON', 'OFF']),
        value: chance.floating({ min: 0, max: 4096 }),
      },
      macAddress: chance.mac_address(),
      ipAddress: chance.ip(),
    };
  },
  occupancySensor() {
    return {
      id: chance.guid(),
      type: 'Occupancy Sensor',
      serialNo: chance.integer({ min: 10001, max: 20000 }),
      name: `MHT-${chance.pad(chance.integer({ min: 1, max: 200 }), 3)}`,
      vendor: 'MHT',
      model: `MHTi-VOLS-SC-2x2-${chance.integer({ min: 20, max: 28 })}`,
      modelType: 'Luminaire',
      hwVersion: '1.0',
      swVersion: '1.0',
      connectivity: chance.pickone(['online', 'offline']),
      location: {
        id: chance.pad(chance.integer({ min: 1, max: 100 }), 3),
        name: `005-001-S3-D-F1-${chance.pad(chance.integer({ min: 1, max: 200 }), 3)}`,
        path: '',
        floorIndex: 0,
      },
      custom: {
        onStatus: chance.pickone(['ON', 'OFF']),
        value: chance.floating({ min: 0, max: 100 }),
      },
      macAddress: chance.mac_address(),
      ipAddress: chance.ip(),
    };
  },
  poeSwitch() {
    return {
      id: chance.guid(),
      type: 'POE-Switch',
      serialNo: chance.integer({ min: 10001, max: 20000 }),
      name: `Cisco-9300-${chance.pad(chance.integer({ min: 1, max: 200 }), 3)}`,
      vendor: 'Cisco',
      model: 'Catalyst 9300',
      modelType: 'C9300-24T',
      hwVersion: '1.0',
      swVersion: '1.0',
      status: 'online',
      location: {
        id: chance.pad(chance.integer({ min: 1, max: 100 }), 3),
        name: `005-001-S3-D-F1-${chance.pad(chance.integer({ min: 1, max: 200 }), 3)}`,
        path: '',
        floorIndex: 0,
      },
      custom: {
        noPorts: 24,
        wattage: 350,
        portData: {
          1: chance.poeSwitchPort(),
          2: chance.poeSwitchPort(),
          3: chance.poeSwitchPort(),
          4: chance.poeSwitchPort(),
          5: chance.poeSwitchPort(),
          6: chance.poeSwitchPort(),
          7: chance.poeSwitchPort(),
          8: chance.poeSwitchPort(),
          9: chance.poeSwitchPort(),
          10: chance.poeSwitchPort(),
          11: chance.poeSwitchPort(),
          12: chance.poeSwitchPort(),
          13: chance.poeSwitchPort(),
          14: chance.poeSwitchPort(),
          15: chance.poeSwitchPort(),
          16: chance.poeSwitchPort(),
          17: chance.poeSwitchPort(),
          18: chance.poeSwitchPort(),
          19: chance.poeSwitchPort(),
          20: chance.poeSwitchPort(),
          21: chance.poeSwitchPort(),
          22: chance.poeSwitchPort(),
          23: chance.poeSwitchPort(),
          24: chance.poeSwitchPort(),
        },
      },
      macAddress: chance.mac_address(),
      ipAddress: chance.ip(),
    };
  },
  poeSwitchPort() {
    return {
      portId: chance.integer({ min: 1, max: 24 }),
      ipAddress: chance.ip(),
      powerConsumption: chance.floating({ min: 0, max: 60 }),
      status() {
        return this.powerConsumption > 0 ? 'active' : 'inactive';
      },
    };
  },
});

function generateData(devices, func, no, noFloors) {
  for (let floorIndex = 1; floorIndex <= noFloors; floorIndex += 1) {
    for (let index = 1; index <= no; index += 1) {
      const device = func();
      device.location.floorIndex = floorIndex;
      devices.push(device);
    }
  }
}

// we want
// - 100 leds per floor
// - 5 HVACs per floor
// - 20 Blinds per floor (down or up)
// - 100 motion sensors per floor ( 0 or 1)
// - 10 co2 sensors per floor (1% CO2 for indoor (or outdoor) air quality)
// - 10 temperature sensors per floor (65 - 75 F)
// - 10 humidity sensors per floor (40 - 60 %)
// - 20 light sensors per floor ( 0 - 4096) higher indicates darkness
// - 100 occupancy sensors per floor ( 0 - 100 %)
// - 16 POE Switches per floor
const devices = [];

// All values per floor
const noLeds = 100;
const noHVACs = 5;
const noBlinds = 20;
const noMotionSensors = 100;
const noCO2Sensors = 10;
const noHeatSensors = 10;
const noHumiditySensors = 10;
const noLightSensors = 20;
const noOccupancySensors = 100;
const noPoESwitches = 16;

const noFloors = facility.floors.length;

// Data generation
generateData(devices, chance.led, noLeds, noFloors);
generateData(devices, chance.hvac, noHVACs, noFloors);
generateData(devices, chance.blinds, noBlinds, noFloors);
generateData(devices, chance.motionSensor, noMotionSensors, noFloors);
generateData(devices, chance.co2Sensor, noCO2Sensors, noFloors);
generateData(devices, chance.heatSensor, noHeatSensors, noFloors);
generateData(devices, chance.humiditySensor, noHumiditySensors, noFloors);
generateData(devices, chance.lightSensor, noLightSensors, noFloors);
generateData(devices, chance.occupancySensor, noOccupancySensors, noFloors);
generateData(devices, chance.poeSwitch, noPoESwitches, noFloors);

console.log(`No. devices: ${devices.length}`);

// Ensure switch ports have sequential ids
const switches = _.filter(devices, d => d.type === 'POE-Switch');
switches.forEach((s) => {
  const { portData } = s.custom;
  let counter = 1;
  for (const index in portData) {
    if ({}.hasOwnProperty.call(portData, index)) {
      portData[index].portId = counter;
      counter += 1;
    }
  }
});

export default devices;

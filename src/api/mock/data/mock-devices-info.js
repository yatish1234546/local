const devices = [
  {
    assetId: '1',
    type: 'poe-switch', // led, hvac, touch switch
    floor: {
      no: '#F01-S01-C01',
      name: 'A Wing',
    },
    location: {
      name: 'conf room',
    },
    meta: {
      mfg: 'Cisco Catalyst 9300',
      model: '',
      custom: {
        ports: 24,
        activePorts: 24,
      },
    },

    status: 'online',
    operationalStatus: 'operational / failed',
    custom: {
      powerConsumption: '',
      ipAddress: '',
      macAddress: '',
      deviceConnected: 'asset-id',
    },
  },
  {
    assetId: '2',
    type: 'led', // led, hvac, touch switch
    floor: {
      no: '#F01-S02-C01',
      name: 'C Wing',
    },
    location: {
      name: 'conf room',
    },
    meta: {
      mfg: 'NETGEAR GS324',
      model: '',
      custom: {
        ports: 24,
        activePorts: 19,
      },
    },

    status: 'offline',
    operationalStatus: 'operational / failed',
    custom: {
      powerConsumption: '',
      ipAddress: '',
      macAddress: '',
      deviceConnected: 'asset-id',
    },
  },
  {
    assetId: '3',
    type: 'hvac', // led, hvac, touch switch
    floor: {
      no: '#F01-S03-C01',
      name: 'B Wing',
    },
    location: {
      name: 'conf room',
    },
    meta: {
      mfg: 'Cisco Catalyst 3300',
      model: '',
      custom: {
        ports: 24,
        activePorts: 15,
      },
    },

    status: 'online',
    operationalStatus: 'operational / failed',
    custom: {
      powerConsumption: '',
      ipAddress: '',
      macAddress: '',
      deviceConnected: 'asset-id',
    },
  },
];

const ports = {
  assetId: 1,
  cluster: Math.floor(Math.random() * 100),
  status: 'InActive',
  connected: 'Disconnected',
  ipAddress: '168.245.02.1',
  powerConsumption: Math.floor(Math.random() * 100),
  location: '005-001-S3-D-F1-115',
};


export function findAll() {
  return devices;
}

export function portDetails(id) {
  return ports;
}

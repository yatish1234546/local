const menu = [
  {
    id: '1',
    icon: 'dashboard',
    'icon-alt': 'keyboard_arrow_down',
    text: 'Dashboard',
    model: false,
    uri: '/content/dashboard',
    navigate: true,
    meta: {
      access: [
        'ROLE_EXECUTIVE',
        'ROLE_SYS_ADMIN',
        'ROLE_FACILITY_ADMIN',
        'ROLE_SUPPORT_ENGG',
        'ROLE_FIELD_ENGG',
      ],
    },
    children: [
      {
        id: '1-1',
        text: 'Energy Consumption',
        uri: '/content/dashboard/consumption',
        navigate: true,
        meta: {
          access: [
            'ROLE_EXECUTIVE',
            'ROLE_SYS_ADMIN',
            'ROLE_FACILITY_ADMIN',
            'ROLE_SUPPORT_ENGG',
            'ROLE_FIELD_ENGG',
          ],
        },
      },
      {
        id: '1-2',
        text: 'Energy Saving',
        uri: '/content/dashboard/saving',
        navigate: true,
        meta: {
          access: [
            'ROLE_EXECUTIVE',
            'ROLE_SYS_ADMIN',
            'ROLE_FACILITY_ADMIN',
            'ROLE_SUPPORT_ENGG',
            'ROLE_FIELD_ENGG',
          ],
        },
      },
      {
        id: '1-3',
        text: 'Facility Health',
        uri: '/content/dashboard/health',
        navigate: true,
        meta: {
          access: [
            'ROLE_EXECUTIVE',
            'ROLE_SYS_ADMIN',
            'ROLE_FACILITY_ADMIN',
            'ROLE_SUPPORT_ENGG',
            'ROLE_FIELD_ENGG',
          ],
        },
      },
      {
        id: '1-4',
        text: 'Device Status',
        uri: '/content/dashboard/device-status',
        navigate: true,
        meta: {
          access: [
            'ROLE_EXECUTIVE',
            'ROLE_SYS_ADMIN',
            'ROLE_FACILITY_ADMIN',
            'ROLE_SUPPORT_ENGG',
            'ROLE_FIELD_ENGG',
          ],
        },
      },
      {
        id: '1-5',
        text: 'Sensors',
        uri: '/content/dashboard/sensors',
        navigate: true,
        meta: {
          access: [
            'ROLE_EXECUTIVE',
            'ROLE_SYS_ADMIN',
            'ROLE_FACILITY_ADMIN',
            'ROLE_SUPPORT_ENGG',
            'ROLE_FIELD_ENGG',
          ],
        },
      },
    ],
  },
  {
    id: '9',
    icon: 'control_camera',
    'icon-alt': 'games',
    text: 'Control Panel',
    model: false,
    uri: '/content/control',
    navigate: false,
    meta: {
      access: [
        'ROLE_EXECUTIVE',
        'ROLE_SYS_ADMIN',
        'ROLE_FACILITY_ADMIN',
        'ROLE_SUPPORT_ENGG',
        'ROLE_FIELD_ENGG',
      ],
    },
  },
  {
    id: '2',
    icon: 'filter',
    'icon-alt': 'keyboard_arrow_down',
    text: 'Reporting',
    model: false,
    uri: '/content/reports',
    navigate: false,
    meta: {
      access: [
        'ROLE_EXECUTIVE',
        'ROLE_SYS_ADMIN',
        'ROLE_FACILITY_ADMIN',
        'ROLE_SUPPORT_ENGG',
        'ROLE_FIELD_ENGG',
      ],
    },
    children: [
      {
        id: '2-1',
        text: 'xoxo xoxox xoxox',
        uri: '/content/reports/1',
        navigate: true,
        meta: {
          access: [
            'ROLE_EXECUTIVE',
            'ROLE_SYS_ADMIN',
            'ROLE_FACILITY_ADMIN',
            'ROLE_SUPPORT_ENGG',
            'ROLE_FIELD_ENGG',
          ],
        },
      },
      {
        id: '2-2',
        text: 'xoxo xoxox xoxox',
        uri: '/content/reports/2',
        navigate: true,
        meta: {
          access: [
            'ROLE_EXECUTIVE',
            'ROLE_SYS_ADMIN',
            'ROLE_FACILITY_ADMIN',
            'ROLE_SUPPORT_ENGG',
            'ROLE_FIELD_ENGG',
          ],
        },
      },
      {
        id: '2-3',
        text: 'xoxo xoxox xoxox',
        uri: '/content/reports/3',
        navigate: true,
        meta: {
          access: [
            'ROLE_EXECUTIVE',
            'ROLE_SYS_ADMIN',
            'ROLE_FACILITY_ADMIN',
            'ROLE_SUPPORT_ENGG',
            'ROLE_FIELD_ENGG',
          ],
        },
      },
    ],
  },
  {
    id: '3',
    icon: 'history',
    'icon-alt': 'keyboard_arrow_down',
    text: 'Monitoring',
    model: false,
    uri: '/content/monitoring',
    navigate: false,
    meta: {
      access: [
        'ROLE_EXECUTIVE',
        'ROLE_SYS_ADMIN',
        'ROLE_FACILITY_ADMIN',
        'ROLE_SUPPORT_ENGG',
        'ROLE_FIELD_ENGG',
      ],
    },
    children: [
      {
        id: '3-1',
        text: 'Alerts',
        uri: '/content/monitoring/alerts',
        navigate: true,
        meta: {
          access: [
            'ROLE_EXECUTIVE',
            'ROLE_SYS_ADMIN',
            'ROLE_FACILITY_ADMIN',
            'ROLE_SUPPORT_ENGG',
            'ROLE_FIELD_ENGG',
          ],
        },
      },
      {
        id: '3-2',
        text: 'Health',
        uri: '/content/monitoring/health',
        navigate: true,
        meta: {
          access: [
            'ROLE_EXECUTIVE',
            'ROLE_SYS_ADMIN',
            'ROLE_FACILITY_ADMIN',
            'ROLE_SUPPORT_ENGG',
            'ROLE_FIELD_ENGG',
          ],
        },
      },
      {
        id: '3-3',
        text: 'JVM Metrics',
        uri: '/content/monitoring/jvm',
        navigate: true,
        meta: {
          access: [
            'ROLE_EXECUTIVE',
            'ROLE_SYS_ADMIN',
            'ROLE_FACILITY_ADMIN',
            'ROLE_SUPPORT_ENGG',
            'ROLE_FIELD_ENGG',
          ],
        },
      },
    ],
  },
  {
    id: '4',
    icon: 'headset_mic',
    'icon-alt': 'keyboard_arrow_down',
    text: 'Support',
    model: false,
    uri: '/content/support',
    navigate: false,
    meta: {
      access: [
        'ROLE_EXECUTIVE',
        'ROLE_SYS_ADMIN',
        'ROLE_FACILITY_ADMIN',
        'ROLE_SUPPORT_ENGG',
        'ROLE_FIELD_ENGG',
      ],
    },
    children: [
      {
        id: '4-1',
        text: 'Tools',
        uri: '/content/support/tools',
        navigate: true,
        meta: {
          access: [
            'ROLE_EXECUTIVE',
            'ROLE_SYS_ADMIN',
            'ROLE_FACILITY_ADMIN',
            'ROLE_SUPPORT_ENGG',
            'ROLE_FIELD_ENGG',
          ],
        },
      },
    ],
  },
  {
    id: '5',
    icon: 'settings',
    'icon-alt': 'keyboard_arrow_down',
    text: 'Setup',
    model: false,
    uri: '/content/setup',
    navigate: false,
    meta: {
      access: ['ROLE_SYS_ADMIN', 'ROLE_FACILITY_ADMIN', 'ROLE_SUPPORT_ENGG', 'ROLE_FIELD_ENGG'],
    },
    children: [
      {
        id: '5-1',
        icon: 'fa-tasks',
        'icon-alt': 'keyboard_arrow_down',
        text: 'Policy Manager',
        model: false,
        uri: '/content/setup/policy',
        navigate: false,
        meta: {
          access: [
            'ROLE_EXECUTIVE',
            'ROLE_SYS_ADMIN',
            'ROLE_FACILITY_ADMIN',
            'ROLE_SUPPORT_ENGG',
            'ROLE_FIELD_ENGG',
          ],
        },
        children: [
          {
            id: '5-1-1',
            text: 'Policy Editor',
            uri: '/content/setup/policy/editor',
            navigate: true,
            meta: {
              access: [
                'ROLE_EXECUTIVE',
                'ROLE_SYS_ADMIN',
                'ROLE_FACILITY_ADMIN',
                'ROLE_SUPPORT_ENGG',
                'ROLE_FIELD_ENGG',
              ],
            },
          },
        ],
      },
      {
        id: '5-2',
        icon: 'devices',
        'icon-alt': 'keyboard_arrow_down',
        text: 'Device Manager',
        model: false,
        uri: '/content/setup/device',
        navigate: false,
        meta: {
          access: [
            'ROLE_EXECUTIVE',
            'ROLE_SYS_ADMIN',
            'ROLE_FACILITY_ADMIN',
            'ROLE_SUPPORT_ENGG',
            'ROLE_FIELD_ENGG',
          ],
        },
        children: [
          {
            id: '5-2-1',
            text: 'Devices',
            uri: '/content/setup/device/manager',
            navigate: true,
            meta: {
              access: [
                'ROLE_EXECUTIVE',
                'ROLE_SYS_ADMIN',
                'ROLE_FACILITY_ADMIN',
                'ROLE_SUPPORT_ENGG',
                'ROLE_FIELD_ENGG',
              ],
            },
          },
          {
            id: '5-2-2',
            text: 'Clusters',
            uri: '/content/setup/device/cluster',
            navigate: true,
            meta: {
              access: [
                'ROLE_EXECUTIVE',
                'ROLE_SYS_ADMIN',
                'ROLE_FACILITY_ADMIN',
                'ROLE_SUPPORT_ENGG',
                'ROLE_FIELD_ENGG',
              ],
            },
          },
          {
            id: '5-2-3',
            text: 'Policy Mapper',
            uri: '/content/setup/device/policy-mapper',
            navigate: true,
            meta: {
              access: [
                'ROLE_EXECUTIVE',
                'ROLE_SYS_ADMIN',
                'ROLE_FACILITY_ADMIN',
                'ROLE_SUPPORT_ENGG',
                'ROLE_FIELD_ENGG',
              ],
            },
          },
        ],
      },
      {
        id: '5-3',
        icon: 'fa-building',
        'icon-alt': 'keyboard_arrow_down',
        text: 'Facility Manager',
        model: false,
        uri: '/content/setup/facility',
        navigate: false,
        meta: {
          access: [
            'ROLE_EXECUTIVE',
            'ROLE_SYS_ADMIN',
            'ROLE_FACILITY_ADMIN',
            'ROLE_SUPPORT_ENGG',
            'ROLE_FIELD_ENGG',
          ],
        },
        children: [
          {
            id: '5-3-1',
            text: 'Floor Plans',
            uri: '/content/setup/facility/floor',
            navigate: true,
            meta: {
              access: [
                'ROLE_EXECUTIVE',
                'ROLE_SYS_ADMIN',
                'ROLE_FACILITY_ADMIN',
                'ROLE_SUPPORT_ENGG',
                'ROLE_FIELD_ENGG',
              ],
            },
          },
          {
            id: '5-3-2',
            text: 'Commissioning',
            uri: '/content/setup/facility/commissioning',
            navigate: true,
            meta: {
              access: [
                'ROLE_EXECUTIVE',
                'ROLE_SYS_ADMIN',
                'ROLE_FACILITY_ADMIN',
                'ROLE_SUPPORT_ENGG',
                'ROLE_FIELD_ENGG',
              ],
            },
          },
        ],
      },
    ],
  },
  {
    id: '8',
    icon: 'power',
    text: 'Power Management',
    uri: '/content/power',
    navigate: true,
    meta: {
      access: [
        'ROLE_FACILITY_ADMIN',
        'ROLE_EXECUTIVE',
        'ROLE_SYS_ADMIN',
        'ROLE_FACILITY_DMIN',
        'ROLE_SUPPORT_ENGG',
        'ROLE_FIELD_ENGG',
      ],
    },
  },
  {
    id: '6',
    icon: 'security',
    'icon-alt': 'keyboard_arrow_down',
    text: 'Access Management',
    model: false,
    uri: '/content/access',
    navigate: false,
    meta: {
      access: ['ROLE_SYS_ADMIN', 'ROLE_FACILITY_ADMIN'],
    },
    children: [
      {
        id: '6-1',
        text: 'Users Manager',
        uri: '/content/access/users',
        navigate: true,
        meta: {
          access: [
            'ROLE_EXECUTIVE',
            'ROLE_SYS_ADMIN',
            'ROLE_FACILITY_ADMIN',
            'ROLE_SUPPORT_ENGG',
            'ROLE_FIELD_ENGG',
          ],
        },
      },
    ],
  },
  {
    id: '7',
    icon: 'help',
    'icon-alt': 'keyboard_arrow_down',
    text: 'Help',
    model: false,
    uri: '/content/help',
    navigate: false,
    meta: {
      access: [
        'ROLE_EXECUTIVE',
        'ROLE_SYS_ADMIN',
        'ROLE_FACILITY_ADMIN',
        'ROLE_SUPPORT_ENGG',
        'ROLE_FIELD_ENGG',
      ],
    },
    children: [
      {
        id: '7-1',
        text: 'Documentation',
        uri: '/content/help/docs',
        navigate: true,
        meta: {
          access: [
            'ROLE_EXECUTIVE',
            'ROLE_SYS_ADMIN',
            'ROLE_FACILITY_ADMIN',
            'ROLE_SUPPORT_ENGG',
            'ROLE_FIELD_ENGG',
          ],
        },
      },
      {
        id: '7-2',
        text: 'FAQs',
        uri: '/content/help/faqs',
        navigate: true,
        meta: {
          access: [
            'ROLE_EXECUTIVE',
            'ROLE_SYS_ADMIN',
            'ROLE_FACILITY_ADMIN',
            'ROLE_SUPPORT_ENGG',
            'ROLE_FIELD_ENGG',
          ],
        },
      },
    ],
  },
];

const routeIdentityMap = {};

function createRouteIdentity(map, menuArray, parent) {
  for (const item of menuArray) {
    const { uri } = item;
    const { text } = item;
    const { navigate } = item;
    const route = [text];
    map[uri] = {
      text,
      route,
      parent: parent ? parent.uri : null,
      navigate,
    };

    if (item.children) {
      createRouteIdentity(map, item.children, item);
    }
  }
}

createRouteIdentity(routeIdentityMap, menu);

export default menu;
export const routeMap = routeIdentityMap;

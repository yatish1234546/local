import _ from 'lodash';
import chance from '@/api/mock/data/mock-generator';

chance.mixin({
  facility() {
    return {
      id: chance.guid(),
      address: {
        line: chance.address(),
        street: chance.street(),
        city: chance.city(),
        state: chance.state(),
        zip: chance.zip(),
        country: 'US',
      },
      floors: [chance.floor(), chance.floor(), chance.floor(), chance.floor(), chance.floor()],
    };
  },
  floor() {
    return {
      index: 0,
      label: 'Floor',
      area: 20000,
      areaUnit: 'sq. ft',
    };
  },
});

const facility = chance.facility();
for (let index = 0; index < facility.floors.length; index += 1) {
  facility.floors[index].index = index + 1;
  facility.floors[index].label += ` ${index + 1}`;
}

export default facility;

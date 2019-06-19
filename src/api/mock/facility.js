import facility from '@/api/mock/data/mock-facilities';

export default function getFacilityInfo() {
  return Promise.resolve({ data: facility });
}

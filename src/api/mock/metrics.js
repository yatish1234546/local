import metrics from '@/api/mock/data/jvm-metrics';
import threadDump from '@/api/mock/data/thread-dump';

export function getJVMMetrics() {
  return Promise.resolve({ data: metrics });
}

export function getThreadDump() {
  return Promise.resolve({ data: threadDump });
}

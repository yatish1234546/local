import { assign } from 'lodash';
import { Line } from 'vue-chartjs';
import 'chartjs-plugin-colorschemes';

export default {
  extends: Line,
  props: {
    colorScheme: {
      type: String,
      required: false,
      default: 'office.Circuit6',
    },
    labels: {
      type: Array,
      required: false,
      default: [],
    },
    datasets: {
      type: Array,
      required: true,
    },
    chartOptions: {
      type: Object,
      required: false,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
          intersect: false,
          mode: 'index',
          callbacks: {
            label(tooltipItem, myData) {
              let label = myData.datasets[tooltipItem.datasetIndex].label || '';
              if (label) {
                label += ': ';
              }
              label += parseFloat(tooltipItem.value).toFixed(2);
              return label;
            },
          },
        },
        plugins: {
          colorschemes: {
            scheme: this.colorScheme,
            fillAlpha: 0.5,
            reverse: false,
          },
        },
      },
    };
  },
  mounted() {
    const data = {
      labels: this.labels,
      datasets: this.datasets,
    };
    this.refresh(data);
  },
  methods: {
    refresh(data) {
      const opts = assign(this.options, this.chartOptions);
      this.renderChart(data, opts);
    },
  },
};

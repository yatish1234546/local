import { assign } from 'lodash';
import { Pie } from 'vue-chartjs';
import 'chartjs-plugin-colorschemes';

export default {
  extends: Pie,
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
    gridLines: {
      type: Object,
      required: false,
      default() {
        return { x: true, y: true };
      },
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
        scales: {
          xAxes: [
            {
              display: false,
              gridLines: {
                display: this.gridLines.x,
              },
            },
          ],
          yAxes: [
            {
              display: false,
              gridLines: {
                display: this.gridLines.y,
              },
            },
          ],
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

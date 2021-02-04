<script>
import { Radar } from "vue-chartjs";

export default {
  props: {
    label1: {
      type: String,
      default: "Label 1"
    },
    label2: {
      type: String,
      default: "Label 2"
    },
    dataset1: {
      type: Array,
      default: [65, 59, 90, 81, 56, 55, 40]
    },
    dataset2: {
      type: Array,
      default: [28, 48, 40, 19, 96, 27, 100]
    },
    labels: {
      type: Array,
      default: [
        "Eating",
        "Drinking",
        "Sleeping",
        "Designing",
        "Coding",
        "Cycling",
        "Running"
      ]
    }
  },

  extends: Radar,
  mounted() {
    this.renderChart(
      {
        labels: this.labels,
        datasets: [
          {
            label: this.label1,
            backgroundColor: "rgba(0, 231, 255, 0.3)",
            borderColor: "rgba(0, 231, 255, 0.3)",
            borderWidth: 2,
            pointBackgroundColor: "rgba(0, 231, 255, 0.3)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(0, 231, 255, 0.3)",
            data: this.dataset1
          },
          {
            label: this.label2,
            backgroundColor: "rgba(255, 0, 0, 0.3)",
            borderColor: "rgba(255, 0, 0, 0.3)",
            borderWidth: 2,
            pointBackgroundColor: "rgba(255, 0, 0, 0.3)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(255, 0, 0, 0.3)",
            data: this.dataset2
          }
        ]
      },
      this.options
    );
  },
  computed: {
    options() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        scale: {
          ticks: {
            display: false,
            maxTicksLimit: 3,
            max: 10,
            min: 0,
            beginAtZero: true
          }
        },
        tooltips: {
          callbacks: {
            title: (tooltipItem, data) => {
              return data.labels[tooltipItem[0].index];
            },
            label: (tooltipItem, data) => {
              return (
                data.datasets[tooltipItem.datasetIndex].label +
                ": " +
                data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]
              );
            }
          }
        }
      };
    }
  }
};
</script>

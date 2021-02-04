<script>
import { Line } from "vue-chartjs";

export default {
  extends: Line,
  props: {
    labels: { type: Array },
    dataset1: { type: Array },
    dataset2: { type: Array },
    showLable: { type: Boolean, default: true },
    showLegend: { type: Boolean, default: true }
  },
  data() {
    return {
      gradient: null,
      gradient2: null,
      labelsWithoutYear: []
    };
  },
  mounted() {
    this.gradient = this.$refs.canvas
      .getContext("2d")
      .createLinearGradient(0, 0, 0, 450);
    this.gradient2 = this.$refs.canvas
      .getContext("2d")
      .createLinearGradient(0, 0, 0, 450);

    this.gradient.addColorStop(0, "rgba(255, 0,0, 0.5)");
    this.gradient.addColorStop(0.5, "rgba(255, 0, 0, 0.25)");
    this.gradient.addColorStop(1, "rgba(255, 0, 0, 0.1)");

    this.gradient2.addColorStop(0, "rgba(0, 231, 255, 0.7)");
    this.gradient2.addColorStop(0.5, "rgba(0, 231, 255, 0.35)");
    this.gradient2.addColorStop(1, "rgba(0, 231, 255, 0.1)");

    if (this.labels) {
      this.labels.forEach(element => {
        const date = element.split("-");
        this.labelsWithoutYear.push(date[0] + "-" + date[1]);
      });
    }

    this.renderChart(this.data, this.options);
  },
  watch: {
    dataset2(val) {
      this.$data._chart.update();
    }
  },
  computed: {
    data() {
      return {
        labels: this.labelsWithoutYear || [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July"
        ],
        datasets: [
          {
            label: "Wins",
            borderColor: "#05CBE1",
            pointBackgroundColor: "white",
            pointBorderColor: "white",
            borderWidth: 1,
            backgroundColor: this.gradient2,
            data: this.dataset1 || [40, 39, 10, 40, 39, 80, 40]
          },
          {
            label: "Loses",
            borderColor: "#FC2525",
            pointBackgroundColor: "white",
            borderWidth: 1,
            pointBorderColor: "white",
            backgroundColor: this.gradient,
            data: this.dataset2 || [60, 55, 32, 10, 2, 12, 53]
          }
        ]
      };
    },
    options() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: this.showLegend
        },
        scales: {
          yAxes: [
            {
              gridLines: {
                display: false
              },
              ticks: {
                beginAtZero: true,
                min: 0,
                display: this.showLable
              }
            }
          ],
          xAxes: [
            {
              gridLines: {
                display: false
              },
              ticks: {
                minRotation: 50,
                display: this.showLable,
                callback: function(value, index, values) {
                  return value;
                }
              },
              offsetGridLines: true
            }
          ]
        },
        tooltips: {
          callbacks: {
            labelColor: function(tooltipItem, chart) {
              if (tooltipItem.datasetIndex == 0) {
                return {
                  borderColor: "#2FCFE1",
                  backgroundColor: "#2FCFE1"
                };
              } else if (tooltipItem.datasetIndex == 1) {
                return {
                  borderColor: "#FF7979",
                  backgroundColor: "#FF7979"
                };
              }
            },
            labelTextColor: function(tooltipItem, chart) {
              return "white";
            }
          }
        }
      };
    }
  }
};
</script>

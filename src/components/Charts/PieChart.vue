<script>
import { Pie } from "vue-chartjs";

export default {
  extends: Pie,
  props: {
    label1: { type: String, default: "Label 1" },
    label2: { type: String, default: "Label 2" },
    data1: { required: true, default: 1 },
    data2: { required: true, default: 1 },
    dataSuffix: { type: String, default: "" }
  },
  mounted() {
    this.gradient = this.$refs.canvas
      .getContext("2d")
      .createLinearGradient(0, 0, 0, 450);
    this.gradient2 = this.$refs.canvas
      .getContext("2d")
      .createLinearGradient(0, 0, 0, 450);

    this.gradient.addColorStop(0, "rgba(0, 231, 255, 0.7)");
    this.gradient.addColorStop(0.5, "rgba(0, 231, 255, 0.35)");
    this.gradient.addColorStop(1, "rgba(0, 231, 255, 0.1)");

    this.gradient2.addColorStop(0, "rgba(255, 0,0, 0.5)");
    this.gradient2.addColorStop(0.5, "rgba(255, 0, 0, 0.25)");
    this.gradient2.addColorStop(1, "rgba(255, 0, 0, 0.1)");

    this.renderChart(
      {
        labels: [this.label1, this.label2],
        datasets: [
          {
            backgroundColor: [this.gradient, this.gradient2, "#00D8FF"],
            data: [this.data1, this.data2]
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
        tooltips: {
          callbacks: {
            title: (tooltipItem, data) => {
              return data.labels[tooltipItem[0].index];
            },
            label: (tooltipItem, data) => {
              return data.datasets[0].data[tooltipItem.index] + this.dataSuffix;
            }
          }
        }
      };
    }
  }
};
</script>

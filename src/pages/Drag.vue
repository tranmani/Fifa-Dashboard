<template>
  <q-page class="flex flex-center">
    <div class="row">
      <draggable
        v-model="rows1"
        tag="q-card"
        ghost-class="ghost"
        :options="{ animation: 200 }"
        :move="handleMove"
        @end="handleDragEnd"
        class="row"
      >
        <div v-for="item in rows1" :key="item.order" class="q-pa-md">
          <div v-if="item.title == `Drag me 1`">
            <q-card style="height: 500px; width: 400px">
              <h3
                style="margin: 5px; text-align: center"
                class="list-group-item"
              >
                {{ item.title }}
              </h3>
              <highcharts ref="lineChart" :options="pieChart"
            /></q-card>
          </div>

          <div v-if="item.title == `Drag me 2`">
            <q-card style="height: 500px; width: 300px">
              <h3
                style="margin: 5px; text-align: center"
                class="list-group-item"
              >
                {{ item.title }}
              </h3>
              <highcharts ref="lineChart" :options="barChart"
            /></q-card>
          </div>

          <div v-if="item.title == `Drag me 3`">
            <q-card style="height: 500px; width: 300px">
              <h3
                style="margin: 5px; text-align: center"
                class="list-group-item"
              >
                {{ item.title }}
              </h3>
              <highcharts ref="lineChart" :options="barChart"
            /></q-card>
          </div>
        </div>
      </draggable>
    </div>
  </q-page>
</template>

<script>
import draggable from "vuedraggable";
import Highcharts from "highcharts";

Highcharts.setOptions({
  legend: {
    enabled: false,
  },
  credits: {
    enabled: false,
  },
  yAxis: {
    min: 0,
    labels: {
      overflow: "justify",
    },
  },
});

const barChart = {
  chart: {
    type: "column",
  },
  title: {
    text: "Stacked column chart",
  },
  xAxis: {
    categories: ["Apples", "Oranges", "Pears", "Grapes", "Bananas"],
  },
  yAxis: {
    min: 0,
    title: {
      text: "Total fruit consumption",
    },
    stackLabels: {
      enabled: true,
      style: {
        fontWeight: "bold",
        color:
          // theme
          (Highcharts.defaultOptions.title.style &&
            Highcharts.defaultOptions.title.style.color) ||
          "gray",
      },
    },
  },
  legend: {
    align: "right",
    x: -30,
    verticalAlign: "top",
    y: 25,
    floating: true,
    backgroundColor:
      Highcharts.defaultOptions.legend.backgroundColor || "white",
    borderColor: "#CCC",
    borderWidth: 1,
    shadow: false,
  },
  tooltip: {
    headerFormat: "<b>{point.x}</b><br/>",
    pointFormat: "{series.name}: {point.y}<br/>Total: {point.stackTotal}",
  },
  plotOptions: {
    column: {
      stacking: "normal",
      dataLabels: {
        enabled: true,
      },
    },
  },
  series: [
    {
      name: "John",
      data: [5, 3, 4, 7, 2],
    },
    {
      name: "Jane",
      data: [2, 2, 3, 2, 1],
    },
    {
      name: "Joe",
      data: [3, 4, 4, 2, 5],
    },
  ],
};

const lineChart = {
  chart: {
    type: "line",
  },
  title: {
    text: "Monthly Average Temperature",
  },
  xAxis: {
    categories: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
  },
  yAxis: {
    title: {
      text: "Temperature (°C)",
    },
  },
  tooltip: {
    valueSuffix: "°C",
  },
  legend: {
    layout: "vertical",
    align: "right",
    verticalAlign: "middle",
    borderWidth: 0,
  },
  series: [
    {
      name: "Tokyo",
      data: [
        7.0,
        6.9,
        9.5,
        14.5,
        18.2,
        21.5,
        25.2,
        26.5,
        23.3,
        18.3,
        13.9,
        9.6,
      ],
    },
    {
      name: "New York",
      data: [
        -0.2,
        0.8,
        5.7,
        11.3,
        17.0,
        22.0,
        24.8,
        24.1,
        20.1,
        14.1,
        8.6,
        2.5,
      ],
    },
    {
      name: "Berlin",
      data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0],
    },
    {
      name: "London",
      data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8],
    },
  ],
};

const pieChart = {
  chart: {
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false,
  },
  title: {
    text: "Responsive Resize",
  },
  tooltip: {
    pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: "pointer",
      dataLabels: {
        enabled: true,
      },
    },
  },
  series: [
    {
      type: "pie",
      name: "Browser share",
      data: [
        ["Firefox", 45.0],
        ["IE", 26.8],
        ["Safari", 8.5],
        ["Opera", 6.2],
        ["Others", 0.7],
      ],
    },
  ],
};

export default {
  components: {
    draggable,
  },
  name: "PageIndex",
  data() {
    return {
      lineChart: lineChart,
      barChart: barChart,
      pieChart: pieChart,
      drag: false,
      rows1: [
        {
          title: "Drag me 1",
          order: 2,
        },
        {
          title: "Drag me 2",
          order: 1,
        },
        {
          title: "Drag me 3",
          order: 3,
        },
      ],
      rows2: [
        {
          title: "item 1",
        },
        {
          title: "item 2",
        },
        {
          title: "item 3",
        },
      ],
      cardOrder: [],
    };
  },
  computed: {},
  apollo: {},
  methods: {
    sort() {
      this.rows1.sort((a, b) => a.order - b.order);
    },
    handleDragEnd() {
      this.futureItem = this.rows1[this.futureIndex];
      this.movingItem = this.rows1[this.movingIndex];
      const _items = Object.assign([], this.rows1);
      _items[this.futureIndex] = this.movingItem;
      _items[this.movingIndex] = this.futureItem;

      this.rows1 = _items;
      console.log(this.rows1);
    },
    handleMove(e) {
      const { index, futureIndex } = e.draggedContext;
      this.movingIndex = index;
      this.futureIndex = futureIndex;
      return false;
    },
  },
  mounted() {
    // setInterval(() => {
    //   console.log(this.rows);
    // }, 1000);
    this.sort();
  },
};
</script>

<style scoped>
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.list-group {
  min-height: 20px;
}
.list-group-item {
  cursor: move;
}
.list-group-item i {
  cursor: pointer;
}
</style>

<template>
  <v-container fluid class="px-4 mt-4">
    <v-row align="center" no-gutters>
      <v-col  xs="12" sm="12" md="4"><h2>Popular TV Shows List</h2></v-col>
      <v-spacer></v-spacer>
      <v-col xs="12" sm="12" md="3">
        <v-text-field
          v-model="SearchedShow"
          clear-icon="mdi-close-circle"
          clearable
          label="Search Show"
          type="text"
          @click:clear="clearMessage"
          hide-details
          class="pt-0 mt-0"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row v-if="showsData && showsData.length" justify="space-between space-around">
      <v-col v-for="item in showsData" :key="item.id" xs="12" sm="6" md="4">
        <show-card :movieDetails="item" />
      </v-col>
    </v-row>
    <v-row  v-else justify="space-between space-around">
      <v-col style="height:100vh; display:flex; align-items:center; justify-content:center">
        <div>No Data Found</div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ShowCard from "../components/ShowCard";
import SeriesService from '@/seriesService/tv-service.js';
const SeriesService1=new SeriesService();

export default {
  name: "SeriesList",
  components: {
    ShowCard,
  },
  data() {
    return {
      showsData: [{ label: "df", id: "123" }],
      SearchedShow: "",
    };
  },
  methods: {
    clearMessage() {
       this.getTvSeriesData();
    },
    getTvSeriesData() {
      this.showsData = [];
      SeriesService1.seriesList().then((response) => {
          this.showsData = response.data.sort((a, b) => {
            return b.rating.average - a.rating.average;
          });
        })
        .catch((error) => {
          console.log(error);
          this.showsData = [];
        });
    },
    searchedShowData(val) {
      this.showsData = [];
      SeriesService1.serachList(val).then((response) => {
          this.showsData.push(response.data);
        })
        .catch((error) => {
          this.showsData = [];
          console.log(error);
        });
    },
  },
  watch: {
    SearchedShow: function (v) {
      if (v.length) this.searchedShowData(v);
      else {
        this.getTvSeriesData();
      }
    },
  },
  mounted() {
    this.getTvSeriesData();
  },
};
</script>

<template>
  <v-container fluid class="px-4 mt-2">
    <v-row justify="space-around" align="center" no-gutters>
      <v-col xs="12" sm="12" md="4">
        <v-text-field
          outlined
          v-model="SearchedShow"
          clear-icon="mdi-close-circle"
          clearable
          label="Type to Search Show by Name"
          type="text"
          @click:clear="clearMessage"
          hide-details
          class="pt-0 mt-0"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-template v-if="!SearchedShow.length">
      <v-row no-gutters>
        <v-expansion-panels>
          <v-expansion-panel  class="mt-4"
            @click.once="getDiffGenresShows"
            v-for="(item, i) in differentGenres"
            :key="i"
          >
            <v-expansion-panel-header style="background-color:#1976d2 !important" height="150" @click="getDramaShows()"
              ><h2 class="white--text">{{ item.label }}</h2><template v-slot:actions>
            <v-icon color="white">
              $expand
            </v-icon>
          </template></v-expansion-panel-header
            >
            <v-expansion-panel-content class="pt-4">
              <v-row>
                <v-col
                  v-for="show in item.filterdShows"
                  :key="show.id"
                  xs="4"
                  sm="4"
                  md="2"
                >
                  <show-card :movieDetails="show" />
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-row>
    </v-template>
    <v-row v-else>
      <v-row v-if="!loading && showsData && showsData.length">
        <v-col
          v-for="item in searchedshowsData"
          :key="item.id"
          xs="12"
          sm="6"
          md="2"
        >
          <show-card :movieDetails="item" />
        </v-col>
      </v-row>
      <v-row v-else-if="loading" justify="space-between space-around">
        <v-col
          style="
            height: calc(100vh - 128px);
            display: flex;
            align-items: center;
            justify-content: center;
          "
        >
          <h2>Loading in progress ...</h2>
        </v-col>
      </v-row>
      <v-row v-else justify="space-between space-around">
        <v-col
          style="
            height: calc(100vh - 128px);
            display: flex;
            align-items: center;
            justify-content: center;
          "
        >
          <h2>No Data Found</h2>
        </v-col>
      </v-row>
    </v-row>
  </v-container>
</template>

<script>
import ShowCard from "../components/ShowCard";
import SeriesService from "@/seriesService/tv-service.js";
const SeriesService1 = new SeriesService();

export default {
  name: "SeriesList",
  components: {
    ShowCard,
  },
  data() {
    return {
      differentGenres: [
        { label: "Comedy", filterdShows: [] },
        { label: "Drama", filterdShows: [] },
        { label: "Family", filterdShows: [] },
        { label: "Romance", filterdShows: [] },
        { label: "Medical", filterdShows: [] },
        { label: "Crime", filterdShows: [] },
        { label: "Legal", filterdShows: [] },
        { label: "Fantasy", filterdShows: [] },
      ],
      showsData: [],
      familyShows: [],
      fantasyShows: [],
      dramaShows: [],
      comedyShows: [],
      medicalShows: [],
      romanceShows: [],
      crimeShows: [],
      SearchedShow: "",
      loading: false,
    };
  },
  methods: {
    clearMessage() {
      this.SearchedShow="";
      // this.getTvSeriesData();
    },

    /* get api call to fetch the list of tv series */

    getTvSeriesData() {
      this.showsData = [];
      this.loading = true;
      SeriesService1.seriesList()
        .then((response) => {
          this.showsData = response.data.sort((a, b) => {
            return b.rating.average - a.rating.average;
          });
          this.loading = false;
        })
        .catch(() => {
          this.showsData = [];
        })
        .finally(() => {
          this.loading = false;
        });
    },

    /* filters for shows on different genres */
    getDiffGenresShows() {
      this.differentGenres[0].filterdShows = this.showsData.filter((show) =>
        show.genres.includes("Comedy")
      );
      this.differentGenres[6].filterdShows = this.showsData.filter((show) =>
        show.genres.includes("Legal")
      );
      this.differentGenres[2].filterdShows = this.showsData.filter((show) =>
        show.genres.includes("Family")
      );
      this.differentGenres[7].filterdShows = this.showsData.filter((show) =>
        show.genres.includes("Fantasy")
      );
      this.differentGenres[1].filterdShows = this.showsData.filter((show) =>
        show.genres.includes("Drama")
      );
      this.differentGenres[4].filterdShows = this.showsData.filter((show) =>
        show.genres.includes("Medical")
      );
      this.differentGenres[5].filterdShows = this.showsData.filter((show) =>
        show.genres.includes("Crime")
      );
      this.differentGenres[3].filterdShows = this.showsData.filter((show) =>
        show.genres.includes("Romance")
      );
    },

    /* api call on search */

    searchedShowData(val) {
      this.searchedshowsData = [];
      this.loading = true;
      SeriesService1.serachList(val)
        .then((response) => {
          this.searchedshowsData.push(response.data);
        })
        .catch(() => {
          this.searchedshowsData = [];
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
  watch: {
    SearchedShow: function (srch) {
      if (srch.length) this.searchedShowData(srch);
      else {
        this.searchedshowsData = [];
      }
    },
  },
  mounted() {
    this.getTvSeriesData();
  },
};
</script>

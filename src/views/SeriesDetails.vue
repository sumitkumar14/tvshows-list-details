<template>
  <v-container fluid class="px-6 mt-2">
    <v-row no-gutters>
      <div class="d-flex" shrink cols="1">
        <v-btn class="mb-0 mr-1" icon @click="backClick()" color="black" dark>
          <v-icon dark left> mdi-arrow-left </v-icon>
        </v-btn>
      </div>
      <v-col>
        <h2 class="mb-2">{{ showDetails.name }}</h2>
        <v-row no-gutters>
          <ShowCard class="mr-4" :showInfo="showDetails"> </ShowCard>
          <v-col>
            <v-row no-gutters>
              <v-col cols="12">
                <div
                  v-html="showDetails.summary"
                ></div>
              </v-col>
              <v-col cols="12">
                <v-card
                  class="pa-2"
                  v-if="showDetails && Object.keys(showDetails).length"
                >
                  <v-card-title class="pl-3 pt-0">
                    Show Information</v-card-title
                  >
                  <v-row no-gutters>
                    <p
                      v-if="showDetails.network && showDetails.network.country"
                      class="mx-3"
                    >
                      <b>Country:</b>&nbsp;<span class="show-info-txt">{{
                        showDetails.network.country.name
                      }}</span>
                    </p>
                    |
                    <p
                      v-if="showDetails.network && showDetails.network.name"
                      class="mx-3"
                    >
                      <b>Network:</b>&nbsp;<span class="show-info-txt">{{
                        showDetails.network.name
                      }}</span>
                    </p>
                    |
                    <p
                      v-if="showDetails.network && showDetails.network.country"
                      class="mx-3"
                    >
                      <b>Days:</b>&nbsp;<v-chip
                        class="mr-1"
                        small
                        color="orange"
                        v-for="(day, i) in showDetails.schedule.days"
                        :key="i"
                        >{{ day }}</v-chip
                      >
                    </p>
                    |
                    <p
                      v-if="showDetails.network && showDetails.network.country"
                      class="mx-3"
                    >
                      <b>Time:</b>&nbsp;<span class="show-info-txt">{{
                        showDetails.schedule.time
                      }}</span>
                    </p>
                    |
                    <p class="mx-3">
                      <b>Language:</b>&nbsp;<span class="show-info-txt">{{
                        showDetails.language
                      }}</span>
                    </p>
                    |
                    <p class="mx-3">
                      <b>Status:</b>&nbsp;<span class="show-info-txt">{{
                        showDetails.status
                      }}</span>
                    </p>
                    |
                    <p class="mx-3">
                      <b>Show Type:</b>&nbsp;<span class="show-info-txt">{{
                        showDetails.type
                      }}</span>
                    </p>
                    |
                    <p class="mx-3">
                      <b>Premiered:</b>&nbsp;<span class="show-info-txt">{{
                        showDetails.premiered
                      }}</span>
                    </p>
                    |
                    <p class="mx-3">
                      <b>Run Time:</b>&nbsp;<span class="show-info-txt">{{
                        showDetails.runtime
                      }}</span>
                    </p>
                    |
                    <p class="mx-3">
                      <b>Official URL :</b>
                      <a class="url-look" :href="showDetails.officialSite">
                        {{ showDetails.officialSite }}</a
                      >
                    </p>
                    |
                    <p class="mx-3">
                      <b>Genres:&nbsp;</b
                      ><v-chip
                        class="mr-1"
                        small
                        color="orange"
                        v-for="(genre, i) in showDetails.genres"
                        :key="i"
                        >{{ genre }}</v-chip
                      >
                    </p>
                  </v-row>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col class="pl-0 ml-0 my-4" cols="12"><h3>Episodes</h3></v-col>
          <v-row stretch no-gutters>
            <v-container class="pa-0" fluid>
              <v-data-table
                :headers="headers"
                :items="episodes"
                :items-per-page="10"
                class="elevation-2"
              >
                <template v-slot:[`item.name`]="{ item }">
                  <div class="pt-2">
                    <b>{{ item.name }}</b
                    ><v-img
                      class="mb-1"
                      width="80"
                      height="60"
                      alt
                      :src="item.image.medium"
                    />
                  </div>
                </template>
                <template v-slot:[`item.rating.average`]="{ item }">
                  <div class="pt-2">
                    <v-icon color="yellow" dark> mdi-star </v-icon>
                    {{
                      item.rating.average
                        ? (item.rating.average / 2).toFixed(1)
                        : 0
                    }}/5
                  </div>
                </template>
                <template v-slot:[`item._links`]="{ item }">
                  <div class="pt-2">
                    <a
                      style="word-wrap: break-all; cursor: pointer"
                      :href="item._links.self.href"
                    >
                      {{ item._links.self.href }}</a
                    >
                  </div>
                </template>
              </v-data-table>
            </v-container>
          </v-row>
        </v-row>
        <v-col class="pl-0 ml-0 mb-2" cols="12"><h3>Cast Details</h3></v-col>
        <v-row>
          <v-col
            xs="3"
            sm="3"
            md="2"
            v-for="(cast, i) in limitedcastDetail"
            :key="i"
          >
            <v-card class="mx-0 px-0">
              <v-row no-gutters class="text-center">
                <v-col cols="12">
                  <v-img alt :src="cast.person.image.medium" />
                  <div>
                    <p class="small-text-size">
                      <b>{{ cast.person.name }}</b>
                    </p>
                    <p class="mt-n4 small-text-size">as</p>
                    <p class="mt-n4 small-text-size">
                      <b> {{ cast.character.name }}</b>
                    </p>
                  </div>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
        <v-col class="pl-0 mt-2" v-if="castDetail.length > 6" cols="12">
          <v-btn
            @click="viewMoreLessCast()"
            class="primary--text"
            small
            text
            type="text"
            ><b>{{
              enableViewCastButton ? "show more casts..." : "show less casts..."
            }}</b></v-btn
          >
        </v-col>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
// import ShowCard from "../components/ShowCard";
import SeriesService from "@/seriesService/tv-service.js";
import ShowCard from "../components/ShowCard.vue";
const SeriesService1 = new SeriesService();
export default {
  name: "SeriesDetails",
  components: { ShowCard },
  data() {
    return {
      headers: [
        {
          text: "Name",
          align: "start",
          value: "name",
        },
        { text: "Season", value: "season" },
        { text: "Air Time", value: "airtime" },
        { text: "Run Time", value: "runtime" },
        { text: "Type", value: "type" },
        { text: "Air Date", value: "airdate" },
        { text: "Ratings", value: "rating.average" },
      ],
      showDetails: {},
      castDetail: [],
      episodes: [],
      paginateData: [],
      limitedcastDetail: [],
      enableViewCastButton: true,
      collectionSize: 0,
    };
  },
  computed: {
    seriesId: function () {
      return this.$route && this.$route.params && this.$route.params.showId
        ? this.$route.params.showId
        : "";
    },
  },

  methods: {
    backClick() {
      this.$router.push({ path: "/" });
    },

    /* get api call to fetch the episodes of tv series */

    detailsfShow() {
      SeriesService1.seriesDetails(this.seriesId)
        .then((response) => {
          this.showDetails = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    /* get api call to fetch the casting details of tv series */

    getCastingDetails() {
      SeriesService1.seriesCastDetails(this.seriesId).then((response) => {
        this.castDetail = response.data;
        this.limitedcastDetail = response.data.slice(0, 6);
      });
    },
    viewMoreLessCast() {
      this.limitedcastDetail = [];
      this.enableViewCastButton = !this.enableViewCastButton;
      this.limitedcastDetail = this.enableViewCastButton
        ? this.castDetail.slice(0, 6)
        : this.castDetail;
    },

    /* get api call to fetch the episodes of tv series */

    getEpisodes() {
      SeriesService1.seriesEpisodesDetails(this.seriesId).then((response) => {
        this.episodes = response.data;
        this.collectionSize = this.episodes.length;
        // this.getPaginatedData();
      });
    },
  },
  mounted() {
    this.detailsfShow();
    this.getEpisodes();
    this.getCastingDetails();
  },
};
</script>
<style scoped>
.small-text-size {
  font-size: 12px;
}
.show-info-txt {
  font-size: 14px;
  color:grey;
  font-weight: bold;
}
.url-look {
  word-wrap: break-all;
  cursor: pointer;
}
</style>

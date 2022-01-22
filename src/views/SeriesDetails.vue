<template>
  <v-container class="mx-4 mt-4">
    <v-row no-gutters>
      <!-- <v-btn icon @click="backClick()"
        class="ma-2"
        color="orange darken-2"
        dark
      >
        <v-icon
          dark
          left
        >
          mdi-arrow-left
        </v-icon>
      </v-btn> -->
      <v-row no-gutters>
        <ShowCard :movieDetails="showDetails">
        </ShowCard>
      </v-row>
      <v-row no-gutters>
        <v-spacer></v-spacer>
        <v-col>
          Ratings<v-rating v-model="rating" readonly length="1"></v-rating
          >{{ showDetails.rating.average/2 }}/5
        </v-col>
      </v-row>
          <v-row>
            <h5 v-html="showDetails.summary"></h5>
          </v-row>
          <v-row>
          <h5 class="card-title" style="color: black;">Show Info</h5>
          <p class="card-subtitle mb-2 text-muted "><b >Network :</b>
            {{showDetails.network.country.name}}</p>
          <p ><b >Language :</b> {{showDetails.language}}</p>
          <p ><b>Status :</b> {{showDetails.status}}</p>
          <p ><b>Show Type :</b> {{showDetails.type}}</p>
          <p ><b>Run Time:</b>&nbsp;{{ showDetails.runtime }}</p>
           <div><b>Premiered:</b>&nbsp;{{ showDetails.premiered }}</div>
           <div><b>Weight:</b>&nbsp;{{ showDetails.weight }}</div>
          <p ><b >Official URL :</b> <a
              style="word-wrap: break-all;"> {{showDetails.officialSite}}</a></p>
          <p><b style="color: black;">Genres :</b> {{ showDetails.genres.join(", ") }} </p>

          <v-row>
            <a
              target="_blank"
              :href="showDetails['_links'].previousepisode.href"
              >previous episode</a
            >
          </v-row>
          <v-row>
            <a target="_blank" :href="showDetails['_links'].self.href">link</a>
          </v-row>
          <v-row>
            <div><b>Weight:</b>&nbsp;{{ showDetails.weight }}</div>
          </v-row>
          <v-row>
            <v-col cols="12">Episodes</v-col>
            <table
              class="table table-striped"
              style="background-color: white; width: 80%"
            >
              <thead>
                <tr>
                  <th>Name</th>
                  <th >Air Date</th>
                  <th>Run time</th>
                  <th>Rating</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(episode, i) in paginateData" :key="i">
                  <td>{{ episode.name }}</td>
                  <td>{{ episode.airdate }}</td>
                  <td>{{ episode.runtime }}</td>
                  <td>
                    <div class="pt-2">
                       {{
                        episode.rating.average ? episode.rating.average / 2 : 0
                      }}/5
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </v-row>
          <v-row>
            <h4>Cast Details</h4>
              <div
                class="col-md-2"
                v-for="(cast, i) in initial_castDetail"
                :key="i"
              >
                <div class="card" style="width: 157px">
                  <img
                    alt
                    style="width: 120px; height: 140px"
                    :src="cast.person.image.medium"
                  />
                  <div style="height: 68px">
                    <p class="small-text-size">
                      <b>{{ cast.person.name }}</b>
                    </p>
                    <p class="mt-n4 small-text-size">as</p>
                    <p class="mt-n4 small-text-size">
                      <b> {{ cast.character.name }}</b>
                    </p>
                  </div>
                </div>
              </div>
            <v-btn
              @click="viewMoreLessCast()"
              small
              flat
              text
              type="text"
              class="primary"
              ><b>{{
                enableViewCastButton
                  ? "show more casts..."
                  : "show less casts..."
              }}</b></v-btn
            >
          </v-row>
     
    </v-row>
    </v-row>
  </v-container>
</template>
<script>
import ShowCard from "../components/ShowCard";
import SeriesService from "@/seriesService/tv-service.js";
const SeriesService1 = new SeriesService();
export default {
  name: "SeriesDetails",
  components:{ShowCard},
  data() {
    return {
      showDetails: {},
      castDetail: [],
      episodes: [],
      paginateData: [],
      initial_castDetail: [],
      enableViewCastButton: true,
      page: 1,
      pageSize: 10,
      collectionSize: 0,
    };
  },
  methods: {
    backClick() {
      this.$router.push({ path: "/" });
    },
    detailsfShow() {
      const id = this.$route.params.showId;
      SeriesService1.seriesDetails(id)
        .then((response) => {
          this.showDetails = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getPaginatedData() {
      this.paginateData = this.episodes.slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
    },
    getCastingDetails() {
      SeriesService1.seriesCastDetails(this.$route.params.showId).then(
        (response) => {
          this.castDetail = response.data;
          this.initial_castDetail = response.data.slice(0, 5);
        }
      );
    },
    viewMoreLessCast() {
      this.enableViewCastButton = !this.enableViewCastButton;
      this.initial_castDetail = this.enableViewCastButton
        ? this.castDetail.slice(0, 5)
        : this.castDetail;
    },
    getEpisodes() {
      SeriesService1.seriesEpisodesDetails(this.$route.params.showId).then(
        (response) => {
          this.episodes = response.data;
          this.collectionSize = this.episodes.length;
          this.getPaginatedData();
        }
      );
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
</style>

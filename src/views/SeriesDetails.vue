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
          <h1>{{showDetails.name}}</h1><v-spacer></v-spacer>
          <v-col>
            Ratings<v-rating v-model="rating" readonly length="1"></v-rating>{{ showDetails.rating.average }}/10
          </v-col>
      </v-row>
      <v-row no-gutters>
      <figure>
          <img alt :src="showDetails.image.medium" />
          <figcaption><b>Genres:</b>&nbsp;{{showDetails.genres.join(", ")}}</figcaption>
        </figure>
        <v-col class="ml-4">
          <v-row>
          <article v-html="showDetails.summary"></article>
          </v-row>
           <v-row>
             <div><b>Run Time:</b>&nbsp;{{showDetails.runtime}}</div>
          </v-row>
          <v-row>
            <div><b>Status:</b>&nbsp;{{showDetails.status}}</div>
          </v-row>
            <v-row>
            <div><b>Type:</b>&nbsp;{{showDetails.type}}</div>
          </v-row>
           <v-row>
            <div><b>Ended:</b>&nbsp;{{showDetails.ended}}</div>
          </v-row>
           <v-row>
            <div><b>Premiered:</b>&nbsp;{{showDetails.premiered}}</div>
          </v-row>
           <v-row>
            <div><b>externals:</b>&nbsp;{{showDetails.externals}}</div>
          </v-row>
           <v-row>
             <div><b>Channel:</b>&nbsp;{{showDetails.network}}</div>
          </v-row>
          <v-row>
             <div><b>Schedule:</b>&nbsp;{{showDetails.schedule}}</div>
          </v-row>
           <v-row>
            <a target="_blank" :href="showDetails.officialSite">official Site</a>
          </v-row>
           <v-row>
            <a target="_blank" :href="showDetails['_links'].previousepisode.href">previous episode</a>
          </v-row>
          <v-row>
            <a target="_blank" :href="showDetails['_links'].self.href">link</a>
          </v-row>
          <v-row>
             <div><b>Weight:</b>&nbsp;{{showDetails.weight}}</div>
          </v-row>
    </v-col>
      </v-row>
  </v-row>
</v-container>
</template>
<script>
import SeriesService from '@/seriesService/tv-service.js';
const SeriesService1=new SeriesService();
export default {
  name:'SeriesDetails',
  data(){
    return{
      showDetails:{},
      }
  },
  methods:{
    backClick(){
      this.$router.push({path:"/"});
    },
    detailsfShow(){
      const id=this.$route.params.showId;
      SeriesService1.seriesDetails(id)
        .then((response) => {
          this.showDetails = response.data;
        })
        .catch((error) => {
          console.log(error);
        })
    }
  },
  mounted(){
    this.detailsfShow();
  }
}
</script>

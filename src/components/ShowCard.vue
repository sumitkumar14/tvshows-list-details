<template>
  <v-card v-if="movieDetails && Object.keys(movieDetails).length " @click="moveTodetails(movieDetails.id)" class="ma-0">
    <v-row no-gutters class="text-center">
      <v-col cols="12">
          <v-img  alt :src="movieDetails.image.medium" />
          <div><b>{{movieDetails.name}}</b></div>
          <v-rating v-model="scaleRating" readonly half-increments></v-rating><div> {{ movieDetails.rating.average?(movieDetails.rating.average/2).toFixed(1):0 }}/5</div>
      </v-col>
      </v-row>
  </v-card>
</template>

<script>
export default {
  name: "ShowCard",
  props: {
    movieDetails: Object
  },
  data: () => ({}),
  computed: {
    scaleRating: function () {
      return ((this.movieDetails.rating.average * 10) / 100) * 5;
    },
  },
  methods: {
    moveTodetails(id1) {
      const id = id1 ? id1 : 1234;
      this.$router.push({ path: `/SeriesDetails/${id}` });
    },
  },
};
</script>
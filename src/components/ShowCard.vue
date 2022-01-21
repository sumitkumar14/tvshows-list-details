<template>
  <v-card @click="moveTodetails(movieDetails.id)" class="ma-0">
    <v-row no-gutters class="text-center">
      <v-col class="mb-5" cols="12">
        <figure>
          <img alt :src="movieDetails.image.medium" />
          <figcaption>{{ movieDetails.genres.join(", ") }}</figcaption>
        </figure>
      </v-col>
      <v-rating v-model="scaleRating" readonly half-increments></v-rating><div class="pt-2"> {{ movieDetails.rating.average }}</div>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "ShowCard",
  props: {
    movieDetails: Object,
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
      this.$router.push({ path: `/about/${id}` });
    },
  },
};
</script>
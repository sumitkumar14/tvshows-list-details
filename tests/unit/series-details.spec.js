import { shallowMount } from '@vue/test-utils'
import SeriesDetails from '@/views/SeriesDetails.vue'
import vuetify from "vuetify"
import Vue from 'vue';
import VueRouter from 'vue-router'

describe('SeriesDetails.vue', () => {
  let wrapper;
  beforeEach(()=>{
    Vue.use(vuetify,VueRouter);
    wrapper = shallowMount(SeriesDetails);
  })
  it('renders a vue instance of series Details view', () => {
    expect(wrapper.isVueInstance()).toBe(true);
  });
  // it('renders props.movieDetails when passed', () => {
  //   const wrapper = shallowMount(SeriesDetails, {
  //     propsData: { movieDetails }
  //   })
  //   expect(wrapper.props().movieDetails).toBe(movieDetails)
  // })
})
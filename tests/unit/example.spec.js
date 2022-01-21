import { shallowMount } from '@vue/test-utils'
import ShowCard from '@/components/ShowCard.vue'

describe('ShowCard.vue', () => {
  it('renders props.movieDetails when passed', () => {
    const movieDetails = {'name':"xyz", 'genres':['drama'], 'id':'758g877', 'rating':"{'average':'8'}", 'image':{'medium':'http//xyuz.png'}}
    const wrapper = shallowMount(ShowCard, {
      propsData: { movieDetails }
    })
    expect(wrapper.text()).toMatch(movieDetails)
  })
})

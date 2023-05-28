import Feed from "@components/Feed";

const Home = () => (
  <section className='w-full flex-center flex-col'>
    <h1 className='head_text text-center'>
      Build & Grow
      <br className='max-md:hidden' />
      <span className='orange_gradient text-center'> Exceptional Reliable Unmatched</span>
    </h1>
    <p className='desc text-center'>
      Transform your online presence with a custom-designed website  that captures attention, engages visitors, and boosts your business growth.
    </p>

    <Feed />
  </section>
);

export default Home;

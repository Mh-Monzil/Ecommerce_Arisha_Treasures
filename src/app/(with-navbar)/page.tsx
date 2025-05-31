import Banner from "@/components/Banner";
import LatestOffers from "@/components/LatestOffers";
import NewArrivals from "@/components/NewArrivals";
import OurGallery from "@/components/OurGallery";
import ProductsMarquee from "@/components/ProductsMarquee";
import Container from "@/components/shared/Container";
import Testimonial from "@/components/Testimonial";
import TopSelling from "@/components/TopSelling";

export default function Home() {
  return (
    <div>
      <Container>
        <Banner />
      </Container>
      <ProductsMarquee />
      <Container>
        <NewArrivals />
        <TopSelling />
        <Testimonial />
        <OurGallery />
        <div className="relative mt-32 lg:mt-24">
          <LatestOffers />
        </div>
      </Container>
    </div>
  );
}

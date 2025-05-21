import Banner from "@/components/Banner";
import NewArrivals from "@/components/NewArrivals";
import ProductsMarquee from "@/components/ProductsMarquee";
import Container from "@/components/shared/Container";
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
      </Container>
    </div>
  );
}

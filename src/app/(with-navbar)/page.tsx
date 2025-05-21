import Banner from "@/components/Banner";
import Container from "@/components/shared/Container";

export default function Home() {
  return (
    <div>
      <Container>
        <Banner />
      </Container>
      <div className="w-full h-20 bg-black">hello</div>
    </div>
  );
}

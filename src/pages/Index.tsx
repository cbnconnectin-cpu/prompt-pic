import { Header } from "@/components/Header";
import { ThumbnailGenerator } from "@/components/ThumbnailGenerator";
import { Gallery } from "@/components/Gallery";
import { Separator } from "@/components/ui/separator";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <ThumbnailGenerator />
        <Separator className="my-8" />
        <Gallery />
      </main>
    </div>
  );
};

export default Index;

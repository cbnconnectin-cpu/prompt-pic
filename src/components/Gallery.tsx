import { useState } from "react";
import { Download, Share2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface GalleryItem {
  id: string;
  imageUrl: string;
  prompt: string;
  keywords: string[];
  createdAt: string;
  mood: string;
  format: string;
  liked: boolean;
}

export function Gallery() {
  const [galleryItems] = useState<GalleryItem[]>([
    {
      id: "1",
      imageUrl: "/lovable-uploads/70652da6-40ec-47a2-8f90-08edc4b4d137.png",
      prompt: "10 Tips for Studying Smarter - Energetic style thumbnail with bright colors",
      keywords: ["study", "tips", "education", "bright"],
      createdAt: "2024-01-15",
      mood: "energetic",
      format: "horizontal",
      liked: true
    },
    {
      id: "2", 
      imageUrl: "/lovable-uploads/70652da6-40ec-47a2-8f90-08edc4b4d137.png",
      prompt: "How to Build Muscle Fast - Motivational workout thumbnail",
      keywords: ["fitness", "muscle", "workout", "motivation"],
      createdAt: "2024-01-14",
      mood: "motivational", 
      format: "both",
      liked: false
    },
    {
      id: "3",
      imageUrl: "/lovable-uploads/70652da6-40ec-47a2-8f90-08edc4b4d137.png", 
      prompt: "Cooking Secrets Revealed - Minimalist food thumbnail",
      keywords: ["cooking", "food", "secrets", "minimalist"],
      createdAt: "2024-01-13",
      mood: "minimalist",
      format: "vertical",
      liked: true
    }
  ]);

  const handleDownload = (item: GalleryItem) => {
    // Create a download link
    const link = document.createElement('a');
    link.href = item.imageUrl;
    link.download = `thumbnail-${item.id}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = (item: GalleryItem) => {
    if (navigator.share) {
      navigator.share({
        title: 'Check out my AI-generated thumbnail!',
        text: item.prompt,
        url: item.imageUrl
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(item.imageUrl);
      // You could add a toast notification here
    }
  };

  const getMoodColor = (mood: string) => {
    const moodColors = {
      energetic: "bg-orange-500",
      serious: "bg-blue-600", 
      funny: "bg-yellow-500",
      motivational: "bg-green-500",
      dramatic: "bg-red-600",
      minimalist: "bg-gray-500"
    };
    return moodColors[mood as keyof typeof moodColors] || "bg-gray-500";
  };

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">My Gallery</h2>
        <p className="text-muted-foreground">
          View, download, and share your AI-generated thumbnails
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryItems.map((item) => (
          <Card key={item.id} className="glass-effect group hover:shadow-elegant transition-all duration-300 hover:scale-[1.02]">
            <CardContent className="p-0">
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={item.imageUrl}
                  alt="Generated thumbnail"
                  className="w-full aspect-video object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                
                {/* Action buttons overlay */}
                <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" variant="secondary" className="bg-background/90 backdrop-blur-sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl">
                      <DialogHeader>
                        <DialogTitle>Thumbnail Preview</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <img
                          src={item.imageUrl}
                          alt="Full size thumbnail"
                          className="w-full rounded-lg"
                        />
                        <div className="space-y-2">
                          <p className="text-sm text-muted-foreground">Prompt:</p>
                          <p className="text-sm">{item.prompt}</p>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                  <Button 
                    size="sm" 
                    variant="secondary"
                    onClick={() => handleDownload(item)}
                    className="bg-background/90 backdrop-blur-sm"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                  
                  <Button 
                    size="sm" 
                    variant="secondary"
                    onClick={() => handleShare(item)}
                    className="bg-background/90 backdrop-blur-sm"
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>

                {/* Format badge */}
                <div className="absolute top-2 right-2">
                  <Badge variant="secondary" className="text-xs">
                    {item.format === "horizontal" ? "16:9" : item.format === "vertical" ? "9:16" : "Both"}
                  </Badge>
                </div>
              </div>

              <div className="p-3 space-y-2">
                <p className="text-sm line-clamp-2">{item.prompt}</p>
                
                <div className="flex flex-wrap gap-1">
                  {item.keywords.slice(0, 3).map((keyword) => (
                    <span key={keyword} className="text-xs text-muted-foreground">
                      #{keyword}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {galleryItems.length === 0 && (
        <div className="text-center py-12">
          <div className="max-w-sm mx-auto">
            <Eye className="h-12 w-12 mx-auto text-muted-foreground mb-4 opacity-50" />
            <h3 className="text-lg font-semibold mb-2">No thumbnails yet</h3>
            <p className="text-muted-foreground">
              Generate your first thumbnail to see it appear here!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
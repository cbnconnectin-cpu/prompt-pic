import { useState } from "react";
import { Upload, Image, Wand2, Settings, AlignLeft, AlignCenter, AlignRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const moodOptions = [
  { value: "energetic", label: "Energetic ⚡", color: "bg-orange-500" },
  { value: "serious", label: "Serious 🎯", color: "bg-blue-600" },
  { value: "funny", label: "Funny 😄", color: "bg-yellow-500" },
  { value: "motivational", label: "Motivational 💪", color: "bg-green-500" },
  { value: "dramatic", label: "Dramatic 🎭", color: "bg-red-600" },
  { value: "minimalist", label: "Minimalist ⚪", color: "bg-gray-500" }
];

const colorThemes = [
  { value: "bright", label: "Bright & Eye-Catching", gradient: "bg-gradient-to-r from-pink-500 to-yellow-500", preview: "from-pink-500 to-yellow-500" },
  { value: "dark", label: "Dark & Cinematic", gradient: "bg-gradient-to-r from-gray-900 to-purple-900", preview: "from-gray-900 to-purple-900" },
  { value: "pastel", label: "Pastel", gradient: "bg-gradient-to-r from-pink-200 to-blue-200", preview: "from-pink-200 to-blue-200" },
  { value: "brand", label: "Brand Colors", gradient: "bg-gradient-to-r from-purple-600 to-blue-600", preview: "from-purple-600 to-blue-600" },
  { value: "sunset", label: "Sunset Vibes", gradient: "bg-gradient-to-r from-orange-400 to-red-500", preview: "from-orange-400 to-red-500" },
  { value: "ocean", label: "Ocean Blues", gradient: "bg-gradient-to-r from-blue-400 to-teal-500", preview: "from-blue-400 to-teal-500" },
  { value: "forest", label: "Nature Green", gradient: "bg-gradient-to-r from-green-400 to-emerald-600", preview: "from-green-400 to-emerald-600" },
  { value: "neon", label: "Neon Glow", gradient: "bg-gradient-to-r from-violet-500 to-purple-600", preview: "from-violet-500 to-purple-600" }
];

const placementOptions = [
  { value: "left", label: "Left", icon: AlignLeft },
  { value: "center", label: "Center", icon: AlignCenter },
  { value: "right", label: "Right", icon: AlignRight },
  { value: "none", label: "AI Decides", icon: Sparkles }
];

export function ThumbnailGenerator() {
  const [formData, setFormData] = useState({
    image: null as File | null,
    imageUrl: "",
    title: "",
    mood: "",
    placement: "",
    colorTheme: "",
    format: "horizontal"
  });
  
  const [imagePreview, setImagePreview] = useState<string>("");
  const [activeTab, setActiveTab] = useState("upload");
  const [advancedMode, setAdvancedMode] = useState(false);
  
  const [previewImages] = useState([
    "/lovable-uploads/70652da6-40ec-47a2-8f90-08edc4b4d137.png",
    "/lovable-uploads/70652da6-40ec-47a2-8f90-08edc4b4d137.png",
    "/lovable-uploads/70652da6-40ec-47a2-8f90-08edc4b4d137.png"
  ]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
      setFormData(prev => ({ ...prev, image: file, imageUrl: "" }));
    }
  };

  const handleImageUrlChange = (url: string) => {
    setImagePreview(url);
    setFormData(prev => ({ ...prev, imageUrl: url, image: null }));
  };

  const handleGenerate = () => {
    console.log("Generating thumbnail with:", formData);
    // Here you would typically call your AI generation API
  };

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Column - Form */}
        <div className="space-y-6">
          <Card className="glass-effect">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Upload Image
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="upload">Upload File</TabsTrigger>
                  <TabsTrigger value="url">Image URL</TabsTrigger>
                </TabsList>
                
                <TabsContent value="upload" className="space-y-4">
                  <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="picture">Picture</Label>
                    <Input
                      id="picture"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="transition-smooth"
                    />
                    <p className="text-xs text-muted-foreground">
                      JPG/PNG, transparent background preferred
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="url" className="space-y-4">
                  <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="imageUrl">Image URL</Label>
                    <Input
                      id="imageUrl"
                      type="url"
                      placeholder="https://example.com/image.jpg"
                      value={formData.imageUrl}
                      onChange={(e) => handleImageUrlChange(e.target.value)}
                      className="transition-smooth"
                    />
                  </div>
                </TabsContent>
              </Tabs>

              {/* Image Preview */}
              {imagePreview && (
                <div className="mt-4">
                  <Label>Preview</Label>
                  <div className="mt-2 rounded-lg border-2 border-dashed border-border p-4 bg-muted/50">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-32 object-contain rounded-lg"
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="glass-effect">
            <CardHeader>
              <CardTitle>Video Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Video Title / Topic</Label>
                <Textarea
                  id="title"
                  placeholder="e.g., 10 Tips for Studying Smarter"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="transition-smooth min-h-[80px]"
                />
                <p className="text-xs text-muted-foreground">
                  Helps AI understand the main context
                </p>
              </div>

              <div className="space-y-3">
                <Label>Mood / Style</Label>
                <div className="grid grid-cols-2 gap-2">
                  {moodOptions.map((mood) => (
                    <Button
                      key={mood.value}
                      variant={formData.mood === mood.value ? "default" : "outline"}
                      onClick={() => setFormData(prev => ({ ...prev, mood: mood.value }))}
                      className="justify-start transition-smooth"
                    >
                      <div className={`w-3 h-3 rounded-full ${mood.color} mr-2`}></div>
                      {mood.label}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <Label>Person Placement</Label>
                <div className="grid grid-cols-4 gap-2">
                  {placementOptions.map((placement) => {
                    const IconComponent = placement.icon;
                    return (
                      <Button
                        key={placement.value}
                        variant={formData.placement === placement.value ? "default" : "outline"}
                        onClick={() => setFormData(prev => ({ ...prev, placement: placement.value }))}
                        className="flex-col gap-2 h-auto p-3 transition-smooth"
                      >
                        <IconComponent className="h-4 w-4" />
                        <span className="text-xs">{placement.label}</span>
                      </Button>
                    );
                  })}
                </div>
              </div>

              {/* Advanced Options */}
              <Collapsible open={advancedMode} onOpenChange={setAdvancedMode}>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" className="w-full justify-between">
                    <span className="flex items-center gap-2">
                      <Settings className="h-4 w-4" />
                      Advanced Options
                    </span>
                    <div className={`transition-transform ${advancedMode ? 'rotate-180' : ''}`}>
                      ▼
                    </div>
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-4 mt-4">
                  <div className="space-y-3">
                    <Label>Color Theme</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {colorThemes.map((theme) => (
                        <Button
                          key={theme.value}
                          variant={formData.colorTheme === theme.value ? "default" : "outline"}
                          onClick={() => setFormData(prev => ({ ...prev, colorTheme: theme.value }))}
                          className="justify-start h-auto p-3 transition-smooth"
                        >
                          <div className={`w-6 h-4 rounded bg-gradient-to-r ${theme.preview} mr-3 border border-border`}></div>
                          <span className="text-xs">{theme.label}</span>
                        </Button>
                      ))}
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>

              <Button 
                onClick={handleGenerate}
                className="w-full bg-gradient-primary hover:opacity-90 transition-smooth"
                size="lg"
              >
                <Wand2 className="h-4 w-4 mr-2" />
                Generate Thumbnail
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Preview */}
        <div className="space-y-6">
          <Card className="glass-effect">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Image className="h-5 w-5" />
                Thumbnail Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="thumbnail-preview h-64 animate-fade-in">
                {formData.title ? (
                  <div className="text-center">
                    <div className="text-lg font-bold mb-2">{formData.title}</div>
                    <Badge variant="secondary">{formData.mood || "Select mood"}</Badge>
                  </div>
                ) : (
                  <div className="text-center">
                    <Wand2 className="h-12 w-12 mx-auto mb-4 opacity-50 animate-float" />
                    <p>Your thumbnail will appear here</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Format Selection */}
          <Card className="glass-effect">
            <CardHeader>
              <CardTitle>Target Format</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={formData.format}
                onValueChange={(value) => setFormData(prev => ({ ...prev, format: value }))}
                className="grid grid-cols-3 gap-4"
              >
                <Label htmlFor="horizontal" className="cursor-pointer">
                  <RadioGroupItem value="horizontal" id="horizontal" className="sr-only" />
                  <div className={`p-4 rounded-lg border-2 transition-all ${
                    formData.format === "horizontal" 
                      ? "border-primary bg-primary/10" 
                      : "border-border hover:border-primary/50"
                  }`}>
                    <div className="aspect-video bg-muted rounded mb-2"></div>
                    <p className="text-sm font-medium text-center">Horizontal</p>
                    <p className="text-xs text-muted-foreground text-center">YouTube</p>
                  </div>
                </Label>

                <Label htmlFor="vertical" className="cursor-pointer">
                  <RadioGroupItem value="vertical" id="vertical" className="sr-only" />
                  <div className={`p-4 rounded-lg border-2 transition-all ${
                    formData.format === "vertical"
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"
                  }`}>
                    <div className="aspect-[9/16] bg-muted rounded mb-2 h-16"></div>
                    <p className="text-sm font-medium text-center">Vertical</p>
                    <p className="text-xs text-muted-foreground text-center">Shorts</p>
                  </div>
                </Label>

                <Label htmlFor="both" className="cursor-pointer">
                  <RadioGroupItem value="both" id="both" className="sr-only" />
                  <div className={`p-4 rounded-lg border-2 transition-all ${
                    formData.format === "both"
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"
                  }`}>
                    <div className="space-y-1 mb-2">
                      <div className="aspect-video bg-muted rounded h-6"></div>
                      <div className="aspect-[9/16] bg-muted rounded h-8 mx-auto w-1/2"></div>
                    </div>
                    <p className="text-sm font-medium text-center">Both</p>
                    <p className="text-xs text-muted-foreground text-center">Default</p>
                  </div>
                </Label>
              </RadioGroup>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
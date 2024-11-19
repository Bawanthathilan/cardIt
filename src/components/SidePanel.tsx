'use client'

import * as React from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ChevronDown, Upload } from 'lucide-react'
import { HexColorPicker } from "react-colorful"
import { Textarea } from "@/components/ui/textarea"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import {BACKGROUND_OPTIONS} from '@/data/backgrounds'
import {sizes} from '@/data/sizes'
import { useSettingStore } from '@/_store'

import { toPng } from 'html-to-image';

export default function SidePanel() {

  const {
    setBg,
    bg,
    setSize,
    size,
    setAuthorName,
    authorName,
    setAuthorImage,
    authorImage,
    settextColor,
    textColor,
    setTitle,
    Title,
    svgRef
  } = useSettingStore((state) => state);

  const handleBackgroundChange = (newBg: string) => {
    setBg(newBg); // Update the background in the store
  };

  const handleSize = (newSize: string) => {
    setSize(newSize); // Update the background in the store
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Set the base64 image as author image in the Zustand store
        setAuthorImage(reader.result as string);
      };
      reader.readAsDataURL(file); // Convert the file to base64
    }
  };

  const exportAsPng = async () => {
    const svg:any = document.querySelector('.mainSvg');
  
  try {
    const dataUrl = await toPng(svg, { 
      quality: 1,
      pixelRatio: 2 // For higher resolution
    });
    
    // Create download link
    const link = document.createElement('a');
    link.download = 'exported-image.png';
    link.href = dataUrl;
    link.click();
  } catch (error) {
    console.error('Export failed:', error);
  }
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>Manage your image preferences.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
      <div className="space-y-2">
          <label htmlFor="bg" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Background
          </label>
          <Select onValueChange={handleBackgroundChange} value={bg}>
            <SelectTrigger id="bg" className="w-full">
              <SelectValue placeholder="Select a background" />
            </SelectTrigger>
            <SelectContent>
                {BACKGROUND_OPTIONS.map((option)=>(
                    <SelectItem key={option.name} value={option.name}>{option.name}</SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label htmlFor="preset" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Preset
          </label>
          <Select onValueChange={handleSize} value={size}>
            <SelectTrigger id="preset" className="w-full">
              <SelectValue placeholder="Set preset" />
            </SelectTrigger>
            <SelectContent>
                {sizes.map((size)=>(
                    <SelectItem value={size.label} key={size.label}>{size.label}</SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
      <div className="space-y-2">
          <Label htmlFor="author-name">Author Name</Label>
          <Input
            id="author-name"
            placeholder="Enter your name"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="author-name">Title</Label>
          <Textarea
            id="author-name"
            placeholder="Enter title"
            value={Title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="color-picker">Color</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="color-picker"
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                <div
                  className="mr-2 h-4 w-4 rounded"
                  style={{ backgroundColor: textColor }}
                />
                {textColor}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <HexColorPicker color={textColor} onChange={settextColor} />
            </PopoverContent>
          </Popover>
        </div>
        <div className="space-y-2">
          <Label htmlFor="image-upload">Profile Image</Label>
          <div className="flex items-center space-x-2">
            <Input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <Label
              htmlFor="image-upload"
              className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
            >
              <Upload className="mr-2 h-4 w-4" />
              {authorImage ? 'Change Image' : 'Upload Image'}
            </Label>
          </div>
        </div>
        
        <Button onClick={exportAsPng} className="w-full">Export</Button>
      </CardContent>
    </Card>
  )
}
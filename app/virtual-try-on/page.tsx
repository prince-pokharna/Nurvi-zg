"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Camera, Upload, RotateCcw, Download, Share2, Sparkles, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/hooks/use-toast"

const jewelryItems = [
  {
    id: "1",
    name: "Diamond Solitaire Ring",
    category: "Rings",
    price: 24999,
    image: "/placeholder.svg?height=200&width=200",
    tryOnImage: "/placeholder.svg?height=400&width=400",
  },
  {
    id: "2",
    name: "Pearl Drop Earrings",
    category: "Earrings",
    price: 8999,
    image: "/placeholder.svg?height=200&width=200",
    tryOnImage: "/placeholder.svg?height=400&width=400",
  },
  {
    id: "3",
    name: "Gold Chain Necklace",
    category: "Necklaces",
    price: 12999,
    image: "/placeholder.svg?height=200&width=200",
    tryOnImage: "/placeholder.svg?height=400&width=400",
  },
  {
    id: "4",
    name: "Tennis Bracelet",
    category: "Bracelets",
    price: 18999,
    image: "/placeholder.svg?height=200&width=200",
    tryOnImage: "/placeholder.svg?height=400&width=400",
  },
]

export default function VirtualTryOnPage() {
  const [selectedItem, setSelectedItem] = useState(jewelryItems[0])
  const [isCapturing, setIsCapturing] = useState(false)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("camera")
  const [cameraError, setCameraError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { addItem } = useCart()
  const { toast } = useToast()

  useEffect(() => {
    if (activeTab === "camera") {
      startCamera()
    } else {
      stopCamera()
    }

    return () => stopCamera()
  }, [activeTab])

  const startCamera = async () => {
    try {
      setIsLoading(true)
      setCameraError(null)

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: "user",
        },
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        await videoRef.current.play()
      }
    } catch (error) {
      console.error("Error accessing camera:", error)
      setCameraError("Unable to access camera. Please check permissions and try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
      tracks.forEach((track) => track.stop())
      videoRef.current.srcObject = null
    }
  }

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current
      const video = videoRef.current
      const context = canvas.getContext("2d")

      if (context) {
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        context.drawImage(video, 0, 0)

        const imageData = canvas.toDataURL("image/png")
        setCapturedImage(imageData)
        setIsCapturing(true)

        toast({
          title: "Photo captured!",
          description: "Your photo has been captured successfully.",
        })
      }
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setCapturedImage(e.target?.result as string)
        setIsCapturing(true)
        toast({
          title: "Photo uploaded!",
          description: "Your photo has been uploaded successfully.",
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const resetCapture = () => {
    setCapturedImage(null)
    setIsCapturing(false)
  }

  const downloadImage = () => {
    if (capturedImage) {
      const link = document.createElement("a")
      link.download = `nurvi-jewel-try-on-${selectedItem.name.toLowerCase().replace(/\s+/g, "-")}.png`
      link.href = capturedImage
      link.click()

      toast({
        title: "Download started!",
        description: "Your try-on image is being downloaded.",
      })
    }
  }

  const handleAddToCart = () => {
    addItem({
      id: selectedItem.id,
      name: selectedItem.name,
      price: selectedItem.price,
      image: selectedItem.image,
    })

    toast({
      title: "Added to cart!",
      description: `${selectedItem.name} has been added to your cart.`,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-yellow-50">
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <Sparkles className="h-8 w-8 text-amber-500" />
              <h1 className="text-4xl lg:text-6xl font-bold gradient-text font-playfair">Virtual Try-On</h1>
              <Sparkles className="h-8 w-8 text-amber-500" />
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience our jewelry collection like never before. Try on any piece virtually using your camera or
              upload a photo.
            </p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Virtual Try-On Interface */}
            <div className="lg:col-span-2">
              <Card className="premium-card overflow-hidden">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Camera className="h-6 w-6 text-amber-600" />
                    <span>Try-On Studio</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-2 m-6 mb-0">
                      <TabsTrigger value="camera">Live Camera</TabsTrigger>
                      <TabsTrigger value="upload">Upload Photo</TabsTrigger>
                    </TabsList>

                    <TabsContent value="camera" className="p-6 pt-4">
                      {cameraError && (
                        <Alert className="mb-4 border-red-200 bg-red-50">
                          <AlertCircle className="h-4 w-4 text-red-600" />
                          <AlertDescription className="text-red-700">{cameraError}</AlertDescription>
                        </Alert>
                      )}

                      <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden">
                        {!isCapturing ? (
                          <>
                            {isLoading ? (
                              <div className="w-full h-full flex items-center justify-center">
                                <div className="text-center text-white">
                                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto mb-4"></div>
                                  <p>Starting camera...</p>
                                </div>
                              </div>
                            ) : (
                              <>
                                <video
                                  ref={videoRef}
                                  autoPlay
                                  playsInline
                                  muted
                                  className="w-full h-full object-cover"
                                />
                                <canvas ref={canvasRef} className="hidden" />

                                {/* Virtual Jewelry Overlay */}
                                <div className="absolute inset-0 virtual-try-on-overlay flex items-center justify-center">
                                  <div className="relative">
                                    <img
                                      src={selectedItem.tryOnImage || "/placeholder.svg"}
                                      alt={`${selectedItem.name} try-on`}
                                      className="w-32 h-32 object-contain opacity-80"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-yellow-400/20 rounded-full blur-lg"></div>
                                  </div>
                                </div>

                                {/* Capture Button */}
                                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
                                  <Button
                                    onClick={capturePhoto}
                                    size="lg"
                                    className="luxury-gradient text-white rounded-full w-16 h-16 p-0 hover:shadow-2xl transform hover:scale-110 transition-all duration-300"
                                  >
                                    <Camera className="h-8 w-8" />
                                  </Button>
                                </div>
                              </>
                            )}
                          </>
                        ) : (
                          <div className="relative w-full h-full">
                            <img
                              src={capturedImage || ""}
                              alt="Captured photo"
                              className="w-full h-full object-cover"
                            />

                            {/* Virtual Jewelry Overlay on Captured Image */}
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="relative">
                                <img
                                  src={selectedItem.tryOnImage || "/placeholder.svg"}
                                  alt={`${selectedItem.name} try-on`}
                                  className="w-40 h-40 object-contain"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-amber-400/30 to-yellow-400/30 rounded-full blur-xl"></div>
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-4">
                              <Button onClick={resetCapture} variant="secondary" className="bg-white/90 hover:bg-white">
                                <RotateCcw className="h-4 w-4 mr-2" />
                                Retake
                              </Button>
                              <Button onClick={downloadImage} className="luxury-gradient text-white">
                                <Download className="h-4 w-4 mr-2" />
                                Download
                              </Button>
                              <Button variant="secondary" className="bg-white/90 hover:bg-white">
                                <Share2 className="h-4 w-4 mr-2" />
                                Share
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </TabsContent>

                    <TabsContent value="upload" className="p-6 pt-4">
                      <div className="relative aspect-video bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                        {!capturedImage ? (
                          <div className="text-center">
                            <Upload className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-600 mb-4">Upload a photo to try on jewelry</p>
                            <Button
                              onClick={() => fileInputRef.current?.click()}
                              className="luxury-gradient text-white"
                            >
                              Choose Photo
                            </Button>
                            <input
                              ref={fileInputRef}
                              type="file"
                              accept="image/*"
                              onChange={handleFileUpload}
                              className="hidden"
                            />
                          </div>
                        ) : (
                          <div className="relative w-full h-full">
                            <img
                              src={capturedImage || "/placeholder.svg"}
                              alt="Uploaded photo"
                              className="w-full h-full object-cover rounded-lg"
                            />

                            {/* Virtual Jewelry Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="relative">
                                <img
                                  src={selectedItem.tryOnImage || "/placeholder.svg"}
                                  alt={`${selectedItem.name} try-on`}
                                  className="w-40 h-40 object-contain"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-amber-400/30 to-yellow-400/30 rounded-full blur-xl"></div>
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
                              <Button onClick={resetCapture} variant="secondary" className="bg-white/90 hover:bg-white">
                                <Upload className="h-4 w-4 mr-2" />
                                New Photo
                              </Button>
                              <Button onClick={downloadImage} className="luxury-gradient text-white">
                                <Download className="h-4 w-4 mr-2" />
                                Download
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            {/* Jewelry Selection */}
            <div className="space-y-6">
              <Card className="premium-card">
                <CardHeader>
                  <CardTitle>Select Jewelry</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {jewelryItems.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setSelectedItem(item)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                        selectedItem.id === item.id
                          ? "border-amber-500 bg-amber-50"
                          : "border-gray-200 hover:border-amber-300 hover:bg-amber-25"
                      }`}
                    >
                      <div className="flex space-x-4">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <Badge variant="secondary" className="mb-2 text-xs">
                            {item.category}
                          </Badge>
                          <h3 className="font-semibold text-sm mb-1">{item.name}</h3>
                          <p className="text-amber-600 font-bold">₹{item.price.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Selected Item Details */}
              <Card className="premium-card">
                <CardHeader>
                  <CardTitle>Currently Trying</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center space-y-4">
                    <img
                      src={selectedItem.image || "/placeholder.svg"}
                      alt={selectedItem.name}
                      className="w-32 h-32 object-cover rounded-lg mx-auto shadow-lg"
                    />
                    <div>
                      <Badge className="mb-2 bg-amber-100 text-amber-800">{selectedItem.category}</Badge>
                      <h3 className="text-xl font-semibold mb-2">{selectedItem.name}</h3>
                      <p className="text-2xl font-bold text-amber-600 mb-4">₹{selectedItem.price.toLocaleString()}</p>
                      <Button onClick={handleAddToCart} className="w-full luxury-gradient text-white">
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tips */}
              <Card className="premium-card">
                <CardHeader>
                  <CardTitle className="text-lg">Try-On Tips</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-600">Ensure good lighting for best results</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-600">Face the camera directly</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-600">Remove existing jewelry for clarity</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-600">Try different angles and poses</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

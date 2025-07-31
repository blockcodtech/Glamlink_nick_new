import OpenAI from 'openai';

interface ImageGenerationOptions {
  contentType: 'product' | 'provider' | 'beforeafter' | 'training' | 'review';
  imageType: 'main' | 'additional' | 'before' | 'after';
  quantity: number;
  context?: {
    name?: string;
    description?: string;
    category?: string;
    treatmentType?: string;
    specializations?: string[];
  };
  customPrompt?: string;
}

interface GeneratedImage {
  url: string;
  prompt: string;
  type: 'main' | 'additional' | 'before' | 'after';
}

class ImageGeneratorService {
  private openai: OpenAI | null = null;
  
  constructor() {
    // Initialize OpenAI client if API key is available
    if (process.env.OPENAI_API_KEY) {
      this.openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
      });
    }
  }
  
  async generateImages(options: ImageGenerationOptions): Promise<GeneratedImage[]> {
    const prompts = this.createPrompts(options);
    const images: GeneratedImage[] = [];
    
    // Generate images based on prompts
    for (let i = 0; i < prompts.length; i++) {
      const prompt = prompts[i];
      try {
        let imageUrl: string;
        
        if (this.openai) {
          // Use OpenAI DALL-E 3 if available
          imageUrl = await this.generateWithDallE(prompt.text);
        } else {
          // Fallback to high-quality mock images
          imageUrl = this.getMockImage(options, i);
        }
        
        images.push({
          url: imageUrl,
          prompt: prompt.text,
          type: prompt.type
        });
      } catch (error) {
        // Error generating image, use fallback
        images.push({
          url: this.getMockImage(options, i),
          prompt: prompt.text,
          type: prompt.type
        });
      }
    }
    
    return images;
  }
  
  private createPrompts(options: ImageGenerationOptions): Array<{ text: string; type: 'main' | 'additional' | 'before' | 'after' }> {
    const prompts: Array<{ text: string; type: 'main' | 'additional' | 'before' | 'after' }> = [];
    const { contentType, imageType, quantity, context, customPrompt } = options;
    
    // Base style for all beauty images
    const baseStyle = "professional beauty photography, high quality, well-lit, clean background";
    
    if (customPrompt) {
      // Use custom prompt if provided
      for (let i = 0; i < quantity; i++) {
        prompts.push({ text: `${customPrompt}, ${baseStyle}`, type: imageType });
      }
      return prompts;
    }
    
    // Generate contextual prompts based on content type
    switch (contentType) {
      case 'product':
        if (imageType === 'main') {
          prompts.push({
            text: `${context?.name || 'beauty product'} ${context?.category || 'cosmetic'} product photography, elegant packaging, studio lighting, white background, ${baseStyle}`,
            type: 'main'
          });
        } else {
          // Additional product images
          const angles = ['front view', 'angle view', 'texture close-up', 'in use', 'lifestyle shot'];
          for (let i = 0; i < quantity; i++) {
            prompts.push({
              text: `${context?.name || 'beauty product'} ${angles[i % angles.length]}, ${context?.category || 'cosmetic'} product, ${baseStyle}`,
              type: 'additional'
            });
          }
        }
        break;
        
      case 'provider':
        if (imageType === 'main') {
          prompts.push({
            text: `professional headshot of beauty specialist, ${context?.specializations?.[0] || 'aesthetician'}, confident smile, clean beauty salon background, ${baseStyle}`,
            type: 'main'
          });
        } else {
          // Additional provider images
          const scenarios = ['working with client', 'beauty salon workspace', 'professional tools', 'consultation'];
          for (let i = 0; i < quantity; i++) {
            prompts.push({
              text: `beauty professional ${scenarios[i % scenarios.length]}, ${context?.specializations?.join(' ') || 'aesthetics'}, ${baseStyle}`,
              type: 'additional'
            });
          }
        }
        break;
        
      case 'beforeafter':
        if (imageType === 'before' || imageType === 'after') {
          const treatment = context?.treatmentType || 'skincare treatment';
          for (let i = 0; i < quantity; i++) {
            if (imageType === 'before') {
              prompts.push({
                text: `close-up face portrait BEFORE ${treatment}, skin concerns visible, natural lighting, neutral expression, ${baseStyle}`,
                type: 'before'
              });
            } else {
              prompts.push({
                text: `close-up face portrait AFTER ${treatment}, improved skin, glowing results, same angle and lighting, happy expression, ${baseStyle}`,
                type: 'after'
              });
            }
          }
        }
        break;
        
      case 'training':
        if (imageType === 'main') {
          prompts.push({
            text: `beauty training session, ${context?.name || 'professional certification'} class, instructor demonstrating technique, modern training facility, ${baseStyle}`,
            type: 'main'
          });
        } else {
          const trainingScenes = ['hands-on practice', 'certificate presentation', 'group learning', 'technique demonstration'];
          for (let i = 0; i < quantity; i++) {
            prompts.push({
              text: `beauty education ${trainingScenes[i % trainingScenes.length]}, ${context?.name || 'professional training'}, ${baseStyle}`,
              type: 'additional'
            });
          }
        }
        break;
    }
    
    return prompts;
  }
  
  private async generateWithDallE(prompt: string): Promise<string> {
    if (!this.openai) {
      throw new Error('OpenAI client not initialized');
    }
    
    try {
      // Use the official OpenAI SDK to generate images
      const response = await this.openai.images.generate({
        model: "dall-e-3",
        prompt: prompt,
        n: 1,
        size: "1024x1024",
        quality: "standard",
        style: "natural", // Use natural style for realistic beauty images
        response_format: "url" // Get URL instead of base64 for easier handling
      });
      
      // The response contains the image URL
      if (response.data && response.data[0] && response.data[0].url) {
        return response.data[0].url;
      } else {
        throw new Error('No image URL in response');
      }
    } catch (error: any) {
      // DALL-E generation error
      throw new Error(`Failed to generate image: ${error.message}`);
    }
  }
  
  private getMockImage(options: ImageGenerationOptions, index: number): string {
    const { contentType, imageType } = options;
    
    // High-quality mock images from Unsplash
    const mockUrls: Record<string, string[]> = {
      'product-main': [
        'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&q=80', // Luxury skincare
        'https://images.unsplash.com/photo-1570194065650-d99fb4b38e39?w=800&q=80', // Beauty products
        'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&q=80'  // Cosmetics
      ],
      'product-additional': [
        'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80', // Makeup products
        'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800&q=80', // Skincare texture
        'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=800&q=80'  // Beauty tools
      ],
      'provider-main': [
        'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=800&q=80', // Professional woman
        'https://images.unsplash.com/photo-1559599101-f09722fb4948?w=800&q=80', // Beauty expert
        'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=800&q=80'  // Aesthetician
      ],
      'provider-additional': [
        'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800&q=80', // Spa treatment
        'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?w=800&q=80', // Beauty salon
        'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80'  // Professional tools
      ],
      'beforeafter-before': [
        'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=800&q=80', // Natural face
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80', // Before treatment
        'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80'  // Skin concerns
      ],
      'beforeafter-after': [
        'https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=800&q=80', // Glowing skin
        'https://images.unsplash.com/photo-1619451334792-150fd785ee74?w=800&q=80', // Clear complexion
        'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=800&q=80'  // Radiant skin
      ],
      'training-main': [
        'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80', // Training session
        'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800&q=80', // Workshop
        'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&q=80'  // Certificate
      ],
      'training-additional': [
        'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80', // Group learning
        'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80', // Hands-on training
        'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&q=80'  // Practice session
      ]
    };
    
    const key = `${contentType}-${imageType}`;
    const urls = mockUrls[key] || mockUrls['product-main'];
    return urls[index % urls.length];
  }
}

// Export singleton instance
const imageGeneratorService = new ImageGeneratorService();
export default imageGeneratorService;

// Export types for use in components
export type { ImageGenerationOptions, GeneratedImage };
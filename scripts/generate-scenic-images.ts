import { ImageGenerationClient, Config } from 'coze-coding-dev-sdk';
import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';

const config = new Config();
const client = new ImageGenerationClient(config);

// 钟祥十二景 - 统一风格提示词前缀（确保风格一致）
const STYLE_PREFIX = `Professional Chinese landscape photography of scenic spot in Zhongxiang Hubei China. 
Natural lighting, vibrant colors, cinematic composition, high detail, 4K quality.
Style: realistic documentary travel photography with warm golden hour tones, 
soft atmospheric depth, traditional Chinese aesthetic with natural green and blue tones.
No text overlay, no watermark, no logo.`;

interface ScenicSpot {
  id: number;
  name: string;
  prompt: string;
}

const spots: ScenicSpot[] = [
  {
    id: 1,
    name: 'mingxiaoling',
    prompt: `${STYLE_PREFIX} The Ming Xiaoling Mausoleum (明显陵) in Zhongxiang - a magnificent UNESCO World Heritage imperial tomb with unique "one tomb two graves" architecture. Wide angle view showing the grand stone archway entrance, the sacred way lined with stone animal statues leading up to the main tomb complex with traditional Chinese palace-style buildings on rolling hills. Morning misty atmosphere with warm sunlight filtering through ancient cypress trees.`
  },
  {
    id: 2,
    name: 'mochouhu',
    prompt: `${STYLE_PREFIX} Mochou Lake (莫愁湖) in Zhongxiang - a beautiful wetland park with calm emerald lake water reflecting weeping willow trees along the shore. Traditional Chinese pavilion (Mochou Pavilion) on a small island connected by an elegant curved bridge. Lotus flowers blooming on the lake surface, soft morning light, peaceful atmosphere. In background: Mochou Village (莫愁村) with traditional Hubei folk architecture showing tiled roofs and wooden facades.`
  },
  {
    id: 3,
    name: 'huangxiandong',
    prompt: `${STYLE_PREFIX} Huangxian Cave (黄仙洞) karst cave in Zhongxiang - spectacular underground cavern with massive stalactites and stalagmites illuminated by colorful LED lights. The famous "Rainbow Waterfall" inside the cave with multi-colored rock formations reflecting in underground pools. Dramatic wide interior shot showing the immense scale of the limestone cave system with natural skylight opening above.`
  },
  {
    id: 4,
    name: 'dakousenlin',
    prompt: `${STYLE_PREFIX} Dukou National Forest Park (大口国家森林公园) in Zhongxiang - lush dense forest with towering pine and fir trees covering rolling hills. A winding wooden boardwalk path through the misty morning forest with dappled sunlight through canopy layers. Rich green tones from deep forest to bright moss. Distant mountain peaks visible through tree gaps, ethereal fog between valleys.`
  },
  {
    id: 5,
    name: 'zhongxiangbowuguan',
    prompt: `${STYLE_PREFIX} Zhongxiang Museum (钟祥博物馆) - elegant Ming Dynasty architectural style building with gray tiled roofs and white walls. The museum exterior surrounded by manicured gardens with traditional Chinese landscaping featuring rockeries, bamboo groves, and a central courtyard pond with koi fish. Golden hour warm light hitting the traditional curved roof eaves. Clean symmetrical composition.`
  },
  {
    id: 6,
    name: 'xingwangfu',
    prompt: `${STYLE_PREFIX} Xingwang Palace (兴王府) in Zhongxiang - the birthplace of Emperor Jiajing, showing restored Ming Dynasty palace architecture. Grand red lacquered gates with golden roof tiles, ornate carved stone dragon pillars at the entrance. Traditional Chinese courtyard layout with covered corridors. Warm afternoon light creating long shadows across the stone-paved courtyard. Historical gravitas with pristine preservation.`
  },
  {
    id: 7,
    name: 'yuanyougong',
    prompt: `${STYLE_PREFIX} Yuan You Palace (元佑宫) Taoist temple in Zhongxiang - authentic Taoist temple architecture with distinctive upturned eaves, red pillars, and intricate wood carvings. Incense smoke gently rising from bronze incense burners in front of the main hall. Stone steps flanked by dragon railings leading up to the temple entrance. Lush ancient trees surrounding the temple compound, spiritual serene atmosphere with filtered sunlight.`
  },
  {
    id: 8,
    name: 'pengdun',
    prompt: `${STYLE_PREFIX} Pengdun Rural World (彭墩乡村世界) countryside scene in Zhongxiang - picturesque rural landscape featuring traditional Hubei village houses with whitewashed walls and dark tile roofs. Golden rice paddies or farmland in foreground, village pathways with visitors strolling. A large lotus pond with wooden viewing deck, rustic farm-to-table restaurant buildings. Warm pastoral atmosphere, late afternoon golden light.`
  },
  {
    id: 9,
    name: 'huiyuannonggu',
    prompt: `${STYLE_PREFIX} Huiyuan Agricultural Valley (汇源农谷体验园) eco-tourism farm in Zhongxiang - modern organic agricultural demonstration area with neat rows of vegetable gardens and fruit orchards. Greenhouses, flower fields with blooming seasonal flowers (sunflowers or rapeseed), children's play areas with farm animals. Visitors picking fresh fruits. Bright cheerful daytime scene with blue sky, fluffy clouds, vibrant greens and colorful flowers.`
  },
  {
    id: 10,
    name: 'wanziqianhong',
    prompt: `${STYLE_PREFIX} Wanziqianhong Botanical Garden (万紫千红植物园) in Zhongxiang - stunning botanical garden explosion of colorful flowers in full bloom. Rose garden, peony garden, and seasonal flower displays creating a rainbow tapestry. Winding gravel paths through themed garden sections, decorative gazebos, fountains, and butterfly gardens. Bright sunny day with vivid saturated colors of thousands of flowers. Dreamy romantic garden atmosphere.`
  },
  {
    id: 11,
    name: 'shipaiguzhen',
    prompt: `${STYLE_PREFIX} Shipai Ancient Town (石牌古镇) in Zhongxiang - historic thousand-year-old town known as the "Tofu Capital of China". Ancient stone-paved streets lined with well-preserved Ming-Qing dynasty shopfronts with wooden doors and latticed windows. Traditional tofu-making workshops visible, hanging red lanterns, elderly artisans at work. Nostalgic timeless atmosphere with warm evening lights glowing from shop interiors.`
  },
  {
    id: 12,
    name: 'mochoudubaixuelou',
    prompt: `${STYLE_PREFIX} Mochou Ferry and Baixue Tower (莫愁渡·白雪楼) by the Han River in Zhongxiang - scenic riverside location where the ancient Mochou ferry crossing meets the elegant Baixue Tower (White Snow Tower). Multi-story traditional Chinese pagoda tower beside the wide Han River, willow trees along the riverbank, small boats on calm water. Sunset golden reflection on river surface, poetic melancholic beauty evoking the legend of Mochou girl and the classic "Yangchun Baixue" song tradition.`
  }
];

async function generateImage(spot: ScenicSpot, outputDir: string): Promise<boolean> {
  console.log(`\n[${spot.id}/12] Generating: ${spot.name}...`);
  
  try {
    const response = await client.generate({
      prompt: spot.prompt,
      size: '1024x1024',
      watermark: false,
    });

    const helper = client.getResponseHelper(response);

    if (helper.success && helper.imageUrls.length > 0) {
      const imageUrl = helper.imageUrls[0];
      const outputPath = path.join(outputDir, `spot-${String(spot.id).padStart(2, '0')}-${spot.name}.png`);
      
      // Download image
      const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer', timeout: 60000 });
      fs.writeFileSync(outputPath, Buffer.from(imageResponse.data));
      
      console.log(`  ✅ Saved: ${outputPath} (${(Buffer.from(imageResponse.data).length / 1024).toFixed(1)} KB)`);
      return true;
    } else {
      console.log(`  ❌ Failed: ${helper.errorMessages.join(', ')}`);
      return false;
    }
  } catch (error: any) {
    console.log(`  ❌ Error: ${error.message}`);
    return false;
  }
}

async function main() {
  const outputDir = '/workspace/projects/zhongxiang-mochoubang/frontend/public/images/scenic-spots';
  
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log('='.repeat(60));
  console.log('  钟祥十二景 图片生成');
  console.log('  Zhongxiang Twelve Scenic Spots Image Generation');
  console.log('='.repeat(60));

  let successCount = 0;
  
  for (const spot of spots) {
    const success = await generateImage(spot, outputDir);
    if (success) successCount++;
    
    // Small delay between requests
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log('\n' + '='.repeat(60));
  console.log(`  完成！成功生成 ${successCount}/${spots.length} 张图片`);
  console.log(`  输出目录: ${outputDir}`);
  console.log('='.repeat(60));
  
  if (successCount < spots.length) {
    process.exit(1);
  }
}

main().catch(console.error);

// 恐竜・古生物の骨格側面図（public/images/cyber/*.webp）の原画頭部向き定義
// 'right': 原画で頭が右を向いている
// 'left': 原画で頭が左を向いている

export const RIGHT_FACING_SKELETONS: Set<string> = new Set([
    'bajadasaurus',
    'barosaurus',
    'borealopelta',
    'ceratosaurus',
    'deinocheirus',
    'dimorphodon',
    'edmontosaurus',
    'elasmosaurus',
    'euoplocephalus',
    'gorgosaurus',
    'hallucigenia',
    'huayangosaurus',
    'koreaceratops',
    'majungasaurus',
    'mamenchisaurus',
    'mapusaurus',
    'mosasaurus',
    'nyctosaurus',
    'oviraptor',
    'patagotitan',
    'polacanthus',
    'proganochelys',
    'prognathodon',
    'quetzalcoatlus',
    'saichania',
    'stegouros',
    'suchomimus',
    'tapejara',
    'tuojiangosaurus',
    'tupandactylus',
    'tyrannosaurus',
    'wuerhosaurus',
]);

/**
 * 恐竜IDから骨格図の原画向きを取得する
 * @param id 恐竜ID（小文字）
 * @returns 'right' | 'left'
 */
export function getSkeletonFacing(id: string): 'right' | 'left' {
    return RIGHT_FACING_SKELETONS.has(id.toLowerCase()) ? 'right' : 'left';
}

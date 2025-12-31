// src/utils/icon-loader.ts
import { loadIcons, loadIcon, addCollection } from '@iconify/vue'

// 已加载的图标前缀缓存
const loadedPrefixes = new Set<string>()

// 预定义的常用图标（提高加载性能）
const ESSENTIAL_ICONS = {
  ep: ['user', 'lock', 'home', 'setting', 'search', 'plus', 'delete', 'edit'],
  mdi: ['home', 'account', 'cog', 'magnify'],
  fa: ['user', 'lock', 'home'],
}

/**
 * 加载单个图标（在线模式）
 */
export async function loadSingleIcon(iconName: string): Promise<boolean> {
  try {
    await loadIcon(iconName)
    return true
  } catch (error) {
    console.warn(`在线加载图标失败: ${iconName}`, error)
    return false
  }
}

/**
 * 批量加载图标（在线模式）
 */
export async function loadIconsBatch(icons: string[]): Promise<void> {
  try {
    await loadIcons(icons)
  } catch (error) {
    console.warn('批量加载图标失败:', error)
  }
}

/**
 * 加载整个图标集（离线模式）
 */
export async function loadIconSet(prefix: string): Promise<boolean> {
  if (loadedPrefixes.has(prefix)) {
    return true
  }

  try {
    switch (prefix) {
      case 'ep': {
        const epIcons = await import('@iconify-json/ep/icons.json')
        addCollection(epIcons.default)
        break
      }
      case 'mdi': {
        const mdiIcons = await import('@iconify-json/mdi/icons.json')
        addCollection(mdiIcons.default)
        break
      }
      case 'fa': {
        const faIcons = await import('@iconify-json/fa/icons.json')
        addCollection(faIcons.default)
        break
      }
      default:
        console.warn(`不支持的图标前缀: ${prefix}`)
        return false
    }
  } catch (error) {
    console.error('加载图标集失败:', error)
    return false
  }
}

/**
 * 加载常用图标（预加载）
 */
export async function preloadEssentialIcons(): Promise<void> {
  const icons: string[] = []

  Object.entries(ESSENTIAL_ICONS).forEach(([prefix, iconNames]) => {
    iconNames.forEach((iconName) => {
      icons.push(`${prefix}:${iconName}`)
    })
  })

  await loadIconsBatch(icons)
  console.log('预加载常用图标完成')
}

/**
 * 检查图标是否已加载
 */
export function isIconLoaded(iconName: string): boolean {
  const [prefix, name] = iconName.split(':')
  return loadedPrefixes.has(prefix)
}

/**
 * 检测网络状态
 */
export function isOnline(): boolean {
  return typeof navigator !== 'undefined' ? navigator.onLine : true
}

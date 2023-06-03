// to parse webgl renderer string

// desktop pc, chrome / ff / edge
// ANGLE (NVIDIA, NVIDIA GeForce GTX 1070 Ti Direct3D11 vs_5_0 ps_5_0, D3D11)

// 2017 mbp, chrome / ff
// ANGLE (Intel Inc., Intel(R) Iris(TM) Plus Graphics 640, OpenGL 4.1)

// 2017 mbp,  safari
// Apple GPU

export interface GpuParseResult {
  friendlyName: string
  device: string
  vendor?: string
  api?: string
  moreInfo?: string
  raw: string
}

const apples = ['Apple GPU', 'Apple M1', 'Apple M2', 'Google SwiftShader']
/**
 * 获取GPU信息
 * @returns
 */
export function getInfo() {
  try {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('webgl')
    if (ctx) {
      const rendererStr = unmask(ctx).renderer
      // return matchRenderer(
      //   "ANGLE (NVIDIA, NVIDIA GeForce GTX 1070 Direct3D11 vs_5_0 ps_5_0, D3D11)",
      // );
      return matchRenderer(rendererStr)
    } else {
      return null
    }
  } catch {
    return null // return exception too?
  }
}

export function unmask(ctx: WebGLRenderingContext) {
  const unMaskedInfo = {
    renderer: '',
    vendor: '',
  }

  const dbgRenderInfo = ctx.getExtension('WEBGL_debug_renderer_info')
  if (dbgRenderInfo != null) {
    unMaskedInfo.renderer = ctx.getParameter(dbgRenderInfo.UNMASKED_RENDERER_WEBGL)
    unMaskedInfo.vendor = ctx.getParameter(dbgRenderInfo.UNMASKED_VENDOR_WEBGL)
  }

  return unMaskedInfo
}

export function matchRenderer(raw: string): GpuParseResult {
  try {
    if (apples.indexOf(raw) !== -1) {
      return {
        friendlyName: raw,
        device: raw,
        raw,
        moreInfo:
          'Some browsers and operating systems hide full GPU information from the browser, try another browser if one is available.',
      }
    }

    if (/SwiftShader/.test(raw)) {
      return {
        friendlyName: 'Google SwiftShader',
        device: 'Google SwiftShader',
        raw,
      }
    }

    if (/^ANGLE/.test(raw)) {
      const insideParens = raw.match(/\((.+)\)$/)![1]
      const parts = insideParens.split(/,\s*/g)

      let [vendor, device, api] = parts

      // but sometimes its just like `ANGLE (NVIDIA GeForce GT 610 Direct3D11 vs_5_0 ps_5_0)`
      if (parts.length === 1) {
        vendor = parts[0].split(' ')[0]
        device = parts[0].split(' ').slice(1).join(' ')
      }

      if (/Direct3D/.test(device)) device = device.split('Direct3D')[0].trim()
      // TODO also gather the trailing ps/vs/ info if we care to display it

      return {
        friendlyName: withoutCruft(device),
        device: withoutCruft(device),
        vendor,
        api,
        raw,
      }
    }
  } catch {}

  return {
    friendlyName: withoutCruft(raw),
    device: withoutCruft(raw),
    raw,
  }
}

function withoutCruft(str: string) {
  return (
    removeParenthesesContent(str)
      // .replace("(R)", "")
      // .replace("(TM)", "")
      .replace(/\/PCIe\/SSE2/g, '')
      .replace(/\s+/g, ' ')
      .trim()
  )
}

function removeParenthesesContent(input: string): string {
  const stack: number[] = []
  const result = input.split('')

  for (let i = 0; i < result.length; i++) {
    if (result[i] === '(') {
      stack.push(i)
    } else if (result[i] === ')') {
      const start = stack.pop()
      if (start !== undefined) {
        result.splice(start, i - start + 1)
        i = start - 1
      }
    }
  }
  return result.join('')
}

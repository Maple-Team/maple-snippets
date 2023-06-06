import type { KnownController } from './knownControllers'
import { KNOWN_CONTROLLERS } from './knownControllers'

export interface CodeResult {
  vendorCode?: string
  productCode?: string
  combined?: string
  // if we know these, provide them. we hardcode some vendors / products that are common
  vendor?: string
  // product?: string;
  knownController?: KnownController
}

export function parseControllerId(str: string): CodeResult {
  try {
    // Xbox One Wired Controller (STANDARD GAMEPAD Vendor: 045e Product: 02ea)
    const normalRegex = /Vendor: ([a-f0-9]{1,4}) Product: ([a-f0-9]{1,4})/

    // 0810-0001-Twin USB Joystick
    const shorterRegex = /^([a-f0-9]{1,4})-([a-f0-9]{1,4})/

    let match = str.match(normalRegex)

    if (!match) match = str.match(shorterRegex)

    var [_ignore, vendorCode, productCode] = match || ([] as undefined[]) //eslint-disable-line

    const knownController = KNOWN_CONTROLLERS.find((matcher) => matcher.match(str, vendorCode, productCode))

    return {
      vendorCode,
      productCode,
      combined: `${vendorCode}_${productCode}`,
      knownController,
      vendor: vendorCode && knownVendors[vendorCode],
      // product: knownProducts[productCode],
    }
  } catch (e) {
    return { vendorCode: '?', productCode: '?', combined: '?' }
  }
}

const knownVendors: { [s: string]: string | undefined } = {
  '054c': 'Sony',
  '18d1': 'Google',
  '057e': 'Nintendo',
}

// const knownProducts: { [s: string]: string | undefined } = {
//   "2009": "Switch Pro Controller",
//   "0268": "Playstation 3 Dualshock",
//   "09cc": "Playstation 4 Dualshock",
//   "045e": "Microsoft",
// };

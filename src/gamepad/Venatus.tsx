// modified from https://gist.github.com/michae1/40ff19875f517e85df4692e8fe718b89

import * as React from 'react'

function add(el?: HTMLDivElement | null) {
  try {
    // @ts-expect-error: xx
    window.top.__vm_add = window.top.__vm_add || []
    // @ts-expect-error: xx
    window.top.__vm_add.push(el)
  } catch {}
}

function remove(el?: HTMLDivElement | null) {
  try {
    // @ts-expect-error: xx
    window.top.__vm_remove = window.top.__vm_remove || []
    // @ts-expect-error: xx
    window.top.__vm_remove.push(el)
  } catch {}
}

function removeRich(str: string) {
  try {
    // @ts-expect-error: xx
    window.top.__vm_remove_category = window.top.__vm_remove_category || []
    // @ts-expect-error: xx
    window.top.__vm_remove_category.push(str)
  } catch {}
}

export function VenatusAd(props: { placementId?: string; rich?: true }) {
  const adRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const el = adRef.current
    add(el)

    return () => {
      if (props.rich) {
        // https://kb.venatus.com/en/knowledge/how-to-implement-venatus-tags-on-a-single-page-application-spa-site
        removeRich('richmedia_all')
      } else {
        remove(el)
      }
    }
  }, [props.rich])

  if (!props.placementId) return null

  return (
    <div>
      <div
        className="vm-placement"
        data-id={props.placementId}
        ref={adRef}
      />
    </div>
  )
}

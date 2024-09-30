import React from 'react'

export function CompleteBadge({
  completed
}:{
  completed:boolean
}) {
  const baseClass = "text-xs rounded-full w-16 text-center";
  if(completed) {
    return <div className={baseClass + " bg-success/80 text-base-100/90"}>完了</div>
  }else {
    return <div className={baseClass + " bg-base-content/60 text-base-100/70"}>未完了</div>
  }
}
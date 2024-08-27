import React from 'react'

export default function loading() {
  return (
    <div className="grid grow place-content-center  px-4">
    <div className="text-center">
      <h1 className="text-9xl font-black text-zinc-400 dark:text-zinc-200">
        WAIT
      </h1>

      <p className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-500 sm:text-4xl">
        Loading...
      </p>

      <p className="mt-4 text-zinc-500">
        Please just wait a few seconds
      </p>
    </div>
  </div>
  )
}

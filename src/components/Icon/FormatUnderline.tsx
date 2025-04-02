import * as React from 'react'
import { theme } from 'themes'

export function FormatUnderline({ tintColor, ...props }: any) {
  return (
    <svg width={24} height={24} fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path
        d='M15.116 6.364h1.409v7.704c0 .796-.188 1.506-.563 2.131a3.94 3.94 0 01-1.573 1.472c-.678.356-1.474.534-2.387.534s-1.708-.178-2.386-.534a3.98 3.98 0 01-1.58-1.472c-.371-.625-.557-1.335-.557-2.13V6.363h1.41v7.59c0 .569.124 1.074.374 1.518.25.44.607.786 1.069 1.04.466.25 1.022.375 1.67.375.648 0 1.205-.125 1.67-.375.466-.254.823-.6 1.069-1.04.25-.444.375-.95.375-1.517V6.364zM6.07 20.182h11.864v1.09H6.07v-1.09z'
        fill={tintColor || theme('color.primary.main')}
      />
    </svg>
  )
}

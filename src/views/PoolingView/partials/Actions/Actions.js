import React from 'react';
import tw from 'twin.macro';

export default function Actions({poolingViewHooks}) {
        return (
            <>
                <h2 tw="mt-8 max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
          <span tw=" inline-block">
            <svg
                viewBox="0 0 52 24"
                fill="currentColor"
                tw="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-100 lg:w-32 lg:-ml-24 lg:-mt-10 sm:block"
            >
              <defs>
                <pattern
                    id="fdca20a0-aeb4-4caf-ba1b-4351eee42363"
                    x="0"
                    y="0"
                    width=".135"
                    height=".30"
                >
                  <circle cx="1" cy="1" r=".7"/>
                </pattern>
              </defs>
              <rect
                  fill="url(#fdca20a0-aeb4-4caf-ba1b-4351eee42363)"
                  width="52"
                  height="24"
              />
            </svg>
            <span tw="relative">Unfortunately, you cannot yeet your funds into this LP yet.</span>
          </span>

                </h2>
            </>
        )
}
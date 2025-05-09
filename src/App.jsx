import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React, { useState } from 'react'

const App = () => {

  const [showContent, setShowContent] = useState(false)

  useGSAP(() => {
    const tl = gsap.timeline()

    tl.to('.vi-mask-group', {
      rotate: 10,
      duration: 2,
      ease: 'power4.inOut',
      transformOrigin: '50% 50%',
    })
      .to('.vi-mask-group', {
        scale: 10,
        duration: 2,
        delay: -1.8,
        ease: 'expo.inOut',
        transformOrigin: '50% 50%',
        opacity: 0,
        onUpdate: () => {
          if (tl.progress() >= 0.8) {
            document.querySelector('.svg').remove()
            setShowContent(true)
            tl.kill()
          }
        }
      })

  })

  return (
    <>
      <div className="svg fixed top-0 left-0 z-[100] w-full h-screen overflow-hidden bg-gray-950">
        <svg viewBox='0 0 800 600' preserveAspectRatio='xMidYMid slice'>
          <defs>
            <mask id="viMask">
              <rect width="100%" height="100%" fill="black" />
              <g className="vi-mask-group">
                <text
                  x="50%"
                  y="40%"
                  fontSize="250"
                  textAnchor="middle"
                  fill="white"
                  dominantBaseline="middle"
                  fontFamily="Arial Black"
                >
                  VI
                </text>
              </g>
            </mask>
          </defs>
          <image
            href='./bg.png'
            width="100%"
            height="100%"
            preserveAspectRatio='xMidYMid slice'
            mask="url(#viMask)"
          />
        </svg>
      </div>
      {showContent && (
        <div className='main w-full h-full bg-white'>
          <h3>Hello world</h3>
        </div>
      )}
    </>
  )
}

export default App
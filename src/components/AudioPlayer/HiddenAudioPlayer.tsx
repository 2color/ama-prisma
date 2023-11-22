import * as React from 'react'

interface Props {
  src: string
  // 👇 When locally recording we want to to load the audio so the user can scrub
  preload: boolean
}

const HiddenAudioPlayer = React.forwardRef<HTMLAudioElement, Props>(
  ({ src, preload }: Props, ref) => {
    return (
      <audio
        preload={preload ? 'auto' : 'metadata'}
        ref={ref}
        controls={false}
        className="hidden"
      >
        <source src={src} type="audio/webm" />
        Your browser does not support the audio element
      </audio>
    )
  }
)

export default HiddenAudioPlayer

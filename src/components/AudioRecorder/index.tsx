// @ts-ignore
import * as React from 'react'
import AudioPlayer from '../AudioPlayer'
import Button, { DeleteButton, RecordingButton } from '../Button'
import Spinner from '../LoadingSpinner'
import { ErrorAlert } from '../Alert'
import { Trash } from 'react-feather'
import { useMutation } from 'react-query'
import { signUpload } from '~/lib/api'

interface OnComplete {
  transcript: string
  waveform: number[]
  src: string
}

interface Props {
  id: string
  initialAudioUrl?: string
  initialWaveform?: number[]
  onRecordingStart?: Function
  onRecordingStop?: Function
  onRecordingError?: Function
  onTranscriptionComplete?: (e: OnComplete) => void
  onDeleteAudio?: Function
}

interface State {
  status:
    | 'idle'
    | 'recording'
    | 'recorded'
    | 'uploading'
    | 'transcribing'
    | 'done'
  audioUrl: string | null
  audioBlob: Blob | null
  waveform: number[]
  transcript: string | null
  error: string | null
}

type Action =
  | { type: 'reset' }
  | { type: 'start-recording' }
  | { type: 'stop-recording'; audioUrl: string; audioBlob: Blob }
  | { type: 'start-uploading' }
  | { type: 'start-transcribing' }
  | { type: 'done'; transcript: string }
  | { type: 'set-waveform'; waveform: number[] }
  | { type: 'error'; error: string }
  | { type: 'delete' }

export default function AudioRecorder(props: Props) {
  const {
    id,
    initialAudioUrl = null,
    initialWaveform = [],
    onRecordingStart,
    onRecordingStop,
    onRecordingError,
    onTranscriptionComplete,
    onDeleteAudio,
  } = props

  const initialState = {
    status: initialAudioUrl ? 'recorded' : 'idle',
    audioUrl: initialAudioUrl,
    audioBlob: null,
    waveform: initialWaveform,
    transcript: null,
    error: null,
  }

  function reducer(state: State, action: Action) {
    switch (action.type) {
      case 'reset': {
        return initialState
      }
      case 'start-recording': {
        onRecordingStart && onRecordingStart()
        return {
          ...state,
          status: 'recording',
        }
      }
      case 'stop-recording': {
        onRecordingStop && onRecordingStop()
        return {
          ...state,
          status: 'recorded',
          audioUrl: action.audioUrl,
          audioBlob: action.audioBlob,
        }
      }
      case 'set-waveform': {
        return {
          ...state,
          waveform: action.waveform,
        }
      }
      case 'start-uploading': {
        return {
          ...state,
          status: 'uploading',
        }
      }
      case 'start-transcribing': {
        return {
          ...state,
          status: 'transcribing',
        }
      }
      case 'done': {
        onTranscriptionComplete &&
          onTranscriptionComplete({
            transcript: action.transcript,
            waveform: state.waveform,
            src: state.audioUrl,
          })

        return {
          ...state,
          transcript: action.transcript,
          status: 'done',
        }
      }
      case 'error': {
        onRecordingError && onRecordingError()
        return {
          ...initialState,
          error: action.error,
        }
      }
      case 'delete': {
        onDeleteAudio && onDeleteAudio()
        return {
          ...initialState,
          audioUrl: null,
          audioBlob: null,
          waveform: [],
          transcript: null,
          status: 'idle',
        }
      }
      default:
        throw new Error()
    }
  }

  const [state, dispatch] = React.useReducer(reducer, initialState)
  const [audioChunks, setAudioChunks] = React.useState([])
  const [mediaRecorder, setMediaRecorder] = React.useState(null)

  React.useEffect(() => {
    async function handleMediaSetup() {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      let mr = new MediaRecorder(stream)
      setMediaRecorder(mr)
    }

    // navigator.getUserMedia =
    //   navigator.getUserMedia ||
    //   navigator.webkitGetUserMedia ||
    //   navigator.mozGetUserMedia ||
    //   navigator.msGetUserMedia

    if (navigator.mediaDevices) {
      handleMediaSetup()
    } else {
      dispatch({
        type: 'error',
        error: 'Media Decives will work only with SSL',
      })
    }
  }, [])

  React.useEffect(() => {
    if (mediaRecorder) {
      mediaRecorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          setAudioChunks((state) => [...state, e.data])
        }
      }
    }
  }, [mediaRecorder])

  function startRecording() {
    if (navigator.mediaDevices) {
      dispatch({ type: 'start-recording' })
      mediaRecorder.start(10)
    } else {
      dispatch({ type: 'error', error: 'Audio recording is not supported' })
    }
  }

  function stopRecording() {
    mediaRecorder.stop()
    const audioBlob = new Blob(audioChunks, { type: 'audio/mp3' })
    let audioUrl = window.URL.createObjectURL(audioBlob)
    dispatch({ type: 'stop-recording', audioUrl, audioBlob })
  }

  function reRecord() {
    dispatch({ type: 'reset' })
    setAudioChunks([])
    startRecording()
  }

  function handleDelete() {
    dispatch({ type: 'delete' })
    setAudioChunks([])
  }

  function handleUpload() {
    dispatch({ type: 'start-uploading' })
    signUploadMutation.mutate()
  }

  // const [getSignedUploadUrl] = useLazyQuery(GET_SIGNED_UPLOAD_URL, {
  //   onCompleted: (data) => {
  //     const { url, fields } = JSON.parse(data.signedUploadUrl)
  //     uploadFile({ url, fields })
  //   },
  // })

  const signUploadMutation = useMutation(signUpload, {
    onSuccess: (data, variables, context) => {
      upload(state.audioBlob, data.folder, data.timestamp, data.signature)
      return onDone()
    },
  })

  const upload = async (
    blob: Blob,
    folder: string,
    timestamp: string | Blob,
    signature: string
  ): Promise<Record<string, any>> => {

    const url = `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/video/upload`
    const formData = new FormData()

    formData.append('file', blob)
    formData.append('folder', folder)
    formData.append('signature', signature)
    formData.append('timestamp', timestamp)
    formData.append('api_key', process.env.CLOUDINARY_API_KEY)
    formData.append('upload_preset', process.env.CLOUDINARY_UPLOAD_PRESET)

    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    })

    const json = await response.json()

    if (!response.ok) {
      throw json
    }

    return json
  }

  async function uploadFile({ url, fields }) {
    const formData = new FormData()

    Object.entries({ ...fields, file: state.audioBlob }).forEach(
      ([key, value]) => {
        formData.append(key, value as string | Blob)
      }
    )

    const upload = await fetch(url, {
      method: 'POST',
      body: formData,
    }).catch((error) => {
      dispatch({ type: 'error', error: error.message })
      return error
    })

    // if (upload.ok) {
    //   // file has persisted to Firebase
    //   getSignedPlaybackUrl({ variables: { id } })
    // }
  }

  // const [getSignedPlaybackUrl] = useLazyQuery(GET_SIGNED_PLAYBACK_URL, {
  //   onCompleted: (data) => {
  //     dispatch({ type: 'start-transcribing' })
  //     transcribeAudio({
  //       variables: {
  //         url: data.signedPlaybackUrl,
  //       },
  //     })
  //   },
  // })

  // const [transcribeAudio] = useMutation(TRANSCRIBE_AUDIO, {
  //   onCompleted: (data) => {
  //     const transcriptionId = data.transcribeAudio
  //     getTranscription({
  //       variables: { transcriptionId },
  //     })
  //   },
  // })

  // const [getTranscription, getTranscriptionResponse] = useLazyQuery(
  //   GET_TRANSCRIPTION,
  //   { pollInterval: 2000 }
  // )

  // React.useEffect(() => {
  //   const { data } = getTranscriptionResponse
  //   if (data && typeof data.transcription === 'string') {
  //     getTranscriptionResponse.stopPolling()

  //     dispatch({ type: 'done', transcript: data.transcription })
  //   }
  // }, [getTranscriptionResponse.data])

  return (
    <div className="flex flex-col p-4 space-y-4 bg-gray-100 border border-gray-200 rounded-md dark:border-gray-800 dark:bg-gray-900">
      {state.status === 'idle' && (
        <Button onClick={startRecording}>
          {initialAudioUrl ? 'Re-record answer' : 'Record answer'}
        </Button>
      )}

      {state.status === 'recording' && (
        <RecordingButton onClick={stopRecording}>
          Stop recording...
        </RecordingButton>
      )}

      {state.audioUrl && state.status !== 'recording' && (
        <>
          <AudioPlayer
            id={null}
            waveform={state.waveform}
            setWaveformData={(waveform) =>
              dispatch({ type: 'set-waveform', waveform })
            }
            src={state.audioUrl}
          />
        </>
      )}

      {state.audioUrl &&
        state.status !== 'uploading' &&
        state.status !== 'transcribing' && (
          <div className="flex justify-between w-full">
            {state.status !== 'recording' && (
              <DeleteButton onClick={handleDelete}>
                <Trash size={16} />
              </DeleteButton>
            )}

            {(state.status === 'recorded' || state.status === 'done') && (
              <div className="flex space-x-3">
                <Button onClick={reRecord}>Record again</Button>
                <Button onClick={handleUpload}>Upload audio</Button>
              </div>
            )}
          </div>
        )}

      {state.error && <ErrorAlert>{state.error}</ErrorAlert>}

      {state.status === 'uploading' && (
        <div className="flex items-center justify-center">
          <Spinner />
          <p className="text-primary">Uploading...</p>
        </div>
      )}

      {state.status === 'transcribing' && (
        <div className="flex items-center justify-center">
          <Spinner />
          <p className="text-primary">Transcribing...</p>
        </div>
      )}
    </div>
  )
}

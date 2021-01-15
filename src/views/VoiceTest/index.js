import React, { useState, useEffect } from 'react';
import { Button, Text } from '@ui-kitten/components';
import Voice from '@react-native-community/voice';

export default () => {
  const [isRec, setIsRec] = useState(false);
  const [transcript, setTranscript] = useState("")

  useEffect(() => {
    Voice.onSpeechError = (error) => console.log(error)
    Voice.onSpeechStart = () => {
      setIsRec(true)
    }
    Voice.onSpeechEnd = () => {
      setIsRec(false);
    }
    Voice.onSpeechPartialResults = (event) => setTranscript(event.value);
    Voice.onSpeechResults = (event) => setTranscript(event.value)
  }, [])

  return (
    <>
      <Button
        status={isRec ? "danger" : "primary"}
        onPress={() => {
          isRec ? Voice.stop() : Voice.start('vi-VN')
        }}
      >
        {
          isRec ? "Stop" : "Start"
        }
      </Button>
      <Text>
        {transcript}
      </Text>
    </>
  )
}
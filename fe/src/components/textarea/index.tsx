import { type ChangeEvent, type Dispatch, type FC, type SetStateAction, useEffect } from 'react';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import ClearIcon from '@mui/icons-material/Clear';
import useSpeechToText from 'react-hook-speech-to-text';
import MicIcon from '@mui/icons-material/Mic';

interface ITextareaProps {
  id: string;
  label?: string;
  value: string;
  setValue?: Dispatch<SetStateAction<string>>;
  disabled?: boolean;
  clearMode?: boolean;
  copyMode?: boolean;
  pronounceMode?: boolean;
  voiceMode?: boolean;
}

const Textarea: FC<ITextareaProps> = ({
  id,
  label,
  value,
  setValue,
  disabled = false,
  copyMode = false,
  pronounceMode = false,
  clearMode = false,
  voiceMode = false,
}) => {
  const handleCopy = async (): Promise<void> => {
    await navigator.clipboard.writeText(value);
  };

  const handleClear = (): void => {
    setValue && setValue('');
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setValue && setValue(e.target.value);
  };

  const handleSpeak = (): void => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(value);
    synth.speak(utterance);
  };

  const { interimResult, isRecording, startSpeechToText, stopSpeechToText } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
    speechRecognitionProperties: {
      lang: 'en-US',
      interimResults: true,
    },
  });

  useEffect(() => {
    if (isRecording && interimResult) {
      setValue && setValue(interimResult);
    }
  }, [isRecording, interimResult]);

  return (
    <TextField
      id={id}
      fullWidth
      multiline
      rows={4}
      value={value}
      label={label ?? null}
      onChange={handleChange}
      disabled={disabled}
      sx={{ position: 'relative', mt: 3 }}
      InputProps={{
        startAdornment: (
          <InputAdornment
            position="end"
            sx={{
              position: 'absolute',
              top: 28,
              right: 14,
              p: 0,
            }}
          >
            {clearMode && value && (
              <IconButton onClick={handleClear}>
                <ClearIcon />
              </IconButton>
            )}
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment
            position="end"
            sx={{
              position: 'absolute',
              bottom: 28,
              right: 14,
            }}
          >
            {voiceMode && (
              <IconButton onMouseDown={startSpeechToText} onMouseUp={stopSpeechToText}>
                <MicIcon />
              </IconButton>
            )}
            {pronounceMode && (
              <IconButton disabled={!value} onClick={handleSpeak}>
                <VolumeUpIcon />
              </IconButton>
            )}
            {copyMode && (
              <IconButton disabled={!value} onClick={handleCopy}>
                <ContentCopyIcon />
              </IconButton>
            )}
          </InputAdornment>
        ),
      }}
    />
  );
};

export default Textarea;

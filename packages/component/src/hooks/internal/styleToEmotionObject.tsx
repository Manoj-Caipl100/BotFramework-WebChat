import React, { createContext, createRef, type ReactNode, type RefObject, useCallback, useContext } from 'react';
import { useRefFrom } from 'use-ref-from';
import { hooks } from 'botframework-webchat-api';
import useEmotion from './useEmotion';

const { useStyleOptions } = hooks;

const styleToEmotionObjectContext = createContext<RefObject<(...args: any[]) => string>>(createRef());

export const StyleToEmotionObjectProvider = ({ children, nonce }: Readonly<{ children: ReactNode; nonce: string }>) => {
  const [{ stylesRoot }] = useStyleOptions();

  const emotion = useEmotion(nonce, stylesRoot);
  const styleToEmotionObject = useCallback(style => emotion.css(style), [emotion]);

  const styleToEmotionObjectRef = useRefFrom(styleToEmotionObject);

  return (
    <styleToEmotionObjectContext.Provider value={styleToEmotionObjectRef}>
      {styleToEmotionObject && children}
    </styleToEmotionObjectContext.Provider>
  );
};

export function useStyleToEmotionObject() {
  return useContext(styleToEmotionObjectContext).current;
}

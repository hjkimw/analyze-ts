import React from 'react';
import { useState, useCallback, useRef, useEffect } from 'react';

interface P{
  name: string;
  title: string;
  children?: React.ReactNode;
}

const WordRelay: React.FC<P> = (props: P) => {
    const [word, setWord] = useState<string>('제로초');
    const [value, setValue] = useState<string>('');
    const [result, setResult] = useState<string>('');
    const inputEl = useRef<HTMLInputElement>(null);    


    useEffect(async () => {

      await Promise.resolve();
  
    }, [])


    useCallback((e:React.ChangeEvent<HTMLInputElement>) => {
      console.log('useCallback');
    }, []);


    
    
    

    const onSubmitForm = useCallback<(e: React.FormEvent) => void>((e) => {
        e.preventDefault();
        const input = inputEl.current;
        if (word[word.length - 1] === value[0]) {
          setResult('딩동댕');
          setWord(value);
          setValue('');
          if (input) {
            input.focus();
          }
        } else {
          setResult('땡');
          setValue('');
          if (input) {
            input.focus();
          }
        }
    }, [word, value]);

    const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value) 
    }, []);

    return (
        <>
          <div>{word}</div>
          <form onSubmit={onSubmitForm}>
            <input
              ref={inputEl}
              value={value}
              onChange={onChange}
            />
            <button>입력!</button>
          </form>
          <div>{result}</div>
        </>
      );
};

export default WordRelay;
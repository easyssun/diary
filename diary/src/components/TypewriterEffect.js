import React, { useState, useEffect } from 'react';

const TypewriterEffect = ({ text = '', speed = 100, onFinish }) => {
  const [displayedText, setDisplayedText] = useState('');  // 타이핑된 텍스트 상태
  const [index, setIndex] = useState(0);  // 인덱스를 상태로 관리하여 중복 실행 방지
  const [isFinished, setIsFinished] = useState(false); // 타이핑 완료 여부

  useEffect(() => {
    // 상태 초기화: 타이핑 시작 시 텍스트와 인덱스 초기화
    setDisplayedText('');
    setIndex(0);

    if (text && text.length > 0) {
      
      const interval = setInterval(() => {
        setIndex((prevIndex) => {
          if (prevIndex < text.length) {
            setDisplayedText((prev) => prev + text[prevIndex]);  // 한 글자씩 추가
            return prevIndex + 1;
          } else {
            clearInterval(interval);  // 모든 글자를 타이핑하면 타이핑 종료
            return prevIndex;  // 마지막 인덱스 상태 유지
          }
        });
      }, speed);

      return () => {
        clearInterval(interval);  
      };
    }
  }, [text, speed]);

  // 타이핑이 완료되었을 때 onFinish 콜백 호출
  useEffect(() => {
    if (index === text.length && onFinish) {
      onFinish();  // 타이핑 완료 후 콜백 실행
    }
  }, [index, text.length, onFinish]);

  return (
    <div style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
      {displayedText}
    </div>
  );
};

export default TypewriterEffect;
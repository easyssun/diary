import React, { useRef, useState } from 'react';
import TypewriterEffect from './components/TypewriterEffect';
import SaveButton from './components/SaveButton';
import './styles/App.css';

const App = () => {
  const [diaryPages, setDiaryPages] = useState(['']); // 페이지별 텍스트를 저장할 배열
  const [isTyping, setIsTyping] = useState(false); // 타이핑 여부
  const [isFinished, setIsFinished] = useState(false); // 타이핑 완료 여부
  const [fontSizeLevel, setFontSizeLevel] = useState(3); // 글자 크기 단계 
  const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 번호
  const [showWarning, setShowWarning] = useState(false); // 경고 메시지
  const diaryRef = useRef(null);

  const fontSizes = [14, 18, 22, 26, 30]; // 단계별 글자 크기

  // 현재 페이지에 맞는 텍스트 처리
  const currentText = diaryPages[currentPage] || '';

  // 작성 완료 후 타자기 효과 시작
  const handleTyping = () => {
    if (currentText.trim() === '') {  // 아무 것도 입력되지 않았을 경우, 경고 표시
      setShowWarning(true);
      return;
    }
    setShowWarning(false);          // 경고 숨김
    setIsTyping(true);              // 타자기 효과 시작
    setIsFinished(false);           // 타이핑 중에는 저장 버튼 숨김
  };

  // 타자기 효과 완료 후 저장 버튼 표시
  const handleFinish = () => {
    setIsFinished(true);  // 타이핑 효과가 끝나면 저장 버튼 표시
  };

  // 다시쓰기 버튼 클릭 시 초기화
  const handleReset = () => {
    setDiaryPages(['']);   // 일기 내용 초기화
    setIsTyping(false);    // 타이핑 상태 초기화
    setIsFinished(false);  // 저장 버튼 숨김
    setShowWarning(false); // 경고 메시지 숨김
    setCurrentPage(0);     // 첫 페이지로 돌아감
  };

  // 글자 크기 조정 함수
  const increaseFontSize = () => {
    if (fontSizeLevel < 5) {
      setFontSizeLevel(fontSizeLevel + 1);
    }
  };

  const decreaseFontSize = () => {
    if (fontSizeLevel > 1) {
      setFontSizeLevel(fontSizeLevel - 1);
    }
  };

  // 페이지 이동 함수
  const nextPage = () => {
    if (currentPage === diaryPages.length - 1) {
      // 새로운 페이지 추가
      setDiaryPages([...diaryPages, '']);
    }
    setCurrentPage(currentPage + 1);
  };

  const previousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  // 텍스트 변경 함수 (현재 페이지에 맞는 텍스트 업데이트)
  const handleTextChange = (e) => {
    const newText = e.target.value;
    const updatedPages = [...diaryPages];
    updatedPages[currentPage] = newText; // 현재 페이지의 텍스트 업데이트
    setDiaryPages(updatedPages);
  };

  return (
    <div className="app-container">

      <div className="font-size-controls">
        <button className="emotion-button" onClick={decreaseFontSize}>-</button>
        <span>글자 크기: {fontSizeLevel}</span>
        <button className="emotion-button" onClick={increaseFontSize}>+</button>
      </div>

      <div className="diary-container" ref={diaryRef}>
        <img src="https://easyssun.github.io/diary/public/images/diary_background.png" alt="Diary Background" className="diary-bg" />
        <div className="text-container" style={{ fontSize: `${fontSizes[fontSizeLevel - 1]}px` }}>
          {isTyping ? (
            // 타자기 효과 적용된 텍스트 표시
            
            <TypewriterEffect text={currentText} speed={100} onFinish={handleFinish} />
          ) : (
            <textarea
              placeholder="여기에 일기를 작성하세요..."
              value={currentText}
              onChange={handleTextChange}
              className="diary-textarea"
              style={{ fontSize: `${fontSizes[fontSizeLevel - 1]}px` }}
            />
          )}
        </div>
      </div>

      {/* 경고 메시지 */}
      {showWarning && (
        <p className="warning-text">텍스트를 입력해 주세요.</p>
      )}

      {/* 작성 완료 버튼 */}
      {!isTyping && (
        <button className="emotion-button" onClick={handleTyping}>작성 완료</button>
      )}

      {/* 저장 및 다시쓰기 버튼: 타이핑 완료 후 표시 */}
      {isFinished && (
        <>
          <SaveButton diaryRef={diaryRef} />
          <button className="emotion-button" onClick={handleReset}>다시쓰기</button>
        </>
      )}

      {/* 페이지 이동 버튼 */}
      <div className="page-controls">
        {currentPage > 0 && (
          <button className="emotion-button" onClick={previousPage}>{"<"}</button>
        )}
        <span>페이지: {currentPage + 1}</span>
        <button className="emotion-button" onClick={nextPage}>{">"}</button>
      </div>
    </div>
  );
};

export default App;

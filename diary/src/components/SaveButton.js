import React from 'react';
import html2canvas from 'html2canvas';

const SaveButton = ({ diaryRef }) => {
  const saveDiaryAsImage = () => {
    html2canvas(diaryRef.current, {
      useCORS: true,
      scale: 2 // 고해상도로 저장
    }).then((canvas) => {
      const link = document.createElement('a');
      link.download = 'diary.png';
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  return (
    <button className="emotion-button" onClick={saveDiaryAsImage}>
      일기 저장하기
    </button>
  );
};

export default SaveButton;

import React from 'react';

const today = new Date();
const todayYear = today.getFullYear();
const todayMonth = today.getMonth() + 1;
const todayDate = today.getDate();
const todayDay = today.getDay();
const week = [
  '일요일',
  '월요일',
  '화요일',
  '수요일',
  '목요일',
  '금요일',
  '토요일',
];

const TodayDate = () => {
  return (
    <div className="px-4 py-1 mx-auto my-4 text-sm rounded-full bg-gray-regular w-fit">
      {`${todayYear}년 ${todayMonth}월 ${todayDate}일 ${week[todayDay]}`}
    </div>
  );
};

export default TodayDate;

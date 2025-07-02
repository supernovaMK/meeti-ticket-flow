
import React from 'react';
import { Calendar, MapPin, Users, QrCode } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TicketCardProps {
  id: string;
  title: string;
  location: string;
  date: string;
  time: string;
  notice?: string;
  participants: string[];
  isActive: boolean;
  onShareQR?: () => void;
  onEnter?: () => void;
  isOwner?: boolean;
}

const TicketCard: React.FC<TicketCardProps> = ({
  id,
  title,
  location,
  date,
  time,
  notice,
  participants,
  isActive,
  onShareQR,
  onEnter,
  isOwner = false
}) => {
  return (
    <div className="relative w-full max-w-sm mx-auto">
      {/* 티켓 카드 */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
        {/* 티켓 헤더 - 빨간색 그라데이션 */}
        <div className="bg-gradient-to-r from-red-500 to-red-600 px-6 py-4 text-white">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-1">{title}</h2>
              <div className="flex items-center text-red-100 text-sm">
                <MapPin className="w-4 h-4 mr-1" />
                <span className="truncate">{location}</span>
              </div>
            </div>
            <div className="ml-4">
              <QrCode className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>

        {/* 티켓 구분선 (톱니 효과) */}
        <div className="relative h-6 bg-white">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-red-500 to-red-600" 
               style={{
                 clipPath: 'polygon(0 0, 100% 0, 100% 50%, 95% 100%, 90% 50%, 85% 100%, 80% 50%, 75% 100%, 70% 50%, 65% 100%, 60% 50%, 55% 100%, 50% 50%, 45% 100%, 40% 50%, 35% 100%, 30% 50%, 25% 100%, 20% 50%, 15% 100%, 10% 50%, 5% 100%, 0 50%)'
               }}>
          </div>
        </div>

        {/* 티켓 본문 */}
        <div className="px-6 py-4 space-y-4">
          {/* 날짜 및 시간 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center text-gray-700">
              <Calendar className="w-5 h-5 mr-2 text-red-500" />
              <div>
                <div className="font-semibold">{date}</div>
                <div className="text-sm text-gray-500">{time}</div>
              </div>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-medium ${
              isActive 
                ? 'bg-green-100 text-green-700' 
                : 'bg-gray-100 text-gray-500'
            }`}>
              {isActive ? '진행중' : '종료'}
            </div>
          </div>

          {/* 공지사항 */}
          {notice && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded">
              <p className="text-sm text-gray-700">{notice}</p>
            </div>
          )}

          {/* 참석자 정보 */}
          <div className="space-y-2">
            <div className="flex items-center text-gray-700">
              <Users className="w-5 h-5 mr-2 text-red-500" />
              <span className="font-medium">참석자 ({participants.length}명)</span>
            </div>
            {participants.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {participants.slice(0, 8).map((participant, index) => (
                  <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                    {participant}
                  </span>
                ))}
                {participants.length > 8 && (
                  <span className="text-gray-500 text-xs px-2 py-1">
                    +{participants.length - 8}명 더
                  </span>
                )}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">아직 참석자가 없습니다</p>
            )}
          </div>

          {/* 버튼 영역 */}
          <div className="pt-2 space-y-2">
            {isOwner && isActive && (
              <Button 
                onClick={onShareQR}
                className="w-full bg-red-500 hover:bg-red-600 text-white"
              >
                QR 코드 공유하기
              </Button>
            )}
            {!isOwner && isActive && (
              <Button 
                onClick={onEnter}
                className="w-full bg-green-500 hover:bg-green-600 text-white"
              >
                입장하기
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;

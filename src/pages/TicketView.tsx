
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TicketCard from '@/components/TicketCard';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

interface Ticket {
  id: string;
  title: string;
  location: string;
  date: string;
  time: string;
  notice?: string;
  participants: string[];
  isActive: boolean;
  isOwner: boolean;
}

const TicketView = () => {
  const { ticketId } = useParams<{ ticketId: string }>();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [userName, setUserName] = useState('');
  const [hasJoined, setHasJoined] = useState(false);

  useEffect(() => {
    // 실제로는 API에서 티켓 데이터를 가져와야 합니다
    const demoTicket: Ticket = {
      id: ticketId || '1',
      title: '공연 뒷풀이',
      location: '홍대 맛집포차',
      date: '2024-07-05',
      time: '21:00',
      notice: '선배님들 먼저 오시면 자리 맡아주세요!',
      participants: ['김민수', '이지영', '박준형', '최서연'],
      isActive: true,
      isOwner: false
    };
    
    setTicket(demoTicket);
  }, [ticketId]);

  const handleJoinTicket = () => {
    if (!userName.trim()) {
      const inputName = prompt('이름을 입력해주세요:');
      if (!inputName) return;
      setUserName(inputName);
    }

    if (ticket && userName) {
      // 실제로는 서버에 참석 정보를 전송
      setTicket(prev => prev ? {
        ...prev,
        participants: [...prev.participants, userName]
      } : null);
      setHasJoined(true);
      toast.success(`${userName}님, 모임 참석이 확인되었습니다!`);
    }
  };

  const handleGoBack = () => {
    window.history.back();
  };

  if (!ticket) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500">티켓을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <div className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center">
            <Button variant="ghost" size="sm" onClick={handleGoBack} className="mr-2 p-2">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">{ticket.title}</h1>
              <p className="text-sm text-gray-500">모임 참여하기</p>
            </div>
          </div>
        </div>
      </div>

      {/* 티켓 카드 */}
      <div className="max-w-md mx-auto p-4 pt-8">
        <TicketCard
          {...ticket}
          onEnter={hasJoined ? undefined : handleJoinTicket}
        />

        {/* 참여 완료 메시지 */}
        {hasJoined && (
          <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="text-center">
              <div className="text-green-600 text-lg font-semibold mb-2">
                🎉 참석 확인 완료!
              </div>
              <p className="text-green-700 text-sm">
                {userName}님의 참석이 확인되었습니다.
                <br />
                모임 당일에 뵙겠습니다!
              </p>
            </div>
          </div>
        )}

        {/* 모임 안내 */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-blue-800 font-medium mb-2">📍 모임 안내</h3>
          <div className="text-blue-700 text-sm space-y-1">
            <p>• 장소: {ticket.location}</p>
            <p>• 일시: {ticket.date} {ticket.time}</p>
            {ticket.notice && <p>• 공지: {ticket.notice}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketView;

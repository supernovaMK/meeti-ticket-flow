
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Calendar, Archive } from 'lucide-react';
import TicketGallery from '@/components/TicketGallery';
import CreateTicketForm from '@/components/CreateTicketForm';
import QRShareModal from '@/components/QRShareModal';
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
  createdAt: Date;
}

const Index = () => {
  const [view, setView] = useState<'tickets' | 'create' | 'archive'>('tickets');
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [archivedTickets, setArchivedTickets] = useState<Ticket[]>([]);
  const [selectedTicketForQR, setSelectedTicketForQR] = useState<string | null>(null);

  // 데모 데이터
  useEffect(() => {
    const demoTickets: Ticket[] = [
      {
        id: '1',
        title: '공연 뒷풀이',
        location: '홍대 맛집포차',
        date: '2024-07-05',
        time: '21:00',
        notice: '선배님들 먼저 오시면 자리 맡아주세요!',
        participants: ['김민수', '이지영', '박준형', '최서연'],
        isActive: true,
        isOwner: true,
        createdAt: new Date()
      }
    ];

    const demoArchivedTickets: Ticket[] = [
      {
        id: '2',
        title: '동아리 정기모임',
        location: '학교 동아리방',
        date: '2024-06-20',
        time: '18:00',
        notice: '과제 관련 논의 있습니다',
        participants: ['김민수', '이지영', '박준형', '최서연', '정수빈', '한예림'],
        isActive: false,
        isOwner: true,
        createdAt: new Date('2024-06-15')
      }
    ];

    setTickets(demoTickets);
    setArchivedTickets(demoArchivedTickets);
  }, []);

  const handleCreateTicket = (ticketData: {
    title: string;
    location: string;
    date: string;
    time: string;
    notice: string;
  }) => {
    const newTicket: Ticket = {
      id: Date.now().toString(),
      ...ticketData,
      participants: [],
      isActive: true,
      isOwner: true,
      createdAt: new Date()
    };

    setTickets(prev => [newTicket, ...prev]);
    setView('tickets');
    toast.success('모임 티켓이 성공적으로 생성되었습니다!');
  };

  const handleShareQR = (ticketId: string) => {
    setSelectedTicketForQR(ticketId);
  };

  const handleEnterTicket = (ticketId: string) => {
    // 실제로는 사용자 인증 후 참석자 목록에 추가
    const userName = prompt('이름을 입력해주세요:');
    if (userName) {
      setTickets(prev => prev.map(ticket => 
        ticket.id === ticketId 
          ? { ...ticket, participants: [...ticket.participants, userName] }
          : ticket
      ));
      toast.success(`${userName}님이 참석자 목록에 추가되었습니다!`);
    }
  };

  const activeTickets = tickets.filter(ticket => ticket.isActive);
  const selectedTicket = tickets.find(t => t.id === selectedTicketForQR);

  if (view === 'create') {
    return (
      <CreateTicketForm
        onSubmit={handleCreateTicket}
        onBack={() => setView('tickets')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <div className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">모티</h1>
              <p className="text-sm text-gray-500">모임 티켓 관리</p>
            </div>
            <div className="flex space-x-2">
              <Button
                variant={view === 'tickets' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setView('tickets')}
                className="px-3"
              >
                <Calendar className="w-4 h-4 mr-1" />
                현재
              </Button>
              <Button
                variant={view === 'archive' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setView('archive')}
                className="px-3"
              >
                <Archive className="w-4 h-4 mr-1" />
                기록
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="max-w-md mx-auto p-4">
        {view === 'tickets' ? (
          <div className="space-y-6">
            {activeTickets.length > 0 ? (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-900">진행 중인 모임</h2>
                <TicketGallery
                  tickets={activeTickets}
                  onShareQR={handleShareQR}
                  onEnterTicket={handleEnterTicket}
                />
              </div>
            ) : (
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  진행 중인 모임이 없습니다
                </h3>
                <p className="text-gray-500 mb-6">
                  새로운 모임 티켓을 만들어보세요!
                </p>
              </div>
            )}

            {/* 새 티켓 만들기 버튼 */}
            <Button
              onClick={() => setView('create')}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-4 text-lg font-medium"
            >
              <Plus className="w-5 h-5 mr-2" />
              새 모임 티켓 만들기
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">지난 모임 기록</h2>
            {archivedTickets.length > 0 ? (
              <TicketGallery
                tickets={archivedTickets}
                onShareQR={() => {}}
                onEnterTicket={() => {}}
              />
            ) : (
              <div className="text-center py-12">
                <Archive className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  저장된 모임 기록이 없습니다
                </h3>
                <p className="text-gray-500">
                  모임이 끝나면 자동으로 여기에 기록됩니다.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* QR 공유 모달 */}
      {selectedTicket && (
        <QRShareModal
          isOpen={!!selectedTicketForQR}
          onClose={() => setSelectedTicketForQR(null)}
          ticketId={selectedTicket.id}
          ticketTitle={selectedTicket.title}
        />
      )}
    </div>
  );
};

export default Index;

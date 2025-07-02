
import React, { useState, useRef, useEffect } from 'react';
import TicketCard from './TicketCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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

interface TicketGalleryProps {
  tickets: Ticket[];
  onShareQR: (ticketId: string) => void;
  onEnterTicket: (ticketId: string) => void;
}

const TicketGallery: React.FC<TicketGalleryProps> = ({ 
  tickets, 
  onShareQR, 
  onEnterTicket 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const galleryRef = useRef<HTMLDivElement>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(0);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currentIndex < tickets.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
    if (isRightSwipe && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goToPrevious = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex(prev => Math.min(tickets.length - 1, prev + 1));
  };

  if (tickets.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full">
      {/* 티켓 갤러리 */}
      <div 
        ref={galleryRef}
        className="overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div 
          className="flex transition-transform duration-300 ease-in-out"
          style={{ 
            transform: `translateX(-${currentIndex * 100}%)`,
            width: `${tickets.length * 100}%`
          }}
        >
          {tickets.map((ticket) => (
            <div key={ticket.id} className="w-full flex-shrink-0 px-4">
              <TicketCard
                {...ticket}
                onShareQR={() => onShareQR(ticket.id)}
                onEnter={() => onEnterTicket(ticket.id)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* 네비게이션 버튼 */}
      {tickets.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            disabled={currentIndex === 0}
            className={`absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center transition-opacity ${
              currentIndex === 0 ? 'opacity-30' : 'opacity-70 hover:opacity-100'
            }`}
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          
          <button
            onClick={goToNext}
            disabled={currentIndex === tickets.length - 1}
            className={`absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center transition-opacity ${
              currentIndex === tickets.length - 1 ? 'opacity-30' : 'opacity-70 hover:opacity-100'
            }`}
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </>
      )}

      {/* 인디케이터 */}
      {tickets.length > 1 && (
        <div className="flex justify-center mt-4 space-x-2">
          {tickets.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-red-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TicketGallery;

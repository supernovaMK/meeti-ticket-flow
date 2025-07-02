
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft } from 'lucide-react';

interface CreateTicketFormProps {
  onSubmit: (ticketData: {
    title: string;
    location: string;
    date: string;
    time: string;
    notice: string;
  }) => void;
  onBack: () => void;
}

const CreateTicketForm: React.FC<CreateTicketFormProps> = ({ onSubmit, onBack }) => {
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    date: '',
    time: '',
    notice: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title && formData.location && formData.date && formData.time) {
      onSubmit(formData);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // 오늘 날짜를 기본값으로 설정
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto">
        {/* 헤더 */}
        <div className="flex items-center mb-6 pt-4">
          <Button variant="ghost" size="sm" onClick={onBack} className="mr-2 p-2">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold text-gray-900">새 모임 티켓 만들기</h1>
        </div>

        {/* 폼 */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            {/* 모임 이름 */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-medium text-gray-700">
                모임 이름 *
              </Label>
              <Input
                id="title"
                type="text"
                placeholder="예: 공연 뒷풀이"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="w-full"
                required
              />
            </div>

            {/* 장소 */}
            <div className="space-y-2 mt-4">
              <Label htmlFor="location" className="text-sm font-medium text-gray-700">
                장소 *
              </Label>
              <Input
                id="location"
                type="text"
                placeholder="예: 홍대 ○○포차"
                value={formData.location}
                onChange={(e) => handleChange('location', e.target.value)}
                className="w-full"
                required
              />
            </div>

            {/* 날짜와 시간 */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="date" className="text-sm font-medium text-gray-700">
                  날짜 *
                </Label>
                <Input
                  id="date"
                  type="date"
                  min={today}
                  value={formData.date}
                  onChange={(e) => handleChange('date', e.target.value)}
                  className="w-full"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time" className="text-sm font-medium text-gray-700">
                  시간 *
                </Label>
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => handleChange('time', e.target.value)}
                  className="w-full"
                  required
                />
              </div>
            </div>

            {/* 공지사항 */}
            <div className="space-y-2 mt-4">
              <Label htmlFor="notice" className="text-sm font-medium text-gray-700">
                간단한 공지 (선택)
              </Label>
              <Textarea
                id="notice"
                placeholder="예: 선배님들 먼저 오시면 자리 맡아주세요!"
                value={formData.notice}
                onChange={(e) => handleChange('notice', e.target.value)}
                className="w-full resize-none"
                rows={3}
              />
            </div>
          </div>

          {/* 생성 버튼 */}
          <Button 
            type="submit" 
            className="w-full bg-red-500 hover:bg-red-600 text-white py-3 text-lg font-medium"
            disabled={!formData.title || !formData.location || !formData.date || !formData.time}
          >
            모임 티켓 생성하기
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateTicketForm;


import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { QrCode, Share2, Download } from 'lucide-react';

interface QRShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticketId: string;
  ticketTitle: string;
}

const QRShareModal: React.FC<QRShareModalProps> = ({ 
  isOpen, 
  onClose, 
  ticketId, 
  ticketTitle 
}) => {
  // 실제로는 QR 라이브러리를 사용해야 하지만, 데모용으로 placeholder 사용
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
    `${window.location.origin}/ticket/${ticketId}`
  )}`;

  const shareUrl = `${window.location.origin}/ticket/${ticketId}`;

  const handleShareKakao = () => {
    // 카카오톡 공유 API 연동 (실제 구현 시)
    alert('카카오톡 공유 기능은 실제 서비스에서 구현됩니다.');
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      alert('링크가 복사되었습니다!');
    } catch (err) {
      console.error('링크 복사 실패:', err);
    }
  };

  const handleDownloadQR = () => {
    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = `${ticketTitle}_QR.png`;
    link.click();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">모임 티켓 공유하기</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* QR 코드 */}
          <div className="flex flex-col items-center space-y-4">
            <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
              <img 
                src={qrCodeUrl} 
                alt="QR Code" 
                className="w-48 h-48"
              />
            </div>
            <p className="text-sm text-gray-600 text-center">
              QR 코드를 스캔하면 '{ticketTitle}' 모임 참여 페이지로 이동합니다.
            </p>
          </div>

          {/* 공유 버튼들 */}
          <div className="space-y-2">
            <Button 
              onClick={handleShareKakao}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black"
            >
              카카오톡으로 공유하기
            </Button>
            
            <Button 
              onClick={handleCopyLink}
              variant="outline"
              className="w-full"
            >
              <Share2 className="w-4 h-4 mr-2" />
              링크 복사하기
            </Button>
            
            <Button 
              onClick={handleDownloadQR}
              variant="outline"
              className="w-full"
            >
              <Download className="w-4 h-4 mr-2" />
              QR 코드 저장하기
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QRShareModal;

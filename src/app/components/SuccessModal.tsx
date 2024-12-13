import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/app/components/ui/dialog"
import { X } from 'lucide-react'

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SuccessModal({ isOpen, onClose}: SuccessModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-white">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-black hover:text-gray-600 transition-colors"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">閉じる</span>
        </button>
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-[#E70E44]">送信完了</DialogTitle>
          <DialogDescription className="text-center text-gray-700">
            お問い合わせ内容を確認いたしました。
          </DialogDescription>
        </DialogHeader>
        <div className="py-6">
          {/* Remove or update this paragraph */}
          <p className="text-center text-gray-700 mb-4">
            お問い合わせありがとうございます。内容を確認次第、ご連絡いたします。
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}


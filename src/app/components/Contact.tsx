'use client'

import { useState } from 'react'
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Textarea } from "@/app/components/ui/textarea"
import { db } from '../firebase/firebaseConfig'
import { collection, addDoc } from "firebase/firestore"
import { SuccessModal } from './SuccessModal'

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      await addDoc(collection(db, "contacts"), {
        name,
        email,
        message,
        createdAt: new Date()
      });
      setSubmitStatus('success')
      setIsModalOpen(true)
      setName('')
      setEmail('')
      setMessage('')
    } catch (error) {
      console.error("Error adding document: ", error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <section id="contact" className="py-20 bg-[#333333]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-[#E70E44] mb-12">
          お問い合わせ
        </h2>
        <div className="flex flex-col md:flex-row gap-8">
          {/* フォーム部分 */}
          <div className="md:w-1/2">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                  お名前
                </label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full bg-[#444444] border-gray-600 text-white"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                  メールアドレス
                </label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full bg-[#444444] border-gray-600 text-white"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                  メッセージ
                </label>
                <Textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  className="w-full bg-[#444444] border-gray-600 text-white"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              <Button 
                type="submit"
                className="w-full bg-[#E70E44] hover:bg-[#FF3366] text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? '送信中...' : '送信する'}
              </Button>
              {submitStatus === 'error' && (
                <p className="text-red-500 text-center">エラーが発生しました。もう一度お試しください。</p>
              )}
            </form>
          </div>
          
          {/* テキストボックス部分 */}
          <div className="md:w-1/2 bg-[#444444] p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-[#E70E44] mb-4">お問い合わせについて</h3>
            <p className="text-gray-300 mb-4">
              ご質問やご相談がございましたら、お気軽にお問い合わせください。専門のスタッフが丁寧にお答えいたします。
            </p>
            <p className="text-gray-300 mb-4">
              以下の情報をご記入の上、フォームをご送信ください：
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>お名前</li>
              <li>メールアドレス</li>
              <li>お問い合わせ内容</li>
            </ul>
            <p className="text-gray-300 mt-4">
              通常、お問い合わせから2営業日以内にご返答いたします。お急ぎの場合は、お電話でのお問い合わせもお受けしております。
            </p>
          </div>
        </div>
      </div>
      <SuccessModal 
        isOpen={isModalOpen} 
        onClose={closeModal}
        name={name}
        email={email}
        message={message}
      />
    </section>
  )
}


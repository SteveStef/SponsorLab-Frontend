'use client';

import { CalendarIcon, ClockIcon, CreditCardIcon, SendIcon, UserIcon, BriefcaseIcon, PackageIcon, MessageSquareIcon, SpeakerIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Dialog, DialogContent } from '@/components/ui/dialog'

export default function Component({ 
  sender,
  product,
  speechRequirements,
  adDetails,
  proposedMessage,
  isModalOpen = false, 
  setIsModalOpen = () => {}
}) {

  const AdPurchaseDetails = () => (
    <div>
      <div className="space-y-6 text-white p-6 max-h-[80vh] overflow-y-auto">
        
        <div className="grid grid-cols-1 gap-6">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center text-green-400">
                <UserIcon className="mr-2 h-5 w-5" />
                Sender Information
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 flex justify-between">
              <p><strong className="text-green-400">Name:</strong> {sender.name}</p>
              <p><strong className="text-green-400">Company:</strong> {sender.company}</p>
            </CardContent>
          </Card>

          <Card className="col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center text-green-400">
                <PackageIcon className="mr-2 h-5 w-5" />
                Product/Service Details
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 ">
              <p><strong className="text-green-400">Title:</strong> {product.title}</p>
              <p><strong className="text-green-400">Description:</strong> {product.description}</p>
            </CardContent>
          </Card>

          <Card className="col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center text-green-400">
                <BriefcaseIcon className="mr-2 h-5 w-5" />
                Advertisement Details
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-300">
              <div className="flex items-center">
                <CalendarIcon className="mr-2 h-4 w-4 text-green-400" />
                <p><strong className="text-green-400">Timestamp:</strong> {"First 2 minutes "}</p>
              </div>
              <div className="flex items-center">
                <CreditCardIcon className="mr-2 h-4 w-4 text-green-400" />
                <p><strong className="text-green-400">Price:</strong> {adDetails.payment}</p>
              </div>
              <div className="flex items-center">
                <ClockIcon className="mr-2 h-4 w-4 text-green-400" />
                <p><strong className="text-green-400">Duration:</strong> {adDetails.duration} seconds</p>
              </div>
              <div className="flex items-center">
                <SendIcon className="mr-2 h-4 w-4 text-green-400" />
                <p><strong className="text-green-400">Sending Sample:</strong> {adDetails.sendingSample ? 'Yes' : 'No'}</p>
              </div>
              <div className="flex items-center">
                <CreditCardIcon className="mr-2 h-4 w-4 text-green-400" />
                <p><strong className="text-green-400">Payment Cap:</strong> {adDetails.paymentCap}</p>
              </div>
              <div className="flex items-center">
                <CreditCardIcon className="mr-2 h-4 w-4 text-green-400" />
                <p><strong className="text-green-400">Pricing Model:</strong> {adDetails.pricingModel === "FLAT" ? "FLAT RATE" : "CPM"}</p>
              </div>
            </CardContent>
          </Card>


          <Card className="col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center text-green-400">
                <MessageSquareIcon className="mr-2 h-5 w-5" />
                Proposed Message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[200px] w-full border border-green-700 p-4 text-gray-300">
                <p className="italic">{proposedMessage}</p>
              </ScrollArea>
            </CardContent>
          </Card>
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center text-green-400">
                <SpeakerIcon className="mr-2 h-5 w-5" />
                Speech Requirements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[200px] w-full p-4 text-gray-300">
                {speechRequirements}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  )

  return (
    <div>
      {isModalOpen && (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto p-0 border-green-500">
            <AdPurchaseDetails />
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

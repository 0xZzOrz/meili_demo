'use client'

import { Card } from "@/components/ui/card"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePdf, faFileWord } from '@fortawesome/free-solid-svg-icons'

const documents = [
  {
    name: "CAR1130937.pdf",
    type: "PDF",
    icon: faFilePdf,
    date: "2024-03-15",
    size: "2.3 MB"
  },
  {
    name: "Invoice 5100000063 (2017).pdf",
    type: "PDF",
    icon: faFilePdf,
    date: "2024-03-14",
    size: "1.8 MB"
  },
  {
    name: "Invoice 5100000016 (2016).pdf",
    type: "PDF",
    icon: faFilePdf,
    date: "2024-03-13",
    size: "1.5 MB"
  },
  {
    name: "Contract_2024.docx",
    type: "Word",
    icon: faFileWord,
    date: "2024-03-12",
    size: "856 KB"
  }
]

export default function DocumentsPage() {
  return (
    <div className="p-6">
      <Card className="bg-white">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">文档列表</h2>
          <div className="space-y-2">
            {documents.map((doc, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg cursor-pointer"
              >
                <div className="flex items-center space-x-4">
                  <FontAwesomeIcon 
                    icon={doc.icon} 
                    className={`h-5 w-5 ${
                      doc.type === 'PDF' ? 'text-red-500' : 
                      doc.type === 'Word' ? 'text-blue-500' : 'text-gray-500'
                    }`} 
                  />
                  <span className="font-medium">{doc.name}</span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>{doc.date}</span>
                  <span>{doc.size}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  )
} 
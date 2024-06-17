/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/XJA6l17mm9i
* Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
*/

/** Add fonts into your Next.js project:

import { Inter } from 'next/font/google'

inter({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
"use client";
import React, { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"


export default function Chatwindow() {

  const [documentUrl, setDocumentUrl] = useState('');
  const [documentName, setDocumentName] = useState('');
  const [message, setMessage] = useState<string>('');
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [documentNames, setDocumentNames] = useState<string[]>([]);
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);

  useEffect(() => {
    fetchEmbeddedDocuments(); // Fetch embedded documents when component mounts
  }, []);

  const fetchEmbeddedDocuments = async () => {
    const apiUrl = 'http://127.0.0.1:8100/list_embeddings/'; // Replace with your actual endpoint

    try {
      const response = await fetch(apiUrl);
      if (response.ok) {
        const data = await response.json();
        setDocumentNames(data.documents); // Assuming your endpoint returns an object with a 'documents' array
      } else {
        console.error('Failed to fetch embedded documents:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching embedded documents:', error);
    }
  };

  const handleEmbedClick = async () => {
    const apiUrl = 'http://127.0.0.1:8000/process_article/';

            try {
                const articleResponse = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ url: documentUrl })
                });
                const articleData = await articleResponse.json();

                if (articleResponse.ok) {
                    console.log('Article processed:', articleData);
                    const textProcessingUrl = 'http://127.0.0.1:8000/process_text/';
                    const textResponse = await fetch(textProcessingUrl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ text: articleData.text, id: documentName })
                    });
                    const textData = await textResponse.json();
                    console.log('Text processed:', textData);
                } else {
                    console.error('Failed to process article:', articleData);
                }
            } catch (error) {
                console.error('Error processing article:', error);
            }
  };

  const handleSendClick = async () => {

      const answerUrl = 'http://127.0.0.1:8100/generate_answer/';
      try {
          const response = await fetch(answerUrl, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ text: message })
          });
          const answerData = await response.json();
          console.log('Answer data:', answerData);

          if (response.ok) {
              setChatMessages(answerData.answer.map((message: string) => ({ sender: 'Bot', message })));
          } else {
              console.error('Failed to retrieve answer:', answerData);          }
      } catch (error) {
          console.error('Error retrieving answer:', error);
      }
  };

  const handleDocumentSelect = (documentName: string) => {
    setSelectedDocument(documentName);
    // Call your endpoint with the selected documentName
    callEndpoint(documentName);
  };

  const callEndpoint = async (documentName: string) => {
    const apiUrl = `http://127.0.0.1:8100/set_context/`; // Replace with your actual endpoint

    try {
      const response = await fetch(apiUrl, {
        method: 'POST', // Adjust as per your API requirements
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: documentName }) // Include data payload if needed
      });
      if (response.ok) {
        // Handle success if needed
        console.log(`Successfully processed document: ${documentName}`);
      } else {
        console.error(`Failed to process document ${documentName}:`, response.statusText);
      }
    } catch (error) {
      console.error(`Error processing document ${documentName}:`, error);
    }
  };

  return (
    <div className="grid md:grid-cols-[1fr_300px] gap-8 w-full max-w-6xl mx-auto p-4 md:p-8">
      <div className="flex flex-col gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Embed Document</CardTitle>
            <CardDescription>Paste a link to embed the document and get a RAG analysis.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
            <Input type="url" placeholder="Enter document URL" className="flex-1" value={documentUrl} onChange={(e) => setDocumentUrl(e.target.value)} />
            <Input type="text" placeholder="Enter document name" className="flex-1" value={documentName} onChange={(e) => setDocumentName(e.target.value)} />
            <Button onClick={handleEmbedClick}>Embed</Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Embedded Documents</CardTitle>
            <CardDescription>View and select one of the embedded documents.</CardDescription>
          </CardHeader>
          <CardContent className="overflow-auto max-h-[400px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Select</TableHead>
                  <TableHead>Document</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {documentNames.map((name, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <input
                        type="radio"
                        id={`document_${index}`}
                        name="selectedDocument"
                        value={name}
                        checked={selectedDocument === name}
                        onChange={() => handleDocumentSelect(name)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <FileIcon className="w-5 h-5" />
                        <span>{name}</span>
                      </div>
                    </TableCell>
                    {/* Placeholder for status */}
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                        <span>Green</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon">
                        <EyeIcon className="w-5 h-5" />
                        <span className="sr-only">View</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      <div className="flex flex-col gap-4">
      {chatMessages.map((chatMessage: any, index: number) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle>{chatMessage.sender}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>{chatMessage.message}</CardDescription>
          </CardContent>
        </Card>
      ))}
      </div>
      
      {/* Input for new message */}
      <div className="flex flex-col gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Send Message</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 resize-none"
              />
              <Button onClick={handleSendClick}>Send</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function EyeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}


function FileIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    </svg>
  )
}
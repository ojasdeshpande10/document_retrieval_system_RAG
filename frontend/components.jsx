/**
 * v0 by Vercel.
 * @see https://v0.dev/t/XJA6l17mm9i
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
 import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
 import { Input } from "@/components/ui/input"
 import { Button } from "@/components/ui/button"
 import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
 import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
 import { Textarea } from "@/components/ui/textarea"
 
 export default function Component() {
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
               <Input type="url" placeholder="Enter document URL" className="flex-1" />
               <Button>Embed</Button>
             </div>
           </CardContent>
         </Card>
         <Card>
           <CardHeader>
             <CardTitle>Embedded Documents</CardTitle>
             <CardDescription>View the documents you've already embedded.</CardDescription>
           </CardHeader>
           <CardContent className="overflow-auto max-h-[400px]">
             <Table>
               <TableHeader>
                 <TableRow>
                   <TableHead>Document</TableHead>
                   <TableHead>Status</TableHead>
                   <TableHead>Actions</TableHead>
                 </TableRow>
               </TableHeader>
               <TableBody>
                 <TableRow>
                   <TableCell>
                     <div className="flex items-center gap-2">
                       <FileIcon className="w-5 h-5" />
                       <span>Annual Report 2023</span>
                     </div>
                   </TableCell>
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
                 <TableRow>
                   <TableCell>
                     <div className="flex items-center gap-2">
                       <FileIcon className="w-5 h-5" />
                       <span>Marketing Plan Q3</span>
                     </div>
                   </TableCell>
                   <TableCell>
                     <div className="flex items-center gap-2">
                       <div className="w-3 h-3 rounded-full bg-yellow-500" />
                       <span>Amber</span>
                     </div>
                   </TableCell>
                   <TableCell>
                     <Button variant="ghost" size="icon">
                       <EyeIcon className="w-5 h-5" />
                       <span className="sr-only">View</span>
                     </Button>
                   </TableCell>
                 </TableRow>
                 <TableRow>
                   <TableCell>
                     <div className="flex items-center gap-2">
                       <FileIcon className="w-5 h-5" />
                       <span>Sales Forecast 2024</span>
                     </div>
                   </TableCell>
                   <TableCell>
                     <div className="flex items-center gap-2">
                       <div className="w-3 h-3 rounded-full bg-red-500" />
                       <span>Red</span>
                     </div>
                   </TableCell>
                   <TableCell>
                     <Button variant="ghost" size="icon">
                       <EyeIcon className="w-5 h-5" />
                       <span className="sr-only">View</span>
                     </Button>
                   </TableCell>
                 </TableRow>
               </TableBody>
             </Table>
           </CardContent>
         </Card>
       </div>
       <div className="flex flex-col gap-4">
         <Card>
           <CardHeader>
             <CardTitle>RAG Analysis</CardTitle>
             <CardDescription>View the RAG analysis for the selected document.</CardDescription>
           </CardHeader>
           <CardContent className="flex flex-col gap-4">
             <div className="flex items-center gap-2">
               <div className="w-3 h-3 rounded-full bg-green-500" />
               <span>Green</span>
             </div>
             <div className="flex items-center gap-2">
               <div className="w-3 h-3 rounded-full bg-yellow-500" />
               <span>Amber</span>
             </div>
             <div className="flex items-center gap-2">
               <div className="w-3 h-3 rounded-full bg-red-500" />
               <span>Red</span>
             </div>
             <div className="prose prose-stone">
               <p>
                 The document is in good shape overall, with a few areas that need attention. The sales forecast looks
                 promising, but the marketing plan could use some refinement. We'll need to closely monitor the areas
                 flagged as amber and red.
               </p>
             </div>
           </CardContent>
         </Card>
         <Card>
           <CardHeader>
             <CardTitle>Chat</CardTitle>
             <CardDescription>Discuss the document and its analysis with your team.</CardDescription>
           </CardHeader>
           <CardContent className="flex flex-col gap-4 overflow-auto max-h-[400px]">
             <div className="flex items-start gap-4">
               <Avatar className="border w-8 h-8">
                 <AvatarImage src="/placeholder-user.jpg" />
                 <AvatarFallback>YO</AvatarFallback>
               </Avatar>
               <div className="grid gap-1">
                 <div className="font-bold">You</div>
                 <div className="prose prose-stone">
                   <p>
                     The sales forecast looks good, but I'm a bit concerned about the marketing plan. We should discuss
                     how to improve that area.
                   </p>
                 </div>
               </div>
             </div>
             <div className="flex items-start gap-4">
               <Avatar className="border w-8 h-8">
                 <AvatarImage src="/placeholder-user.jpg" />
                 <AvatarFallback>OA</AvatarFallback>
               </Avatar>
               <div className="grid gap-1">
                 <div className="font-bold">Sarah</div>
                 <div className="prose prose-stone">
                   <p>
                     I agree, the marketing plan needs some work. Let's schedule a meeting to go over it in more detail
                     and come up with some ideas to improve it.
                   </p>
                 </div>
               </div>
             </div>
             <div className="flex items-start gap-4">
               <Avatar className="border w-8 h-8">
                 <AvatarImage src="/placeholder-user.jpg" />
                 <AvatarFallback>JD</AvatarFallback>
               </Avatar>
               <div className="grid gap-1">
                 <div className="font-bold">John</div>
                 <div className="prose prose-stone">
                   <p>
                     The sales forecast looks solid, but I'm a bit concerned about the red flag on the document. We
                     should dig into that and make sure we address any issues.
                   </p>
                 </div>
               </div>
             </div>
           </CardContent>
           <CardFooter>
             <Textarea placeholder="Type your message..." className="flex-1 resize-none" />
             <Button>Send</Button>
           </CardFooter>
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
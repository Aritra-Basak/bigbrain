"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import ChatPanel from "./chat-panel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { DeleteDocumentButton } from "./delete-document-button";
import Image from "next/image";

export default function DocumentPage({
  params,
}: {
  params: {
    documentId: Id<"documents">;
  };
}) {
  const document = useQuery(api.document.getDocument, {
    documentId: params.documentId,
  });
  const isLoading = !document;

  return (
    <main className="space-y-8 w-full">
      {isLoading && (
        <div className="space-y-8">
          <div>
            <Skeleton className="h-[40px] w-[500px]" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-[40px] w-[80px]" />
            <Skeleton className="h-[40px] w-[80px]" />
          </div>
          <Skeleton className="h-[500px]" />
        </div>
      )}

      {!isLoading && (
        <>
          <div className="flex justify-between items-center ">
            <div className="flex items-center space-x-4">
              <Image
                          src="/chatPanel.svg"
                          width="70"
                          height="70"
                          alt="chat window"
                  />
              <h1 className="text-4xl font-bold">{document.title}</h1>
            </div>
            <DeleteDocumentButton documentId={document._id} />
          </div>

          <div className="flex gap-12">
            <Tabs defaultValue="document" className="w-full">
              <TabsList className="mb-2">
                <TabsTrigger value="document">📃 Document</TabsTrigger>
                <TabsTrigger value="chat">💬 Chat</TabsTrigger>
              </TabsList>

              <TabsContent value="document">
                <div className="bg-gray-900 p-4 rounded-xl flex-1 h-[500px]">
                  {document.documentUrl && (
                    <iframe
                      className="w-full h-full"
                      src={document.documentUrl}
                    />
                  )}
                </div>
              </TabsContent>
              <TabsContent value="chat">
                <ChatPanel documentId={document._id} />
              </TabsContent>
            </Tabs>
          </div>
        </>
      )}
    </main>
  );
}
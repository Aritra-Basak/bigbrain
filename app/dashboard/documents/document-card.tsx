import React from 'react'
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
    CardDescription,
  } from "@/components/ui/card"
import { Doc } from '@/convex/_generated/dataModel'
import { Button } from '@/components/ui/button'
import { Eye, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function DocumentCard({ document }: { document: Doc<"documents"> }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div  className='flex items-center'>
            <Image
                src="/cardLogo.svg"
                width="40"
                height="40"
                alt="Card Icon"
                  />
            {document.title}
          </div>
        </CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          {!document.description ? (
            <div className="flex justify-center">
              <Loader2 className="animate-spin" />
            </div>
          ) : (
            document.description
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild variant="secondary" className="flex items-center gap-2">
          <Link href={`/dashboard/documents/${document._id}`}>
            <Eye className="w-4 h-4" /> View
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

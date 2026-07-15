import React, { useState } from "react";
import { Pencil, Phone, Mail, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader,
  AlertDialogTitle, AlertDialogTrigger
} from "@/components/ui/alert-dialog";

export default function ContactCard({ contact, propertyName, onEdit, onDelete }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="rounded-lg border p-3 bg-white">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 break-words">{contact.name}</p>
          <p className="text-xs text-gray-600">{contact.role}</p>
          {contact.company && <p className="text-xs text-gray-500 break-words">{contact.company}</p>}
          {contact.phone && (
            <a href={`tel:${contact.phone}`} className="text-xs text-blue-600 hover:underline break-all block mt-0.5">
              {contact.phone}
            </a>
          )}
          {contact.email && (
            <a href={`mailto:${contact.email}`} className="text-xs text-blue-600 hover:underline break-all block">
              {contact.email}
            </a>
          )}
          {propertyName && <p className="text-[10px] text-gray-400 mt-0.5">{propertyName}</p>}
        </div>
      </div>

      {contact.notes && (
        <button
          className="mt-2 text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1 min-h-[36px]"
          onClick={() => setShowDetails(!showDetails)}
          aria-expanded={showDetails}
        >
          {showDetails ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          {showDetails ? "Hide Details" : "View Details"}
        </button>
      )}

      {showDetails && contact.notes && (
        <p className="text-xs text-gray-600 mt-1 break-words border-t pt-2">{contact.notes}</p>
      )}

      <div className="flex items-center gap-1 mt-2">
        <Button variant="ghost" size="sm" className="h-8 min-h-[36px] text-xs px-2 text-gray-500" onClick={() => onEdit(contact)} aria-label="編輯聯絡人">
          <Pencil className="w-3.5 h-3.5" /><span className="ml-0.5 hidden sm:inline">編輯</span>
        </Button>
        {contact.phone && (
          <Button variant="ghost" size="sm" className="h-8 min-h-[36px] text-xs px-2 text-blue-600 hover:bg-blue-50" asChild>
            <a href={`tel:${contact.phone}`} aria-label={`Call ${contact.name}`}>
              <Phone className="w-3.5 h-3.5" /><span className="ml-0.5 hidden sm:inline">致電</span>
            </a>
          </Button>
        )}
        {contact.email && (
          <Button variant="ghost" size="sm" className="h-8 min-h-[36px] text-xs px-2 text-blue-600 hover:bg-blue-50" asChild>
            <a href={`mailto:${contact.email}`} aria-label={`Email ${contact.name}`}>
              <Mail className="w-3.5 h-3.5" /><span className="ml-0.5 hidden sm:inline">電郵</span>
            </a>
          </Button>
        )}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 min-h-[36px] text-xs px-2 text-red-600 hover:bg-red-50" aria-label="刪除聯絡人">
              <Trash2 className="w-3.5 h-3.5" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>刪除此聯絡人？</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently remove "{contact.name}" and unlink any tasks assigned to this contact.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>取消</AlertDialogCancel>
              <AlertDialogAction onClick={() => onDelete(contact.id)} className="bg-red-600 hover:bg-red-700">刪除</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
import React, { useState } from "react";
import { Star, GitCompare, Ban, Pencil, Trash2, ChevronDown, ChevronUp, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";

const statusColors = {
  "Saved": "bg-gray-100 text-gray-600",
  "Reviewing": "bg-blue-100 text-blue-700",
  "Inspection Booked": "bg-indigo-100 text-indigo-700",
  "Inspected": "bg-cyan-100 text-cyan-700",
  "Due Diligence": "bg-amber-100 text-amber-700",
  "Offer Considered": "bg-purple-100 text-purple-700",
  "Offer Submitted": "bg-violet-100 text-violet-700",
  "Negotiating": "bg-orange-100 text-orange-700",
  "Under Contract": "bg-blue-100 text-blue-700",
  "Rejected": "bg-red-100 text-red-700",
  "Purchased": "bg-emerald-100 text-emerald-700"
};

export default function PropertyCard({ property, isSelected, onEdit, onDelete, onTogglePriority, onToggleComparison, onToggleReject, matchResult }) {
  const [showDetails, setShowDetails] = useState(false);
  const isRejected = property.status === "Rejected";

  return (
    <div className={`rounded-lg border p-3 ${isRejected ? "opacity-60 bg-gray-50" : "bg-white"}`}>
      {/* Header row */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            {property.isPriority && (
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500 flex-shrink-0" />
            )}
            <p className="text-sm font-medium text-gray-900 truncate">{property.address || "Unnamed property"}</p>
          </div>
          {(property.suburb || property.state || property.postcode) && (
            <p className="text-xs text-gray-500 flex items-center gap-0.5 mt-0.5">
              <MapPin className="w-3 h-3 flex-shrink-0" />
              {[property.suburb, property.state, property.postcode].filter(Boolean).join(", ")}
            </p>
          )}
        </div>
        <Badge variant="outline" className={`text-[10px] flex-shrink-0 ${statusColors[property.status] || ""}`}>
          {property.status}
        </Badge>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs mb-2">
        {property.advertisedPrice && (
          <div className="flex justify-between">
            <span className="text-gray-400">Price</span>
            <span className="font-medium text-gray-700">{property.advertisedPrice}</span>
          </div>
        )}
        {property.propertyType && (
          <div className="flex justify-between">
            <span className="text-gray-400">Type</span>
            <span className="font-medium text-gray-700 capitalize">{property.propertyType}</span>
          </div>
        )}
        {property.bedrooms !== "" && property.bedrooms != null && (
          <div className="flex justify-between">
            <span className="text-gray-400">Beds</span>
            <span className="font-medium text-gray-700">{property.bedrooms}</span>
          </div>
        )}
        {property.bathrooms !== "" && property.bathrooms != null && (
          <div className="flex justify-between">
            <span className="text-gray-400">Baths</span>
            <span className="font-medium text-gray-700">{property.bathrooms}</span>
          </div>
        )}
        {property.carSpaces !== "" && property.carSpaces != null && (
          <div className="flex justify-between">
            <span className="text-gray-400">Cars</span>
            <span className="font-medium text-gray-700">{property.carSpaces}</span>
          </div>
        )}
        {property.buyerRating > 0 && (
          <div className="flex justify-between">
            <span className="text-gray-400">Rating</span>
            <span className="font-medium text-gray-700">{property.buyerRating}/5</span>
          </div>
        )}
      </div>

      {/* Match result */}
      {matchResult && (
        <div className="mb-2">
          <Badge variant="outline" className="text-[10px] bg-blue-50 text-blue-700">
            {matchResult.matched} of {matchResult.total} matched · {matchResult.label}
          </Badge>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-1 flex-wrap pt-2 border-t">
        <Button variant="ghost" size="sm" className="h-8 text-xs px-2" onClick={() => onTogglePriority(property.id)} aria-label="Toggle priority">
          <Star className={`w-3.5 h-3.5 ${property.isPriority ? "text-amber-500 fill-amber-500" : "text-gray-400"}`} />
          <span className="ml-1">{property.isPriority ? "Priority" : "Priority"}</span>
        </Button>
        <Button
          variant={isSelected ? "default" : "outline"}
          size="sm"
          className={`h-8 text-xs px-3 font-medium ${isSelected ? "bg-blue-600 text-white hover:bg-blue-700" : "border-blue-400 text-blue-600 hover:bg-blue-50"}`}
          onClick={() => onToggleComparison(property.id)}
          aria-label="Toggle comparison"
          aria-pressed={isSelected}
        >
          <GitCompare className="w-3.5 h-3.5" />
          <span className="ml-1">{isSelected ? "✓ Selected" : "+ Add to Compare"}</span>
        </Button>
        <Button variant="ghost" size="sm" className="h-8 text-xs px-2 text-gray-500" onClick={() => onEdit(property)} aria-label="Edit property">
          <Pencil className="w-3.5 h-3.5" />
          <span className="ml-1">Edit</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 text-xs px-2 text-gray-500"
          onClick={() => onToggleReject(property.id)}
          aria-label={isRejected ? "Un-reject" : "Reject"}
        >
          <Ban className="w-3.5 h-3.5" />
          <span className="ml-1">{isRejected ? "Active" : "Reject"}</span>
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 text-xs px-2 text-red-500 hover:text-red-600" aria-label="Delete property">
              <Trash2 className="w-3.5 h-3.5" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete this property?</AlertDialogTitle>
              <AlertDialogDescription>
                "{property.address || "Unnamed property"}" will be permanently removed. Any linked checklist tasks will be unlinked. This cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => onDelete(property.id)} className="bg-red-600 hover:bg-red-700">Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      {/* View details toggle */}
      {(property.keyAdvantages || property.keyConcerns || property.notes || property.landSize || property.inspectionDate || property.auctionDate || property.sellingAgentName || property.listingUrl) && (
        <>
          <button
            className="w-full text-xs text-gray-500 hover:text-gray-700 flex items-center justify-center gap-1 mt-1 pt-1"
            onClick={() => setShowDetails(!showDetails)}
          >
            {showDetails ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            {showDetails ? "Less" : "View Details"}
          </button>
          {showDetails && (
            <div className="mt-2 pt-2 border-t space-y-2 text-xs text-gray-600">
              {property.landSize && (
                <div><span className="font-medium text-gray-700">Land size:</span> {property.landSize}</div>
              )}
              {property.inspectionDate && (
                <div><span className="font-medium text-gray-700">Inspection:</span> {property.inspectionDate}</div>
              )}
              {property.auctionDate && (
                <div><span className="font-medium text-gray-700">Auction:</span> {property.auctionDate}</div>
              )}
              {property.sellingAgentName && (
                <div><span className="font-medium text-gray-700">Agent:</span> {property.sellingAgentName}{property.sellingAgentPhone ? ` · ${property.sellingAgentPhone}` : ""}</div>
              )}
              {property.listingUrl && (
                <div>
                  <span className="font-medium text-gray-700">Listing:</span>{" "}
                  <a href={property.listingUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline break-all">
                    View listing
                  </a>
                </div>
              )}
              {property.keyAdvantages && (
                <div><span className="font-medium text-gray-700">Advantages:</span> {property.keyAdvantages}</div>
              )}
              {property.keyConcerns && (
                <div><span className="font-medium text-gray-700">Concerns:</span> {property.keyConcerns}</div>
              )}
              {property.notes && (
                <div><span className="font-medium text-gray-700">Notes:</span> {property.notes}</div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
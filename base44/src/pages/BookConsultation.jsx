import React, { useEffect, useState } from "react";
import { Calendar, UploadCloud, FileText, X } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { toast } from "@/components/ui/use-toast";
import SectionWrapper from "@/components/origin/SectionWrapper";

export default function BookConsultation() {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrls, setUploadedUrls] = useState([]);

  useEffect(() => {
    base44.analytics.track({ eventName: "page_viewed", properties: { page: "book-consultation" } });
  }, []);

  const handleFileChange = async (e) => {
    const selected = Array.from(e.target.files || []);
    if (selected.length === 0) return;
    setUploading(true);
    try {
      for (const file of selected) {
        const { file_url } = await base44.integrations.Core.UploadFile({ file });
        setUploadedUrls((prev) => [...prev, file_url]);
      }
      setFiles((prev) => [...prev, ...selected]);
      toast({ title: "File(s) attached", description: `${selected.length} file(s) ready to share.` });
    } catch {
      toast({ title: "Upload failed", description: "Please try again or email your brief directly.", variant: "destructive" });
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const removeFile = (idx) => {
    setFiles((prev) => prev.filter((_, i) => i !== idx));
    setUploadedUrls((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleBook = () => {
    base44.analytics.track({ eventName: "consultation_booked", properties: { files_attached: uploadedUrls.length } });
    toast({ title: "Booking received", description: uploadedUrls.length > 0 ? "We've received your brief and will be in touch shortly." : "We'll be in touch shortly to confirm your consultation." });
  };

  return (
    <SectionWrapper className="!pt-32 md:!pt-40 !pb-20 md:!pb-28">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm text-center">
          <div className="w-14 h-14 mx-auto mb-6 rounded-full bg-golden/15 flex items-center justify-center">
            <Calendar size={26} className="text-golden" strokeWidth={1.5} />
          </div>
          <h2 className="font-heading text-2xl md:text-3xl font-light text-midnight mb-3">
            Choose a time that suits you
          </h2>
          <p className="text-sm text-midnight/50 mb-8 max-w-md mx-auto leading-relaxed">
            Book a consultation and we'll guide you to the most suitable next step based on your situation.
          </p>

          <div className="border border-dashed border-stone rounded-xl py-16 px-6 mb-8 bg-parchment/40">
            <p className="text-sm text-midnight/40">Calendar booking embed goes here</p>
          </div>

          {/* File upload */}
          <div className="mb-8 text-left">
            <p className="text-xs font-medium tracking-wide uppercase text-midnight/50 mb-2">Attach your brief (optional)</p>
            <p className="text-xs text-midnight/40 mb-3 leading-relaxed">
              Downloaded a report from one of our tools? Attach it here so we can review it before your call.
            </p>
            <label
              className="flex flex-col items-center justify-center gap-2 border border-dashed border-stone rounded-xl py-8 px-6 bg-parchment/40 cursor-pointer hover:border-golden/50 hover:bg-golden/5 transition-colors"
            >
              <UploadCloud size={24} className="text-midnight/40" strokeWidth={1.5} />
              <p className="text-sm text-midnight/50">
                {uploading ? "Uploading..." : "Click to upload your brief"}
              </p>
              <p className="text-xs text-midnight/30">PDF, DOC, DOCX, PNG or JPG</p>
              <input type="file" multiple accept=".pdf,.doc,.docx,.png,.jpg,.jpeg" onChange={handleFileChange} className="hidden" disabled={uploading} />
            </label>

            {files.length > 0 && (
              <ul className="mt-3 space-y-2">
                {files.map((file, idx) => (
                  <li key={idx} className="flex items-center justify-between gap-3 bg-white border border-stone rounded-lg px-4 py-2.5">
                    <span className="flex items-center gap-2 text-sm text-midnight min-w-0">
                      <FileText size={15} className="text-golden flex-shrink-0" />
                      <span className="truncate">{file.name}</span>
                    </span>
                    <button type="button" onClick={() => removeFile(idx)} className="text-midnight/30 hover:text-red-500 transition-colors flex-shrink-0">
                      <X size={16} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button
            type="button"
            onClick={handleBook}
            disabled={uploading}
            className="w-full sm:w-auto bg-golden text-midnight font-medium text-sm px-10 py-4 rounded-full hover:bg-golden/90 transition-colors disabled:opacity-50"
          >
            Book a Consultation
          </button>
        </div>
      </div>
    </SectionWrapper>
  );
}
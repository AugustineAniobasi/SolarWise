import React from "react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, X, FileText, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function DocumentUpload({ role }) {
  const form = useFormContext();
  const { setValue } = form;
  const [idFile, setIdFile] = useState(null);
  const [businessDocs, setBusinessDocs] = useState([]);
  const [idError, setIdError] = useState(null);
  const [businessDocsError, setBusinessDocsError] = useState(null);

  // Handle ID document upload
  const handleIdUpload = (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];

    // Validate file type and size
    const validTypes = ["image/jpeg", "image/png", "application/pdf"];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(file.type)) {
      setIdError("Invalid file type. Please upload a JPEG, PNG, or PDF file.");
      return;
    }

    if (file.size > maxSize) {
      setIdError("File is too large. Maximum size is 5MB.");
      return;
    }

    setIdFile(file);
    setValue("identification", file);
    setIdError(null);
  };

  // Handle business document upload
  const handleBusinessDocsUpload = (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];

    // Validate file type and size
    const validTypes = ["image/jpeg", "image/png", "application/pdf"];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!validTypes.includes(file.type)) {
      setBusinessDocsError(
        "Invalid file type. Please upload a JPEG, PNG, or PDF file."
      );
      return;
    }

    if (file.size > maxSize) {
      setBusinessDocsError("File is too large. Maximum size is 10MB.");
      return;
    }

    const updatedDocs = [...businessDocs, file];
    setBusinessDocs(updatedDocs);
    setValue("businessDocuments", updatedDocs);
    setBusinessDocsError(null);
  };

  // Remove a business document
  const removeBusinessDoc = (index) => {
    const updatedDocs = businessDocs.filter((_, i) => i !== index);
    setBusinessDocs(updatedDocs);
    setValue("businessDocuments", updatedDocs);
  };

  // Remove ID document
  const removeIdFile = () => {
    setIdFile(null);
    setValue("identification", null);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Document Upload</h2>
        <p className="text-muted-foreground mt-2">
          Upload required identification documents
        </p>
      </div>

      <div className="space-y-6">
        {/* Personal ID Upload */}
        <div className="space-y-2">
          <Label htmlFor="id-upload">Personal Identification</Label>
          <p className="text-muted-foreground text-sm">
            Upload a valid government-issued ID (passport, driver's license,
            national ID)
          </p>

          {!idFile ? (
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-6">
              <Upload className="text-muted-foreground mb-2 h-10 w-10" />
              <p className="text-muted-foreground mb-2 text-sm">
                Drag and drop or click to upload
              </p>
              <p className="text-muted-foreground mb-4 text-xs">
                Supported formats: JPEG, PNG, PDF (max 5MB)
              </p>
              <Input
                id="id-upload"
                type="file"
                className="hidden"
                onChange={handleIdUpload}
                accept=".jpg,.jpeg,.png,.pdf"
              />
              <Label htmlFor="id-upload" asChild>
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => document.getElementById("id-upload")?.click()}
                >
                  Select File
                </Button>
              </Label>
            </div>
          ) : (
            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-sm font-medium">{idFile.name}</p>
                    <p className="text-muted-foreground text-xs">
                      {(idFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={removeIdFile}
                  className="text-red-500 hover:bg-red-50 hover:text-red-700"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="mt-2 flex items-center gap-1 text-sm text-green-600">
                <Check className="h-4 w-4" />
                <span>File uploaded successfully</span>
              </div>
            </div>
          )}

          {idError && (
            <Alert variant="destructive" className="mt-2">
              <AlertDescription>{idError}</AlertDescription>
            </Alert>
          )}
        </div>

        {/* Business Documents Upload (Vendors only) */}
        {role === "vendor" && (
          <div className="space-y-2">
            <Label htmlFor="business-docs-upload">
              Business Verification Documents
            </Label>
            <p className="text-muted-foreground text-sm">
              Upload business license, certificate of registration, or other
              verification documents
            </p>

            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-6">
              <Upload className="text-muted-foreground mb-2 h-10 w-10" />
              <p className="text-muted-foreground mb-2 text-sm">
                Drag and drop or click to upload
              </p>
              <p className="text-muted-foreground mb-4 text-xs">
                Supported formats: JPEG, PNG, PDF (max 10MB)
              </p>
              <Input
                id="business-docs-upload"
                type="file"
                className="hidden"
                onChange={handleBusinessDocsUpload}
                accept=".jpg,.jpeg,.png,.pdf"
              />
              <Label htmlFor="business-docs-upload" asChild>
                <Button
                  variant="outline"
                  type="button"
                  onClick={() =>
                    document.getElementById("business-docs-upload")?.click()
                  }
                >
                  Select File
                </Button>
              </Label>
            </div>

            {businessDocsError && (
              <Alert variant="destructive" className="mt-2">
                <AlertDescription>{businessDocsError}</AlertDescription>
              </Alert>
            )}

            {businessDocs.length > 0 && (
              <div className="mt-4 space-y-2">
                <Label>Uploaded Documents</Label>
                <div className="space-y-2">
                  {businessDocs.map((doc, index) => (
                    <div key={index} className="rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <FileText className="h-5 w-5 text-blue-500" />
                          <div>
                            <p className="text-sm font-medium">{doc.name}</p>
                            <p className="text-muted-foreground text-xs">
                              {(doc.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeBusinessDoc(index)}
                          className="text-red-500 hover:bg-red-50 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

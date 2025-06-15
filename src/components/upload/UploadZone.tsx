
import { Button } from "@/components/ui/button";
import { Upload, FileText } from "lucide-react";
import { useRef } from "react";
import { useToast } from "@/hooks/use-toast";

interface UploadZoneProps {
  isDragging: boolean;
  file: File | null;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  onFileSelect: (file: File) => void;
  onClearFile: () => void;
  onSubmit: () => void;
}

const UploadZone = ({
  isDragging,
  file,
  onDragOver,
  onDragLeave,
  onDrop,
  onFileSelect,
  onClearFile,
  onSubmit
}: UploadZoneProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      onFileSelect(selectedFile);
    }
  };

  return (
    <>
      <div
        className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
          isDragging
            ? 'border-blue-500 bg-blue-50'
            : file
            ? 'border-green-500 bg-green-50'
            : 'border-gray-300 bg-gray-50 hover:border-blue-400'
        }`}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        {file ? (
          <div className="space-y-4">
            <FileText className="h-16 w-16 text-green-500 mx-auto" />
            <div>
              <p className="text-lg font-medium text-gray-800">{file.name}</p>
              <p className="text-sm text-gray-600">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <Button 
              variant="outline" 
              onClick={onClearFile}
            >
              Choose Different File
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <Upload className="h-16 w-16 text-gray-400 mx-auto" />
            <div>
              <p className="text-lg font-medium text-gray-700">
                Drag and drop your manuscript here
              </p>
              <p className="text-sm text-gray-500">
                or click to browse files
              </p>
            </div>
            <Button 
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
            >
              Browse Files
            </Button>
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept=".pdf,.doc,.docx,.txt,.tex"
        onChange={handleFileInputChange}
      />

      {file && (
        <div className="flex justify-center">
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-medium rounded-xl"
            onClick={onSubmit}
          >
            Start AI Review Process
          </Button>
        </div>
      )}
    </>
  );
};

export default UploadZone;

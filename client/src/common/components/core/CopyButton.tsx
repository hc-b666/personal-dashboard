import { useState } from "react";
import { Button } from "../ui/button";
import { Check, Copy } from "lucide-react";
import { toast } from "@/common/hooks/use-toast";

interface Props {
  text: string;
  className?: string;
}

export default function CopyButton({ text, className }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true);
        toast({ description: "Copied" });
        setTimeout(() => {
          setCopied(false);
        }, 3000);
      })
      .catch((err) => console.error("Copy failed", err));
  };

  return (
    <Button onClick={handleCopy} size="icon" className={`w-6 h-6 ${className}`}>
      {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
    </Button>
  );
}

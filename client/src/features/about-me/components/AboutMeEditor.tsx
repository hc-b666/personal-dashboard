import { useCallback, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { Button } from "@/common/components/ui/button";
import { AboutContent } from "../types";
import { useUpdateAboutContentMutation } from "../services/aboutApi";
import { toast } from "@/common/hooks/use-toast";
import ReactMarkdownComponent from "@/common/components/core/react-markdown";
import { useTheme } from "@/common/providers/theme-provider";

interface Props {
  about: AboutContent;
}

export default function AboutMeEditor({ about }: Props) {
  const [tab, setTab] = useState<"preview" | "code">("code");
  const [code, setCode] = useState(about.content);
  const [updateAboutContent] = useUpdateAboutContentMutation();

  const handleChange = useCallback((value: string) => {
    setCode(value);
  }, []);

  const handleSave = async () => {
    try {
      const res = await updateAboutContent({ content: code }).unwrap();
      toast({ description: res.message });
    } catch (err) {
      console.log(err);
      toast({ variant: "destructive", description: (err as any).data.message });
    }
  };

  return (
    <div className="flex-grow flex flex-col gap-5">
      <div className="flex items-center">
        <Button
          size="sm"
          variant={tab === "preview" ? "secondary" : "ghost"}
          onClick={() => setTab("preview")}
        >
          Preview
        </Button>
        <Button
          size="sm"
          variant={tab === "code" ? "secondary" : "ghost"}
          onClick={() => setTab("code")}
        >
          Code
        </Button>
      </div>

      <div className="flex-grow">
        {tab === "preview" ? (
          <Preview code={code} />
        ) : (
          <Code code={code} handleChange={handleChange} />
        )}
      </div>

      <Button className="self-end" onClick={handleSave}>
        Save
      </Button>
    </div>
  );
}

function Preview({ code }: { code: string }) {
  return (
    <div className="h-full">
      <ReactMarkdownComponent text={code} />
    </div>
  );
}

function Code({
  code,
  handleChange,
}: {
  code: string;
  handleChange: (value: string) => void;
}) {
  const { theme } = useTheme();

  return (
    <div className="h-full">
      <CodeMirror
        value={code}
        height="100%"
        className="h-full"
        theme={theme === "light" ? "light" : "dark"}
        onChange={handleChange}
      />
    </div>
  );
}

import { useState } from "react";

interface JsonBoxProps<T> {
  data: T;
}

function JsonBox<T>({ data }: JsonBoxProps<T>) {
  const [copied, setCopied] = useState(false);

  const formatJsonString = (): string => {
    try {
      // 尝试序列化
      return JSON.stringify(data, null, 2);
    } catch (error) {
      // 处理不可序列化的数据
      const errorMsg = `无法序列化数据: ${error}`;
      return errorMsg;
    }
  };

  const handleCopy = async () => {
    try {
      const jsonString = formatJsonString();
      await navigator.clipboard.writeText(jsonString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("无法复制数据:", error);
    }
  };

  return (
    <div className="relative bg-slate-800 rounded min-h-12">
      <div
        onClick={handleCopy}
        className="absolute right-4 top-2 z-10 bg-[#1118274d] border text-sm text-zinc-400 p-1 rounded select-none cursor-pointer hover:text-white transition-all"
      >
        {copied ? "已复制" : "复制"}
      </div>
      <div className="p-2 overflow-x-auto max-h-96 custom-scrollbar">
        <pre className="text-sm pr-10">{formatJsonString()}</pre>
      </div>
    </div>
  );
}

export default JsonBox;

import { useState, useEffect } from "react";
import { NotepadText, Save, Copy } from "lucide-react";
import { getMemo, updateMemo } from "../../apis/api";
//import { useLocation } from "react-router-dom";

const ReferenceMemo = ({ content, paperId }) => {
  const [memoContent, setMemoContent] = useState("");
  //const location = useLocation();

  useEffect(() => {
    const getMemoAPI = async () => {
      const memo = await getMemo(paperId);
      setMemoContent(memo.content);
      console.log(memo);
    };
    getMemoAPI();
  }, [paperId]);

  const handleContentChange = async (e) => {
    e.preventDefault();
    setMemoContent(e.target.value);
    const response = await updateMemo(paperId, { content: memoContent });
  };

  const handleCopy = (e) => {
    e.preventDefault();
    const $textarea = document.createElement("textarea");
    document.body.appendChild($textarea);
    $textarea.value = memoContent + "\n" + content;
    $textarea.select();
    document.execCommand("copy");
    document.body.removeChild($textarea);
    alert("Memo copied to clipboard!");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await updateMemo(paperId, { content: memoContent });
    window.location.reload();
    //setMemoContent(response);
  };

  return (
    <form className="form bsg-white">
      <div className="self-stretch justify-start items-center inline-flex ">
        <div className="grow shrink basis-0 h-100% justify-start items-center gap-[7px] flex">
          <NotepadText className="w-6 h-6 relative" />
          <div className="text-neutral-700 text-lg font-semibold font-['Pretendard'] leading-[27px]">
            Memo
          </div>
        </div>
      </div>
      <div className=" mt-4 mb-8 self-stretch h-100% px-[15px] py-2.5 rounded-lg border border-neutral-400 flex-col justify-start items-center gap-[13px] flex">
        <div className="self-stretch text-neutral-900 text-base font-medium font-['Pretendard'] leading-normal">
          <label htmlFor="content" className="label"></label>
          <textarea
            placeholder="Add your text here"
            defaultValue={memoContent}
            onChange={handleContentChange}
            rows="10"
            cols="40"
          ></textarea>
        </div>
      </div>
      <div className="self-stretch justify-end items-center gap-[15px] inline-flex w-full">
        <div className="grow shrink basis-0 h-10 justify-end items-center gap-[18px] flex">
          <button
            onClick={onSubmit}
            className="px-4 py-2 rounded-md border border-neutral-700 justify-center items-center gap-2.5 flex"
          >
            <Save className="w-[18px] h-[18px] relative text-neutral-700" />
            <div className="text-right text-neutral-700 text-lg font-medium font-['Pretendard'] leading-normal">
              Save
            </div>
          </button>
          <button
            onClick={handleCopy}
            className="px-4 py-2 bg-neutral-900 rounded-md justify-center items-center gap-2.5 flex"
          >
            <Copy className="w-[18px] h-[18px] relative text-white" />
            <div className="text-right text-white text-lg font-medium font-['Pretendard'] leading-normal">
              Copy
            </div>
          </button>
        </div>
      </div>
    </form>
  );
};

export default ReferenceMemo;

import { useState, useEffect } from "react";
import { NotepadText, Save, Copy } from "lucide-react";
import { getMemo, updateMemo } from "../../apis/api";
import SuccessModal from "../Modals/SuccessModal";

const ReferenceMemo = ({ content, paperId }) => {
  const [memoContent, setMemoContent] = useState("");
  const [copySuccessModalIsOpen, setCopySuccessModalIsOpen] = useState(false);
  const [saveSuccessModalIsOpen, setSaveSuccessModalIsOpen] = useState(false);

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
    setCopySuccessModalIsOpen(true);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await updateMemo(paperId, { content: memoContent });
    window.location.reload();
    setSaveSuccessModalIsOpen(true);
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
      <div className="self-stretch text-neutral-900 text-base font-medium font-['Pretendard'] leading-normal py-2">
        <label htmlFor="content" className="label"></label>
        <textarea
          placeholder="Add your text here"
          defaultValue={memoContent}
          onChange={handleContentChange}
          className="border-2 border-neutral-300 rounded-md w-full h-full px-1 py-1 focus:outline-none focus:border-neutral-500 resize-none"
          rows="10"
          cols="40"
        />
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
        {copySuccessModalIsOpen && (
          <SuccessModal
            text={"클립보드에 복사되었습니다."}
            setModalOpen={setCopySuccessModalIsOpen}
          />
        )}
        {saveSuccessModalIsOpen && (
          <SuccessModal
            text={"저장되었습니다."}
            setModalOpen={setSaveSuccessModalIsOpen}
          />
        )}
      </div>
    </form>
  );
};

export default ReferenceMemo;

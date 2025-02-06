import { useState, useEffect, useRef } from "react";
import { NotepadText, Copy } from "lucide-react";
import { getMemo, updateMemo } from "../../apis/api";
import SuccessModal from "../Modals/SuccessModal";
import { trackEvent } from '../../utils/analytics';

const ReferenceMemo = ({ content, paperId, onClose = () => {} }) => {
  const [memoContent, setMemoContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [copySuccessModalIsOpen, setCopySuccessModalIsOpen] = useState(false);
  const memoRef = useRef(null);
  const currentPaperIdRef = useRef(paperId);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (memoRef.current && !memoRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  useEffect(() => {
    if (currentPaperIdRef.current !== paperId) {
      setMemoContent("");
      currentPaperIdRef.current = paperId;
    }

    const getMemoAPI = async () => {
      try {
        const memo = await getMemo(paperId);
        if (memo && memo.content) {
          setMemoContent(memo.content);
        } else {
          setMemoContent("");
        }
      } catch (error) {
        setMemoContent("");
      }
    };

    if (paperId) {
      getMemoAPI();
    } else {
      setMemoContent("");
    }
  }, [paperId]);

  const handleContentChange = async (e) => {
    setIsSaving(true);
    e.preventDefault();
    const newContent = e.target.value;
    setMemoContent(newContent);

    try {
      await updateMemo(paperId, { content: newContent });
    } catch (error) {
      console.error('Error updating memo:', error);
    }

    setTimeout(() => {
      setIsSaving(false);
    }, 1000);
  };

  const handleCopy = (e) => {
    e.preventDefault();
    const $textarea = document.createElement("textarea");
    document.body.appendChild($textarea);
    $textarea.value = memoContent + "\n" + content;
    $textarea.select();
    document.execCommand("copy");
    document.body.removeChild($textarea);
    trackEvent('copy_memo', { has_content: Boolean(memoContent) });
    setCopySuccessModalIsOpen(true);
  };

  return (
    <form ref={memoRef} className="form bsg-white h-full py-2 sm:py-4">
      <div className="self-stretch flex justify-between items-center">
        <div className="grow shrink basis-0 h-100% flex items-center gap-[5px] sm:gap-[7px]">
          <NotepadText className="w-5 h-5 sm:w-6 sm:h-6 relative" />
          <div className="text-neutral-700 text-base sm:text-lg font-semibold font-['Pretendard'] leading-[27px]">
            메모
          </div>
        </div>
        <div className="font-[Pretendard] font-medium text-[12px] sm:text-[14px] text-neutral-500">
          {isSaving ? "저장 중..." : "저장 됨"}
        </div>
      </div>
      <div className="self-stretch text-neutral-900 text-sm sm:text-base font-medium font-['Pretendard'] leading-normal py-2 flex-grow">
        <textarea
          key={paperId}
          placeholder="여기에 필요한 메모를 작성하세요. 복사 시 참고문헌이 함께 복사됩니다."
          value={memoContent}
          onChange={handleContentChange}
          className="font-[Pretendard] font-md border-2 border-neutral-300 rounded-md w-full h-[150px] sm:h-[200px] px-2 py-2 focus:outline-none focus:border-neutral-500 resize-none placeholder:text-neutral-400 placeholder:font-normal text-sm sm:text-base"
          rows="10"
          cols="40"
        />
      </div>
      <div className="self-stretch justify-end items-center gap-[10px] sm:gap-[15px] inline-flex w-full">
        <div className="grow shrink basis-0 h-9 sm:h-10 justify-end items-center gap-[18px] flex">
          <button
            onClick={handleCopy}
            className="px-2.5 sm:px-2.5 py-1.5 sm:py-1.5 bg-neutral-900 rounded-md justify-center items-center gap-2 sm:gap-2 flex"
          >
            <Copy className="w-4 sm:w-4 h-4 sm:h-4 relative text-white" />
            <div className="text-right text-white text-base sm:text-base font-medium font-['Pretendard'] leading-normal">
              복사
            </div>
          </button>
        </div>
        {copySuccessModalIsOpen && (
          <SuccessModal
            text={"클립보드에 복사되었습니다."}
            setModalOpen={setCopySuccessModalIsOpen}
          />
        )}
      </div>
    </form>
  );
};

export default ReferenceMemo;

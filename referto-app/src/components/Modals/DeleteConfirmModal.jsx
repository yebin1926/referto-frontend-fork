import { useEffect } from "react";

const DeleteConfirmModal = ( { deleteParams, handleDelete, handleDeleteCancel}) => {
    useEffect(() => {
        // 모달이 열릴 때 스크롤을 비활성화
        document.body.classList.add('overflow-hidden');

        // 모달이 닫힐 때 스크롤을 다시 활성화
        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    }, []);

    const handleConfirmDelete = () => {
        handleDelete(deleteParams);
      };

    return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 overflow-hidden">
        <div className="w-[300px] h-[153px] px-[22px] py-6 bg-white rounded-2xl shadow flex-col justify-start items-start gap-7 inline-flex">
            <div className="self-stretch h-12 flex-col justify-center items-start gap-2 flex">
                <div className="self-stretch text-neutral-900 text-lg font-semibold font-['Pretendard'] leading-[25.20px]">정말 삭제하시겠습니까?</div>
                <div className="self-stretch text-neutral-500 text-[11px] font-medium font-['Pretendard'] leading-none">삭제하면 복구할 수 없습니다.</div>
            </div>
            <div className="self-stretch justify-start items-start gap-2.5 inline-flex">
                <div className="grow shrink basis-0 h-[29px] px-2 py-1.5 rounded border border-black/10 justify-center items-center gap-1 flex cursor-pointer" onClick={handleDeleteCancel}>
                    <div className="text-neutral-700 text-xs font-semibold font-['Pretendard'] leading-none">취소</div>
                </div>
                <div className="grow shrink basis-0 h-[29px] px-2 py-1.5 bg-[#ff5f69] rounded border border-black/10 justify-center items-center gap-1 flex cursor-pointer" onClick={handleConfirmDelete}>
                    <div className="text-white text-xs font-semibold font-['Pretendard'] leading-none">삭제</div>
                </div>
            </div>
        </div>
    </div>
    )
};

export default DeleteConfirmModal;

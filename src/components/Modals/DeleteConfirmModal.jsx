import { useEffect } from "react";
import ReactDOM from 'react-dom';
import { trackEvent } from '../../utils/analytics';

const DeleteConfirmModal = ({ deleteParams, handleDelete, handleDeleteCancel }) => {
    const handleConfirmDelete = () => {
        trackEvent('confirm_delete', { params: deleteParams });
        handleDelete(deleteParams);
    };

    const handleCancel = () => {
        trackEvent('cancel_delete');
        handleDeleteCancel();
    };

    // Portal을 사용하여 모달을 body에 직접 렌더링
    return ReactDOM.createPortal(
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 overflow-hidden">
            <div className="w-[300px] sm:w-[350px] h-auto px-4 sm:px-[22px] py-4 sm:py-6 bg-white rounded-2xl shadow flex-col justify-start items-start gap-5 sm:gap-7 inline-flex">
                <div className="self-stretch flex-col justify-center items-start gap-2 flex">
                    <div className="self-stretch text-neutral-900 text-xl sm:text-2xl font-semibold font-['Pretendard'] leading-normal sm:leading-[33.60px]">정말 삭제하시겠습니까?</div>
                    <div className="self-stretch text-neutral-500 text-xs sm:text-sm font-medium font-['Pretendard'] leading-tight">삭제하면 복구할 수 없습니다.</div>
                </div>
                <div className="self-stretch justify-start items-start gap-2 inline-flex">
                    <div className="grow shrink basis-0 h-9 p-2 rounded border border-black/10 justify-center items-center gap-1 flex cursor-pointer" onClick={handleCancel}>
                        <div className="text-neutral-700 text-sm font-semibold font-['Pretendard'] leading-tight">취소</div>
                    </div>
                    <div className="grow shrink basis-0 h-9 p-2 bg-red-500 rounded border border-black/10 justify-center items-center gap-1 flex cursor-pointer" onClick={handleConfirmDelete}>
                        <div className="text-white text-sm font-semibold font-['Pretendard'] leading-tight">삭제</div>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default DeleteConfirmModal;

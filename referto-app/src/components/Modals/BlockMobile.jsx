import { MonitorCheck } from 'lucide-react';

const BlockMobileModal = () => {
    return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 overflow-hidden">
        <div className="w-[452px] h-[168px] px-[22px] py-6 bg-white rounded-2xl shadow flex-col justify-start items-start gap-7 inline-flex">
            <div className="self-stretch h-[120px] flex-col justify-start items-center gap-5 flex">
                <MonitorCheck className="w-[50px] h-[50px] relative" />
                <div className="self-stretch h-[50px] flex-col justify-center items-start gap-2 flex">
                    <div className="self-stretch text-center text-neutral-900 text-lg font-semibold font-['Pretendard'] leading-[25.20px]">이 사이트는 모바일 버전을 제공하지 않고 있습니다.<br/>PC에서 접속해주세요.</div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default BlockMobileModal;
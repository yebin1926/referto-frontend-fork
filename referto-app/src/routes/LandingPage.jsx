import React, { useState } from 'react';
import LogInModal from '../components/Modals/LogIn';

const LandingPage = ( props ) => {
    const { isUserLoggedIn, setIsUserLoggedIn } = props;
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    
    return (
        <div className="w-full h-full flex flex-col items-center">
            {/* Hero Section */}
            <div className="w-full h-full py-[150px] bg-gradient-to-b from-neutral-50 via-[#7e7e7e] to-neutral-900 flex flex-col items-center">
                <div className="w-full h-full flex flex-col items-center gap-[50px]">
                    <div className="w-full h-auto flex flex-col items-center gap-[30px]">
                        <div className="text-center text-neutral-900 text-[70px] font-bold leading-[88px] tracking-tight">
                            참고문헌 왜 혼자 써?
                        </div>
                        <div className="text-center text-neutral-600 text-2xl font-medium leading-[30px] tracking-tight">
                            REFERTO와 함께 쉽고 빠르게 참고문헌을 생성하고 관리해보세요.
                        </div>
                    </div>
                    <div 
                        className="px-6 py-3 bg-neutral-900 rounded-md text-center text-white text-xl font-medium leading-normal cursor-pointer" 
                        onClick={handleOpenModal}
                    >
                        시작하기
                    </div>
                    <div className="py-8 flex flex-col items-center gap-2.5">
                        <img className="w-[643px] h-[487px]" src="https://via.placeholder.com/643x487" alt="Main visual" />
                    </div>
                </div>
            </div>
            
            {/* Key Features Section */}
            <div className="w-full h-full py-[50px] bg-neutral-900 flex flex-col items-center gap-20">
                <div className="flex flex-col items-center gap-[27px]">
                    <div className="text-white text-[52px] font-semibold leading-[62px] tracking-tight">주요 기능</div>
                </div>
                <div className="flex justify-between w-full max-w-[1300px]">
                    <img className="w-[940px] h-[705px]" src="https://via.placeholder.com/940x705" alt="Features" />
                    <div className="p-5 flex flex-col gap-[25px]">
                        <div className="flex flex-col gap-[25px]">
                            {[1, 2, 3].map(num => (
                                <div key={num} className="flex items-start gap-[13px]">
                                    <div className="w-[50px] h-[50px] flex items-center">
                                        <img className="w-[50px] h-[50px] rounded-full" src={`https://via.placeholder.com/50x50?text=Feature+${num}`} alt={`Feature ${num}`} />
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="text-white text-xl font-medium leading-[30px] tracking-tight">
                                            {num === 1 ? '과제 관리' : num === 2 ? 'Intuitive interface' : 'Or with rules'}
                                        </div>
                                        <div className="text-white text-base font-normal leading-normal tracking-tight">
                                            When you add work to your <br />Slate calendar we automatically <br />calculate useful insights <br />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Team Section */}
            <div className="w-full h-full px-5 py-[150px] bg-neutral-200 flex flex-col items-center gap-20">
                <div className="text-neutral-900 text-[52px] font-semibold leading-[62px] tracking-tight">팀 소개</div>
                <div className="flex justify-between gap-[23px] w-full max-w-[1300px]">
                    {[1, 2, 3, 4].map(num => (
                        <div key={num} className="flex flex-col gap-5">
                            <div className="h-[305px] p-10 bg-[#181818] rounded-[10px] border border-[#dedede] flex flex-col gap-[30px]">
                                <div className="flex items-center gap-[13px]">
                                    <div className="w-[50px] h-[50px] flex items-center">
                                        <img className="w-[50px] h-[50px] rounded-full" src={`https://via.placeholder.com/50x50?text=Member+${num}`} alt={`Team member ${num}`} />
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="text-white text-base font-medium leading-normal">Name {num}</div>
                                        <div className="text-white text-base font-medium leading-normal">Designer</div>
                                    </div>
                                </div>
                                <div className="text-white text-base font-normal leading-normal">
                                    Slate helps you see how many more days <br />you need to work to reach your financial <br />goal for the month and year.
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Render LogInModal conditionally */}
            {isModalOpen && <LogInModal 
                onClose={handleCloseModal}
                isUserLoggedIn={isUserLoggedIn}
                setIsUserLoggedIn={setIsUserLoggedIn} />}
        </div>
    );
}

export default LandingPage;

import { useState } from 'react';
import LogInModal from '../components/Modals/LogIn';
import landingimage from '../assets/images/landingimage.png';
import capture from '../assets/images/capture.png';
import { CircleCheckBig } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LandingPage = (props) => {
    const { isUserLoggedIn, setIsUserLoggedIn } = props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate()

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
                        onClick={() => navigate('/account/login')}
                    >
                        시작하기
                    </div>
                    <div className="py-8 flex flex-col items-center gap-2.5">
                        <img className="w-full h-auto" src={landingimage} alt="research paper" />
                    </div>
                </div>
            </div>

            {/* Key Features Section */}
            <div className="w-full h-full py-[150px] bg-neutral-900 flex flex-col items-center gap-20">
                <div className="flex flex-col items-center gap-[27px]">
                    <div className="text-white text-[52px] font-semibold leading-[62px] tracking-tight">주요 기능</div>
                </div>
                <div className="h-full flex justify-center items-center gap-[100px]">
                    <img className="w-[894px] h-auto" src={capture} alt="key features" />
                    <div className="p-5 flex flex-col justify-start items-start gap-[50px]">
                        {[
                            { title: '과제 관리', description: 'When you add work to your Slate calendar we automatically calculate useful insights' },
                            { title: '직관적인 인터페이스', description: 'Easy to use and manage your tasks with a simple and intuitive interface' },
                            { title: '규칙 기반 관리', description: 'Manage your tasks with customizable rules and automation' }
                        ].map((feature, index) => (
                            <div key={index} className="flex flex-col gap-2.5">
                                <div className='flex flex-row gap-[12px] items-center'>
                                    <CircleCheckBig className='text-white' />
                                    <div className="text-white text-xl font-medium leading-[30px] tracking-tight">{feature.title}</div>
                                </div>
                                <div className="text-white text-base font-normal leading-normal tracking-tight">
                                    {feature.description.split('\n').map((line, index) => (
                                        <span key={index}>{line}<br /></span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Team Section */}
            <div className="w-full h-full px-5 py-[150px] bg-neutral-200 flex flex-col items-center gap-20">
                <div className="text-neutral-900 text-[52px] font-semibold leading-[62px] tracking-tight">팀 소개</div>
                <div className="h-100% justify-center items-start gap-[23px] inline-flex">
                    {[1, 2, 3, 4].map(num => (
                        <div key={num} className="h-100% flex-col justify-start items-center gap-5 inline-flex">
                            <div className="self-stretch grow shrink basis-0 p-10 bg-[#181818] rounded-[10px] border border-[#dedede] flex-col justify-start items-start gap-[30px] flex">
                                <div className="justify-start items-center gap-[13px] inline-flex">
                                    <div className="w-[50px] h-[50px] justify-center items-center flex">
                                        <img className="w-[50px] h-[50px] rounded-full" src={`https://via.placeholder.com/50x50?text=Member+${num}`} alt={`Team member ${num}`} />
                                    </div>
                                    <div className="flex-col justify-start items-start inline-flex">
                                        <div className="px-2.5 justify-start items-center inline-flex">
                                            <div className="text-white text-base font-medium font-['Pretendard'] leading-normal tracking-tight">Name {num}</div>
                                        </div>
                                        <div className="px-2.5 justify-start items-center gap-2.5 inline-flex">
                                            <div className="text-white text-base font-medium font-['Pretendard'] leading-normal tracking-tight">Designer</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="justify-start items-center inline-flex">
                                    <div className="text-white text-base font-normal font-['Pretendard'] leading-normal tracking-tight">
                                        Slate helps you see how many more days <br />
                                        you need to work to reach your financial <br />
                                        goal for the month and year.
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Render LogInModal conditionally */}
            {isModalOpen && (
                <LogInModal 
                    isUserLoggedIn={isUserLoggedIn}
                    setIsUserLoggedIn={setIsUserLoggedIn} 
                />
            )}
        </div>
    );
}

export default LandingPage;

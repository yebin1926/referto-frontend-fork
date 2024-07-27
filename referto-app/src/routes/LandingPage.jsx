import { useState } from 'react';
import LogInModal from '../components/Modals/LogIn';
import landingimage from '../assets/images/landingimage.png';
import hyeri from '../assets/images/hyeri.jpg';
import yebin from '../assets/images/yebin.jpg';
import eunjae from '../assets/images/eunjae.jpg';
import gyeongseo from '../assets/images/gyeongseo.jpg';
import capture from '../assets/images/capture.png';
import { CircleCheckBig } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LandingPage = (props) => {
    const { isUserLoggedIn, setIsUserLoggedIn } = props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const teamMembers = [
        { 
            name: "박혜리", 
            role: "대장", 
            description: "얘들아 밥 빨리 먹고 일하자 ^^", 
            image: hyeri
        },
        { 
            name: "이은재", 
            role: "프론트!", 
            description: "제 2024 여름은 레퍼투입니다. ('2024 여름' === 'REFERTO')",
            image: eunjae
        },
        { 
            name: "편예빈", 
            role: "베짱이, 간식팀장", 
            description: "참외가 제일 잘나가~", 
            image: yebin
        },
        { 
            name: "황경서", 
            role: "~~~~~", 
            description: "~~~~~~~", 
            image: gyeongseo
        }
    ];

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
                    <img className="w-[600px] h-auto" src={capture} alt="key features" />
                    <div className="p-5 flex flex-col justify-start items-start gap-[50px]">
                        {[
                            { title: '참고문헌 생성', description: '파일을 업로드하기만 하면 양식에 따라 참고문헌 자동 생성!' },
                            { title: '과제 관리', description: '내 과제와 참고문헌을 한 번에 관리할 수 있어요.' },
                            { title: '메모 추가', description: '참고문헌에 하이라이팅과 메모를 표시하고 각주와 함께 복사해보세요.' }
                        ].map((feature, index) => (
                            <div key={index} className="flex flex-col gap-2.5">
                                <div className="flex flex-row gap-[12px] items-center">
                                    <CircleCheckBig className="text-white" />
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
                <div className="text-neutral-900 text-[52px] font-semibold font-['Pretendard'] leading-[62px] tracking-tight">팀 소개</div>
                <div className="w-full flex justify-center items-start gap-[23px] flex-wrap">
                    {teamMembers.map((member, index) => (
                        <div key={index} className="flex flex-col justify-start items-center gap-5">
                            <div className="w-[300px] p-10 bg-[#181818] rounded-[10px] border border-[#dedede] flex flex-col justify-start items-start gap-[30px]">
                                <div className="flex items-center gap-[13px]">
                                    <div className="w-[50px] h-[50px] flex items-center justify-center">
                                        <img className="w-[50px] h-[50px] rounded-full" src={member.image} alt={member.name} />
                                    </div>
                                    <div className="flex flex-col items-start">
                                        <div className="text-white text-base font-semibold font-['Pretendard'] leading-normal tracking-tight">
                                            {member.name}
                                        </div>
                                        <div className="text-white text-base font-medium font-['Pretendard'] leading-normal tracking-tight">
                                            {member.role}
                                        </div>
                                    </div>
                                </div>
                                <div className="text-white text-base font-normal font-['Pretendard'] leading-normal tracking-tight">
                                    {member.description}
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

import { useState, useEffect, useRef } from 'react';
import hyeri from '../assets/images/hyeri.jpg';
import yebin from '../assets/images/yebin.jpg';
import eunjae from '../assets/images/eunjae.jpg';
import gyeongseo from '../assets/images/gyeongseo.jpg';
import capture from '../assets/images/capture.png';
import { CircleCheckBig } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import FileUploadModal from '../components/Modals/FileUpload';
import { Upload } from 'lucide-react';
import Header from "../components/Header/Header";
import { trackEvent } from '../utils/analytics';

const LandingPage = ({ isUserLoggedIn, setIsUserLoggedIn }) => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadCount, setUploadCount] = useState(() => {
    return parseInt(localStorage.getItem('landingUploadCount') || '0');
  });
  const [testReferencesList, setTestReferencesList] = useState([
    {
      APA: "Smith, J., & Johnson, M. (2023). The future of artificial intelligence. Journal of Technology, 45(2), 112-125.",
      MLA: "Smith, John, and Mark Johnson. \"The Future of Artificial Intelligence.\" Journal of Technology, vol. 45, no. 2, 2023, pp. 112-125.",
      Chicago: "Smith, John, and Mark Johnson. \"The Future of Artificial Intelligence.\" Journal of Technology 45, no. 2 (2023): 112-125.",
      Vancouver: "Smith J, Johnson M. The future of artificial intelligence. J Technol. 2023;45(2):112-25."
    }
  ]);
  const navigate = useNavigate();
  const demoSectionRef = useRef(null);

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
      role: "백엔드 인부", 
      description: "열심히 삽질 중입니다.", 
      image: gyeongseo
    }
  ];

  const animations = {
    fadeInUp: {
      hidden: { opacity: 0, y: 30 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.6 }
      }
    },
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1,
        transition: { duration: 0.6 }
      }
    },
    staggerContainer: {
      hidden: {},
      visible: {
        transition: {
          staggerChildren: 0.2,
          delayChildren: 0.3
        }
      }
    }
  };

  const handleUploadClick = () => {
    trackEvent('landing_upload_click', { upload_count: uploadCount });
    if (uploadCount >= 2) {
      navigate('/account/login');
    } else {
      setIsUploadModalOpen(true);
    }
  };

  const handleUploadSuccess = () => {
    const newCount = uploadCount + 1;
    setUploadCount(newCount);
    localStorage.setItem('landingUploadCount', newCount.toString());
  };

  const handleReferencesUpdate = (newReferences) => {
    setTestReferencesList(newReferences);
  };

  const handleDemoClick = () => {
    trackEvent('demo_click', { upload_count: uploadCount });
    if (uploadCount >= 2) {
      navigate('/account/login');
    } else {
      demoSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
      setIsUploadModalOpen(true);
    }
  };

  const handleStartClick = () => {
    trackEvent('start_click', { location: 'landing_page' });
    navigate('/account/login');
  };

  return (
    <>
      <Header
        isUserLoggedIn={isUserLoggedIn}
        setIsUserLoggedIn={setIsUserLoggedIn}
        isDetailPage={false}
      />
      <div className="w-full h-[calc(100vh-65px)] overflow-y-auto min-w-full">
        <motion.div 
          ref={demoSectionRef}
          initial="hidden"
          animate="visible"
          variants={animations.staggerContainer}
          className="w-full min-w-full px-6 sm:px-8 lg:px-16 py-16 sm:py-20 md:py-24 lg:py-32 bg-gradient-to-b from-neutral-50 via-[#7e7e7e] to-neutral-900 flex flex-col items-center"
        >
          <div className="w-full flex flex-col items-center gap-4 sm:gap-6">
            <motion.div 
                variants={animations.fadeInUp}
                className="text-center text-neutral-900 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold"
              >
              참고문헌 왜 혼자 써?
            </motion.div>
            <div className="w-full flex justify-center">
              <motion.div 
                variants={animations.fadeIn}
                className="text-center text-neutral-600 text-lg sm:text-xl md:text-2xl font-medium max-w-[320px] sm:max-w-none break-keep"
              >
                REFERTO와 함께 쉽고 빠르게 참고문헌을 생성하고 관리해보세요.
              </motion.div>
            </div>
          </div>

          <motion.div
            variants={animations.fadeInUp}
            className="w-full max-w-sm flex justify-center mt-8 sm:mt-10"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-fit min-w-[200px] px-6 py-3 bg-neutral-900 rounded-md flex items-center justify-center gap-2 text-white text-lg sm:text-xl font-medium cursor-pointer"
              onClick={handleUploadClick}
            >
              <Upload className="w-5 h-5" />
              {uploadCount >= 2 ? '더 많은 기능 사용하기' : '파일 업로드하기'}
            </motion.div>
          </motion.div>

          {testReferencesList && testReferencesList.length > 0 && (
            <motion.div
              variants={animations.fadeInUp}
              className="w-full max-w-3xl mt-12 p-6 bg-white/90 backdrop-blur-sm rounded-lg border border-neutral-200"
            >
              <div className="font-semibold mb-4 text-xl text-neutral-900">생성된 참고문헌</div>
              {testReferencesList.map((ref, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex flex-col gap-2"
                >
                  <motion.div
                    whileHover={{
                      scale: 1.01,
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                      transition: { duration: 0.2 }
                    }}
                    className="p-3 bg-white/80 rounded mb-2 shadow-sm"
                  >
                    <div className="font-medium mb-2 text-neutral-900">APA</div>
                    <div className="text-neutral-800">{ref.APA}</div>
                  </motion.div>
                  <motion.div
                    whileHover={{
                      scale: 1.01,
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                      transition: { duration: 0.2 }
                    }}
                    className="p-3 bg-white/80 rounded mb-2 shadow-sm"
                  >
                    <div className="font-medium mb-2 text-neutral-900">MLA</div>
                    <div className="text-neutral-800">{ref.MLA}</div>
                  </motion.div>
                  <motion.div
                    whileHover={{
                      scale: 1.01,
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                      transition: { duration: 0.2 }
                    }}
                    className="p-3 bg-white/80 rounded mb-2 shadow-sm"
                  >
                    <div className="font-medium mb-2 text-neutral-900">Chicago</div>
                    <div className="text-neutral-800">{ref.Chicago}</div>
                  </motion.div>
                  <motion.div
                    whileHover={{
                      scale: 1.01,
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                      transition: { duration: 0.2 }
                    }}
                    className="p-3 bg-white/80 rounded mb-2 shadow-sm"
                  >
                    <div className="font-medium mb-2 text-neutral-900">Vancouver</div>
                    <div className="text-neutral-800">{ref.Vancouver}</div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={animations.staggerContainer}
          className="w-full px-6 sm:px-8 lg:px-16 py-20 lg:py-32 md:py-24 sm:py-16 bg-neutral-900 flex flex-col items-center gap-20"
        >
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-[27px]"
          >
            <div className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-semibold leading-tight tracking-tight">주요 기능</div>
          </motion.div>
              
          <motion.div 
            initial="hidden"
            whileInView="visible"
            variants={animations.staggerContainer}
            className="h-full flex flex-col lg:flex-row justify-center items-center gap-[100px] md:gap-[50px] sm:gap-[30px]"
          > 
            <motion.img 
              variants={animations.fadeInUp}
              className="w-[800px] lg:w-[600px] md:w-[90%] h-auto"
              src={capture}
              alt="key features"
            />
            <div className="p-5 flex flex-col justify-start lg:items-start items-center gap-[50px]">
              {[
                { title: '참고문헌 생성', description: '파일을 업로드하기만 하면 양식에 따라 참고문헌 자동 생성!' },
                { title: '과제 관리', description: '내 과제와 참고문헌을 한 번에 관리할 수 있어요.' },
                { title: '메모 추가', description: '참고문헌에 하이라이팅과 메모를 표시하고 각주와 함께 복사해보세요.' }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  variants={animations.fadeInUp}
                  className="flex flex-col gap-2.5 lg:items-start items-center"
                >
                  <div className="flex flex-row gap-[12px] items-center">
                    <CircleCheckBig className="text-white w-5 h-5 sm:w-6 sm:h-6" />
                    <div className="text-white text-xl sm:text-2xl md:text-3xl font-medium leading-normal tracking-tight">{feature.title}</div>
                  </div>
                  <div className="text-white text-lg sm:text-xl md:text-2xl font-normal leading-normal tracking-tight lg:text-left text-center max-w-[320px] sm:max-w-none break-keep">
                    {feature.description.split('\n').map((line, index) => (
                      <span key={index}>{line}<br /></span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={animations.staggerContainer}
          className="w-full px-6 sm:px-8 lg:px-16 py-20 lg:py-32 md:py-24 sm:py-16 bg-white flex flex-col items-center gap-20"
        >
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-neutral-900 text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-semibold leading-tight tracking-tight"
          >
            팀 소개
          </motion.div>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            variants={animations.staggerContainer}
            className="w-full flex justify-center items-start gap-[23px] flex-wrap px-16"
          >
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                variants={animations.fadeInUp}
                whileHover={{ scale: 1.05 }}
                className="flex flex-col justify-start items-center gap-5 w-full sm:w-[300px]"
              >
                <div className="w-full sm:w-[300px] h-auto min-h-[230px] p-10 sm:p-6 bg-[#181818] rounded-[10px] border border-[#dedede] flex flex-col justify-start items-start gap-[30px]">
                  <div className="flex items-center gap-[13px]">
                    <div className="w-[50px] h-[50px] flex items-center justify-center">
                      <img className="w-[50px] h-[50px] rounded-full" src={member.image} alt={member.name} />
                    </div>
                    <div className="flex flex-col items-start">
                      <div className="text-white text-base sm:text-lg md:text-xl font-semibold leading-normal tracking-tight">
                        {member.name}
                      </div>
                      <div className="text-white text-base sm:text-lg md:text-xl font-medium leading-normal tracking-tight">
                        {member.role}
                      </div>
                    </div>
                  </div>
                  <div className="text-white text-base sm:text-lg md:text-xl font-normal leading-normal tracking-tight max-w-[280px] sm:max-w-none break-keep">
                    {member.description}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={animations.staggerContainer}
          className="w-full px-6 sm:px-8 lg:px-16 py-20 lg:py-32 md:py-24 sm:py-16 bg-neutral-200 flex flex-col items-center gap-8"
        >
          <motion.div
            variants={animations.fadeInUp}
            className="text-center"
          >
            <h2 className="text-neutral-900 text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              지금 바로 시작하세요
            </h2>
            <p className="text-neutral-600 text-lg sm:text-xl md:text-2xl max-w-[320px] sm:max-w-none break-keep">
              REFERTO와 더 쉽고 빠른 참고문헌 관리를 경험해보세요
            </p>
          </motion.div>
          
          <motion.div
            variants={animations.fadeInUp}
            className="flex flex-col sm:flex-row justify-center items-center w-full max-w-sm sm:max-w-none gap-4 mt-4"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-fit min-w-[200px] px-6 py-3 bg-neutral-900 rounded-md flex items-center justify-center gap-2 text-white text-lg sm:text-xl font-medium cursor-pointer"
              onClick={handleStartClick}
            >
              시작하기
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-fit min-w-[200px] px-6 py-3 bg-transparent border-2 border-neutral-900 rounded-md flex items-center justify-center gap-2 text-neutral-900 text-lg sm:text-xl font-medium cursor-pointer hover:bg-neutral-900/10 transition-colors"
              onClick={handleDemoClick}
            >
              체험해보기
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          variants={animations.fadeIn}
          className="w-full px-6 sm:px-8 lg:px-16 py-8 bg-neutral-200 gap-2 flex flex-col items-center"
        >
          <div className="w-[90%] mx-auto items-center border-t border-neutral-400 py-4"></div>
          <div className="px-16 w-full flex flex-col items-center">
            <div className="text-neutral-600 text-xl sm:text-2xl font-bold mb-2">REFERTO</div>
            <div className="text-neutral-600 text-sm sm:text-base">© 2024 REFERTO</div>
          </div>
        </motion.div>

        {isUploadModalOpen && (
          <FileUploadModal 
            setIsOpen={setIsUploadModalOpen}
            isLandingPage={true}
            setTestReferencesList={handleReferencesUpdate}
            onUploadSuccess={handleUploadSuccess}
          />
        )}
      </div>
    </>
  );
}

export default LandingPage;

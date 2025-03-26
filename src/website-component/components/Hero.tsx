import '../design/Hero.css';

function Hero() {
    return ( 
         <div className='hero'> 
         <div className='content'> 
            <h1>iM بوت</h1> 
            <p>
              هو بوت قوي لحماية خادم الديسكورد الخاص بك من الهجمات، السبام، والنشاطات الضارة.
              يتميز بأدوات متقدمة للإشراف، إعدادات قابلة للتخصيص، ومراقبة في الوقت الفعلي
              لضمان تجربة آمنة وسلسة لجميع الأعضاء.
            </p>
         </div>
         <div className='buttons'> 
            <a href='/dashboard' className='btn'>الانتقال إلى لوحة التحكم</a>
            <button className='btn'>أضف iM</button>
         </div>
         </div>
    );
}

export default Hero;

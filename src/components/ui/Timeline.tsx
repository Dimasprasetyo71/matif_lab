type Item = {
  title: string
  image?: string
  description: string
  icon?: string
  date?: string
}

export function Timeline({ items }: { items: Item[] }) {
  return (
    <div className="min-h-screen  p-8 md:p-12">
      <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap');
                
                * {
                    font-family: 'Inter', sans-serif;
                }
                
                .timeline-container {
                    max-width: 800px;
                    margin: 0 auto;
                }
                
                .timeline-title {
                    font-family: 'Syne', sans-serif;
                    font-size: 3.5rem;
                    font-weight: 700;
                    background: linear-gradient(135deg, #60a5fa 0%, #93c5fd 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    margin-bottom: 2rem;
                    letter-spacing: -0.02em;
                    animation: fadeInUp 0.8s ease-out;
                }
                
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .timeline-line {
                    position: relative;
                    padding-left: 0;
                }
                
                .timeline-line::before {
                    content: '';
                    position: absolute;
                    left: 19px;
                    top: 0;
                    bottom: 0;
                    width: 2px;
                    background: linear-gradient(180deg, #60a5fa 0%, #3b82f6 50%, #1e40af 100%);
                    opacity: 0.5;
                }
                
                .timeline-item {
                    position: relative;
                    padding-left: 60px;
                    padding-bottom: 3rem;
                    opacity: 0;
                    animation: slideInLeft 0.6s ease-out forwards;
                }
                
                .timeline-item:nth-child(1) {
                    animation-delay: 0.1s;
                }
                
                .timeline-item:nth-child(2) {
                    animation-delay: 0.2s;
                }
                
                .timeline-item:nth-child(3) {
                    animation-delay: 0.3s;
                }
                
                .timeline-item:nth-child(4) {
                    animation-delay: 0.4s;
                }
                
                .timeline-item:nth-child(5) {
                    animation-delay: 0.5s;
                }
                
                @keyframes slideInLeft {
                    from {
                        opacity: 0;
                        transform: translateX(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                
                .timeline-dot {
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 40px;
                    height: 40px;
                    background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 20px;
                    color: white;
                    box-shadow: 0 0 0 8px rgba(96, 165, 250, 0.1),
                                0 8px 16px rgba(59, 130, 246, 0.3);
                    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
                }
                
                .timeline-item:hover .timeline-dot {
                    transform: scale(1.2);
                    box-shadow: 0 0 0 12px rgba(96, 165, 250, 0.2),
                                0 12px 24px rgba(59, 130, 246, 0.5);
                }
                
                .timeline-content {
                    background: linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.8) 100%);
                    border: 1px solid rgba(148, 163, 184, 0.2);
                    border-radius: 12px;
                    padding: 1.5rem;
                    backdrop-filter: blur(10px);
                    transition: all 0.3s ease;
                    position: relative;
                    overflow: hidden;
                }
                
                .timeline-content::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(135deg, rgba(96, 165, 250, 0.05) 0%, transparent 100%);
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }
                
                .timeline-item:hover .timeline-content {
                    background: linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.95) 100%);
                    border-color: rgba(96, 165, 250, 0.4);
                    box-shadow: 0 8px 32px rgba(59, 130, 246, 0.2);
                    transform: translateY(-4px);
                }
                
                .timeline-item:hover .timeline-content::before {
                    opacity: 1;
                }
                
                .timeline-date {
                    display: inline-block;
                    font-size: 0.75rem;
                    font-weight: 600;
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                    color: #60a5fa;
                    margin-bottom: 0.5rem;
                }
                
                .timeline-header {
                    display: flex;
                    align-items: flex-start;
                    gap: 0.75rem;
                    margin-bottom: 0.75rem;
                }
                
                .timeline-title-text {
                    font-family: 'Syne', sans-serif;
                    font-size: 1.25rem;
                    font-weight: 600;
                    color: #f1f5f9;
                    letter-spacing: -0.01em;
                }
                
                .timeline-description {
                    font-size: 0.95rem;
                    line-height: 1.6;
                    color: #cbd5e1;
                    position: relative;
                    z-index: 1;
                }
                
                .timeline-arrow {
                    position: absolute;
                    left: -12px;
                    top: 20px;
                    width: 12px;
                    height: 1px;
                    background: linear-gradient(90deg, transparent, rgba(96, 165, 250, 0.3));
                }
            `}</style>

      <div className="timeline-container">
        <h1 className="timeline-title">Timeline</h1>

        <div className="timeline-line">
          {items.map((item, i) => (
            <div key={i} className="timeline-item">
              <div className="timeline-arrow"></div>

              <div className="timeline-dot">{item.icon || '✓'}</div>

              <div className="timeline-content">
                {/* <img className="w-32 h-32 object-contain" src={item.image} loading="eager"  alt="logo penemu matriks" /> */}
                {item.date && <div className="timeline-date">{item.date}</div>}

                <div className="timeline-header">
                  <h3 className="timeline-title-text">{item.title}</h3>
                </div>

                <p className="timeline-description">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

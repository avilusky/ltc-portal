// Matrix Management Module
const MatrixManager = {
    isOpen: false,
    
    init() {
        this.renderMatrix();
        this.renderDetailOverlay();
        this.setupEventListeners();
    },
    
    renderMatrix() {
        const overlay = document.getElementById('matrixOverlay');
        overlay.className = 'matrix-overlay';
        
        overlay.innerHTML = `
            <div class="matrix-container" id="matrixContainer">
                <div class="matrix-header">
                    <div class="matrix-header-content">
                        <div class="header-right">
                            <img src="${journeyData.hero.logo}" alt="רשות שוק ההון" class="matrix-logo">
                            <div>
                                <h2 class="matrix-title">${matrixData.title}</h2>
                                <p class="matrix-subtitle">${matrixData.subtitle}</p>
                            </div>
                        </div>
                        <button class="close-btn close-matrix" onclick="MatrixManager.close()">×</button>
                    </div>
                </div>
                
                <div class="matrix-grid">
                    ${matrixData.cells.map(cell => this.renderCell(cell)).join('')}
                </div>

                <div class="matrix-footer">
                    <span class="footer-text">חטיבת ביטוחי בריאות וסיעוד</span>
                </div>
            </div>
        `;
    },
    
    renderCell(cell) {
        return `
            <div class="matrix-cell" onclick="MatrixManager.showDetail(${cell.id})">
                ${cell.badge ? `<span class="cell-badge">${cell.badge}</span>` : ''}
                <div class="cell-icon">${cell.icon}</div>
                <div class="cell-title">${cell.title}</div>
                <div class="cell-description">${cell.description}</div>
            </div>
        `;
    },
    
    renderDetailOverlay() {
        const overlay = document.getElementById('detailOverlay');
        overlay.className = 'detail-overlay';
        
        overlay.innerHTML = `
            <div class="detail-content">
                <div class="detail-header">
                    <button class="close-btn detail-close" onclick="MatrixManager.closeDetail()">×</button>
                    <h2 id="detailTitle"></h2>
                    <p id="detailSubtitle"></p>
                </div>
                <div class="detail-body" id="detailBody"></div>
            </div>
        `;
    },
    
    open() {
        const recommendedCard = document.getElementById('recommendedCard');
        const matrixOverlay = document.getElementById('matrixOverlay');
        const matrixContainer = document.getElementById('matrixContainer');
        
        // Morphing animation
        this.createMorphAnimation(recommendedCard);
        
        // Show matrix after animation
        setTimeout(() => {
            matrixOverlay.classList.add('active');
            matrixContainer.classList.add('active');
            this.isOpen = true;
            
            // Animate cells entrance
            this.animateCells();
        }, 800);
    },
    
    createMorphAnimation(sourceElement) {
        const rect = sourceElement.getBoundingClientRect();
        
        // Create morphing element
        const morphElement = document.createElement('div');
        morphElement.className = 'morph-element';
        morphElement.style.cssText = `
            position: fixed;
            top: ${rect.top}px;
            left: ${rect.left}px;
            width: ${rect.width}px;
            height: ${rect.height}px;
            background: linear-gradient(135deg, #3b82f6, #0ea5e9);
            border-radius: 20px;
            z-index: 9999;
            transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        `;
        document.body.appendChild(morphElement);
        
        // Start animation
        setTimeout(() => {
            morphElement.style.top = '50%';
            morphElement.style.left = '50%';
            morphElement.style.transform = 'translate(-50%, -50%) scale(0.5)';
            morphElement.style.borderRadius = '50%';
            morphElement.style.opacity = '0.8';
        }, 50);
        
        // Create expanding rings
        this.createExpandingRings();
        
        // Final expansion
        setTimeout(() => {
            morphElement.style.transform = 'translate(-50%, -50%) scale(25)';
            morphElement.style.opacity = '0';
        }, 600);
        
        // Clean up
        setTimeout(() => {
            morphElement.remove();
        }, 1400);
    },
    
    createExpandingRings() {
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                const ring = document.createElement('div');
                ring.className = 'expanding-ring';
                ring.style.cssText = `
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 100px;
                    height: 100px;
                    border: 2px solid rgba(59, 130, 246, 0.5);
                    border-radius: 50%;
                    z-index: 9998;
                    animation: expandRing ${1 + i * 0.2}s ease-out forwards;
                `;
                document.body.appendChild(ring);
                
                setTimeout(() => ring.remove(), 2000);
            }, 300 + i * 100);
        }
    },
    
    animateCells() {
        const cells = document.querySelectorAll('.matrix-cell');
        cells.forEach((cell, index) => {
            setTimeout(() => {
                cell.classList.add('appear');
            }, index * 80);
        });
    },
    
    close() {
        const matrixOverlay = document.getElementById('matrixOverlay');
        const matrixContainer = document.getElementById('matrixContainer');
        const cells = document.querySelectorAll('.matrix-cell');
        
        // Animate cells exit
        cells.forEach((cell, index) => {
            setTimeout(() => {
                cell.style.transform = 'scale(0.8)';
                cell.style.opacity = '0';
            }, index * 30);
        });
        
        // Hide overlay
        setTimeout(() => {
            matrixContainer.classList.remove('active');
            matrixOverlay.classList.remove('active');
            this.isOpen = false;
            
            // Reset cells
            cells.forEach(cell => {
                cell.classList.remove('appear');
                cell.style.transform = '';
                cell.style.opacity = '';
            });
        }, 500);
    },
    
    showDetail(cellId) {
        const cell = matrixData.cells.find(c => c.id === cellId);
        if (!cell || !cell.details) {
            this.showDefaultDetail(cellId);
            return;
        }
        
        const detailOverlay = document.getElementById('detailOverlay');
        const titleElement = document.getElementById('detailTitle');
        const subtitleElement = document.getElementById('detailSubtitle');
        const bodyElement = document.getElementById('detailBody');
        
        // הוספת האייקון לכותרת
        titleElement.innerHTML = `<span class="header-icon">${cell.icon}</span> ${cell.details.title}`;
        subtitleElement.textContent = cell.details.subtitle;
        
        // Check if this is a decision point cell
        if (cell.details.isDecisionPoint) {
            // Special layout for decision point
            let content = '';
            
            if (cell.details.introduction) {
                content += `<div class="decision-intro">${cell.details.introduction}</div>`;
            }
            
            // Create options comparison
            content += `<div class="decision-options-container">`;
            
            cell.details.options.forEach((option, index) => {
                content += `
                    <div class="decision-option ${index === 0 ? 'option-left' : 'option-right'}">
                        <div class="option-header">
                            <h3>${option.title}</h3>
                        </div>
                        <div class="option-description">${option.description}</div>
                        
                        ${option.components ? `
                            <div class="option-components">
                                ${option.components.map(comp => `
                                    <div class="component-section">
                                        <h4>${comp.title}</h4>
                                        <ul>
                                            ${comp.items.map(item => `<li>${item}</li>`).join('')}
                                        </ul>
                                    </div>
                                `).join('')}
                            </div>
                        ` : ''}
                        
                        <div class="pros-cons-grid">
                            <div class="pros-section">
                                <h4 class="pros-title">יתרונות</h4>
                                <ul class="pros-list">
                                    ${option.pros.map(pro => `<li>${pro}</li>`).join('')}
                                </ul>
                            </div>
                            <div class="cons-section">
                                <h4 class="cons-title">חסרונות</h4>
                                <ul class="cons-list">
                                    ${option.cons.map(con => `<li>${con}</li>`).join('')}
                                </ul>
                            </div>
                        </div>
                        
                        ${option.impact ? `
                            <div class="impact-meters">
                                <h4>מדדי השפעה</h4>
                                <div class="impact-grid">
                                    <div class="impact-item">
                                        <span class="impact-label">גמישות שוק</span>
                                        <div class="impact-bar">
                                            <div class="impact-fill" style="width: ${option.impact.market}%"></div>
                                        </div>
                                        <span class="impact-value">${option.impact.market}%</span>
                                    </div>
                                    <div class="impact-item">
                                        <span class="impact-label">רמת פיקוח</span>
                                        <div class="impact-bar">
                                            <div class="impact-fill" style="width: ${option.impact.control}%"></div>
                                        </div>
                                        <span class="impact-value">${option.impact.control}%</span>
                                    </div>
                                    <div class="impact-item">
                                        <span class="impact-label">שקיפות</span>
                                        <div class="impact-bar">
                                            <div class="impact-fill" style="width: ${option.impact.transparency}%"></div>
                                        </div>
                                        <span class="impact-value">${option.impact.transparency}%</span>
                                    </div>
                                    <div class="impact-item">
                                        <span class="impact-label">חדשנות</span>
                                        <div class="impact-bar">
                                            <div class="impact-fill" style="width: ${option.impact.innovation}%"></div>
                                        </div>
                                        <span class="impact-value">${option.impact.innovation}%</span>
                                    </div>
                                </div>
                            </div>
                        ` : ''}
                    </div>
                `;
            });
            
            content += `</div>`;
            
            bodyElement.innerHTML = content;
            detailOverlay.classList.add('active');
            
            // Animate impact bars after content is loaded
            setTimeout(() => {
                const impactFills = detailOverlay.querySelectorAll('.impact-fill');
                impactFills.forEach(fill => {
                    const width = fill.style.width;
                    fill.style.width = '0';
                    setTimeout(() => {
                        fill.style.width = width;
                    }, 100);
                });
            }, 100);
            
            return;
        }
        
        // Regular detail content (existing code continues...)
        let content = '';
        
        if (cell.details.introduction) {
            content += `<div class="detail-paragraph">${cell.details.introduction}</div>`;
        }
        
        if (cell.details.sections) {
            cell.details.sections.forEach(section => {
                content += `<div class="detail-section">`;
                content += `<h3>${section.title}</h3>`;
                
                // Check what type of content to render
                if (section.paragraph) {
                    content += `<div class="detail-paragraph">${section.paragraph}</div>`;
                }
                
                if (section.stats) {
                    content += `<div class="detail-stats-container">`;
                    section.stats.forEach(stat => {
                        content += `
                            <div class="detail-stat">
                                <div class="detail-stat-value">${stat.value}</div>
                                <div class="detail-stat-label">${stat.label}</div>
                            </div>
                        `;
                    });
                    content += `</div>`;
                }
                
                if (section.cards) {
                    content += `<div class="detail-cards-grid">`;
                    section.cards.forEach(card => {
                        content += `
                            <div class="detail-card">
                                <div class="detail-card-title">${card.title}</div>
                                ${card.value ? `<div class="detail-card-value">${card.value}</div>` : ''}
                                ${card.description ? `<div class="detail-card-description">${card.description}</div>` : ''}
                            </div>
                        `;
                    });
                    content += `</div>`;
                }
                
                if (section.progress) {
                    section.progress.forEach(item => {
                        content += `
                            <div class="detail-progress-item">
                                <div class="detail-progress-label">
                                    <span>${item.label}</span>
                                    <span>${item.value}</span>
                                </div>
                                <div class="detail-progress-bar">
                                    <div class="detail-progress-fill" style="width: ${item.percentage}%"></div>
                                </div>
                            </div>
                        `;
                    });
                }
                
                if (section.chart) {
                    content += `
                        <div class="detail-chart-container">
                            <div class="detail-chart-title">${section.chart.title}</div>
                            <canvas id="chart-${cellId}-${section.chart.id}"></canvas>
                        </div>
                    `;
                    // Note: You'll need to initialize the chart after the content is added to DOM
                    setTimeout(() => this.initChart(cellId, section.chart), 100);
                }
                
                content += `</div>`;
            });
        }
        
        bodyElement.innerHTML = content;
        detailOverlay.classList.add('active');
        
        // Animate progress bars after content is loaded
        setTimeout(() => {
            const progressFills = detailOverlay.querySelectorAll('.detail-progress-fill');
            progressFills.forEach(fill => {
                const width = fill.style.width;
                fill.style.width = '0';
                setTimeout(() => {
                    fill.style.width = width;
                }, 100);
            });
        }, 100);
    },
    
    initChart(cellId, chartConfig) {
        const canvas = document.getElementById(`chart-${cellId}-${chartConfig.id}`);
        if (!canvas) return;
        
        // Simple example chart - you can customize this
        const ctx = canvas.getContext('2d');
        // Here you would initialize your chart using Chart.js or similar
        // This is just a placeholder
        ctx.fillStyle = '#3b82f6';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    },
    
    showDefaultDetail(cellId) {
        const cell = matrixData.cells.find(c => c.id === cellId);
        if (!cell) return;
        
        const detailOverlay = document.getElementById('detailOverlay');
        const titleElement = document.getElementById('detailTitle');
        const subtitleElement = document.getElementById('detailSubtitle');
        const bodyElement = document.getElementById('detailBody');
        
        titleElement.innerHTML = `<span class="header-icon">${cell.icon}</span> ${cell.title}`;
        subtitleElement.textContent = cell.description;
        bodyElement.innerHTML = `
            <div class="detail-section">
                <div class="detail-paragraph">
                    <p>פרטים מלאים עבור נושא זה יתווספו בקרוב.</p>
                    <p>הנושא כולל היבטים רבים הדורשים תכנון מפורט ומעמיק.</p>
                </div>
            </div>
        `;
        
        detailOverlay.classList.add('active');
    },
    
    closeDetail() {
        const detailOverlay = document.getElementById('detailOverlay');
        detailOverlay.classList.remove('active');
    },
    
    setupEventListeners() {
        // ESC key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (document.getElementById('detailOverlay').classList.contains('active')) {
                    this.closeDetail();
                } else if (this.isOpen) {
                    this.close();
                }
            }
        });
        
        // Click outside to close detail
        document.getElementById('detailOverlay').addEventListener('click', (e) => {
            if (e.target === e.currentTarget) {
                this.closeDetail();
            }
        });
    }
};
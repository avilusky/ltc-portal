/**
 * Premium Calculator for New LTC Model
 * מחשבון פרמיות למודל הביטוח הסיעודי החדש
 */

document.addEventListener('DOMContentLoaded', function() {
    initPremiumCalculator();
});

function initPremiumCalculator() {
    // Premium data structures - Based on actuarial tables
    const malePremiums = {
        20: {20: 50, 30: 80, 40: 120, 50: 200, 60: 350, 70: 600},
        30: {30: 100, 40: 150, 50: 250, 60: 400, 70: 700},
        40: {40: 180, 50: 300, 60: 480, 70: 800},
        50: {50: 350, 60: 550, 70: 900},
        60: {60: 600, 70: 1000},
        70: {70: 1100}
    };
    
    const femalePremiums = {
        20: {20: 60, 30: 95, 40: 145, 50: 240, 60: 420, 70: 720},
        30: {30: 120, 40: 180, 50: 300, 60: 480, 70: 840},
        40: {40: 215, 50: 360, 60: 575, 70: 960},
        50: {50: 420, 60: 660, 70: 1080},
        60: {60: 720, 70: 1200},
        70: {70: 1320}
    };
    
    const fixedPremiums = {
        male: {20: 150, 30: 200, 40: 280, 50: 400, 60: 580, 70: 850},
        female: {20: 180, 30: 240, 40: 335, 50: 480, 60: 695, 70: 1020}
    };
    
    const kupotPremiums = {
        20: 80, 25: 90, 30: 100, 35: 110, 40: 120, 45: 135,
        50: 150, 55: 170, 60: 195, 65: 225, 70: 260, 75: 300,
        80: 350, 85: 400
    };
    
    let currentAge = 40;
    let currentGender = 'male';
    let monthlyChart = null;
    let cumulativeChart = null;
    
    function createCharts() {
        // Monthly premiums chart
        const monthlyCtx = document.getElementById('monthlyChart').getContext('2d');
        monthlyChart = new Chart(monthlyCtx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [
                    {
                        label: 'מודל קבוע',
                        data: [],
                        borderColor: '#6b7280',
                        backgroundColor: 'rgba(107, 114, 128, 0.1)',
                        tension: 0.4
                    },
                    {
                        label: 'מודל מדורג (חדש)',
                        data: [],
                        borderColor: '#2563eb',
                        backgroundColor: 'rgba(37, 99, 235, 0.1)',
                        tension: 0.4
                    },
                    {
                        label: 'קופות חולים',
                        data: [],
                        borderColor: '#10b981',
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ₪' + context.parsed.y;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'פרמיה חודשית (₪)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'גיל'
                        }
                    }
                }
            }
        });
        
        // Cumulative chart
        const cumulativeCtx = document.getElementById('cumulativeChart').getContext('2d');
        cumulativeChart = new Chart(cumulativeCtx, {
            type: 'bar',
            data: {
                labels: ['מודל קבוע', 'מודל מדורג', 'קופות חולים'],
                datasets: [{
                    label: 'סך תשלומים',
                    data: [],
                    backgroundColor: ['#6b7280', '#2563eb', '#10b981']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'סך תשלומים (₪)'
                        },
                        ticks: {
                            callback: function(value) {
                                return '₪' + value.toLocaleString();
                            }
                        }
                    }
                }
            }
        });
    }
    
    function updateCharts() {
        const premiumsData = currentGender === 'male' ? malePremiums : femalePremiums;
        const fixedPremium = fixedPremiums[currentGender][currentAge];
        const monthlyData = [];
        let newModelCumulative = 0;
        let fixedModelCumulative = 0;
        let kupotCumulative = 0;
        
        // Calculate premiums for each age bracket
        for (let age = currentAge; age <= 85; age += 5) {
            let newModelMonthly = null;
            let fixedModelMonthly = null;
            const kupotMonthly = kupotPremiums[age] || kupotPremiums[Math.floor(age/5)*5];
            
            if (age <= 70) {
                // Get premium for new model based on entry age and current age
                newModelMonthly = premiumsData[currentAge] && premiumsData[currentAge][age] ? 
                    premiumsData[currentAge][age] : null;
                fixedModelMonthly = fixedPremium;
                
                if (newModelMonthly) {
                    // Calculate cumulative for 5 years (60 months)
                    newModelCumulative += newModelMonthly * 12 * 5;
                }
                if (fixedModelMonthly) {
                    fixedModelCumulative += fixedModelMonthly * 12 * 5;
                }
            }
            
            kupotCumulative += kupotMonthly * 12 * 5;
            
            monthlyData.push({
                age: age,
                newModel: newModelMonthly,
                fixed: fixedModelMonthly,
                kupot: kupotMonthly
            });
        }
        
        // Update monthly chart
        monthlyChart.data.labels = monthlyData.map(d => d.age);
        monthlyChart.data.datasets[0].data = monthlyData.map(d => d.fixed);
        monthlyChart.data.datasets[1].data = monthlyData.map(d => d.newModel);
        monthlyChart.data.datasets[2].data = monthlyData.map(d => d.kupot);
        monthlyChart.update();
        
        // Update cumulative chart
        cumulativeChart.data.datasets[0].data = [fixedModelCumulative, newModelCumulative, kupotCumulative];
        cumulativeChart.update();
        
        // Update table values
        const firstMonthData = monthlyData[0];
        document.getElementById('fixedModelInitial').textContent = '₪' + (fixedPremium || 0);
        document.getElementById('newModelInitial').textContent = '₪' + (firstMonthData.newModel || 0);
        document.getElementById('kupotInitial').textContent = '₪' + (firstMonthData.kupot || 0);
        document.getElementById('newModelTotal').textContent = '₪' + newModelCumulative.toLocaleString();
        document.getElementById('fixedModelTotal').textContent = '₪' + fixedModelCumulative.toLocaleString();
        document.getElementById('kupotTotal').textContent = '₪' + kupotCumulative.toLocaleString();
    }
    
    // Initialize charts
    createCharts();
    updateCharts();
    
    // Event listeners
    const ageInput = document.getElementById('ageInput');
    if (ageInput) {
        ageInput.addEventListener('input', (e) => {
            currentAge = parseInt(e.target.value);
            // Round to nearest 10 for the data lookup
            currentAge = Math.round(currentAge / 10) * 10;
            document.getElementById('ageDisplay').textContent = e.target.value;
            updateCharts();
        });
    }
    
    const maleBtn = document.getElementById('maleBtn');
    if (maleBtn) {
        maleBtn.addEventListener('click', () => {
            currentGender = 'male';
            maleBtn.classList.add('active');
            document.getElementById('femaleBtn').classList.remove('active');
            updateCharts();
        });
    }
    
    const femaleBtn = document.getElementById('femaleBtn');
    if (femaleBtn) {
        femaleBtn.addEventListener('click', () => {
            currentGender = 'female';
            femaleBtn.classList.add('active');
            maleBtn.classList.remove('active');
            updateCharts();
        });
    }
}
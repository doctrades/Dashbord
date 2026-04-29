(function () {
    // Build cumulative balance array from tradeData
    const sorted = [...tradeData].sort((a, b) => new Date(a.date) - new Date(b.date));

    const labels = ['Start'];
    const balances = [startBalance];

    sorted.forEach(t => {
        const d = new Date(t.date);
        labels.push(d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }));
        balances.push(+(balances[balances.length - 1] + t.pnl).toFixed(2));
    });

    const finalBal = balances[balances.length - 1];
    const totalGain = finalBal - startBalance;
    const pct = ((totalGain / startBalance) * 100).toFixed(2);

    // Stats
    const diffs = sorted.map(t => t.pnl);
    const best = diffs.length ? Math.max(...diffs) : 0;
    const worst = diffs.length ? Math.min(...diffs) : 0;
    const wins = diffs.filter(d => d > 0).length;
    const winRate = diffs.length ? Math.round((wins / diffs.length) * 100) : 0;

    document.getElementById('chart-target-label').textContent = '$' + target.toFixed(2);
    document.getElementById('chart-best').textContent = (best >= 0 ? '+' : '') + '$' + best.toFixed(2);
    document.getElementById('chart-worst').textContent = '$' + worst.toFixed(2);
    document.getElementById('chart-wins').textContent = wins + ' / ' + diffs.length;
    document.getElementById('chart-winrate').textContent = winRate + '%';
    document.getElementById('chart-winrate').style.color = winRate >= 50 ? 'var(--accent)' : 'var(--danger)';

    // Animate counters
    const balDisplay = document.getElementById('chart-bal-display');
    const badge = document.getElementById('chart-pnl-badge');

    // Chart
    const ctx = document.getElementById('balanceLineChart').getContext('2d');
    const grad = ctx.createLinearGradient(0, 0, 0, 220);
    grad.addColorStop(0, 'rgba(0,229,160,0.18)');
    grad.addColorStop(1, 'rgba(0,229,160,0)');

    // Target line dataset
    const targetData = Array(labels.length).fill(target);

    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels,
            datasets: [
                {
                    label: 'Balance',
                    data: [],
                    borderColor: '#00e5a0',
                    borderWidth: 2,
                    pointRadius: 3,
                    pointBackgroundColor: '#00e5a0',
                    pointHoverRadius: 6,
                    tension: 0.38,
                    fill: true,
                    backgroundColor: grad,
                },
                {
                    label: 'Target',
                    data: targetData,
                    borderColor: 'rgba(247,183,49,0.45)',
                    borderWidth: 1,
                    borderDash: [5, 4],
                    pointRadius: 0,
                    fill: false,
                    backgroundColor: 'transparent',
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#13131a',
                    borderColor: 'rgba(0,229,160,0.2)',
                    borderWidth: 1,
                    titleColor: '#888',
                    bodyColor: '#e0e0e0',
                    callbacks: {
                        label: ctx => ctx.dataset.label + ': $' + ctx.parsed.y.toFixed(2)
                    }
                }
            },
            scales: {
                x: {
                    grid: { color: 'rgba(255,255,255,0.04)' },
                    ticks: { color: '#555', font: { size: 10, family: 'Space Mono' }, maxRotation: 0, maxTicksLimit: 8 },
                    border: { display: false }
                },
                y: {
                    grid: { color: 'rgba(255,255,255,0.04)' },
                    ticks: {
                        color: '#555', font: { size: 10, family: 'Space Mono' },
                        callback: v => '$' + v.toFixed(2)
                    },
                    border: { display: false }
                }
            }
        }
    });

    // Animate line drawing point by point
    let i = 1;
    function step() {
        if (i > balances.length) {
            // Final state
            balDisplay.textContent = '$' + finalBal.toFixed(2);
            const sign = totalGain >= 0 ? '▲' : '▼';
            badge.textContent = sign + ' $' + Math.abs(totalGain).toFixed(2) + ' (' + (totalGain >= 0 ? '+' : '') + pct + '%)';
            badge.style.background = totalGain >= 0 ? 'rgba(0,229,160,0.1)' : 'rgba(255,71,87,0.1)';
            badge.style.color = totalGain >= 0 ? 'var(--accent)' : 'var(--danger)';
            return;
        }
        chart.data.datasets[0].data = balances.slice(0, i);
        chart.update('none');

        const cur = balances[i - 1];
        const diff = cur - startBalance;
        const p = ((diff / startBalance) * 100).toFixed(2);
        balDisplay.textContent = '$' + cur.toFixed(2);
        const sign = diff >= 0 ? '▲' : '▼';
        badge.textContent = sign + ' $' + Math.abs(diff).toFixed(2) + ' (' + (diff >= 0 ? '+' : '') + p + '%)';
        badge.style.background = diff >= 0 ? 'rgba(0,229,160,0.1)' : 'rgba(255,71,87,0.1)';
        badge.style.color = diff >= 0 ? 'var(--accent)' : 'var(--danger)';

        i++;
        setTimeout(step, 80);
    }
    setTimeout(step, 300);
})();
// ──────────────────────────────────────────────
// POPULATE TRADE LOG TABLE
// ──────────────────────────────────────────────
function renderTradeLog() {
    const tbody = document.getElementById('v-trade-log');
    if (!tradeData.length) return;

    tbody.innerHTML = tradeData.map(t => {
        const pos = t.pnl >= 0;
        const sign = pos ? '+' : '';
        return `<tr>
          <td>${t.date}</td>
          <td class="pair">${t.pair}</td>
          <td>${t.trades}</td>
          <td class="${pos ? 'profit' : 'loss'}">${sign}$${Math.abs(t.pnl).toFixed(2)}</td>
          <td class="${pos ? 'profit' : 'loss'}">${sign}${t.pct.toFixed(2)}%</td>
          <td style="color:var(--muted)">${t.note || '—'}</td>
        </tr>`;
    }).join('');
}

// ──────────────────────────────────────────────
// CALENDAR
// ──────────────────────────────────────────────
const MONTHS = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
    'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];

const today = new Date();
let calYear = today.getFullYear();
let calMonth = today.getMonth();

function buildCalendar() {
    document.getElementById('cal-title').textContent = `${MONTHS[calMonth]} ${calYear}`;
    const container = document.getElementById('cal-days');
    container.innerHTML = '';

    // Monday-first offset
    const firstDay = new Date(calYear, calMonth, 1);
    let offset = firstDay.getDay();
    offset = offset === 0 ? 6 : offset - 1;

    const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();

    // Build lookup by day-of-month
    const tradeMap = {};
    tradeData.forEach(t => {
        const d = new Date(t.date);
        if (d.getFullYear() === calYear && d.getMonth() === calMonth) {
            tradeMap[d.getDate()] = t;
        }
    });

    // Empty leading cells
    for (let i = 0; i < offset; i++) {
        const el = document.createElement('div');
        el.className = 'cal-day empty';
        container.appendChild(el);
    }

    // Day cells
    for (let d = 1; d <= daysInMonth; d++) {
        const el = document.createElement('div');
        el.className = 'cal-day';

        const isToday = (d === today.getDate() && calMonth === today.getMonth() && calYear === today.getFullYear());
        if (isToday) el.classList.add('today');

        const t = tradeMap[d];
        if (t) {
            const pos = t.pnl >= 0;
            el.classList.add(pos ? 'profit' : 'loss');
            const sign = pos ? '+' : '';
            el.innerHTML = `
            <div class="day-num">${d}</div>
            <div class="day-pnl">${sign}$${Math.abs(t.pnl).toFixed(2)}</div>
            <div class="cal-tooltip">
              <strong>${t.pair}</strong> · ${t.trades} trade${t.trades !== 1 ? 's' : ''}<br>
              P&L: ${sign}$${Math.abs(t.pnl).toFixed(2)} &nbsp;(${sign}${t.pct.toFixed(2)}%)<br>
              ${t.note || ''}
            </div>`;
        } else {
            el.innerHTML = `<div class="day-num">${d}</div>`;
        }
        container.appendChild(el);
    }

    // Monthly summary row
    renderMonthlySummary(tradeMap);
}

function renderMonthlySummary(tradeMap) {
    const entries = Object.values(tradeMap);
    const totalPnl = entries.reduce((s, t) => s + t.pnl, 0);
    const totalTrades = entries.reduce((s, t) => s + t.trades, 0);
    const winDays = entries.filter(t => t.pnl >= 0).length;
    const lossDays = entries.filter(t => t.pnl < 0).length;
    const sign = totalPnl >= 0 ? '+' : '';
    const pnlColor = totalPnl >= 0 ? 'var(--accent)' : 'var(--danger)';

    const summaryEl = document.getElementById('cal-summary');
    if (!entries.length) {
        summaryEl.innerHTML = '';
        return;
    }
    summaryEl.innerHTML = `
        <div class="cal-sum-box">
          <div class="cal-sum-label">MONTH P&L</div>
          <div class="cal-sum-val" style="color:${pnlColor}">${sign}$${Math.abs(totalPnl).toFixed(2)}</div>
        </div>
        <div class="cal-sum-box">
          <div class="cal-sum-label">TOTAL TRADES</div>
          <div class="cal-sum-val" style="color:var(--text)">${totalTrades}</div>
        </div>
        <div class="cal-sum-box">
          <div class="cal-sum-label">WIN DAYS</div>
          <div class="cal-sum-val" style="color:var(--accent)">${winDays}</div>
        </div>
        <div class="cal-sum-box">
          <div class="cal-sum-label">LOSS DAYS</div>
          <div class="cal-sum-val" style="color:var(--danger)">${lossDays}</div>
        </div>`;
}

function changeMonth(dir) {
    calMonth += dir;
    if (calMonth < 0) { calMonth = 11; calYear--; }
    if (calMonth > 11) { calMonth = 0; calYear++; }
    buildCalendar();
}

// ──────────────────────────────────────────────
// TOGGLE VIEWS
// ──────────────────────────────────────────────
function switchView(v) {
    const isLog = v === 'log';
    document.getElementById('view-log').classList.toggle('visible', isLog);
    document.getElementById('view-cal').classList.toggle('visible', !isLog);
    document.getElementById('btn-log').classList.toggle('active', isLog);
    document.getElementById('btn-cal').classList.toggle('active', !isLog);
}

// ── INIT ──
renderTradeLog();
buildCalendar();
switchView('cal');
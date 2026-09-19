const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function getDayOfWeek(dateString) {
  return new Date(dateString).getDay();
}

function addDays(dateString, days) {
  const date = new Date(dateString);
  date.setDate(date.getDate() + days);
  return date.toISOString().split('T')[0];
}

function formatDateDisplay(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });
}

function getCalendarLink(dateString) {
  const date = new Date(dateString);
  const startDate = date.toISOString().split('T')[0];
  const endDate = date.toISOString().split('T')[0];
  return `https://www.google.com/calendar/render?action=TIMEBAR&text=Kenya+Public+Holiday&dates=${startDate}/${endDate}&sf=true&output=xml`;
}

function countConsecutiveDaysOff(bridgeDate, holidayDates) {
  let count = 0;
  let current = bridgeDate;

  for (let i = 0; i < 14; i++) {
    const dayOfWeek = getDayOfWeek(current);
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const isHoliday = holidayDates.has(current);
    const isBridgeDayStart = current === bridgeDate;

    if (isWeekend || isHoliday || isBridgeDayStart) {
      count++;
      current = addDays(current, 1);
    } else {
      break;
    }
  }

  return count;
}

function detectFreeLongWeekends(holidays, holidayDates) {
  const freeWeekends = [];
  const sortedHolidays = [...holidays].sort((a, b) => new Date(a.date) - new Date(b.date));

  for (let i = 0; i < sortedHolidays.length - 1; i++) {
    const h1 = sortedHolidays[i];
    const h2 = sortedHolidays[i + 1];
    const gap = (new Date(h2.date) - new Date(h1.date)) / (1000 * 60 * 60 * 24);

    if (gap >= 3 && gap <= 5) {
      let start = h1.date;
      let end = h2.date;
      let totalDays = 1;

      let current = addDays(h1.date, 1);
      while (current !== h2.date) {
        const dayOfWeek = getDayOfWeek(current);
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
        const isHoliday = holidayDates.has(current);
        if (isWeekend || isHoliday) {
          totalDays++;
          current = addDays(current, 1);
        } else {
          break;
        }
      }
      if (current === h2.date) {
        totalDays++;
      }

      if (totalDays >= 4 && gap > 1) {
        const holidaysBetween = sortedHolidays.filter((h) => h.date >= start && h.date <= end);
        freeWeekends.push({
          startDate: start,
          endDate: end,
          daysOff: totalDays,
          leaveDays: 0,
          holidays: holidaysBetween,
          isFree: true,
        });
      }
    }
  }

  return freeWeekends;
}

export function detectLongWeekends(holidays) {
  const holidayDates = new Set(holidays.map((h) => h.date));
  const longWeekends = [];

  for (const holiday of holidays) {
    const dayOfWeek = getDayOfWeek(holiday.date);
    if (dayOfWeek === 0 || dayOfWeek === 6) continue;

    let bridgeOffset = null;
    let bridgeReason = '';

    if (dayOfWeek === 5) {
      bridgeOffset = -1;
      bridgeReason = 'Holiday on Friday \u2192 take Thursday off';
    } else if (dayOfWeek === 1) {
      bridgeOffset = -3;
      bridgeReason = 'Holiday on Monday \u2192 take Friday off';
    } else if (dayOfWeek === 2) {
      bridgeOffset = -4;
      bridgeReason = 'Holiday on Tuesday \u2192 take Friday off';
    } else if (dayOfWeek === 4) {
      bridgeOffset = -1;
      bridgeReason = 'Holiday on Thursday \u2192 take Wednesday off';
    } else {
      continue;
    }

    const bridgeDate = addDays(holiday.date, bridgeOffset);
    const daysOff = countConsecutiveDaysOff(bridgeDate, holidayDates);

    if (daysOff >= 4) {
      const isBridgeAlreadyHoliday = holidayDates.has(bridgeDate);
      longWeekends.push({
        bridgeDate: bridgeDate,
        holiday: holiday,
        daysOff: daysOff,
        leaveDays: isBridgeAlreadyHoliday ? 0 : 1,
        reason: bridgeReason,
        isFree: isBridgeAlreadyHoliday,
      });
    }
  }

  const freeWeekends = detectFreeLongWeekends(holidays, holidayDates);
  longWeekends.push(...freeWeekends);

  longWeekends.sort((a, b) => b.daysOff - a.daysOff);

  const seen = new Set();
  const unique = longWeekends.filter((lw) => {
    const key = lw.isFree
      ? `free-${lw.startDate}-${lw.endDate}`
      : `${lw.bridgeDate}-${lw.holiday.date}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return unique;
}

function createCalendarLinkCard(dateString) {
  const div = document.createElement('div');
  div.className = 'flex gap-2';

  const link = document.createElement('a');
  link.href = getCalendarLink(dateString);
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.className = 'text-xs px-2 py-1 bg-gray-100 rounded hover:bg-gray-200 transition-colors';
  link.setAttribute('aria-label', 'Add to Google Calendar');
  link.textContent = 'Add to Calendar';

  div.appendChild(link);
  return div;
}

export function renderLongWeekends(longWeekends, container) {
  const listContainer = container.querySelector('#long-weekends-container');
  const noResults = container.querySelector('#no-long-weekends');

  if (!listContainer || !noResults) return;

  while (listContainer.firstChild) {
    listContainer.removeChild(listContainer.firstChild);
  }

  if (longWeekends.length === 0) {
    noResults.classList.remove('hidden');
    listContainer.parentElement.classList.add('hidden');
    return;
  }

  noResults.classList.add('hidden');
  listContainer.parentElement.classList.remove('hidden');

  longWeekends.forEach((lw) => {
    const card = document.createElement('div');
    card.className = 'bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow';

    const badgeClass = lw.isFree
      ? 'bg-emerald-100 text-emerald-800'
      : 'bg-indigo-100 text-indigo-800';

    const badge = document.createElement('span');
    badge.className = 'inline-block px-2 py-1 rounded text-xs font-semibold ' + badgeClass + ' mb-2';
    badge.textContent = lw.isFree ? 'FREE \u2014 0 leave days' : 'Take 1 day off';

    const title = document.createElement('h3');
    title.className = 'text-sm font-semibold text-gray-900 mb-1';
    if (lw.isFree) {
      title.textContent = lw.holidays.map((h) => h.localName || h.name).join(' + ');
    } else {
      title.textContent = lw.holiday.localName || lw.holiday.name;
    }

    const dateLine = document.createElement('p');
    dateLine.className = 'text-xs text-gray-600 mb-2';
    if (lw.isFree) {
      dateLine.textContent = formatDateDisplay(lw.startDate) + ' \u2013 ' + formatDateDisplay(lw.endDate);
    } else {
      dateLine.textContent = 'Bridge: ' + formatDateDisplay(lw.bridgeDate) + ' \u2013 Holiday: ' + formatDateDisplay(lw.holiday.date);
    }

    const daysOff = document.createElement('span');
    daysOff.className = 'text-2xl font-bold ' + (lw.isFree ? 'text-emerald-600' : 'text-indigo-600');
    daysOff.textContent = String(lw.daysOff);

    const desc = document.createElement('p');
    desc.className = 'text-xs text-gray-600 mb-3';
    if (lw.isFree) {
      desc.textContent = lw.daysOff + ' consecutive days off, already a long weekend';
      card.appendChild(desc);
    } else {
      desc.textContent = lw.reason;
      card.appendChild(desc);
      const leaveDesc = document.createElement('p');
      leaveDesc.className = 'text-xs text-gray-600 mb-3';
      leaveDesc.textContent = lw.daysOff + ' consecutive days off with just ' + lw.leaveDays + ' day' + (lw.leaveDays > 1 ? 's' : '') + ' of leave';
      card.appendChild(leaveDesc);
    }

    const header = document.createElement('div');
    header.className = 'flex items-start justify-between mb-3';
    const left = document.createElement('div');
    left.className = 'flex-1';
    left.appendChild(badge);
    left.appendChild(title);
    left.appendChild(dateLine);
    header.appendChild(left);
    header.appendChild(daysOff);

    card.appendChild(header);
    if (!lw.isFree) {
      card.appendChild(desc);
    }
    card.appendChild(desc);
    card.appendChild(createCalendarLinkCard(lw.isFree ? lw.startDate : lw.bridgeDate));

    listContainer.appendChild(card);
  });
}

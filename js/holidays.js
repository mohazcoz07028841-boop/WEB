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

function getDayName(dayIndex) {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[dayIndex];
}

function getHolidayType(holiday) {
  if (holiday.types && holiday.types.length > 0) {
    return holiday.types.join(', ');
  }
  return 'Public';
}

function getTypeColor(type) {
  const typeMap = {
    Public: 'bg-blue-100 text-blue-800',
    Bank: 'bg-green-100 text-green-800',
    School: 'bg-yellow-100 text-yellow-800',
    Authorities: 'bg-purple-100 text-purple-800',
    Optional: 'bg-orange-100 text-orange-800',
    Observance: 'bg-pink-100 text-pink-800',
  };
  const normalizedType = type.split(', ')[0];
  return typeMap[normalizedType] || 'bg-gray-100 text-gray-800';
}

function createCell(text, className, isTextSafe) {
  const td = document.createElement('td');
  td.className = className || '';
  if (isTextSafe) {
    td.textContent = text;
  } else {
    td.innerHTML = text;
  }
  return td;
}

export function renderHolidays(holidays, container) {
  const tbody = container.querySelector('#holidays-tbody');
  if (!tbody) return;

  while (tbody.firstChild) {
    tbody.removeChild(tbody.firstChild);
  }

  const sortedHolidays = [...holidays].sort((a, b) => new Date(a.date) - new Date(b.date));

  sortedHolidays.forEach((holiday) => {
    const row = document.createElement('tr');
    row.className = 'border-b border-gray-200 hover:bg-gray-50';

    const dayIndex = getDayOfWeek(holiday.date);
    const dayClass = dayIndex === 0 ? 'text-blue-600' : dayIndex === 6 ? 'text-red-600' : 'text-gray-900';

    const type = getHolidayType(holiday);
    const typeClass = getTypeColor(type);

    const dateCell = createCell(formatDateDisplay(holiday.date), 'py-2 px-3 text-sm', true);
    const dayCell = createCell(getDayName(dayIndex), 'py-2 px-3 text-sm font-medium ' + dayClass, true);
    const nameCell = createCell(holiday.localName || holiday.name, 'py-2 px-3 text-sm font-medium', true);

    const typeCell = document.createElement('td');
    typeCell.className = 'py-2 px-3 text-sm';
    const badge = document.createElement('span');
    badge.className = 'px-2 py-1 rounded text-xs font-medium ' + typeClass;
    badge.textContent = type;
    typeCell.appendChild(badge);

    row.appendChild(dateCell);
    row.appendChild(dayCell);
    row.appendChild(nameCell);
    row.appendChild(typeCell);

    tbody.appendChild(row);
  });
}

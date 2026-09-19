import { fetchHolidays, getAvailableYears } from './api.js';
import { renderHolidays } from './holidays.js';
import { detectLongWeekends, renderLongWeekends } from './longweekends.js';

const yearSelect = document.getElementById('year-select');
const statusRegion = document.getElementById('status-region');
const loadingState = document.getElementById('loading-state');
const errorState = document.getElementById('error-state');
const retryBtn = document.getElementById('retry-btn');
const successState = document.getElementById('success-state');
const holidaysSection = document.getElementById('holidays-section');
const longWeekendsSection = document.getElementById('long-weekends-section');

let currentYear = yearSelect ? parseInt(yearSelect.value, 10) : 2027;
let isLoading = false;

function showStatus(message) {
  if (statusRegion) {
    statusRegion.textContent = message;
  }
}

function showLoading() {
  isLoading = true;
  if (loadingState) loadingState.classList.remove('hidden');
  if (errorState) errorState.classList.add('hidden');
  if (successState) successState.classList.add('hidden');
  showStatus('Loading holiday data...');
}

function showError(message) {
  isLoading = false;
  if (loadingState) loadingState.classList.add('hidden');
  if (errorState) errorState.classList.remove('hidden');
  if (successState) successState.classList.add('hidden');
  showStatus(message || 'Failed to load holiday data');
  console.error('Fetch error:', message);
}

function showSuccess() {
  isLoading = false;
  if (loadingState) loadingState.classList.add('hidden');
  if (errorState) errorState.classList.add('hidden');
  if (successState) successState.classList.remove('hidden');
  showStatus('Holiday data loaded successfully');
}

async function loadHolidays(year) {
  if (isLoading) return;

  showLoading();

  try {
    const holidays = await fetchHolidays(year);

    if (!Array.isArray(holidays) || holidays.length === 0) {
      showError('No holidays found for this year and country.');
      return;
    }

    renderHolidays(holidays, document.querySelector('main'));
    const longWeekends = detectLongWeekends(holidays);
    renderLongWeekends(longWeekends, document.querySelector('main'));

    showSuccess();
  } catch (err) {
    showError(err.message || 'An unexpected error occurred while fetching holidays.');
  }
}

function initYearSelect() {
  if (!yearSelect) return;

  const years = getAvailableYears();
  yearSelect.innerHTML = '';
  years.forEach((year) => {
    const option = document.createElement('option');
    option.value = year;
    option.textContent = year;
    if (year === currentYear) option.selected = true;
    yearSelect.appendChild(option);
  });

  yearSelect.addEventListener('change', (e) => {
    currentYear = parseInt(e.target.value, 10);
    loadHolidays(currentYear);
  });
}

function initRetryButton() {
  if (retryBtn) {
    retryBtn.addEventListener('click', () => loadHolidays(currentYear));
  }
}

function init() {
  initYearSelect();
  initRetryButton();
  loadHolidays(currentYear);
}

document.addEventListener('DOMContentLoaded', init);

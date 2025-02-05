import * as React from 'react';
import './style.css';
import Grid from './grid.tsx';
import dataList from './data/data.json';
import { calculateDaysDiff } from './utils/calculateDaysDiff.tsx';

function control(today: Date, limit: number): number {
  let incorrectBackgroundCount = 0;
  const rows = document.querySelectorAll('table tbody tr');

  rows.forEach((row) => {
    const tableRow = row as HTMLTableRowElement;

    const mailReceivedDateString = tableRow.cells[1].innerText; 
    const solutionSentDateString = tableRow.cells[2].innerText; 

    const daysDiff = calculateDaysDiff(mailReceivedDateString, solutionSentDateString, today);

    const shouldBeRed = daysDiff > limit;
    const computedStyle = window.getComputedStyle(tableRow);
    const rowBackgroundColor = computedStyle.backgroundColor === 'red';
    
    if (rowBackgroundColor !== shouldBeRed) {
      incorrectBackgroundCount++;
    }
  });

  return incorrectBackgroundCount;
}

export default function App() {
  const [incorrectCount, setIncorrectCount] = React.useState(0);
  const [todayInput, setTodayInput] = React.useState(new Date().toISOString().split('T')[0]);
  const [limitInput, setLimitInput] = React.useState(30);

  const handleTestButtonClick = () => {
    const today = new Date(todayInput);
    const limit = isNaN(parseInt(limitInput.toString(), 10)) ? 0 : parseInt(limitInput.toString(), 10);
    
    const count = control(today, limit);
    setIncorrectCount(count);
  };

  return (
    <div  style={{
      display: 'flex',
      justifyContent: 'center', 
      alignItems: 'center',     
      flexDirection: 'column',  
    }}>
      <h1>Dgpays Case Study</h1>
      <div style={{
      marginBottom: '10px',
    }}>
        <label>
        Boş olanlar için 'Çözüm Gönderme' tarihi  : 
          <input style={{marginLeft : '5px'}}
            type="date"
            value={todayInput}
            onChange={(e) => setTodayInput(e.target.value)}
            required
          />
        </label>
      </div>
      <div style={{
      marginBottom: '10px',
    }}>
        <label>
          Limit (Gün)  :
          <input style={{marginLeft : '5px'}}
            type="number"
            value={limitInput === null || limitInput === 0 ? '' : limitInput}  
            onChange={(e) => {
              const value = e.target.value;
              setLimitInput(value === "" ? 0 : parseInt(value, 10));
            }}
            required
            min="0" 
          />
        </label>
      </div>
      <div>
        <button onClick={handleTestButtonClick}>Test Et</button>
      </div>
      <p>Hatalı boyanmış satır sayısı: {incorrectCount}</p>
      <Grid source={dataList} limit={limitInput} today={new Date(todayInput)} />
    </div>
  );
}

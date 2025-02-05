import React from 'react';
import { calculateDaysDiff } from './utils/calculateDaysDiff.tsx';

interface DataItem {
  name: string;
  mailReceivedDate: string;
  solutionSentDate?: string;
  isBackgroundColorRed?: boolean;
}

interface GridProps {
  source: DataItem[];
  today: Date;  
  limit: number; 
}

const Grid = ({ source, limit, today }: GridProps) => {
  return (
    <table border={1}>
      <thead>
        <tr>
          <th>İsim</th>
          <th>Mail Alım Tarihi</th>
          <th>Çözüm Gönderme Tarihi</th>
        </tr>
      </thead>
      <tbody>
        {source.map((item, index) => {
          
          
          const daysDiff = calculateDaysDiff(item.mailReceivedDate, item.solutionSentDate, today);

          
          const shouldBeRed = daysDiff > limit;

          return (
            <tr
              key={index}
              style={{ backgroundColor: shouldBeRed ? 'red' : 'white' }} 
            >
              <td>{item.name}</td>
              <td>{item.mailReceivedDate}</td>
              <td>{item.solutionSentDate || ''}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Grid;

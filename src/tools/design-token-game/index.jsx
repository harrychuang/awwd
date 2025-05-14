import React, { useState } from 'react';
import './style.scss';
import { Button } from '../../components/button';
import { Card } from '../../components/card';

// 假設這是一個簡單的配對遊戲：用戶需將設計 token 名稱與其值配對
const tokens = [
  { name: 'Primary Color', value: '#007AFF' },
  { name: 'Secondary Color', value: '#FF9500' },
  { name: 'Border Radius', value: '8px' },
  { name: 'Font Size', value: '16px' },
];

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

const DesignTokenGame = () => {
  const [shuffledTokens, setShuffledTokens] = useState(shuffle([...tokens]));
  const [selectedName, setSelectedName] = useState(null);
  const [selectedValue, setSelectedValue] = useState(null);
  const [matched, setMatched] = useState([]);
  const [score, setScore] = useState(0);

  const handleSelect = (type, item) => {
    if (type === 'name') {
      setSelectedName(item);
    } else {
      setSelectedValue(item);
    }
  };

  React.useEffect(() => {
    if (selectedName && selectedValue) {
      if (selectedName.value === selectedValue.value) {
        setMatched([...matched, selectedName.value]);
        setScore(score + 1);
      }
      setTimeout(() => {
        setSelectedName(null);
        setSelectedValue(null);
      }, 800);
    }
    // eslint-disable-next-line
  }, [selectedName, selectedValue]);

  return (
    <div className="design-token-game">
      <h2>Design Token 配對遊戲</h2>
      <div className="game-board">
        <div className="names">
          <h3>名稱</h3>
          {tokens.map((token) => (
            <Card
              key={token.name}
              className={`token-card ${selectedName === token ? 'selected' : ''} ${matched.includes(token.value) ? 'matched' : ''}`}
              onClick={() => handleSelect('name', token)}
              disabled={matched.includes(token.value)}
            >
              {token.name}
            </Card>
          ))}
        </div>
        <div className="values">
          <h3>值</h3>
          {shuffledTokens.map((token) => (
            <Card
              key={token.value}
              className={`token-card ${selectedValue === token ? 'selected' : ''} ${matched.includes(token.value) ? 'matched' : ''}`}
              onClick={() => handleSelect('value', token)}
              disabled={matched.includes(token.value)}
            >
              {token.value}
            </Card>
          ))}
        </div>
      </div>
      <div className="score">分數：{score} / {tokens.length}</div>
      {matched.length === tokens.length && (
        <div className="game-over">
          <h3>恭喜完成配對！</h3>
          <Button onClick={() => {
            setMatched([]);
            setScore(0);
            setShuffledTokens(shuffle([...tokens]));
          }}>再玩一次</Button>
        </div>
      )}
    </div>
  );
};

export default DesignTokenGame; 
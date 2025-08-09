import React, { useMemo, useState } from 'react';
import { parseCssVariables } from './parser';
import { generateAndroidCompose } from './genAndroid';
import { generateIOSUIKit } from './genIOS';

const exampleCss = `:root {
  /* TOKENS */
  --abcd-ref-color-blue-50: #2112ff;
  --abcd-ref-color-blue-80: #5247f4;
  --abcd-ref-color-red-50: #ff1249;
  --abcd-ref-color-red-80: #f7549d;
  --abcd-sys-color-primary-default: var(--abcd-ref-color-red-50);
  --abcd-sys-color-primary-light: var(--abcd-ref-color-red-80);
  --abcd-comp-button-color-primary-default: var(--abcd-sys-color-primary-default);
  --abcd-comp-button-color-primary-hovered: var(--abcd-sys-color-primary-light);
  --abcd-ref-size-0: 0px;
  --abcd-ref-size-0-rem: 0rem;
  --abcd-ref-size-6: 6px;
  --abcd-ref-size-6-rem: 0.375rem;
  --abcd-ref-size-12: 12px;
  --abcd-ref-size-12-rem: 0.75rem;
  --abcd-sys-size-corner-none: var(--abcd-ref-size-0);
  --abcd-sys-size-corner-sm: var(--abcd-ref-size-6);
  --abcd-sys-size-corner-lg: var(--abcd-ref-size-12);
  --abcd-comp-button-size-corner-defualt: var(--abcd-sys-size-corner-lg);
  --abcd-ref-size-24: 24px;
  --abcd-ref-size-24-rem: 1.5rem;
  --abcd-ref-size-32: 32px;
  --abcd-ref-size-32-rem: 2rem;
  --abcd-sys-spacing-none: var(--abcd-ref-size-0);
  --abcd-sys-spacing-sm: var(--abcd-ref-size-6);
  --abcd-sys-spacing-default: var(--abcd-ref-size-12);
  --abcd-sys-spacing-med: var(--abcd-ref-size-24);
  --abcd-comp-button-padding-horizontal-defualt: var(--abcd-sys-spacing-med);
  --abcd-comp-button-padding-vertical-defualt: var(--abcd-sys-spacing-default);
  --abcd-sys-spacing-lg: var(--abcd-ref-size-32);
  --abcd-comp-button-font-size-defualt: var(--abcd-sys-font-size-med);
  --abcd-sys-font-size-med: var(--abcd-ref-size-24);
  --abcd-sys-font-size-default: var(--abcd-ref-size-14);
  --abcd-sys-font-size-lg: var(--abcd-ref-size-32);
  --abcd-sys-font-line-height-sm: var(--abcd-ref-size-18);
  --abcd-sys-font-line-height-med: var(--abcd-ref-size-32);
  --abcd-sys-font-line-height-lg: var(--abcd-ref-size-36);
  --abcd-ref-size-18: 18px;
  --abcd-ref-size-18-rem: 1.125rem;
  --abcd-ref-size-36: 36px;
  --abcd-ref-size-36-rem: 2.25rem;
  --abcd-ref-size-14: 14px;
  --abcd-ref-size-14-rem: 0.875rem;
  --abcd-comp-button-font-line-height-defualt: var(--abcd-sys-font-size-med);
}`;

const DownloadButton = ({ filename, content, disabled }) => {
  const onClick = () => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  return (
    <button className="vct-button" onClick={onClick} disabled={disabled}>
      下載 {filename}
    </button>
  );
};

const Converter = () => {
  const [cssInput, setCssInput] = useState(exampleCss);
  const [targetAndroid, setTargetAndroid] = useState(true);
  const [targetIOS, setTargetIOS] = useState(true);

  const result = useMemo(() => parseCssVariables(cssInput), [cssInput]);

  const androidCode = useMemo(() => {
    if (!targetAndroid) return '';
    return generateAndroidCompose(result);
  }, [result, targetAndroid]);

  const iosCode = useMemo(() => {
    if (!targetIOS) return '';
    return generateIOSUIKit(result);
  }, [result, targetIOS]);

  const hasAny = !!androidCode || !!iosCode;

  const downloadSelected = () => {
    if (targetAndroid && androidCode) {
      const blob = new Blob([androidCode], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'DesignTokens.kt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
    if (targetIOS && iosCode) {
      const blob = new Blob([iosCode], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'DesignTokens.swift';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="variables-compile-tool">
      <div className="vct-input-panel">
        <div className="vct-row">
          <label className="vct-checkbox">
            <input type="checkbox" checked={targetAndroid} onChange={(e) => setTargetAndroid(e.target.checked)} />
            Android Compose (Kotlin)
          </label>
          <label className="vct-checkbox">
            <input type="checkbox" checked={targetIOS} onChange={(e) => setTargetIOS(e.target.checked)} />
            iOS UIKit (Swift)
          </label>
        </div>
        <p style={{ display: 'block', color: '#B3B0E2', marginBottom: '10px' }}>
          可以直接將 CSS Variables 程式碼貼到下方文字框中，進行編譯。
        </p>
        <textarea
          aria-label="CSS variables input"
          className="vct-textarea"
          value={cssInput}
          onChange={(e) => setCssInput(e.target.value)}
          placeholder=":root {\n  --token-name: value;\n}"
          spellCheck={false}
        />

        <div className="vct-stats">
          <span>解析到變數：{result.summary.total}</span>
          <span>已解析：{result.summary.resolved}</span>
          {result.summary.unresolved > 0 && (
            <span className="warn">未解析：{result.summary.unresolved}</span>
          )}
        </div>
      </div>

      <div className="vct-output-grid">
        {targetAndroid && (
          <div className="vct-output">
            <div className="vct-output-header android">
              <h3 className="sbdocs-h2">Android Compose</h3>
              <DownloadButton filename="DesignTokens.kt" content={androidCode} disabled={!androidCode} />
            </div>
            <pre className="vct-code"><code>{androidCode}</code></pre>
          </div>
        )}

        {targetIOS && (
          <div className="vct-output">
            <div className="vct-output-header ios">
              <h3 className="sbdocs-h2">iOS UIKit</h3>
              <DownloadButton filename="DesignTokens.swift" content={iosCode} disabled={!iosCode} />
            </div>
            <pre className="vct-code"><code>{iosCode}</code></pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default Converter;



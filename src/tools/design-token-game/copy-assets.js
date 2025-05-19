const fs = require('fs');
const path = require('path');

// 設定所有相關目錄路徑
const PUBLIC_DIR = path.resolve(__dirname, '../../../public');
const PUBLIC_GAME_DIR = path.resolve(PUBLIC_DIR, 'game');
const LOCAL_IMGS_DIR = path.resolve(__dirname, 'imgs');
const TARGET_DIR = path.resolve(__dirname, '../../../public/game');

// 確保目標目錄存在
if (!fs.existsSync(TARGET_DIR)) {
  fs.mkdirSync(TARGET_DIR, { recursive: true });
}

// 檢查是否有 logo.png 文件，如果沒有，從 public 目錄中找其他合適的圖片作為 logo
const checkAndSetupLogo = () => {
  // 嘗試從 public 目錄獲取一個替代圖片
  const alternativeLogo = path.join(PUBLIC_DIR, 'cover.jpg');
  const targetLogoPath = path.join(TARGET_DIR, 'logo.png');
  
  // 檢查 logo.png 是否已存在於目標目錄
  if (!fs.existsSync(targetLogoPath)) {
    console.log('Logo file not found in target directory, setting up a replacement...');
    
    // 檢查 cover.jpg 是否存在
    if (fs.existsSync(alternativeLogo)) {
      // 如果有替代圖片，複製到目標目錄並重命名為 logo.png
      fs.copyFileSync(alternativeLogo, targetLogoPath);
      console.log(`Copied alternative logo from: ${alternativeLogo}`);
    } else {
      console.warn('Warning: Could not find a suitable logo replacement.');
    }
  }
};

// 複製所有圖片資源
const copyImages = () => {
  const imageFiles = [
    { name: 'diamond-icon.png', fallback: 'diamond-icon.png' },
    { name: 'grass-icon.png', fallback: 'grass-icon.png' },
    { name: 'heart-icon.png', fallback: 'heart-icon.png' },
    { name: 'sword-icon.png', fallback: 'sword-icon.png' },
    { name: 'magician-icon.png', fallback: 'magician-icon.png' }
  ];

  imageFiles.forEach(file => {
    // 優先從 public/game 目錄複製
    let sourcePath = path.join(PUBLIC_GAME_DIR, file.name);
    const targetPath = path.join(TARGET_DIR, file.name);
    
    // 檢查 public/game 目錄，若檔案不存在，嘗試從 local imgs 目錄複製
    if (!fs.existsSync(sourcePath)) {
      const localImgPath = path.join(LOCAL_IMGS_DIR, file.fallback);
      if (fs.existsSync(localImgPath)) {
        sourcePath = localImgPath;
        console.log(`Using local image from: ${localImgPath}`);
      } else {
        console.warn(`Warning: Image not found in public/game or local imgs: ${file.name}`);
        return; // 跳過此檔案
      }
    }

    try {
      fs.copyFileSync(sourcePath, targetPath);
      console.log(`Copied: ${file.name}`);
    } catch (err) {
      console.error(`Error copying ${file.name}: ${err.message}`);
    }
  });
  
  // 檢查和設置 logo
  checkAndSetupLogo();
};

// 複製自定義字體
const copyFonts = () => {
  const FONTS_SOURCE_DIR = path.resolve(__dirname, 'fonts');
  const FONTS_TARGET_DIR = path.join(TARGET_DIR, 'fonts');

  // 確保字體目標目錄存在
  if (!fs.existsSync(FONTS_TARGET_DIR)) {
    fs.mkdirSync(FONTS_TARGET_DIR, { recursive: true });
  }

  // 如果字體源目錄存在，複製所有字體文件
  if (fs.existsSync(FONTS_SOURCE_DIR)) {
    const fontFiles = fs.readdirSync(FONTS_SOURCE_DIR, { withFileTypes: true });
    
    fontFiles.forEach(dirent => {
      if (dirent.isFile()) {
        const sourcePath = path.join(FONTS_SOURCE_DIR, dirent.name);
        const targetPath = path.join(FONTS_TARGET_DIR, dirent.name);
        fs.copyFileSync(sourcePath, targetPath);
        console.log(`Copied font: ${dirent.name}`);
      } else if (dirent.isDirectory()) {
        // 處理子目錄 (如 ttf, web)
        const subDirName = dirent.name;
        const subDirSourcePath = path.join(FONTS_SOURCE_DIR, subDirName);
        const subDirTargetPath = path.join(FONTS_TARGET_DIR, subDirName);

        if (!fs.existsSync(subDirTargetPath)) {
          fs.mkdirSync(subDirTargetPath, { recursive: true });
        }

        const subDirFiles = fs.readdirSync(subDirSourcePath);
        subDirFiles.forEach(file => {
          const fontSourcePath = path.join(subDirSourcePath, file);
          const fontTargetPath = path.join(subDirTargetPath, file);
          if (fs.statSync(fontSourcePath).isFile()) {
            fs.copyFileSync(fontSourcePath, fontTargetPath);
            console.log(`Copied font: ${subDirName}/${file}`);
          }
        });
      }
    });
  } else {
    console.warn(`Warning: Fonts directory not found: ${FONTS_SOURCE_DIR}`);
  }
};

// 執行複製操作
console.log('Starting asset copy...');
copyImages();
copyFonts();
console.log('Asset copy completed!'); 
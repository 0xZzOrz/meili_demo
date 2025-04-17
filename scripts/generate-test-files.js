const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');
const { Document, Packer, Paragraph, TextRun } = require('docx');

// 确保预览目录存在
const previewDir = path.join(process.cwd(), 'public', 'preview');
if (!fs.existsSync(previewDir)) {
  fs.mkdirSync(previewDir, { recursive: true });
}

// 生成PDF文件（简单文本文件代替）
function generatePDF(filename, content) {
  fs.writeFileSync(path.join(previewDir, filename.replace('.pdf', '.txt')), content);
}

// 生成Excel文件
function generateExcel(filename, content) {
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.aoa_to_sheet([[content]]);
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  XLSX.writeFile(workbook, path.join(previewDir, filename));
}

// 生成Word文件
async function generateWord(filename, content) {
  const doc = new Document({
    sections: [{
      properties: {},
      children: [
        new Paragraph({
          children: [
            new TextRun(content),
          ],
        }),
      ],
    }],
  });
  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(path.join(previewDir, filename), buffer);
}

// 生成测试文件
async function generateTestFiles() {
  const files = [
    { name: 'fiber-report.pdf', type: 'pdf', content: '纤维材料检验报告\n\n检验结果：合格\n\n检验日期：2024-03-20' },
    { name: 'core-report.xlsx', type: 'excel', content: '芯材检验报告' },
    { name: 'adhesive-report.docx', type: 'docx', content: '胶粘剂与涂层检验报告\n\n检验结果：合格\n\n检验日期：2024-03-20' },
    { name: 'process-report.pdf', type: 'pdf', content: 'XX工艺检验报告\n\n检验结果：合格\n\n检验日期：2024-03-20' },
    { name: 'assembly-report.docx', type: 'docx', content: '组装工艺检验报告\n\n检验结果：合格\n\n检验日期：2024-03-20' },
    { name: 'thickness-report.xlsx', type: 'excel', content: '干膜厚度检测报告' },
    { name: 'resistance-report.pdf', type: 'pdf', content: '导电通路电阻测试报告\n\n检验结果：合格\n\n检验日期：2024-03-20' },
    { name: 'dimension-report.pdf', type: 'pdf', content: '产品尺寸检验报告\n\n检验结果：合格\n\n检验日期：2024-03-20' },
    { name: 'balance-report.xlsx', type: 'excel', content: '动平衡测试报告' },
    { name: 'fatigue-report.docx', type: 'docx', content: '疲劳试验报告\n\n检验结果：合格\n\n检验日期：2024-03-20' },
    { name: 'bonding-report.pdf', type: 'pdf', content: '胶接缺陷检测报告\n\n检验结果：合格\n\n检验日期：2024-03-20' },
    { name: 'delamination-report.xlsx', type: 'excel', content: '内部脱粘检测报告' },
    { name: 'final-report.docx', type: 'docx', content: '产品出厂检验报告\n\n检验结果：合格\n\n检验日期：2024-03-20' }
  ];

  for (const file of files) {
    try {
      switch (file.type) {
        case 'pdf':
          generatePDF(file.name, file.content);
          break;
        case 'excel':
          generateExcel(file.name, file.content);
          break;
        case 'docx':
          await generateWord(file.name, file.content);
          break;
      }
      console.log(`Created test file: ${file.name}`);
    } catch (error) {
      console.error(`Error creating ${file.name}:`, error);
    }
  }
}

generateTestFiles().catch(console.error); 
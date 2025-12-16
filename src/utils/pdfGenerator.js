import html2pdf from 'html2pdf.js'

export const generatePDF = (element, filename = 'CV') => {
  const opt = {
    margin: 0,
    filename: `${filename}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, windowHeight: element.scrollHeight },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    pagebreak: { mode: 'avoid-all' }
  }
  html2pdf().set(opt).from(element).save()
}
